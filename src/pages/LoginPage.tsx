import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { isFirebaseConfigured } from "@/lib/firebase";

export function LoginPage() {
  const { user, needsOnboarding, signInWithGoogle } = useAuth();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (user) {
    return <Navigate to={needsOnboarding ? "/onboarding" : "/account"} replace />;
  }

  async function onGoogle() {
    setError(null);
    setBusy(true);
    const { error } = await signInWithGoogle();
    setBusy(false);
    if (error) setError(error);
    // 성공 시 onAuthStateChanged 가 갱신 → 위 Navigate 로 이동
  }

  return (
    <div className="section">
      <div className="container narrow center-block">
        <div className="page-head">
          <p className="eyebrow">Account · 로그인</p>
          <h1 className="display-md">로그인</h1>
          <p className="muted">수강생·교수 모두 구글 계정으로 로그인합니다.</p>
        </div>

        {!isFirebaseConfigured && (
          <div className="alert alert-info login-alert">
            아직 백엔드(Firebase)가 연결되지 않았습니다. <code>.env.local</code>에 키를 설정하면
            로그인·게시판 기능이 활성화됩니다. (README 참고)
          </div>
        )}

        <div className="auth-form card center-block">
          <button className="btn btn-primary btn-block" disabled={busy} onClick={onGoogle}>
            {busy ? "로그인 중…" : "구글 계정으로 로그인"}
          </button>
          {error && <p className="field-error" role="alert" style={{ marginTop: "var(--space-md)" }}>⚠ {error}</p>}
          {location.state && typeof location.state === "object" && "from" in location.state && (
            <p className="muted" style={{ marginTop: "var(--space-sm)" }}>
              로그인 후 이용하시던 화면으로 돌아갑니다.
            </p>
          )}
        </div>

        <p className="auth-note muted">
          ※ 교수자 권한은 로그인 화면에서 선택할 수 없습니다. 교수자 계정은 관리자가 별도로 지정합니다.
        </p>
      </div>
    </div>
  );
}
