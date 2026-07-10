import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, toFriendlyError } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Notice, Visibility } from "@/types/board";
import { Markdown } from "@/components/common/Markdown";
import { Loading, ErrorState, EmptyState, NotConfigured } from "./states";

export function BoardNotices() {
  const { user, role } = useAuth();
  const isInstructor = role === "instructor";
  const [notices, setNotices] = useState<Notice[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) setError(toFriendlyError(error));
    else setNotices((data ?? []) as Notice[]);
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured) void load();
  }, [load]);

  if (!isSupabaseConfigured) return <NotConfigured />;

  return (
    <div className="board-panel">
      <div className="board-panel__head">
        <div>
          <h2 className="display-sm">공지사항</h2>
          <p className="muted">교수자가 작성한 공지입니다. 중요한 공지는 상단에 고정됩니다.</p>
        </div>
      </div>

      {isInstructor && user && <NoticeForm authorId={user.id} onCreated={load} />}

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !notices ? (
        <Loading />
      ) : notices.length === 0 ? (
        <EmptyState>아직 등록된 공지가 없습니다.</EmptyState>
      ) : (
        <ul className="notice-list">
          {notices.map((n) => (
            <li key={n.id} className="notice-item card-canvas">
              <div className="notice-item__head">
                <div className="notice-item__badges">
                  {n.is_pinned && <span className="badge badge-coral">고정</span>}
                  <span className="badge badge-outline">
                    {n.visibility === "public" ? "전체 공개" : "수강생 공개"}
                  </span>
                </div>
                <span className="muted">{new Date(n.created_at).toLocaleString("ko-KR")}</span>
              </div>
              <h3 className="notice-item__title">{n.title}</h3>
              <Markdown>{n.body}</Markdown>
              {isInstructor && (
                <div className="notice-item__admin">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={async () => {
                      await supabase.from("notices").update({ is_pinned: !n.is_pinned }).eq("id", n.id);
                      void load();
                    }}
                  >
                    {n.is_pinned ? "고정 해제" : "상단 고정"}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm danger"
                    onClick={async () => {
                      if (!confirm("이 공지를 삭제할까요?")) return;
                      await supabase.from("notices").delete().eq("id", n.id);
                      void load();
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function NoticeForm({ authorId, onCreated }: { authorId: string; onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pinned, setPinned] = useState(false);
  const [visibility, setVisibility] = useState<Visibility>("authenticated");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("제목과 내용을 입력해 주세요.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await supabase.from("notices").insert({
      title: title.trim(),
      body: body.trim(),
      is_pinned: pinned,
      visibility,
      author_id: authorId,
    });
    setBusy(false);
    if (error) {
      setError(toFriendlyError(error));
      return;
    }
    setTitle("");
    setBody("");
    setPinned(false);
    setOpen(false);
    onCreated();
  }

  return (
    <div className="board-form card">
      <button className="btn btn-primary btn-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {open ? "작성 취소" : "＋ 새 공지 작성"}
      </button>
      {open && (
        <form onSubmit={submit} className="stack">
          <div className="field">
            <label className="label" htmlFor="n-title">제목</label>
            <input id="n-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="n-body">내용 (Markdown 지원)</label>
            <textarea id="n-body" className="textarea" value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="check">
              <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} /> 상단 고정
            </label>
            <div className="field">
              <label className="label" htmlFor="n-vis">공개 범위</label>
              <select id="n-vis" className="select" value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)}>
                <option value="authenticated">수강생만</option>
                <option value="public">전체 공개</option>
              </select>
            </div>
          </div>
          {error && <p className="field-error" role="alert">⚠ {error}</p>}
          <button className="btn btn-primary" disabled={busy} type="submit">
            {busy ? "등록 중…" : "공지 등록"}
          </button>
        </form>
      )}
    </div>
  );
}
