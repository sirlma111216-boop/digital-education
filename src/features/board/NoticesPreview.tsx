/* 홈 화면용 최근 공지 미리보기. 백엔드 미연결 시 조용히 안내만 표시. */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, isSupabaseConfigured, toFriendlyError } from "@/lib/supabase";
import type { Notice } from "@/types/board";
import { Loading, ErrorState } from "./states";

export function NoticesPreview({ limit = 3 }: { limit?: number }) {
  const [notices, setNotices] = useState<Notice[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(limit);
      if (!alive) return;
      if (error) setError(toFriendlyError(error));
      else setNotices((data ?? []) as Notice[]);
    })();
    return () => {
      alive = false;
    };
  }, [limit]);

  if (!isSupabaseConfigured)
    return <p className="muted">공지는 백엔드 연결 후 표시됩니다.</p>;
  if (error) return <ErrorState message={error} />;
  if (!notices) return <Loading />;
  if (notices.length === 0) return <p className="muted">아직 공지가 없습니다.</p>;

  return (
    <ul className="notice-preview">
      {notices.map((n) => (
        <li key={n.id} className="notice-preview__item card-canvas">
          <div className="notice-preview__head">
            {n.is_pinned && <span className="badge badge-coral">고정</span>}
            <Link to="/board/notices" className="notice-preview__title">{n.title}</Link>
          </div>
          <span className="muted notice-preview__date">
            {new Date(n.created_at).toLocaleDateString("ko-KR")}
          </span>
        </li>
      ))}
    </ul>
  );
}
