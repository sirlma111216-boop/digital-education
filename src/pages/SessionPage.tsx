import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getSessionByRouteParam, getPrevNext, sessionRouteParam } from "@/content/sessions";
import { categoryLabel } from "@/data/courseConfig";
import { useProgress } from "@/hooks/useProgress";
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

export function SessionPage() {
  const { param } = useParams();
  const session = param ? getSessionByRouteParam(param) : undefined;
  const { isBookmarked, toggleBookmarked, visit } = useProgress();

  useEffect(() => {
    if (session) visit(session.id);
  }, [session, visit]);

  if (!session) return <Navigate to="/course" replace />;

  const { prev, next } = getPrevNext(session.id);
  const marked = isBookmarked(session.id);

  return (
    <article className="session">
      {/* 헤더 */}
      <header className="session__header">
        <div className="container">
          <nav className="breadcrumb" aria-label="위치">
            <Link to="/course">전체 과정</Link>
            <span aria-hidden="true"> / </span>
            <span>{categoryLabel(session.category)}</span>
          </nav>
          <h1 className="display-lg">{session.title}</h1>
          <p className="lead">{session.summary}</p>
          <div className="session__actions">
            <button
              className={`btn ${marked ? "btn-secondary" : "btn-primary"}`}
              onClick={() => toggleBookmarked(session.id)}
              aria-pressed={marked}
            >
              {marked ? "★ 북마크됨" : "☆ 북마크"}
            </button>
          </div>
        </div>
      </header>

      <div className="container session__body">
        {/* 개요 */}
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

        {/* 본문 학습 */}
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

        {/* 비교표 / 사례 */}
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

        {/* 실습 (4~15차시) */}
        {session.practice && (
          <PracticeLabView sessionId={session.id} practice={session.practice} />
        )}

        {/* 이해 점검 */}
        <CheckpointQuiz items={session.quiz} />

        {session.cautions && session.cautions.length > 0 && (
          <CautionCallout items={session.cautions} />
        )}

        <GlossaryList terms={session.terms} />
        <SourceList items={session.sources} />

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
