/* 홈 화면용 최근 공지 미리보기. 백엔드 미연결 시 조용히 안내만 표시. */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isFirebaseConfigured, toFriendlyError } from "@/lib/firebase";
import { fmtDate } from "@/lib/time";
import { useAuth } from "@/hooks/useAuth";
import type { Notice } from "@/types/board";
import { listRecentNotices } from "./api";
import { Loading, ErrorState } from "./states";

export function NoticesPreview({ limit = 3 }: { limit?: number }) {
  const { user } = useAuth();
  const [notices, setNotices] = useState<Notice[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !user) return;
    let alive = true;
    listRecentNotices(limit)
      .then((rows) => alive && setNotices(rows))
      .catch((e) => alive && setError(toFriendlyError(e)));
    return () => {
      alive = false;
    };
  }, [limit, user]);

  if (!isFirebaseConfigured) return <p className="muted">공지는 백엔드 연결 후 표시됩니다.</p>;
  if (!user)
    return (
      <p className="muted">
        공지는 로그인 후 확인할 수 있습니다. <Link to="/login" className="text-link">로그인 →</Link>
      </p>
    );
  if (error) return <ErrorState message={error} />;
  if (!notices) return <Loading />;
  if (notices.length === 0) return <p className="muted">아직 공지가 없습니다.</p>;

  return (
    <ul className="notice-preview">
      {notices.map((n) => (
        <li key={n.id} className="notice-preview__item card-canvas">
          <div className="notice-preview__head">
            {n.isPinned && <span className="badge badge-coral">고정</span>}
            <Link to="/board/notices" className="notice-preview__title">{n.title}</Link>
          </div>
          <span className="muted notice-preview__date">{fmtDate(n.createdAt)}</span>
        </li>
      ))}
    </ul>
  );
}
