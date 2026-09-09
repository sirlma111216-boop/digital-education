import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

/** 최초 로그인 온보딩: 표시명(실명) + 학번 입력 → profiles 에 저장. */
export function OnboardingPage() {
  const { user, profile, role, needsOnboarding, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(profile?.displayName ?? user?.displayName ?? "");
  const [studentNumber, setStudentNumber] = useState(profile?.studentNumber ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!user) return <Navigate to="/login" replace />;
  // 교수자이거나 이미 온보딩을 마쳤으면 계정 화면으로
  if (role === "instructor" || !needsOnboarding) return <Navigate to="/account" replace />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (displayName.trim().length < 1) return setError("표시명(실명)을 입력해 주세요.");
    if (studentNumber.trim().length < 1) return setError("학번을 입력해 주세요.");
    setBusy(true);
    const { error } = await completeOnboarding(displayName, studentNumber);
    setBusy(false);
    if (error) setError(error);
    else navigate("/account", { replace: true });
  }

  return (
    <div className="section">
      <div className="container narrow">
        <div className="page-head">
          <p className="eyebrow">Welcome · 정보 입력</p>
          <h1 className="display-md">처음 오셨네요 👋</h1>
          <p className="lead">
            수업 게시판을 이용하려면 표시명(실명)과 학번을 등록해 주세요. 이 정보는 다른 학생에게
            공개되지 않으며, 나중에 내 계정에서 수정할 수 있습니다.
          </p>
        </div>

        <form onSubmit={submit} className="auth-form card">
          <div className="field">
            <label className="label" htmlFor="ob-name">표시명(실명)</label>
            <input id="ob-name" className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} autoComplete="name" />
          </div>
          <div className="field">
            <label className="label" htmlFor="ob-sn">학번</label>
            <input id="ob-sn" className="input" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
          </div>
          {error && <p className="field-error" role="alert">⚠ {error}</p>}
          <button className="btn btn-primary btn-block" disabled={busy} type="submit">
            {busy ? "저장 중…" : "시작하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
