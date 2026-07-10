/* ==========================================================================
   학습 진행 상태 (localStorage). 백엔드 없이 동작하며 저장 구조를 버전 관리합니다.
   - 차시 완료 표시 / 북마크 / 성찰 메모 / 최근 방문 / 실습 체크리스트
   ========================================================================== */

const STORAGE_KEY = "digital-edu:progress";
const STORAGE_VERSION = 1;

export interface ProgressState {
  version: number;
  completed: Record<string, boolean>; // sessionId -> done
  bookmarked: Record<string, boolean>;
  reflections: Record<string, string>; // sessionId -> memo
  practiceChecks: Record<string, Record<number, boolean>>; // sessionId -> {stepIdx: done}
  lastVisited: string[]; // sessionIds, most-recent first (max 5)
  updatedAt: string;
}

function emptyState(): ProgressState {
  return {
    version: STORAGE_VERSION,
    completed: {},
    bookmarked: {},
    reflections: {},
    practiceChecks: {},
    lastVisited: [],
    updatedAt: new Date().toISOString(),
  };
}

export function loadProgress(): ProgressState {
  if (typeof localStorage === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    // 간단한 마이그레이션: 버전이 다르면 기본값과 병합
    if (parsed.version !== STORAGE_VERSION) {
      return { ...emptyState(), ...parsed, version: STORAGE_VERSION };
    }
    return { ...emptyState(), ...parsed };
  } catch {
    return emptyState();
  }
}

export function saveProgress(state: ProgressState): void {
  if (typeof localStorage === "undefined") return;
  try {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* 저장 실패는 무시(용량 초과 등) */
  }
}

export function recordVisit(state: ProgressState, sessionId: string): ProgressState {
  const lastVisited = [sessionId, ...state.lastVisited.filter((id) => id !== sessionId)].slice(0, 5);
  return { ...state, lastVisited };
}

export function completionRate(state: ProgressState, total: number): number {
  if (total === 0) return 0;
  const done = Object.values(state.completed).filter(Boolean).length;
  return Math.round((done / total) * 100);
}
