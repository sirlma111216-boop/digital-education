import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { lessonConfig } from "./lessonConfig";

export type LessonWindowStatus = "disabled" | "before" | "open" | "closed";

export interface LessonWindow {
  status: LessonWindowStatus;
  /** 교수자 미리보기로 열린 상태(학생에게는 항상 false). */
  preview: boolean;
  /** 현재 적용 중인 입장 창(미리보기면 미리보기 시각). */
  startMs: number;
  endMs: number;
}

function compute(now: number, instructor: boolean): LessonWindow {
  if (!lessonConfig.ok) return { status: "disabled", preview: false, startMs: 0, endMs: 0 };
  const { startMs, endMs, preview } = lessonConfig.lesson;
  if (instructor && preview && now >= preview.startMs && now < preview.endMs)
    return { status: "open", preview: true, startMs: preview.startMs, endMs: preview.endMs };
  const status = now < startMs ? "before" : now < endMs ? "open" : "closed";
  return { status, preview: false, startMs, endMs };
}

function sameWindow(a: LessonWindow, b: LessonWindow) {
  return a.status === b.status && a.preview === b.preview && a.startMs === b.startMs && a.endMs === b.endMs;
}

/** 다음 경계(시작/종료)까지 기다리되, 시계 오차·절전 대비로 최대 1분마다 다시 확인. */
const MAX_WAIT = 60_000;

/**
 * 현재 한국 시간 기준 수업 창 상태.
 * - 시작/종료 순간에 맞춰 setTimeout으로 갱신(이미 열어 둔 화면에도 시작 시 팝업이 뜨도록)
 * - 백그라운드 탭에서는 타이머가 늦어질 수 있으므로 탭 복귀(visibilitychange/focus) 시 즉시 재확인
 * - 교수자 미리보기 시간에는 교수자에게만 "open"
 */
export function useLessonWindow(): LessonWindow {
  const { role } = useAuth();
  const instructor = role === "instructor";
  const [win, setWin] = useState<LessonWindow>(() => compute(Date.now(), instructor));

  useEffect(() => {
    if (!lessonConfig.ok) return;
    const { startMs, endMs, preview } = lessonConfig.lesson;
    const bounds = [startMs, endMs, ...(preview ? [preview.startMs, preview.endMs] : [])];
    let timer: number | undefined;

    const tick = () => {
      const now = Date.now();
      const next = compute(now, instructor);
      setWin((prev) => (sameWindow(prev, next) ? prev : next));
      window.clearTimeout(timer);
      const upcoming = bounds.filter((b) => b > now).sort((a, b) => a - b)[0];
      if (upcoming !== undefined) timer = window.setTimeout(tick, Math.min(upcoming - now + 50, MAX_WAIT));
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };

    tick();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", tick);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", tick);
    };
  }, [instructor]);

  return win;
}
