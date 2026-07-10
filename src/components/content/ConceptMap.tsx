import type { ConceptNode } from "@/types/content";

/**
 * 개념 지도 — 외부 이미지를 쓰지 않고 CSS 노드 + 연결선으로 재구성.
 * 노드가 가로로 흐르며, 사이에 화살표(›)를 넣어 관계를 표현.
 */
export function ConceptMap({
  title,
  nodes,
  caption,
}: {
  title: string;
  nodes: ConceptNode[];
  caption?: string;
}) {
  return (
    <figure className="concept-map">
      <figcaption className="concept-map__title">{title}</figcaption>
      <div className="concept-map__flow" role="list">
        {nodes.map((n, i) => (
          <div key={n.label} className="concept-map__item" role="listitem">
            <div className="concept-map__node">
              <span className="concept-map__label">{n.label}</span>
              {n.description && (
                <span className="concept-map__desc">{n.description}</span>
              )}
            </div>
            {i < nodes.length - 1 && (
              <span className="concept-map__arrow" aria-hidden="true">
                ›
              </span>
            )}
          </div>
        ))}
      </div>
      {caption && <p className="concept-map__caption">{caption}</p>}
    </figure>
  );
}
