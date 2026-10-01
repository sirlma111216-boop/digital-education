/* ==========================================================================
   메타버스 교수학습 설계 모형 — 단계별로 완성되는 그림 (3차시).
   그림은 이미지가 아니라 SVG로 직접 그린다. 각 조각(piece)은 등장하는 단계(step)를
   가지며, 현재 단계까지의 조각만 보이고 이번 단계에 새로 나온 조각은 강조된다.
   넓은 화면용(가로)과 좁은 화면용(세로) 배치를 따로 두고 CSS로 하나만 보여 준다.
   설명 문구는 차시 파일(session03.ts)의 steps 에서 받는다.
   ========================================================================== */

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { FigureStep } from "@/types/content";
import { Markdown } from "@/components/common/Markdown";

interface Label {
  x: number;
  y: number;
  text: string;
  size: number;
  tone: "name" | "tag";
  anchor: "start" | "middle" | "end";
  /** 선 위에 겹치는 글자는 배경색 테두리로 읽기 쉽게. */
  halo?: boolean;
}

type Shape =
  | { kind: "doc"; x: number; y: number; w: number; h: number; dx: number; dy: number }
  | { kind: "box"; x: number; y: number; w: number; h: number; r: number }
  | { kind: "cylinder"; cx: number; top: number; bottom: number; rx: number; ry: number }
  | { kind: "arrow"; d: string }
  | { kind: "frame"; x: number; y: number; w: number; h: number; r: number };

interface Piece {
  step: number;
  shape?: Shape;
  labels?: Label[];
}

interface Layout {
  key: "wide" | "tall";
  width: number;
  height: number;
  pieces: Piece[];
}

const name = (x: number, y: number, text: string, size: number, anchor: Label["anchor"] = "middle"): Label => ({
  x, y, text, size, tone: "name", anchor,
});
const tag = (
  x: number, y: number, text: string, size: number,
  anchor: Label["anchor"] = "middle", halo = false,
): Label => ({ x, y, text, size, tone: "tag", anchor, halo });

/* 넓은 화면: 교실(왼쪽) · 데이터와 AI 튜터(가운데) · 가정(오른쪽) */
const WIDE: Layout = {
  key: "wide",
  width: 1000,
  height: 660,
  pieces: [
    // 1. 미래형 교실 공간
    {
      step: 1,
      shape: { kind: "doc", x: 150, y: 150, w: 200, h: 140, dx: -14, dy: -14 },
      labels: [name(250, 207, "교실 공간", 28), tag(250, 242, "# 새로운 교사상", 17), tag(250, 265, "# 새로운 학교상", 17)],
    },
    // 2. 교사·학생의 디지털 리터러시
    { step: 2, shape: { kind: "arrow", d: "M 60 324 V 232 Q 60 210 82 210 H 114" } },
    {
      step: 2,
      labels: [
        name(24, 346, "교사·학생의", 20, "start"),
        name(24, 372, "디지털 리터러시", 20, "start"),
        tag(24, 400, "# SW·AI 교육", 16, "start"),
        tag(24, 423, "# 디지털 교육 내용", 16, "start"),
        tag(24, 446, "# 디지털 교육 방법", 16, "start"),
      ],
    },
    // 3. 1인 1디바이스
    { step: 3, shape: { kind: "arrow", d: "M 250 312 V 456" } },
    {
      step: 3,
      shape: { kind: "box", x: 150, y: 465, w: 200, h: 80, r: 16 },
      labels: [name(250, 500, "1인 1디바이스", 22), tag(250, 529, "# 디지털 교육환경 구축", 15)],
    },
    // 4. 학습 데이터 → 인공지능 튜터
    { step: 4, shape: { kind: "arrow", d: "M 350 505 H 420 Q 450 505 450 475 V 440" } },
    {
      step: 4,
      shape: { kind: "cylinder", cx: 500, top: 300, bottom: 410, rx: 105, ry: 22 },
      labels: [name(500, 364, "학습 데이터", 24), tag(500, 393, "# 데이터 표준", 16)],
    },
    { step: 4, shape: { kind: "arrow", d: "M 500 274 V 234" } },
    { step: 4, shape: { kind: "box", x: 410, y: 165, w: 180, h: 60, r: 6 }, labels: [name(500, 204, "인공지능 튜터", 24)] },
    // 5. 인공지능 튜터 → 가정
    { step: 5, shape: { kind: "arrow", d: "M 550 160 V 110 Q 550 82 578 82 H 730 Q 758 82 758 110 V 116" } },
    { step: 5, labels: [tag(500, 54, "# 개인별 맞춤형 교육", 19)] },
    {
      step: 5,
      shape: { kind: "doc", x: 650, y: 150, w: 200, h: 140, dx: 14, dy: -14 },
      labels: [name(750, 207, "가정", 28), tag(750, 242, "# 새로운 교사상", 17), tag(750, 265, "# 새로운 학교상", 17)],
    },
    // 6. 가정에서도 디지털 리터러시
    { step: 6, shape: { kind: "arrow", d: "M 940 324 V 232 Q 940 210 918 210 H 886" } },
    {
      step: 6,
      labels: [
        name(976, 346, "교사·학생의", 20, "end"),
        name(976, 372, "디지털 리터러시", 20, "end"),
        tag(976, 400, "# SW·AI 교육", 16, "end"),
        tag(976, 423, "# 디지털 교육 내용", 16, "end"),
        tag(976, 446, "# 디지털 교육 방법", 16, "end"),
      ],
    },
    // 7. 가정의 1인 1디바이스 → 학습 데이터
    { step: 7, shape: { kind: "arrow", d: "M 750 312 V 456" } },
    { step: 7, shape: { kind: "box", x: 650, y: 465, w: 200, h: 80, r: 16 }, labels: [name(750, 513, "1인 1디바이스", 22)] },
    { step: 7, shape: { kind: "arrow", d: "M 650 505 H 580 Q 550 505 550 475 V 440" } },
    // 8. 교실로 돌아가 순환 완성 + 메타버스
    { step: 8, shape: { kind: "frame", x: 8, y: 16, w: 984, h: 604, r: 36 } },
    { step: 8, shape: { kind: "arrow", d: "M 450 160 V 110 Q 450 82 422 82 H 270 Q 242 82 242 110 V 116" } },
    { step: 8, shape: { kind: "box", x: 420, y: 594, w: 160, h: 52, r: 14 }, labels: [name(500, 629, "메타버스", 24)] },
    {
      step: 8,
      labels: [tag(596, 616, "# 학교 공간의 확장", 16, "start", true), tag(596, 640, "# 2022 개정 교육과정", 16, "start", true)],
    },
  ],
};

/* 좁은 화면: 교실(위) · 데이터와 AI 튜터(가운데) · 가정(아래)로 세로 배치 */
const TALL: Layout = {
  key: "tall",
  width: 420,
  height: 726,
  pieces: [
    {
      step: 1,
      shape: { kind: "doc", x: 30, y: 128, w: 160, h: 104, dx: -8, dy: -8 },
      labels: [name(110, 166, "교실 공간", 20), tag(110, 188, "# 새로운 교사상", 13.5), tag(110, 206, "# 새로운 학교상", 13.5)],
    },
    { step: 2, shape: { kind: "arrow", d: "M 100 80 V 104" } },
    {
      step: 2,
      labels: [
        name(24, 28, "교사·학생의 디지털 리터러시", 17, "start"),
        tag(24, 50, "# SW·AI 교육   # 디지털 교육 내용", 13.5, "start"),
        tag(24, 70, "# 디지털 교육 방법", 13.5, "start"),
      ],
    },
    { step: 3, shape: { kind: "arrow", d: "M 198 180 H 238" } },
    {
      step: 3,
      shape: { kind: "box", x: 248, y: 142, w: 160, h: 76, r: 14 },
      labels: [name(328, 176, "1인 1디바이스", 18), tag(328, 200, "# 디지털 교육환경 구축", 12.5)],
    },
    { step: 4, shape: { kind: "arrow", d: "M 328 224 V 266" } },
    {
      step: 4,
      shape: { kind: "cylinder", cx: 328, top: 290, bottom: 352, rx: 72, ry: 15 },
      labels: [name(328, 328, "학습 데이터", 18), tag(328, 349, "# 데이터 표준", 12.5)],
    },
    { step: 4, shape: { kind: "arrow", d: "M 252 320 H 200" } },
    { step: 4, shape: { kind: "box", x: 30, y: 292, w: 160, h: 56, r: 6 }, labels: [name(110, 327, "인공지능 튜터", 18)] },
    { step: 5, shape: { kind: "arrow", d: "M 110 354 V 392" } },
    { step: 5, labels: [tag(122, 382, "# 개인별 맞춤형 교육", 13.5, "start", true)] },
    {
      step: 5,
      shape: { kind: "doc", x: 30, y: 420, w: 160, h: 104, dx: -8, dy: -8 },
      labels: [name(110, 458, "가정", 20), tag(110, 480, "# 새로운 교사상", 13.5), tag(110, 498, "# 새로운 학교상", 13.5)],
    },
    { step: 6, shape: { kind: "arrow", d: "M 100 584 V 548" } },
    {
      step: 6,
      labels: [
        name(24, 606, "교사·학생의 디지털 리터러시", 17, "start"),
        tag(24, 628, "# SW·AI 교육   # 디지털 교육 내용", 13.5, "start"),
        tag(24, 648, "# 디지털 교육 방법", 13.5, "start"),
      ],
    },
    { step: 7, shape: { kind: "arrow", d: "M 198 472 H 238" } },
    { step: 7, shape: { kind: "box", x: 248, y: 434, w: 160, h: 76, r: 14 }, labels: [name(328, 478, "1인 1디바이스", 18)] },
    { step: 7, shape: { kind: "arrow", d: "M 328 428 V 380" } },
    { step: 8, shape: { kind: "frame", x: 4, y: 4, w: 412, h: 668, r: 24 } },
    { step: 8, shape: { kind: "arrow", d: "M 110 286 V 246" } },
    { step: 8, shape: { kind: "box", x: 150, y: 650, w: 120, h: 44, r: 12 }, labels: [name(210, 679, "메타버스", 18)] },
    { step: 8, labels: [tag(210, 714, "# 학교 공간의 확장   # 2022 개정 교육과정", 13)] },
  ],
};

const TOTAL_STEPS = Math.max(...WIDE.pieces.map((p) => p.step));

/** 뒤 → 앞 순서: 점선 테두리, 화살표, 도형·글자. */
function layer(p: Piece): number {
  if (p.shape?.kind === "frame") return 0;
  if (p.shape?.kind === "arrow") return 1;
  return 2;
}

function ShapeView({ shape, markerId }: { shape: Shape; markerId: string }) {
  switch (shape.kind) {
    case "doc": {
      // 여러 장 겹친 문서: 뒤 두 장은 사각형, 맨 앞 장은 아래가 물결 모양.
      const { x, y, w, h, dx, dy } = shape;
      const k = Math.min(24, h * 0.17) / 24;
      const front = `M ${x} ${y} H ${x + w} V ${y + h} C ${x + w * 0.6} ${y + h + 28 * k}, ${x + w * 0.25} ${y + h - 30 * k}, ${x} ${y + h - 24 * k} Z`;
      return (
        <>
          <rect className="mm-shape" x={x + 2 * dx} y={y + 2 * dy} width={w} height={h} />
          <rect className="mm-shape" x={x + dx} y={y + dy} width={w} height={h} />
          <path className="mm-shape" d={front} />
        </>
      );
    }
    case "box":
      return <rect className="mm-shape" x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={shape.r} />;
    case "cylinder": {
      const { cx, top, bottom, rx, ry } = shape;
      return (
        <>
          <path className="mm-shape" d={`M ${cx - rx} ${top} V ${bottom} A ${rx} ${ry} 0 0 0 ${cx + rx} ${bottom} V ${top}`} />
          <ellipse className="mm-shape" cx={cx} cy={top} rx={rx} ry={ry} />
        </>
      );
    }
    case "arrow":
      return <path className="mm-arrow" d={shape.d} markerEnd={`url(#${markerId})`} />;
    case "frame":
      return <rect className="mm-frame" x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={shape.r} />;
  }
}

function Diagram({ layout, step, uid }: { layout: Layout; step: number; uid: string }) {
  const head = `${uid}-${layout.key}-head`;
  const headNew = `${head}-new`;
  const pieces = [...layout.pieces].sort((a, b) => layer(a) - layer(b));
  return (
    <svg
      className={`mm__svg mm__svg--${layout.key}`}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label={`메타버스 교수학습 설계 모형 그림, ${TOTAL_STEPS}단계 중 ${step}단계`}
    >
      <defs>
        {[head, headNew].map((id) => (
          <marker
            key={id}
            id={id}
            className={id === headNew ? "mm-head mm-head--new" : "mm-head"}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" />
          </marker>
        ))}
      </defs>
      {pieces.map((p, i) => {
        const shown = p.step <= step;
        const isNew = p.step === step;
        return (
          <g
            key={i}
            className={`mm-piece ${shown ? "is-shown" : ""} ${isNew ? "is-new" : ""}`}
            aria-hidden={!shown}
          >
            {p.shape && <ShapeView shape={p.shape} markerId={isNew ? headNew : head} />}
            {p.labels?.map((l, j) => (
              <text
                key={j}
                className={`mm-text mm-text--${l.tone} ${l.halo ? "mm-text--halo" : ""}`}
                x={l.x}
                y={l.y}
                fontSize={l.size}
                textAnchor={l.anchor}
              >
                {l.text}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function MetaverseModelFigure({ steps }: { steps: FigureStep[] }) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canFullscreen = typeof document !== "undefined" && Boolean(document.fullscreenEnabled);

  const go = useCallback((n: number) => setStep(Math.min(TOTAL_STEPS, Math.max(1, n))), []);

  useEffect(() => {
    const sync = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "PageDown") go(step + 1);
    else if (e.key === "ArrowLeft" || e.key === "PageUp") go(step - 1);
    else if (e.key === "Home") go(1);
    else if (e.key === "End") go(TOTAL_STEPS);
    else return;
    e.preventDefault();
  }

  const current = steps[step - 1];

  return (
    <figure ref={rootRef} className="mm" onKeyDown={onKeyDown}>
      <div className="mm__toolbar">
        <span className="mm__counter">
          STEP <strong>{step}</strong> / {TOTAL_STEPS}
        </span>
        {canFullscreen && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={toggleFullscreen}>
            {isFullscreen ? "전체 화면 닫기" : "⛶ 전체 화면"}
          </button>
        )}
      </div>

      <div className="mm__stage" tabIndex={0} aria-label="그림 영역 — 왼쪽·오른쪽 화살표 키로 단계를 이동합니다">
        <Diagram layout={WIDE} step={step} uid={uid} />
        <Diagram layout={TALL} step={step} uid={uid} />
      </div>

      <div className="mm__controls">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => go(step - 1)} disabled={step === 1}>
          ← 이전
        </button>
        <ol className="mm__dots" aria-label="단계 바로 가기">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <li key={i}>
              <button
                type="button"
                className={`mm__dot ${i + 1 <= step ? "is-done" : ""}`}
                aria-current={i + 1 === step ? "step" : undefined}
                aria-label={`${i + 1}단계${steps[i] ? `: ${steps[i].title}` : ""}`}
                onClick={() => go(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => go(step + 1)} disabled={step === TOTAL_STEPS}>
          다음 →
        </button>
      </div>

      {current && (
        <figcaption className="mm__step" aria-live="polite">
          <h4 className="mm__step-title">
            <span className="mm__step-no">{step}</span>
            {current.title}
          </h4>
          <Markdown>{current.body}</Markdown>
        </figcaption>
      )}
    </figure>
  );
}
