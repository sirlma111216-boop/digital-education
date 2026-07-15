import { Link } from "react-router-dom";
import { courseSchedule, formatScheduleDate } from "@/data/courseSchedule";
import { getSessionById, sessionRouteParam } from "@/content/sessions";

export function SchedulePage() {
  return (
    <div className="section">
      <div className="container">
        <div className="page-head">
          <p className="eyebrow">Schedule · 전체 일정</p>
          <h1 className="display-lg">15주 전체 일정</h1>
          <p className="lead">
            정확한 수업 날짜는 아직 확정되지 않았습니다. 날짜가 없는 주차는{" "}
            <strong>일정 추후 안내</strong>로 표시되며, 확정되면 일정이 갱신됩니다.
          </p>
        </div>

        <ol className="timeline">
          {courseSchedule.map((w) => {
            const s = getSessionById(w.sessionId);
            const undated = !w.date;
            return (
              <li key={w.week} className="timeline__item">
                <div className="timeline__marker" aria-hidden="true">
                  {w.week}
                </div>
                <div className="timeline__content card-canvas">
                  <div className="timeline__row">
                    <span className="timeline__week">{w.week}주차</span>
                    <span className={`badge ${undated ? "badge-outline" : "badge-teal"}`}>
                      {formatScheduleDate(w.date)}
                    </span>
                    {w.mode && <span className="badge badge-outline">{w.mode}</span>}
                  </div>
                  {s ? (
                    <Link to={`/course/${sessionRouteParam(s)}`} className="timeline__title">
                      {w.title}
                    </Link>
                  ) : (
                    <span className="timeline__title">{w.title}</span>
                  )}
                  {w.note && <p className="muted">{w.note}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
