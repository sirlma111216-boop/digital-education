import { useCallback, useEffect, useState } from "react";
import { isFirebaseConfigured, toFriendlyError } from "@/lib/firebase";
import { fmtDateTime } from "@/lib/time";
import { useAuth } from "@/hooks/useAuth";
import type { Notice, Visibility } from "@/types/board";
import { Markdown } from "@/components/common/Markdown";
import { createNotice, deleteNotice, listNotices, updateNotice } from "./api";
import { Loading, ErrorState, EmptyState, NotConfigured, NeedLogin } from "./states";

/** 공지 목록 + (교수자) 작성/고정/삭제. 게시판 탭과 교수자 화면이 함께 재사용. */
export function BoardNotices() {
  const { user, role } = useAuth();
  const isInstructor = role === "instructor";
  const [notices, setNotices] = useState<Notice[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setNotices(await listNotices());
    } catch (e) {
      setError(toFriendlyError(e));
    }
  }, []);

  useEffect(() => {
    if (isFirebaseConfigured && user) void load();
  }, [load, user]);

  if (!isFirebaseConfigured) return <NotConfigured />;
  if (!user) return <NeedLogin action="공지 확인" />;

  return (
    <div className="board-panel">
      <div className="board-panel__head">
        <div>
          <h2 className="display-sm">공지사항</h2>
          <p className="muted">교수자가 작성한 공지입니다. 중요한 공지는 상단에 고정됩니다.</p>
        </div>
      </div>

      {isInstructor && user && <NoticeForm authorId={user.uid} onCreated={load} />}

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
                  {n.isPinned && <span className="badge badge-coral">고정</span>}
                  <span className="badge badge-outline">
                    {n.visibility === "public" ? "전체 공개" : "수강생 공개"}
                  </span>
                </div>
                <span className="muted">{fmtDateTime(n.createdAt)}</span>
              </div>
              <h3 className="notice-item__title">{n.title}</h3>
              <Markdown>{n.body}</Markdown>
              {isInstructor && (
                <div className="notice-item__admin">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={async () => {
                      await updateNotice(n.id, { isPinned: !n.isPinned });
                      void load();
                    }}
                  >
                    {n.isPinned ? "고정 해제" : "상단 고정"}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm danger"
                    onClick={async () => {
                      if (!confirm("이 공지를 삭제할까요?")) return;
                      await deleteNotice(n.id);
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
    try {
      await createNotice({ title: title.trim(), body: body.trim(), isPinned: pinned, visibility, authorId });
      setTitle("");
      setBody("");
      setPinned(false);
      setOpen(false);
      onCreated();
    } catch (err) {
      setError(toFriendlyError(err));
    } finally {
      setBusy(false);
    }
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
