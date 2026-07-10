/* 게시판 공통 상태 표시: 로딩 / 오류 / 빈 상태 / 백엔드 미연결 / 로그인 필요. */
import { Link } from "react-router-dom";

export function Loading({ label = "불러오는 중…" }: { label?: string }) {
  return (
    <div className="loading-block" role="status">
      <span className="spinner" aria-hidden="true" /> {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="alert alert-error board-state" role="alert">
      <p>⚠ {message}</p>
      {onRetry && (
        <button className="btn btn-secondary btn-sm" onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="empty-state board-state">{children}</div>;
}

export function NotConfigured() {
  return (
    <div className="alert alert-info board-state">
      <p>
        게시판은 백엔드(Supabase)에 연결되어야 동작합니다. <code>.env.local</code>에 키를 설정한 뒤
        새로고침해 주세요. 설정 방법은 README를 참고하세요.
      </p>
    </div>
  );
}

export function NeedLogin({ action = "이용" }: { action?: string }) {
  return (
    <div className="alert alert-info board-state">
      <p>
        이 기능을 {action}하려면 로그인이 필요합니다. <Link to="/login" className="text-link">로그인 / 회원가입 →</Link>
      </p>
    </div>
  );
}
