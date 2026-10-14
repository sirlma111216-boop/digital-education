import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { flushSync } from "react-dom";

export interface LessonPlayerHandle {
  /** 반드시 사용자 클릭 핸들러 안에서 동기적으로 호출(소리 있는 재생 허용 조건). */
  start: () => void;
}

interface Props {
  src: string;
  title: string;
  /** 영상이 끝까지 재생되어 `ended` 이벤트가 발생했을 때. */
  onEnded: () => void;
}

type Phase =
  | "loading" // 첫 데이터 기다리는 중
  | "playing"
  | "buffering" // 재생 중 잠깐 멈춤(종료로 보지 않음)
  | "needs-tap" // 브라우저가 자동 재생을 막음 → '영상 재생 시작' 버튼
  | "stopped" // 시스템·OS 등에 의해 일시정지됨 → '처음부터 다시 시작'
  | "error";

/** 오래 멈춰 있으면(네트워크 지연) 안내를 덧붙인다. 재생이 이어지면 자동으로 사라짐. */
const SLOW_MS = 20_000;

/** 플레이어 영역 안에서만 막는 미디어 관련 키. */
const BLOCKED_KEYS = new Set([
  " ", "k", "K", "j", "J", "l", "L", "f", "F", "m", "M", ",", ".", "<", ">",
  "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
]);

function errorMessage(v: HTMLVideoElement): string {
  switch (v.error?.code) {
    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return "영상을 불러올 수 없습니다. 영상 주소가 잘못되었거나 이 브라우저가 지원하지 않는 형식입니다.";
    case MediaError.MEDIA_ERR_NETWORK:
      return "네트워크 오류로 영상을 더 불러올 수 없습니다. 인터넷 연결을 확인한 뒤 다시 시작해 주세요.";
    case MediaError.MEDIA_ERR_DECODE:
      return "영상 데이터를 재생하는 중 오류가 발생했습니다.";
    default:
      return "영상을 재생하는 중 알 수 없는 오류가 발생했습니다.";
  }
}

/**
 * 수업 영상 플레이어(사이트 안 큰 모달).
 * - 재생 조작(일시정지·탐색·배속·다운로드) UI 없음, 항상 0초부터 새로 시작
 * - 재생 위치는 어디에도 저장하지 않음
 * - 영상 파일을 Blob으로 받지 않고 MP4 주소를 그대로 src로 사용(Range 요청으로 스트리밍)
 * ※ 브라우저 개발자 도구·OS 미디어 키·확장 프로그램까지 막을 수는 없습니다.
 */
export const LessonPlayer = forwardRef<LessonPlayerHandle, Props>(function LessonPlayer(
  { src, title, onEnded },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  /** 현재 재생 세션이 살아 있는지. 닫은 뒤 늦게 도착한 이벤트·Promise를 무시하기 위함. */
  const activeRef = useRef(false);
  const slowTimerRef = useRef<number | undefined>(undefined);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;

  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("loading");
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearSlow = useCallback(() => {
    window.clearTimeout(slowTimerRef.current);
    slowTimerRef.current = undefined;
    setSlow(false);
  }, []);

  const armSlow = useCallback(() => {
    window.clearTimeout(slowTimerRef.current);
    slowTimerRef.current = window.setTimeout(() => {
      if (activeRef.current) setSlow(true);
    }, SLOW_MS);
  }, []);

  /** 재생 중지 + 미디어 해제(네트워크 연결·디코더까지 정리). */
  const release = useCallback(() => {
    activeRef.current = false;
    clearSlow();
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.removeAttribute("src");
    v.load();
  }, [clearSlow]);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch((err: DOMException) => {
      if (!activeRef.current) return;
      if (err?.name === "NotAllowedError") setPhase("needs-tap");
      // 그 밖의 실패(NotSupportedError 등)는 video의 error 이벤트에서 처리
    });
  }, []);

  /** 항상 0초부터 새 세션으로 시작. 클릭 핸들러 안에서 동기 호출되어야 소리가 허용됨. */
  const begin = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    activeRef.current = true;
    flushSync(() => {
      setOpen(true);
      setPhase("loading");
      setError(null);
      setSlow(false);
    });
    v.muted = false;
    v.defaultPlaybackRate = 1;
    v.playbackRate = 1;
    v.src = src; // Blob이 아닌 공개 MP4 주소를 그대로 사용
    armSlow();
    tryPlay();
  }, [src, armSlow, tryPlay]);

  const restart = useCallback(() => {
    release();
    begin();
    // 누른 버튼이 사라지므로 포커스를 대화상자로 되돌림
    dialogRef.current?.focus();
  }, [release, begin]);

  const close = useCallback(() => {
    release();
    setOpen(false);
    const back = returnFocusRef.current;
    returnFocusRef.current = null;
    window.setTimeout(() => back?.focus?.(), 0);
  }, [release]);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        returnFocusRef.current = document.activeElement as HTMLElement | null;
        begin();
      },
    }),
    [begin],
  );

  // 브라우저가 HTML 속성으로 노출하지 않는 재생 제한은 DOM 속성으로 설정
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const anyV = v as HTMLVideoElement & { disableRemotePlayback?: boolean };
    v.disablePictureInPicture = true;
    if ("disableRemotePlayback" in v) anyV.disableRemotePlayback = true;
    v.setAttribute("controlslist", "nodownload noplaybackrate noremoteplayback nofullscreen");
    v.setAttribute("x-webkit-airplay", "deny");
    v.setAttribute("webkit-playsinline", "");
    return () => release(); // 페이지를 떠나면 소리 즉시 중단
  }, [release]);

  // 열린 동안: 첫 포커스, 배경 스크롤 잠금, OS 미디어 세션의 탐색 버튼 제거
  useEffect(() => {
    if (!open) return;
    // 첫 포커스는 대화상자 자체에 둔다. 닫기 버튼에 두면 '일시정지'하려고 누른 스페이스바가
    // 닫기로 동작해 처음부터 다시 보게 되므로. 닫기 버튼은 Tab 한 번으로 이동.
    dialogRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // 포커스가 어떤 이유로든 모달 밖으로 나가면 대화상자로 되돌림
    const onFocusIn = (e: FocusEvent) => {
      const d = dialogRef.current;
      if (d && !d.contains(e.target as Node)) d.focus();
    };
    document.addEventListener("focusin", onFocusIn);

    const ms = "mediaSession" in navigator ? navigator.mediaSession : null;
    const actions: MediaSessionAction[] = ["seekbackward", "seekforward", "seekto", "previoustrack", "nexttrack"];
    if (ms) {
      try {
        ms.metadata = new MediaMetadata({ title });
      } catch { /* 미지원 */ }
      for (const a of actions) {
        try { ms.setActionHandler(a, null); } catch { /* 미지원 동작 */ }
      }
    }
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.body.style.overflow = prevOverflow;
      if (ms) {
        try { ms.metadata = null; } catch { /* 미지원 */ }
      }
    };
  }, [open, title]);

  /** 포커스 가두기 + 플레이어 영역의 미디어 단축키 무시(닫기 버튼 등 버튼 조작은 그대로). */
  function onDialogKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Tab") {
      const items = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (document.activeElement === dialogRef.current) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }
    const onButton = (e.target as HTMLElement).closest("button");
    if (!onButton && BLOCKED_KEYS.has(e.key)) e.preventDefault();
  }

  const block = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const active = () => activeRef.current;

  return (
    <div className="lesson-modal-backdrop lesson-player-backdrop" hidden={!open}>
      {/* 배경 클릭으로는 닫히지 않음(실수로 처음부터 다시 보는 일 방지) */}
      <div
        ref={dialogRef}
        className="lesson-player"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lesson-player-title"
        aria-describedby="lesson-player-desc"
        tabIndex={-1}
        onKeyDown={onDialogKeyDown}
      >
        <div className="lesson-player__bar">
          <h2 id="lesson-player-title" className="lesson-player__title">{title}</h2>
          <p id="lesson-player-desc" className="visually-hidden">
            수업 영상이 재생됩니다. 일시정지와 구간 이동은 지원하지 않습니다. 닫기 버튼은 Tab 키로 이동할 수 있습니다.
          </p>
          <button ref={closeRef} type="button" className="btn btn-secondary-on-dark btn-sm lesson-player__close" onClick={close}>
            닫기 <span className="visually-hidden">(영상이 멈추고, 다시 열면 처음부터 재생됩니다)</span>
          </button>
        </div>

        <div className="lesson-player__stage">
          <video
            ref={videoRef}
            className="lesson-player__video"
            preload="none"
            playsInline
            disablePictureInPicture
            onPlaying={() => {
              if (!active()) return;
              clearSlow();
              setPhase("playing");
            }}
            onWaiting={() => {
              if (!active()) return;
              setPhase((p) => (p === "playing" ? "buffering" : p));
              armSlow();
            }}
            onPause={(e) => {
              const v = e.currentTarget;
              // 끝까지 재생된 경우·닫는 중에는 'ended'/close가 처리
              if (!active() || v.ended) return;
              clearSlow();
              setPhase((p) => (p === "needs-tap" || p === "error" ? p : "stopped"));
            }}
            onEnded={() => {
              if (!active()) return;
              close();
              onEndedRef.current();
            }}
            onError={(e) => {
              if (!active()) return;
              clearSlow();
              setError(errorMessage(e.currentTarget));
              setPhase("error");
            }}
            onRateChange={(e) => {
              const v = e.currentTarget;
              if (v.playbackRate !== 1) v.playbackRate = 1;
            }}
          />
          {/* 영상 위 투명 막: 클릭·더블클릭·우클릭으로 일시정지/탐색/메뉴가 동작하지 않게 */}
          <div
            className="lesson-player__shield"
            aria-hidden="true"
            onClick={block}
            onDoubleClick={block}
            onContextMenu={block}
            onPointerDown={block}
          />

          {(phase === "loading" || phase === "buffering") && (
            <div className="lesson-player__status" role="status">
              <span className="spinner" aria-hidden="true" />
              {phase === "loading" ? "영상을 불러오는 중…" : "잠시 버퍼링 중…"}
              {slow && (
                <div className="lesson-player__panel">
                  <p>네트워크가 느려 영상이 멈춰 있습니다. 잠시 기다리거나 처음부터 다시 시작할 수 있습니다.</p>
                  <button type="button" className="btn btn-secondary-on-dark btn-sm" onClick={restart}>처음부터 다시 시작</button>
                </div>
              )}
            </div>
          )}

          {phase === "needs-tap" && (
            <div className="lesson-player__status">
              <div className="lesson-player__panel">
                <p>브라우저 설정으로 자동 재생이 막혔습니다. 아래 버튼을 눌러 재생을 시작해 주세요.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setPhase("loading");
                    tryPlay();
                    dialogRef.current?.focus();
                  }}
                >
                  영상 재생 시작
                </button>
              </div>
            </div>
          )}

          {phase === "stopped" && (
            <div className="lesson-player__status" role="alert">
              <div className="lesson-player__panel">
                <p>재생이 중단되었습니다. 이 수업 영상은 이어서 보기를 지원하지 않습니다.</p>
                <button type="button" className="btn btn-primary" onClick={restart}>처음부터 다시 시작</button>
              </div>
            </div>
          )}

          {phase === "error" && (
            <div className="lesson-player__status" role="alert">
              <div className="lesson-player__panel">
                <p>{error}</p>
                <button type="button" className="btn btn-primary" onClick={restart}>처음부터 다시 시작</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
