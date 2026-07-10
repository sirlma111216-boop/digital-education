/* ==========================================================================
   진행 상태 컨텍스트. 앱 전역에서 완료/북마크/성찰/체크리스트/방문기록을 공유.
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
  loadProgress,
  saveProgress,
  recordVisit,
  completionRate,
  type ProgressState,
} from "@/lib/progress";

interface ProgressContextValue {
  state: ProgressState;
  isCompleted: (id: string) => boolean;
  toggleCompleted: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  toggleBookmarked: (id: string) => void;
  getReflection: (id: string) => string;
  setReflection: (id: string, text: string) => void;
  isStepChecked: (id: string, step: number) => boolean;
  toggleStep: (id: string, step: number) => void;
  visit: (id: string) => void;
  rate: (total: number) => number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => loadProgress());

  useEffect(() => {
    saveProgress(state);
  }, [state]);

  const toggleCompleted = useCallback((id: string) => {
    setState((s) => ({ ...s, completed: { ...s.completed, [id]: !s.completed[id] } }));
  }, []);

  const toggleBookmarked = useCallback((id: string) => {
    setState((s) => ({ ...s, bookmarked: { ...s.bookmarked, [id]: !s.bookmarked[id] } }));
  }, []);

  const setReflection = useCallback((id: string, text: string) => {
    setState((s) => ({ ...s, reflections: { ...s.reflections, [id]: text } }));
  }, []);

  const toggleStep = useCallback((id: string, step: number) => {
    setState((s) => {
      const current = s.practiceChecks[id] ?? {};
      return {
        ...s,
        practiceChecks: {
          ...s.practiceChecks,
          [id]: { ...current, [step]: !current[step] },
        },
      };
    });
  }, []);

  const visit = useCallback((id: string) => {
    setState((s) => recordVisit(s, id));
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      isCompleted: (id) => Boolean(state.completed[id]),
      toggleCompleted,
      isBookmarked: (id) => Boolean(state.bookmarked[id]),
      toggleBookmarked,
      getReflection: (id) => state.reflections[id] ?? "",
      setReflection,
      isStepChecked: (id, step) => Boolean(state.practiceChecks[id]?.[step]),
      toggleStep,
      visit,
      rate: (total) => completionRate(state, total),
    }),
    [state, toggleCompleted, toggleBookmarked, setReflection, toggleStep, visit],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
