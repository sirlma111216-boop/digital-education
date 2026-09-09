/* ==========================================================================
   인증 컨텍스트. Firebase Auth(구글 로그인) + Firestore profiles/{uid}.
   - 환경 변수 미설정 시에도 앱은 동작하고, 로그인 시도 시 안내만 띄운다.
   - 첫 로그인 시 profiles 문서를 role:'student' 로 생성(보안 규칙과 이중).
   - 학생은 온보딩(표시명·학번) 전에는 게시판 쓰기를 막는다.
   - blocked === true 인 사용자는 차단 안내를 보여 준다.
   ========================================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, googleProvider, isFirebaseConfigured, toFriendlyError } from "@/lib/firebase";
import type { Profile, Role } from "@/types/board";

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  role: Role;
  loading: boolean;
  configured: boolean;
  blocked: boolean;
  needsOnboarding: boolean;
  signInWithGoogle: () => Promise<{ error?: string }>;
  completeOnboarding: (displayName: string, studentNumber: string) => Promise<{ error?: string }>;
  updateMyProfile: (patch: { displayName?: string; studentNumber?: string }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toMillis(v: unknown): number | null {
  if (!v) return null;
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null && "toMillis" in v) {
    try {
      return (v as { toMillis: () => number }).toMillis();
    } catch {
      return null;
    }
  }
  return null;
}

function mapProfile(uid: string, data: Record<string, unknown>): Profile {
  return {
    id: uid,
    role: (data.role as Profile["role"]) ?? "student",
    displayName: (data.displayName as string) ?? null,
    email: (data.email as string) ?? null,
    studentNumber: (data.studentNumber as string) ?? null,
    blocked: Boolean(data.blocked),
    createdAt: toMillis(data.createdAt),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(isFirebaseConfigured);

  const loadOrCreateProfile = useCallback(async (u: User) => {
    const ref = doc(db, "profiles", u.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setProfile(mapProfile(u.uid, snap.data() as Record<string, unknown>));
      return;
    }
    // 첫 로그인 — 학생으로 문서 생성 (규칙에서 role='student' 아니면 create 거부)
    await setDoc(ref, {
      role: "student",
      displayName: u.displayName ?? null,
      email: u.email ?? null,
      studentNumber: null,
      blocked: false,
      createdAt: serverTimestamp(),
    });
    const fresh = await getDoc(ref);
    setProfile(mapProfile(u.uid, (fresh.data() ?? {}) as Record<string, unknown>));
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    // 리다이렉트 로그인 결과 처리(팝업 차단 대체 경로)
    void getRedirectResult(auth).catch(() => undefined);
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        loadOrCreateProfile(u)
          .catch(() => setProfile(null))
          .finally(() => setLoading(false));
      } else {
        setProfile(null);
        setLoading(false);
      }
    });
    return () => unsub();
  }, [loadOrCreateProfile]);

  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured) return { error: "백엔드(Firebase)가 아직 연결되지 않았습니다." };
    try {
      await signInWithPopup(auth, googleProvider);
      return {};
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      // 팝업이 막히면 리다이렉트로 대체
      if (/popup-blocked|popup-closed-by-user|cancelled-popup-request|operation-not-supported/i.test(code)) {
        try {
          await signInWithRedirect(auth, googleProvider);
          return {};
        } catch (err2) {
          return { error: toFriendlyError(err2) };
        }
      }
      return { error: toFriendlyError(err) };
    }
  }, []);

  const completeOnboarding = useCallback(
    async (displayName: string, studentNumber: string) => {
      if (!user) return { error: "로그인이 필요합니다." };
      try {
        await updateDoc(doc(db, "profiles", user.uid), {
          displayName: displayName.trim(),
          studentNumber: studentNumber.trim(),
        });
        setProfile((p) =>
          p ? { ...p, displayName: displayName.trim(), studentNumber: studentNumber.trim() } : p,
        );
        return {};
      } catch (err) {
        return { error: toFriendlyError(err) };
      }
    },
    [user],
  );

  const updateMyProfile = useCallback(
    async (patch: { displayName?: string; studentNumber?: string }) => {
      if (!user) return { error: "로그인이 필요합니다." };
      const clean: Record<string, string> = {};
      if (patch.displayName !== undefined) clean.displayName = patch.displayName.trim();
      if (patch.studentNumber !== undefined) clean.studentNumber = patch.studentNumber.trim();
      try {
        await updateDoc(doc(db, "profiles", user.uid), clean);
        setProfile((p) => (p ? { ...p, ...clean } : p));
        return {};
      } catch (err) {
        return { error: toFriendlyError(err) };
      }
    },
    [user],
  );

  const signOut = useCallback(async () => {
    if (isFirebaseConfigured) await fbSignOut(auth);
    setUser(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      const snap = await getDoc(doc(db, "profiles", user.uid));
      if (snap.exists()) setProfile(mapProfile(user.uid, snap.data() as Record<string, unknown>));
    }
  }, [user]);

  const role: Role = profile?.role ?? (user ? "student" : "guest");
  const blocked = Boolean(profile?.blocked);
  const needsOnboarding = Boolean(user && profile && role === "student" && !profile.studentNumber);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      role,
      loading,
      configured: isFirebaseConfigured,
      blocked,
      needsOnboarding,
      signInWithGoogle,
      completeOnboarding,
      updateMyProfile,
      signOut,
      refreshProfile,
    }),
    [
      user,
      profile,
      role,
      loading,
      blocked,
      needsOnboarding,
      signInWithGoogle,
      completeOnboarding,
      updateMyProfile,
      signOut,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
