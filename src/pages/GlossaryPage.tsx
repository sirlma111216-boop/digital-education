import { useMemo, useState } from "react";
import { glossary, glossaryCategories, type GlossaryCategory } from "@/data/glossary";

export function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<GlossaryCategory | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary
      .filter((t) => {
        const catOk = cat === "all" || t.category === cat;
        const qOk =
          !q ||
          t.term.toLowerCase().includes(q) ||
          (t.ko?.toLowerCase().includes(q) ?? false) ||
          t.definition.toLowerCase().includes(q);
        return catOk && qOk;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, cat]);

  return (
    <div className="section">
      <div className="container narrow">
        <div className="page-head">
          <p className="eyebrow">Glossary · 용어 사전</p>
          <h1 className="display-lg">용어 사전</h1>
          <p className="lead">디지털 교육에서 자주 만나는 용어를 한국어·영어와 함께 정리했습니다.</p>
        </div>

        <div className="course-controls">
          <input
            className="input course-controls__search"
            type="search"
            placeholder="용어 검색 (예: TPACK, 데이터 소양)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="용어 검색"
          />
        </div>

        <div className="tabs" role="group" aria-label="분류 필터">
          <button className="tab" aria-pressed={cat === "all"} onClick={() => setCat("all")}>전체</button>
          {glossaryCategories.map((c) => (
            <button key={c} className="tab" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        <p className="muted course-count">{filtered.length}개 용어</p>

        {filtered.length === 0 ? (
          <div className="empty-state">검색 결과가 없습니다.</div>
        ) : (
          <dl className="glossary-list">
            {filtered.map((t) => (
              <div key={t.term} className="glossary-list__item card-canvas">
                <dt>
                  <span className="glossary-list__term">{t.term}</span>
                  {t.ko && <span className="glossary-list__ko">{t.ko}</span>}
                  <span className="badge badge-outline glossary-list__cat">{t.category}</span>
                </dt>
                <dd>{t.definition}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
