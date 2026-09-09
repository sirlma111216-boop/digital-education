import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

/**
 * 교수자 전용 라우트 가드. 화면 가드는 편의일 뿐이고,
 * 실제 차단은 Firestore 보안 규칙(firestore.rules)이 담당한다.
 */
export function RequireInstructor({ children }: { children: ReactNode }) {
  const { user, role, loading, configured } = useAuth();

  if (configured && loading) {
    return (
      <div className="section">
        <div className="container narrow loading-block">
          <span className="spinner" aria-hidden="true" /> 확인 중…
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (role !== "instructor") return <Navigate to="/" replace />;
  return <>{children}</>;
}
