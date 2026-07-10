import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { allSessions, getSessionById, sessionRouteParam } from "@/content/sessions";

export function AccountPage() {
  const { user, profile, role, loading, configured } = useAuth();
  const { state, rate } = useProgress();

  if (configured && loading) {
    return (
      <div className="section">
        <div className="container narrow loading-block">
          <span className="spinner" aria-hidden="true" /> 불러오는 중…
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const percent = rate(allSessions.length);
  const completedCount = Object.values(state.completed).filter(Boolean).length;
  const bookmarks = Object.entries(state.bookmarked)
    .filter(([, v]) => v)
    .map(([id]) => getSessionById(id))
    .filter(Boolean);

  return (
    <div className="section">
      <div className="container narrow">
        <div className="page-head">
          <p className="eyebrow">Account · 내 계정</p>
          <h1 className="display-lg">
            {profile?.display_name ?? user.email}
            {role === "instructor" && <span className="badge badge-coral account-role">교수자</span>}
          </h1>
          <p className="muted">{user.email}</p>
        </div>

        <div className="grid grid-2 account-grid">
          <div className="card">
            <h2 className="title-md">학습 진행</h2>
            <div className="account-progress">
              <div className="hero__progress-row">
                <span className="muted">전체 진행률</span>
                <strong>{percent}% ({completedCount}/{allSessions.length})</strong>
              </div>
              <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${percent}%` }} />
              </div>
            </div>
            <div className="account-links">
              <Link to="/course" className="text-link">이어서 학습하기 →</Link>
            </div>
          </div>

          <div className="card-canvas">
            <h2 className="title-md">수업 소통</h2>
            <ul className="contact-links">
              <li><Link to="/board/ms365-registration" className="text-link">MS365 계정 등록 →</Link></li>
              <li><Link to="/board/assignments" className="text-link">과제 확인·제출 →</Link></li>
              <li><Link to="/board/anonymous" className="text-link">익명 질문 →</Link></li>
              {role === "instructor" && (
                <li><Link to="/board/notices" className="text-link">공지 작성(교수자) →</Link></li>
              )}
            </ul>
          </div>
        </div>

        <section className="account-bookmarks">
          <h2 className="display-sm">북마크한 차시</h2>
          {bookmarks.length === 0 ? (
            <p className="muted">아직 북마크한 차시가 없습니다. 차시 화면에서 ☆ 북마크를 눌러 보세요.</p>
          ) : (
            <ul className="course-list">
              {bookmarks.map(
                (s) =>
                  s && (
                    <li key={s.id}>
                      <Link to={`/course/${sessionRouteParam(s)}`} className="course-list__row card-canvas card-link">
                        <span className="badge badge-outline">{s.id}차시</span>
                        <div className="course-list__body">
                          <span className="course-list__title">{s.title}</span>
                        </div>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
