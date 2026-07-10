import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { allSessions, sessionRouteParam } from "@/content/sessions";
import { categories } from "@/data/courseConfig";
import type { CategoryId } from "@/types/content";
import { SessionCard } from "@/components/course/SessionCard";
import { useProgress } from "@/hooks/useProgress";

type View = "card" | "list";

export function CoursePage() {
  const [params, setParams] = useSearchParams();
  const activeCat = (params.get("category") as CategoryId | null) ?? "all";
  const query = params.get("q") ?? "";
  const [view, setView] = useState<View>("card");
  const { isCompleted } = useProgress();

  const filtered = useMemo(() => {
    return allSessions.filter((s) => {
      const catOk = activeCat === "all" || s.category === activeCat;
      const q = query.trim().toLowerCase();
      const qOk =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.toLowerCase().includes(q));
      return catOk && qOk;
    });
  }, [activeCat, query]);

  function setCat(cat: string) {
    const next = new URLSearchParams(params);
    if (cat === "all") next.delete("category");
    else next.set("category", cat);
    setParams(next, { replace: true });
  }
  function setQuery(q: string) {
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    else next.delete("q");
    setParams(next, { replace: true });
  }

  return (
    <div className="section">
      <div className="container">
        <div className="page-head">
          <p className="eyebrow">Course · 전체 과정</p>
          <h1 className="display-lg">15차시 전체 과정</h1>
          <p className="lead">
            디지털 교육의 이론에서 생성형 AI·바이브 코딩까지, 15차시를 순서대로 학습합니다.
            1~3차시는 이론 중심이며, 4~15차시에는 실습이 포함됩니다.
          </p>
        </div>

        {/* 검색 + 필터 + 뷰 전환 */}
        <div className="course-controls">
          <input
            className="input course-controls__search"
            type="search"
            placeholder="차시·키워드 검색 (예: 프롬프트, Teams)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="차시 검색"
          />
          <div className="view-toggle" role="group" aria-label="보기 방식">
            <button
              className={`tab ${view === "card" ? "" : ""}`}
              aria-pressed={view === "card"}
              onClick={() => setView("card")}
            >
              카드형
            </button>
            <button
              className="tab"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              목록형
            </button>
          </div>
        </div>

        <div className="tabs course-filter" role="tablist" aria-label="대분류 필터">
          <button
            role="tab"
            aria-selected={activeCat === "all"}
            className="tab"
            onClick={() => setCat("all")}
          >
            전체
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={activeCat === c.id}
              className="tab"
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="muted course-count">{filtered.length}개 차시</p>

        {filtered.length === 0 ? (
          <div className="empty-state">검색 결과가 없습니다. 다른 키워드로 시도해 보세요.</div>
        ) : view === "card" ? (
          <div className="grid grid-3">
            {filtered.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        ) : (
          <ul className="course-list">
            {filtered.map((s) => (
              <li key={s.id}>
                <Link to={`/course/${sessionRouteParam(s)}`} className="course-list__row card-canvas card-link">
                  <span className="badge badge-outline">{s.id}차시</span>
                  <div className="course-list__body">
                    <span className="course-list__title">{s.title}</span>
                    <span className="muted course-list__summary">{s.summary}</span>
                  </div>
                  <span className="course-list__meta muted">
                    {s.level} · {s.duration}분
                  </span>
                  {isCompleted(s.id) && <span className="status-chip status-chip--done">✓</span>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
