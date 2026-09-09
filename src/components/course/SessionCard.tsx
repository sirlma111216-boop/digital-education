import { Link } from "react-router-dom";
import type { SessionMeta } from "@/types/content";
import { sessionRouteParam } from "@/content/sessions";
import { categoryLabel } from "@/data/courseConfig";
import { useProgress } from "@/hooks/useProgress";

/**
 * locked: 학생·비로그인에게 잠긴 차시 → 흐린 잠금 카드(이동 불가, 요약·키워드 숨김).
 * lockedBadge: 교수자 뷰에서 비공개 차시 → 열린 카드에 "비공개" 배지만.
 */
export function SessionCard({
  session,
  locked = false,
  lockedBadge = false,
}: {
  session: SessionMeta;
  locked?: boolean;
  lockedBadge?: boolean;
}) {
  const { isBookmarked } = useProgress();
  const marked = isBookmarked(session.id);

  if (locked) {
    return (
      <div className="card-canvas session-card session-card--locked" aria-disabled="true">
        <div className="session-card__top">
          <span className="badge badge-outline">{session.id}차시</span>
          <span className="session-card__lock" aria-hidden="true">🔒</span>
        </div>
        <h3 className="session-card__title">{session.title}</h3>
        <p className="session-card__summary muted">아직 공개되지 않았습니다.</p>
      </div>
    );
  }

  return (
    <Link
      to={`/course/${sessionRouteParam(session)}`}
      className="card-canvas card-link session-card"
    >
      <div className="session-card__top">
        <span className="badge badge-outline">{session.id}차시</span>
        <span className="session-card__cat">
          {lockedBadge && <span className="badge badge-amber session-card__hidden-badge">비공개</span>}
          {categoryLabel(session.category)}
        </span>
      </div>

      <h3 className="session-card__title">{session.title}</h3>
      <p className="session-card__summary muted">{session.summary}</p>

      <div className="session-card__meta">
        <span>약 {session.duration}분</span>
        <span aria-hidden="true">·</span>
        <span>{session.level}</span>
        <span aria-hidden="true">·</span>
        <span>
          이론 {session.theoryRatio} / 실습 {session.practiceRatio}
        </span>
      </div>

      <div className="session-card__keywords">
        {session.keywords.slice(0, 4).map((k) => (
          <span key={k} className="badge">
            {k}
          </span>
        ))}
      </div>

      <div className="session-card__status">
        {marked && <span className="status-chip status-chip--mark">★ 북마크</span>}
      </div>
    </Link>
  );
}
