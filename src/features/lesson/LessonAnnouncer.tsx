import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fmtKst, lessonConfig, popupKeyId, writePopupState } from "./lessonConfig";
import { useLessonWindow } from "./useLessonWindow";
import { usePopupState } from "./usePopupState";

export const LESSON_PATH = "/lesson";

/** 수업 안내 팝업(대화상자)이 지금 떠 있는지. 다른 안내 팝업이 겹쳐 뜨지 않게 할 때 쓴다. */
export function useLessonDialogOpen(): boolean {
  const { status, preview } = useLessonWindow();
  const lesson = lessonConfig.ok ? lessonConfig.lesson : null;
  const popupId = lesson ? popupKeyId(lesson.id, preview) : null;
  const popup = usePopupState(popupId);
  return Boolean(lesson && popupId && status === "open" && popup !== "ended" && popup !== "dismissed");
}

/**
 * 사이트 안 수업 안내 팝업.
 * - 입장 가능 시간에만, 사이트를 열어 둔 사람에게만 표시(브라우저 알림·푸시 없음)
 * - 닫으면 사이트 안에서 이동하는 동안은 다시 뜨지 않고 작은 배너만 남김.
 *   어느 페이지에서든 새로고침하면 다시 뜸(수업 페이지 포함)
 * - 영상 시청을 끝까지 마치면 같은 탭에서는 새로고침해도 다시 뜨지 않음
 */
export function LessonAnnouncer() {
  const { status, preview, endMs } = useLessonWindow();
  const lesson = lessonConfig.ok ? lessonConfig.lesson : null;
  // 미리보기는 별도 키 → 교수자가 미리보기에서 닫거나 끝까지 봐도 실제 수업 팝업에는 영향 없음
  const popupId = lesson ? popupKeyId(lesson.id, preview) : null;
  const popup = usePopupState(popupId);
  const { pathname } = useLocation();

  if (!lesson || !popupId || status !== "open" || popup === "ended") return null;

  if (popup === "dismissed") {
    // 수업 페이지에서는 배너가 필요 없음(바로 '수업 시작' 가능)
    if (pathname === LESSON_PATH) return null;
    return (
      <Link to={LESSON_PATH} className="lesson-banner" aria-label={`온라인 수업 진행 중: ${lesson.title}. 수업 페이지로 이동`}>
        <span className="lesson-banner__dot" aria-hidden="true" />
        {preview ? "교수자 미리보기 · 입장하기" : "온라인 수업 진행 중 · 입장하기"}
      </Link>
    );
  }

  return <AnnounceDialog id={popupId} title={lesson.title} endMs={endMs} preview={preview} />;
}

function AnnounceDialog({ id, title, endMs, preview }: { id: string; title: string; endMs: number; preview: boolean }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const goRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    goRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") writePopupState(id, "dismissed");
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [id]);

  return (
    <div className="lesson-modal-backdrop">
      <div className="lesson-announce" role="dialog" aria-modal="true" aria-labelledby="lesson-announce-title">
        <p className="eyebrow">Online Lesson · 온라인 수업{preview && " · 교수자 미리보기"}</p>
        <h2 id="lesson-announce-title" className="display-sm">{title}</h2>
        <p className="lesson-announce__text">
          지금 온라인 수업에 입장할 수 있습니다. 입장 마감은 <strong>{fmtKst(endMs)}</strong>(한국 시간)입니다.
          수업 페이지에서 소리가 나오는지 확인한 뒤 ‘수업 시작’을 눌러 주세요.
        </p>
        <div className="lesson-announce__actions">
          <button
            ref={goRef}
            className="btn btn-primary"
            onClick={() => {
              writePopupState(id, "dismissed");
              if (pathname !== LESSON_PATH) navigate(LESSON_PATH);
            }}
          >
            수업 페이지로 이동
          </button>
          <button className="btn btn-secondary" onClick={() => writePopupState(id, "dismissed")}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
