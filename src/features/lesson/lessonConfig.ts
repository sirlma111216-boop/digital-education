import { onlineLesson } from "@/data/onlineLesson";

/** 설정 검증을 통과한 온라인 수업. */
export interface ReadyLesson {
  id: string;
  title: string;
  videoUrl: string;
  startMs: number;
  endMs: number;
  notice: string;
  /** 교수자 미리보기 창(설정된 경우). */
  preview: { startMs: number; endMs: number } | null;
}

export type LessonConfigResult =
  | { ok: true; lesson: ReadyLesson }
  | { ok: false; problems: string[] };

/** "2026-10-20T19:00:00+09:00" 형식(한국 시간 오프셋 필수)만 허용. */
const KST_ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?\+09:00$/;

/** 비어 있거나 "[수업 제목]" 같은 자리표시자 그대로인 값은 미입력으로 본다. */
function filled(v: string | null | undefined): v is string {
  if (!v || !v.trim()) return false;
  const s = v.trim();
  return !(s.startsWith("[") && s.endsWith("]")) && !s.includes("내도메인");
}

function parseKst(label: string, v: string | null, problems: string[]): number | null {
  if (!filled(v)) {
    problems.push(`${label}이(가) 비어 있습니다.`);
    return null;
  }
  if (!KST_ISO.test(v.trim())) {
    problems.push(`${label} 형식이 올바르지 않습니다. 예: "2026-10-20T19:00:00+09:00"`);
    return null;
  }
  const ms = Date.parse(v.trim());
  if (Number.isNaN(ms)) {
    problems.push(`${label}을(를) 날짜로 해석할 수 없습니다.`);
    return null;
  }
  return ms;
}

function check(): LessonConfigResult {
  const c = onlineLesson;
  const problems: string[] = [];

  if (!filled(c.id)) problems.push("수업 ID(id)가 비어 있습니다.");
  if (!filled(c.title)) problems.push("수업 제목(title)이 비어 있습니다.");
  if (!filled(c.notice)) problems.push("안내문(notice)이 비어 있습니다.");

  if (!filled(c.videoUrl)) {
    problems.push("영상 주소(videoUrl)가 비어 있습니다.");
  } else {
    try {
      const u = new URL(c.videoUrl);
      if (u.protocol !== "https:" && !(import.meta.env.DEV && u.hostname === "localhost"))
        problems.push("영상 주소는 https:// 로 시작해야 합니다.");
    } catch {
      problems.push("영상 주소(videoUrl)가 올바른 URL이 아닙니다.");
    }
  }

  const startMs = parseKst("시작 시각(startAt)", c.startAt, problems);
  const endMs = parseKst("종료 시각(endAt)", c.endAt, problems);
  if (startMs !== null && endMs !== null && endMs <= startMs)
    problems.push("종료 시각이 시작 시각보다 늦어야 합니다.");

  let preview: ReadyLesson["preview"] = null;
  if (c.instructorPreview) {
    const ps = parseKst("미리보기 시작(instructorPreview.startAt)", c.instructorPreview.startAt, problems);
    const pe = parseKst("미리보기 종료(instructorPreview.endAt)", c.instructorPreview.endAt, problems);
    if (ps !== null && pe !== null) {
      if (pe <= ps) problems.push("미리보기 종료가 미리보기 시작보다 늦어야 합니다.");
      else preview = { startMs: ps, endMs: pe };
    }
  }

  if (problems.length > 0) return { ok: false, problems };
  return {
    ok: true,
    lesson: {
      id: c.id!.trim(),
      title: c.title!.trim(),
      videoUrl: c.videoUrl!.trim(),
      startMs: startMs!,
      endMs: endMs!,
      notice: c.notice!.trim(),
      preview,
    },
  };
}

/** 앱 시작 시 한 번만 검증(설정 파일은 빌드에 포함되는 상수). */
export const lessonConfig: LessonConfigResult = check();

if (import.meta.env.DEV && !lessonConfig.ok) {
  console.info("[온라인 수업] 설정이 완성되지 않아 기능이 꺼져 있습니다:", lessonConfig.problems);
}

const KST_FORMAT = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** 한국 시간으로 표시. 예: "10월 20일 (화) 19:00" */
export function fmtKst(ms: number): string {
  return KST_FORMAT.format(ms);
}

/* ---- 팝업 억제 상태(수업 ID별). 재생 위치는 어디에도 저장하지 않는다. ----
   - "dismissed"(닫음): 메모리에만 보관 → 페이지 이동 중에는 다시 뜨지 않고, 새로고침하면 다시 뜸
   - "ended"(시청 완료): sessionStorage에 보관 → 같은 탭에서는 새로고침해도 다시 뜨지 않음 */
export type PopupState = "dismissed" | "ended" | null;
/** 미리보기는 실제 수업과 다른 키를 쓴다. */
export const popupKeyId = (id: string, preview: boolean) => (preview ? `${id}:preview` : id);
const popupKey = (id: string) => `lesson-popup:${id}`;
export const LESSON_POPUP_EVENT = "lesson-popup-change";
const memory = new Map<string, PopupState>();

export function readPopupState(id: string): PopupState {
  try {
    if (sessionStorage.getItem(popupKey(id)) === "ended") return "ended";
  } catch {
    /* 저장소 사용 불가 — 메모리 상태만 사용 */
  }
  return memory.get(id) ?? null;
}

export function writePopupState(id: string, state: Exclude<PopupState, null>) {
  // "ended"는 "dismissed"보다 우선(시청 완료 후에는 배너도 숨김).
  if (state === "dismissed" && readPopupState(id) === "ended") return;
  memory.set(id, state);
  if (state === "ended") {
    try {
      sessionStorage.setItem(popupKey(id), state);
    } catch {
      /* 저장 불가(사생활 보호 모드 등) — 메모리 상태만으로 동작 */
    }
  }
  window.dispatchEvent(new CustomEvent(LESSON_POPUP_EVENT, { detail: { id, state } }));
}
