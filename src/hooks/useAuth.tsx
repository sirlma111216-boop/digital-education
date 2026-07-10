/* ==========================================================================
   인증 컨텍스트. Supabase Auth 세션 + profiles.role 을 관리.
   백엔드 미설정 시에도 안전하게 동작(로그인 시도 시 안내).
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
import type { Session as AuthSession, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured, toFriendlyError } from "@/lib/supabase";
import type { Profile, Role } from "@/types/board";

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  role: Role;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured);

  const fetchProfile = useCallback(async (uid: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .maybeSingle();
    if (!error && data) setProfile(data as Profile);
  }, []);

  const applySession = useCallback(
    async (session: AuthSession | null) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    },
    [fetchProfile],
  );

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      void applySession(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      void applySession(session);
    });
    return () => sub.subscription.unsubscribe();
  }, [applySession]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured)
      return { error: "백엔드(Supabase)가 아직 연결되지 않았습니다." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? { error: toFriendlyError(error) } : {};
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      if (!isSupabaseConfigured)
        return { error: "백엔드(Supabase)가 아직 연결되지 않았습니다." };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      });
      if (error) return { error: toFriendlyError(error) };
      // 이메일 확인이 필요한 프로젝트 설정이면 세션이 없습니다.
      return { needsConfirmation: !data.session };
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  const role: Role = profile?.role ?? (user ? "student" : "guest");

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      role,
      loading,
      configured: isSupabaseConfigured,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [user, profile, role, loading, signIn, signUp, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
