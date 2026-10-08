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

/** 로컬 개발 서버 + Firebase 미설정: 콘텐츠 편집 미리보기를 위해 전 차시 공개. 배포 빌드에는 영향 없음. */
function devPreviewAll(): Record<string, boolean> {
  return Object.fromEntries(SESSION_IDS.map((id) => [id, true]));
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
  const [visibility, setVisibility] = useState<Record<string, boolean>>(() =>
    !isFirebaseConfigured && import.meta.env.DEV ? devPreviewAll() : firstOnly(),
  );
  const [loading, setLoading] = useState<boolean>(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setVisibility(import.meta.env.DEV ? devPreviewAll() : firstOnly());
      setLoading(false);
      return;
    }
    // 실제 공개 설정을 받을 때까지 loading 을 유지한다(차시 화면은 그동안 '불러오는 중'으로 기다림).
    // 너무 짧게 끊으면 느린 학교 네트워크에서 열린 차시도 '01만 공개'로 오판해 학생이 목록으로 튕긴다.
    // Firestore 가 아예 불통일 때만 8초 뒤 안전 기본값(01만 공개)으로 로딩을 끝낸다.
    let settled = false;
    const settle = () => {
      if (!settled) {
        settled = true;
        setLoading(false);
      }
    };
    const timer = window.setTimeout(settle, 8000);

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
