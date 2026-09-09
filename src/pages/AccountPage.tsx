import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { getSessionById, sessionRouteParam } from "@/content/sessions";

export function AccountPage() {
  const { user, profile, role, loading, configured, updateMyProfile } = useAuth();
  const { state } = useProgress();
  const [displayName, setDisplayName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

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

  const bookmarks = Object.entries(state.bookmarked)
    .filter(([, v]) => v)
    .map(([id]) => getSessionById(id))
    .filter(Boolean);

  function startEdit() {
    setDisplayName(profile?.displayName ?? "");
    setStudentNumber(profile?.studentNumber ?? "");
    setMsg(null);
    setEditing(true);
  }

  async function save() {
    setBusy(true);
    const patch =
      role === "instructor"
        ? { displayName }
        : { displayName, studentNumber };
    const { error } = await updateMyProfile(patch);
    setBusy(false);
    if (error) setMsg("저장 실패: " + error);
    else {
      setMsg("저장되었습니다.");
      setEditing(false);
    }
  }

  return (
    <div className="section">
      <div className="container narrow">
        <div className="page-head">
          <p className="eyebrow">Account · 내 계정</p>
          <h1 className="display-lg">
            {profile?.displayName ?? user.email}
            {role === "instructor" && <span className="badge badge-coral account-role">교수자</span>}
          </h1>
          <p className="muted">{user.email}</p>
        </div>

        <div className="account-grid">
          <div className="card">
            <h2 className="title-md">내 정보</h2>
            {editing ? (
              <div className="stack">
                <div className="field">
                  <label className="label" htmlFor="ac-name">표시명(실명)</label>
                  <input id="ac-name" className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                {role !== "instructor" && (
                  <div className="field">
                    <label className="label" htmlFor="ac-sn">학번</label>
                    <input id="ac-sn" className="input" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
                  </div>
                )}
                <div className="account-links">
                  <button className="btn btn-primary btn-sm" disabled={busy} onClick={save}>{busy ? "저장 중…" : "저장"}</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>취소</button>
                </div>
              </div>
            ) : (
              <>
                <p className="muted">표시명: {profile?.displayName ?? "—"}</p>
                {role !== "instructor" && <p className="muted">학번: {profile?.studentNumber ?? "—"}</p>}
                <div className="account-links">
                  <button className="btn btn-secondary btn-sm" onClick={startEdit}>정보 수정</button>
                </div>
              </>
            )}
            {msg && <p className="muted" role="status">{msg}</p>}
          </div>

          <div className="card-canvas">
            <h2 className="title-md">수업 소통</h2>
            <ul className="contact-links">
              <li><Link to="/board/ms365-registration" className="text-link">MS365 계정 등록 →</Link></li>
              <li><Link to="/board/qna" className="text-link">Q&amp;A →</Link></li>
              <li><Link to="/board/notices" className="text-link">공지사항 →</Link></li>
              {role === "instructor" && (
                <li><Link to="/teacher" className="text-link">교수자 화면 →</Link></li>
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
