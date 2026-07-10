import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { isSupabaseConfigured } from "@/lib/supabase";

type Mode = "signin" | "signup";

export function LoginPage() {
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (user) {
    // 이미 로그인됨
    navigate("/account", { replace: true });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) setError(error);
        else navigate("/account", { replace: true });
      } else {
        if (displayName.trim().length < 1) {
          setError("이름(표시명)을 입력해 주세요.");
          return;
        }
        const { error, needsConfirmation } = await signUp(email, password, displayName.trim());
        if (error) setError(error);
        else if (needsConfirmation)
          setInfo("확인 이메일을 보냈습니다. 메일의 링크를 눌러 가입을 완료해 주세요.");
        else navigate("/account", { replace: true });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="section">
      <div className="container narrow center-block">
        <div className="page-head">
          <p className="eyebrow">Account · 로그인</p>
          <h1 className="display-md">{mode === "signin" ? "로그인" : "회원가입"}</h1>
          <p className="muted">수강생 계정으로 게시판·과제·계정 등록을 이용할 수 있습니다.</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="alert alert-info login-alert">
            아직 백엔드(Supabase)가 연결되지 않았습니다. <code>.env.local</code>에 키를 설정하면
            로그인·게시판 기능이 활성화됩니다. (README 참고)
          </div>
        )}

        <form className="auth-form card" onSubmit={onSubmit}>
          {mode === "signup" && (
            <div className="field">
              <label className="label" htmlFor="name">이름(표시명)</label>
              <input
                id="name"
                className="input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}
          <div className="field">
            <label className="label" htmlFor="email">이메일</label>
            <input
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="password">비밀번호</label>
            <input
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              minLength={6}
              required
            />
          </div>

          {error && <p className="field-error" role="alert">⚠ {error}</p>}
          {info && <p className="alert alert-success" role="status">{info}</p>}

          <button className="btn btn-primary btn-block" disabled={busy} type="submit">
            {busy ? "처리 중…" : mode === "signin" ? "로그인" : "회원가입"}
          </button>
        </form>

        <p className="auth-switch muted">
          {mode === "signin" ? (
            <>계정이 없나요? <button className="linkish" onClick={() => setMode("signup")}>회원가입</button></>
          ) : (
            <>이미 계정이 있나요? <button className="linkish" onClick={() => setMode("signin")}>로그인</button></>
          )}
        </p>
        <p className="auth-note muted">
          ※ 교수자 권한은 회원가입에서 선택할 수 없습니다. 교수자 계정은 관리자가 별도로 지정합니다.
          자세한 방법은 <Link to="/about" className="text-link">README/About</Link>를 참고하세요.
        </p>
      </div>
    </div>
  );
}
