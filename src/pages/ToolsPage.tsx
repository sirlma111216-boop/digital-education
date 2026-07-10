import { useMemo, useState } from "react";
import { tools, toolPlatforms, toolPurposes, type ToolPlatform, type ToolPurpose } from "@/data/tools";

export function ToolsPage() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<ToolPlatform | "all">("all");
  const [purpose, setPurpose] = useState<ToolPurpose | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      const platOk = platform === "all" || t.platform === platform;
      const purpOk = purpose === "all" || t.purposes.includes(purpose);
      const qOk = !q || t.name.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q);
      return platOk && purpOk && qOk;
    });
  }, [query, platform, purpose]);

  return (
    <div className="section">
      <div className="container">
        <div className="page-head">
          <p className="eyebrow">Tools · 도구 사전</p>
          <h1 className="display-lg">도구 사전</h1>
          <p className="lead">
            빠르게 바뀌는 서비스 정보(가격·기능·라이선스)는 단정하지 않습니다. 각 카드의{" "}
            <strong>마지막 확인일</strong>과 <strong>공식 링크</strong>를 함께 확인하세요.
          </p>
        </div>

        <div className="course-controls">
          <input
            className="input course-controls__search"
            type="search"
            placeholder="도구 검색 (예: Kahoot, NotebookLM)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="도구 검색"
          />
        </div>

        <div className="filter-group">
          <div className="tabs" role="group" aria-label="플랫폼 필터">
            <button className="tab" aria-pressed={platform === "all"} onClick={() => setPlatform("all")}>전체 플랫폼</button>
            {toolPlatforms.map((p) => (
              <button key={p} className="tab" aria-pressed={platform === p} onClick={() => setPlatform(p)}>{p}</button>
            ))}
          </div>
          <div className="tabs" role="group" aria-label="목적 필터">
            <button className="tab" aria-pressed={purpose === "all"} onClick={() => setPurpose("all")}>전체 목적</button>
            {toolPurposes.map((p) => (
              <button key={p} className="tab" aria-pressed={purpose === p} onClick={() => setPurpose(p)}>{p}</button>
            ))}
          </div>
        </div>

        <p className="muted course-count">{filtered.length}개 도구</p>

        {filtered.length === 0 ? (
          <div className="empty-state">조건에 맞는 도구가 없습니다.</div>
        ) : (
          <div className="grid grid-3">
            {filtered.map((t) => {
              const open = openId === t.id;
              return (
                <div key={t.id} className="card tool-card">
                  <div className="tool-card__head">
                    <h3 className="title-md">{t.name}</h3>
                    <span className="badge badge-outline">{t.platform}</span>
                  </div>
                  <p className="muted tool-card__summary">{t.summary}</p>
                  <div className="tool-card__tags">
                    <span className="badge">{t.pricing}</span>
                    <span className="badge">{t.level}</span>
                    <span className="badge">{t.audience}</span>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm tool-card__toggle"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : t.id)}
                  >
                    {open ? "접기" : "자세히 보기"}
                  </button>

                  {open && (
                    <dl className="tool-card__detail">
                      <dt>장점</dt>
                      <dd><ul>{t.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></dd>
                      <dt>한계·주의점</dt>
                      <dd><ul>{t.limits.map((s, i) => <li key={i}>{s}</li>)}</ul></dd>
                      <dt>추천 상황</dt>
                      <dd>{t.recommendedFor}</dd>
                      <dt>비추천 상황</dt>
                      <dd>{t.notRecommendedFor}</dd>
                      <dt>계정·라이선스</dt>
                      <dd>{t.licenseNote}</dd>
                    </dl>
                  )}

                  <div className="tool-card__foot">
                    <a href={t.officialUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                      공식 링크 ↗
                    </a>
                    <span className="muted tool-card__verified">
                      확인: {t.lastVerified}{t.changeable ? " · 변경 가능" : ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
