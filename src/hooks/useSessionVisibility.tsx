/* ==========================================================================
   차시 공개 범위. courseSettings/sessionVisibility 문서 하나로 관리.
   - 문서가 없거나 읽기 실패 시 "01만 공개"로 처리(사고 나도 덜 열리는 쪽으로 실패).
   - 읽기는 누구나, 쓰기는 교수자만(보안 규칙에서 강제).
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
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured, toFriendlyError } from "@/lib/firebase";

const SESSION_IDS = Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, "0"));

function firstOnly(): Record<string, boolean> {
  return Object.fromEntries(SESSION_IDS.map((id) => [id, id === "01"]));
}

interface Ctx {
  visibility: Record<string, boolean>;
  loading: boolean;
  isOpen: (id: string) => boolean;
  setOne: (id: string, open: boolean) => Promise<{ error?: string }>;
  setAll: (open: boolean) => Promise<{ error?: string }>;
  resetToFirstOnly: () => Promise<{ error?: string }>;
}

const VisibilityContext = createContext<Ctx | null>(null);

export function SessionVisibilityProvider({ children }: { children: ReactNode }) {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(firstOnly);
  const [loading, setLoading] = useState<boolean>(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setVisibility(firstOnly());
      setLoading(false);
      return;
    }
    // Firestore 가 미설정/불통이면 onSnapshot 이 오래 걸릴 수 있으므로
    // 1.5초 안에 응답이 없으면 안전 기본값(01만 공개)으로 로딩을 끝낸다.
    let settled = false;
    const settle = () => {
      if (!settled) {
        settled = true;
        setLoading(false);
      }
    };
    const timer = window.setTimeout(settle, 1500);

    const ref = doc(db, "courseSettings", "sessionVisibility");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.data() as { visibility?: Record<string, boolean> } | undefined;
        const merged = firstOnly();
        if (data?.visibility) {
          for (const id of SESSION_IDS) {
            if (typeof data.visibility[id] === "boolean") merged[id] = data.visibility[id];
          }
        }
        setVisibility(merged);
        settle();
      },
      () => {
        // 읽기 실패 → 안전하게 01만 공개
        setVisibility(firstOnly());
        settle();
      },
    );
    return () => {
      window.clearTimeout(timer);
      unsub();
    };
  }, []);

  const write = useCallback(async (next: Record<string, boolean>) => {
    try {
      await setDoc(
        doc(db, "courseSettings", "sessionVisibility"),
        { visibility: next, updatedAt: serverTimestamp(), updatedBy: auth.currentUser?.uid ?? null },
        { merge: true },
      );
      return {};
    } catch (err) {
      return { error: toFriendlyError(err) };
    }
  }, []);

  const setOne = useCallback(
    (id: string, open: boolean) => write({ ...visibility, [id]: open }),
    [visibility, write],
  );
  const setAll = useCallback(
    (open: boolean) => write(Object.fromEntries(SESSION_IDS.map((id) => [id, open]))),
    [write],
  );
  const resetToFirstOnly = useCallback(() => write(firstOnly()), [write]);

  const value = useMemo<Ctx>(
    () => ({
      visibility,
      loading,
      isOpen: (id: string) => visibility[id] ?? id === "01",
      setOne,
      setAll,
      resetToFirstOnly,
    }),
    [visibility, loading, setOne, setAll, resetToFirstOnly],
  );

  return <VisibilityContext.Provider value={value}>{children}</VisibilityContext.Provider>;
}

export function useSessionVisibility(): Ctx {
  const ctx = useContext(VisibilityContext);
  if (!ctx) throw new Error("useSessionVisibility must be used within SessionVisibilityProvider");
  return ctx;
}

export { SESSION_IDS };
