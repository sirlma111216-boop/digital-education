import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fmtKst, lessonConfig, popupKeyId, writePopupState } from "./lessonConfig";
import { useLessonWindow } from "./useLessonWindow";
import { usePopupState } from "./usePopupState";

export const LESSON_PATH = "/lesson";

/**
 * 사이트 안 수업 안내 팝업.
 * - 입장 가능 시간에만, 사이트를 열어 둔 사람에게만 표시(브라우저 알림·푸시 없음)
 * - 닫으면 같은 탭에서 같은 수업으로는 다시 자동으로 뜨지 않고, 작은 배너만 남김
 * - 영상 시청을 마치면 배너까지 숨김
 */
export function LessonAnnouncer() {
  const { status, preview, endMs } = useLessonWindow();
  const lesson = lessonConfig.ok ? lessonConfig.lesson : null;
  // 미리보기는 별도 키 → 교수자가 미리보기에서 닫거나 끝까지 봐도 실제 수업 팝업에는 영향 없음
  const popupId = lesson ? popupKeyId(lesson.id, preview) : null;
  const popup = usePopupState(popupId);
  const { pathname } = useLocation();

  if (!lesson || !popupId || status !== "open" || popup === "ended" || pathname === LESSON_PATH) return null;

  if (popup === "dismissed") {
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
              navigate(LESSON_PATH);
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
