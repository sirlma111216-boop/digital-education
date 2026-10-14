import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fmtKst, lessonConfig, popupKeyId, writePopupState } from "@/features/lesson/lessonConfig";
import { useLessonWindow } from "@/features/lesson/useLessonWindow";
import { LessonPlayer, type LessonPlayerHandle } from "@/features/lesson/LessonPlayer";

const PLAYBACK_NOTICE =
  "영상 재생 중에는 일시정지와 구간 이동을 사용할 수 없습니다. 창을 닫거나 새로고침한 뒤 다시 시작하면 처음부터 재생됩니다.";

/** 온라인 수업(영상) 페이지 — 차시 페이지와 같이 로그인 없이 열람 가능. */
export function LessonPage() {
  const { status, preview } = useLessonWindow();
  const { role } = useAuth();
  const playerRef = useRef<LessonPlayerHandle>(null);
  const [ended, setEnded] = useState(false);

  if (!lessonConfig.ok) {
    const showDetails = role === "instructor" || import.meta.env.DEV;
    return (
      <div className="section">
        <div className="container lesson-page">
          <div className="page-head">
            <p className="eyebrow">Online Lesson · 온라인 수업</p>
            <h1 className="display-lg">온라인 수업</h1>
          </div>
          <div className="alert alert-info">현재 예정된 온라인 수업이 없습니다.</div>
          {showDetails && (
            <div className="alert alert-error lesson-page__config">
              <p><strong>설정이 완성되지 않아 온라인 수업 기능이 꺼져 있습니다.</strong> (교수자에게만 표시)</p>
              <ul>
                {lessonConfig.problems.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <p>설정 위치: <code>src/data/onlineLesson.ts</code></p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const lesson = lessonConfig.lesson;
  const canStart = status === "open";

  function handleStart() {
    // 클릭 이벤트 안에서 바로 재생을 시작해야 소리 있는 재생이 허용됨
    setEnded(false);
    playerRef.current?.start();
  }

  function handleEnded() {
    setEnded(true);
    writePopupState(popupKeyId(lesson.id, preview), "ended");
  }

  return (
    <div className="section">
      <div className="container lesson-page">
        <div className="page-head">
          <p className="eyebrow">Online Lesson · 온라인 수업</p>
          <h1 className="display-lg">{lesson.title}</h1>
          <p className="muted">
            입장 가능 시간: {fmtKst(lesson.startMs)} ~ {fmtKst(lesson.endMs)} (한국 시간)
          </p>
          {preview && lesson.preview && (
            <div className="alert alert-info">
              교수자 미리보기 중입니다({fmtKst(lesson.preview.endMs)}까지). 학생에게는 아직 열리지 않았습니다.
            </div>
          )}
        </div>

        <section className="lesson-page__card card-canvas">
          <p className="lesson-page__notice">{lesson.notice}</p>
          <p className="lesson-page__rule">{PLAYBACK_NOTICE}</p>

          {ended && (
            <div className="alert alert-success" role="status">영상 시청이 끝났습니다.</div>
          )}

          <div className="lesson-page__start">
            <button type="button" className="btn btn-primary lesson-page__start-btn" disabled={!canStart} onClick={handleStart}>
              수업 시작
            </button>
            {status === "before" && (
              <p className="muted" role="status">
                아직 수업 시작 전입니다. {fmtKst(lesson.startMs)}부터 시작할 수 있습니다.
              </p>
            )}
            {status === "closed" && (
              <p className="muted" role="status">수업 입장 시간이 종료되었습니다.</p>
            )}
            {canStart && <p className="muted">소리가 켜지니 스피커·이어폰 음량을 확인해 주세요.</p>}
          </div>
        </section>
      </div>

      {/* 입장 마감 이후에도 이미 시작한 영상은 끝까지 재생됨(플레이어는 창 상태와 무관) */}
      <LessonPlayer ref={playerRef} src={lesson.videoUrl} title={lesson.title} onEnded={handleEnded} />
    </div>
  );
}
