/* ==========================================================================
   재사용 콘텐츠 블록 모음. 차시 상세 화면에서 조합해 사용.
   ========================================================================== */

import type {
  CaseStudy,
  CompareTable,
  ContentImage,
  KeyTerm,
  LearningObjective,
  SourceLink,
} from "@/types/content";
import { Markdown } from "@/components/common/Markdown";
import { ZoomableImage } from "./ZoomableImage";

/** 섹션 래퍼: eyebrow(작은 라벨) + 제목 + 내용. */
export function Block({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="block">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display-sm block__title">{title}</h2>
      {children}
    </section>
  );
}

export function LearningObjectives({ items }: { items: LearningObjective[] }) {
  return (
    <Block eyebrow="Learning Objectives" title="학습 목표">
      <ul className="objectives">
        {items.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ul>
    </Block>
  );
}

export function KeyQuestion({ text }: { text: string }) {
  return (
    <div className="key-question">
      <p className="eyebrow">Key Question · 핵심 질문</p>
      <p className="key-question__text">{text}</p>
    </div>
  );
}

export function TheoryCard({
  heading,
  body,
  images,
}: {
  heading: string;
  body: string;
  images?: ContentImage[];
}) {
  return (
    <article className="theory-card">
      <h3 className="theory-card__heading">{heading}</h3>
      <Markdown>{body}</Markdown>
      {images && images.length > 0 && (
        <div className="theory-card__figures">
          {images.map((img) => (
            <ZoomableImage key={img.src} image={img} />
          ))}
        </div>
      )}
    </article>
  );
}

export function CompareTableView({ table }: { table: CompareTable }) {
  return (
    <figure className="compare-table">
      <figcaption className="compare-table__caption">{table.caption}</figcaption>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {table.headers.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <th key={ci} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={ci}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function CaseStudyView({ item }: { item: CaseStudy }) {
  return (
    <article className="case-study">
      <p className="eyebrow">사례</p>
      <h3 className="case-study__title">{item.title}</h3>
      <Markdown>{item.body}</Markdown>
    </article>
  );
}

export function CautionCallout({ items }: { items: string[] }) {
  return (
    <aside className="caution" role="note">
      <p className="caution__label">⚠️ 유의 사항</p>
      <ul>
        {items.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </aside>
  );
}

export function ReflectionPrompt({ items }: { items: string[] }) {
  return (
    <Block eyebrow="Reflection · 성찰" title="성찰 질문">
      <ul className="reflection">
        {items.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </Block>
  );
}

export function GlossaryList({ terms }: { terms: KeyTerm[] }) {
  return (
    <Block eyebrow="Key Terms · 핵심 용어" title="핵심 용어">
      <dl className="term-list">
        {terms.map((t) => (
          <div key={t.term} className="term-list__item">
            <dt>
              {t.term}
              {t.en && <span className="term-list__en"> · {t.en}</span>}
            </dt>
            <dd>{t.definition}</dd>
          </div>
        ))}
      </dl>
    </Block>
  );
}

export function SourceList({ items }: { items: SourceLink[] }) {
  return (
    <Block eyebrow="Sources · 참고 자료" title="참고 자료">
      <ul className="source-list">
        {items.map((s, i) => (
          <li key={i}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ) : (
              <span>{s.label}</span>
            )}
            {s.note && <span className="source-list__note"> — {s.note}</span>}
            {s.lastVerified && (
              <span className="source-list__date"> (확인: {s.lastVerified})</span>
            )}
          </li>
        ))}
      </ul>
    </Block>
  );
}

/** 이미지·스크린샷 자리. 외부 핫링크 대신 명확한 플레이스홀더. */
export function AssetPlaceholder({ label }: { label: string }) {
  return (
    <div className="asset-placeholder" role="img" aria-label={`${label} (이미지 자리)`}>
      <span aria-hidden="true">🖼️</span>
      <span>{label}</span>
      <span className="asset-placeholder__hint">이미지 에셋 자리</span>
    </div>
  );
}
