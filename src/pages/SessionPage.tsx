import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  getSessionMetaByRouteParam,
  sessionRouteParam,
  loadSession,
  allSessions,
} from "@/content/sessions";
import type { Session, SessionMeta } from "@/types/content";
import { categoryLabel } from "@/data/courseConfig";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { useSessionVisibility } from "@/hooks/useSessionVisibility";
import { ConceptMap } from "@/components/content/ConceptMap";
import { CheckpointQuiz } from "@/components/content/CheckpointQuiz";
import { PracticeLabView } from "@/components/content/PracticeLabView";
import {
  LearningObjectives,
  KeyQuestion,
  TheoryCard,
  CompareTableView,
  CaseStudyView,
  CautionCallout,
  GlossaryList,
  SourceList,
} from "@/components/content/blocks";

/** 교수자가 아니면 잠긴 차시를 건너뛰고 이전/다음을 계산. */
function neighbors(
  id: string,
  canSee: (m: SessionMeta) => boolean,
): { prev?: SessionMeta; next?: SessionMeta } {
  const visible = allSessions.filter(canSee);
  const idx = visible.findIndex((s) => s.id === id);
  if (idx === -1) return {};
  return { prev: visible[idx - 1], next: visible[idx + 1] };
}

export function SessionPage() {
  const { param } = useParams();
  const meta = param ? getSessionMetaByRouteParam(param) : undefined;
  const { isBookmarked, toggleBookmarked, visit } = useProgress();
  const { role } = useAuth();
  const { isOpen, loading: visLoading } = useSessionVisibility();
  const [session, setSession] = useState<Session | null>(null);
  const [loadError, setLoadError] = useState(false);

  const isInstructor = role === "instructor";
  const open = meta ? isOpen(meta.id) : false;
  const allowed = isInstructor || open;

  useEffect(() => {
    let alive = true;
    setSession(null);
    setLoadError(false);
    if (meta && allowed) {
      visit(meta.id);
      loadSession(meta.id)
        .then((s) => {
          if (alive) s ? setSession(s) : setLoadError(true);
        })
        .catch(() => alive && setLoadError(true));
    }
    return () => {
      alive = false;
    };
  }, [meta, allowed, visit]);

  if (!meta) return <Navigate to="/course" replace />;
  // 잠긴 차시 직접 접근 → 목록으로, 안내 표시
  if (!visLoading && !allowed)
    return <Navigate to="/course" replace state={{ lockedNotice: true }} />;

  const marked = isBookmarked(meta.id);
  const { prev, next } = neighbors(meta.id, (m) => isInstructor || isOpen(m.id));

  return (
    <article className="session">
      <header className="session__header">
        <div className="container">
          <nav className="breadcrumb" aria-label="위치">
            <Link to="/course">전체 과정</Link>
            <span aria-hidden="true"> / </span>
            <span>{categoryLabel(meta.category)}</span>
          </nav>
          <h1 className="display-lg">{meta.title}</h1>
          <p className="lead">{meta.summary}</p>
          <div className="session__actions">
            <button
              className={`btn ${marked ? "btn-secondary" : "btn-primary"}`}
              onClick={() => toggleBookmarked(meta.id)}
              aria-pressed={marked}
            >
              {marked ? "★ 북마크됨" : "☆ 북마크"}
            </button>
          </div>
        </div>
      </header>

      <div className="container session__body">
        {loadError ? (
          <div className="alert alert-error">차시 내용을 불러오지 못했습니다. 새로고침해 주세요.</div>
        ) : !session ? (
          <div className="loading-block">
            <span className="spinner" aria-hidden="true" /> 차시 내용을 불러오는 중…
          </div>
        ) : (
          <>
            <section className="block">
              <p className="eyebrow">Overview · 차시 개요</p>
              <p className="session__overview">{session.overview}</p>
            </section>

            <LearningObjectives items={session.objectives} />
            <KeyQuestion text={session.keyQuestion} />

            <section className="block">
              <p className="eyebrow">Concept Map · 개념 지도</p>
              <ConceptMap
                title={session.conceptMap.title}
                nodes={session.conceptMap.nodes}
                caption={session.conceptMap.caption}
              />
            </section>

            <section className="block">
              <p className="eyebrow">Study · 본문 학습</p>
              <div className="theory-stack">
                {session.theoryBlocks.map((b, i) => (
                  <TheoryCard
                    key={i}
                    heading={b.heading}
                    body={b.body}
                    images={b.images}
                    imageLayout={b.imageLayout}
                  />
                ))}
              </div>
            </section>

            {session.compareTables?.map((t, i) => (
              <section key={`ct-${i}`} className="block">
                <CompareTableView table={t} />
              </section>
            ))}
            {session.caseStudies?.map((c, i) => (
              <section key={`cs-${i}`} className="block">
                <CaseStudyView item={c} />
              </section>
            ))}

            {session.practice && (
              <PracticeLabView sessionId={session.id} practice={session.practice} />
            )}

            <CheckpointQuiz items={session.quiz} />

            {session.cautions && session.cautions.length > 0 && (
              <CautionCallout items={session.cautions} />
            )}

            <GlossaryList terms={session.terms} />
            <SourceList items={session.sources} />
          </>
        )}

        {/* 이전 / 다음 */}
        <nav className="session-nav" aria-label="차시 이동">
          {prev ? (
            <Link to={`/course/${sessionRouteParam(prev)}`} className="session-nav__link card-canvas card-link">
              <span className="muted">← 이전 차시</span>
              <span className="session-nav__title">{prev.id}. {prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/course/${sessionRouteParam(next)}`} className="session-nav__link session-nav__link--next card-canvas card-link">
              <span className="muted">다음 차시 →</span>
              <span className="session-nav__title">{next.id}. {next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
