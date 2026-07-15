import { Link } from "react-router-dom";
import type { Session } from "@/types/content";
import { sessionRouteParam } from "@/content/sessions";
import { categoryLabel } from "@/data/courseConfig";
import { useProgress } from "@/hooks/useProgress";

export function SessionCard({ session }: { session: Session }) {
  const { isBookmarked } = useProgress();
  const marked = isBookmarked(session.id);

  return (
    <Link
      to={`/course/${sessionRouteParam(session)}`}
      className="card-canvas card-link session-card"
    >
      <div className="session-card__top">
        <span className="badge badge-outline">{session.id}차시</span>
        <span className="session-card__cat">{categoryLabel(session.category)}</span>
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
