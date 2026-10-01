/* ==========================================================================
   TPACK 벤다이어그램 (3차시). 세 원(TK·PK·CK)이 겹쳐 만드는 7개 영역을 누르면
   오른쪽 설명이 바뀐다. 영역 설명 문구는 차시 파일(session03.ts)의 regions 에서 받는다.

   클릭 판정: SVG 의 mask 는 클릭 영역을 줄이지 못하지만 clip-path 는 줄인다.
   그래서 단일 영역(원 전체) → 두 원의 교집합(clip) → 세 원의 교집합 순서로
   위에 쌓아, 가장 좁은 영역이 클릭을 먼저 받도록 한다. 색칠은 mask 로 정확히 한다.
   ========================================================================== */

import { useId, useState, type ReactNode } from "react";
import type { TpackRegion, TpackRegionId } from "@/types/content";
import { Markdown } from "@/components/common/Markdown";

const R = 150;
const T = { cx: 300, cy: 190 };
const P = { cx: 215, cy: 335 };
const C = { cx: 385, cy: 335 };

const ORDER: TpackRegionId[] = ["TK", "PK", "CK", "TPK", "TCK", "PCK", "TPACK"];

/** 영역 이름 위치(그림 안). */
const LABELS: Record<TpackRegionId, { x: number; y: number; size: number; sub?: string }> = {
  TK: { x: 300, y: 104, size: 30, sub: "테크놀로지 지식" },
  PK: { x: 155, y: 402, size: 30, sub: "교수법 지식" },
  CK: { x: 445, y: 402, size: 30, sub: "내용 지식" },
  TPK: { x: 222, y: 254, size: 22 },
  TCK: { x: 378, y: 254, size: 22 },
  PCK: { x: 300, y: 410, size: 22 },
  TPACK: { x: 300, y: 301, size: 25 },
};

export function TpackFigure({ regions }: { regions: TpackRegion[] }) {
  const uid = useId().replace(/:/g, "");
  const [selected, setSelected] = useState<TpackRegionId>("TPACK");
  const byId = new Map(regions.map((r) => [r.id, r]));
  const current = byId.get(selected);

  const id = (s: string) => `${uid}-${s}`;
  const circle = (c: { cx: number; cy: number }, extra?: Record<string, string>) => (
    <circle cx={c.cx} cy={c.cy} r={R} {...extra} />
  );

  /** 영역 하나를 정확한 모양으로 그린다(클릭 판정은 위 주석 참고). */
  function regionShape(rid: TpackRegionId): ReactNode {
    switch (rid) {
      case "TK":
        return <g mask={`url(#${id("notP")})`}><g mask={`url(#${id("notC")})`}>{circle(T)}</g></g>;
      case "PK":
        return <g mask={`url(#${id("notT")})`}><g mask={`url(#${id("notC")})`}>{circle(P)}</g></g>;
      case "CK":
        return <g mask={`url(#${id("notT")})`}><g mask={`url(#${id("notP")})`}>{circle(C)}</g></g>;
      case "TPK":
        return <g mask={`url(#${id("notC")})`}>{circle(T, { clipPath: `url(#${id("inP")})` })}</g>;
      case "TCK":
        return <g mask={`url(#${id("notP")})`}>{circle(T, { clipPath: `url(#${id("inC")})` })}</g>;
      case "PCK":
        return <g mask={`url(#${id("notT")})`}>{circle(P, { clipPath: `url(#${id("inC")})` })}</g>;
      case "TPACK":
        return <g clipPath={`url(#${id("inP")})`}>{circle(T, { clipPath: `url(#${id("inC")})` })}</g>;
    }
  }

  return (
    <div className="tp">
      <div className="tp__figure">
        <svg
          className="tp__svg"
          viewBox="0 0 600 580"
          role="img"
          aria-label="TPACK 벤다이어그램: 테크놀로지 지식(TK), 교수법 지식(PK), 내용 지식(CK)이 겹쳐 TPK, TCK, PCK, 그리고 가운데 TPACK을 이룬다. 세 원을 맥락(Contexts)이 둘러싼다."
        >
          <defs>
            <clipPath id={id("inP")}>{circle(P)}</clipPath>
            <clipPath id={id("inC")}>{circle(C)}</clipPath>
            {(
              [
                ["notT", T],
                ["notP", P],
                ["notC", C],
              ] as const
            ).map(([key, c]) => (
              <mask key={key} id={id(key)} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="580">
                <rect width="600" height="580" fill="white" />
                {circle(c, { fill: "black" })}
              </mask>
            ))}
          </defs>

          {/* 맥락 */}
          <circle className="tp-context" cx={300} cy={290} r={268} />
          <text className="tp-context__label" x={300} y={540} textAnchor="middle">
            맥락 (Contexts)
          </text>

          {/* 세 원 */}
          <circle className="tp-circle tp-circle--t" cx={T.cx} cy={T.cy} r={R} />
          <circle className="tp-circle tp-circle--p" cx={P.cx} cy={P.cy} r={R} />
          <circle className="tp-circle tp-circle--c" cx={C.cx} cy={C.cy} r={R} />

          {/* 클릭 가능한 영역 (좁은 영역이 위로) */}
          {ORDER.map((rid) => (
            <g
              key={rid}
              className={`tp-region ${selected === rid ? "is-selected" : ""}`}
              onClick={() => setSelected(rid)}
            >
              {regionShape(rid)}
            </g>
          ))}

          {/* 원 테두리를 영역 색 위에 다시 그림 */}
          <g className="tp-outline">
            {circle(T)}
            {circle(P)}
            {circle(C)}
          </g>

          {/* 이름 */}
          {ORDER.map((rid) => {
            const l = LABELS[rid];
            return (
              <g key={rid} className={`tp-label ${selected === rid ? "is-selected" : ""}`}>
                <text x={l.x} y={l.y} fontSize={l.size} textAnchor="middle">
                  {rid}
                </text>
                {l.sub && (
                  <text className="tp-label__sub" x={l.x} y={l.y + 27} fontSize={18} textAnchor="middle">
                    {l.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="tp__side">
        <div className="tp__chips" role="group" aria-label="TPACK 영역 선택">
          {ORDER.map((rid) => (
            <button
              key={rid}
              type="button"
              className={`tp__chip tp__chip--${rid.toLowerCase()}`}
              aria-pressed={selected === rid}
              onClick={() => setSelected(rid)}
            >
              {rid}
            </button>
          ))}
        </div>

        {current && (
          <div className="tp__panel" aria-live="polite">
            <p className="tp__panel-id">{current.id}</p>
            <h4 className="tp__panel-title">{current.name}</h4>
            <p className="tp__panel-en">{current.en}</p>
            <Markdown>{current.body}</Markdown>
            {current.example && (
              <div className="tp__example">
                <p className="tp__example-label">수업 예시</p>
                <Markdown>{current.example}</Markdown>
              </div>
            )}
          </div>
        )}
        <p className="tp__hint muted">그림의 영역이나 위 버튼을 눌러 각 지식을 살펴보세요.</p>
      </div>
    </div>
  );
}
