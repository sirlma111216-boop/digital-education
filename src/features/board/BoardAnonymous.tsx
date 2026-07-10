import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, toFriendlyError } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { AnonymousPost, PostStatus } from "@/types/board";
import { Loading, ErrorState, EmptyState, NotConfigured, NeedLogin } from "./states";

const PAGE_SIZE = 8;

function randomLabel(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `익명-${n}`;
}

export function BoardAnonymous() {
  const { user, role } = useAuth();
  const isInstructor = role === "instructor";
  const [posts, setPosts] = useState<AnonymousPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [page, setPage] = useState(0);

  const load = useCallback(async () => {
    setError(null);
    // 교수자는 기반 테이블(숨김 포함), 학생/게스트는 author_id 없는 공개 뷰
    const source = isInstructor ? "anonymous_posts" : "anonymous_posts_public";
    const { data, error } = await supabase
      .from(source)
      .select("*")
      .order("created_at", { ascending: sort === "old" });
    if (error) setError(toFriendlyError(error));
    else setPosts((data ?? []) as AnonymousPost[]);
  }, [isInstructor, sort]);

  useEffect(() => {
    if (isSupabaseConfigured) void load();
  }, [load]);

  if (!isSupabaseConfigured) return <NotConfigured />;

  const filtered = (posts ?? []).filter(
    (p) => !query || p.title.includes(query) || p.body.includes(query),
  );
  const pageItems = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  return (
    <div className="board-panel">
      <div className="board-panel__head">
        <div>
          <h2 className="display-sm">익명 질문 · 자유 게시판</h2>
          <p className="muted">
            다른 수강생에게는 익명으로 표시됩니다. 안전한 수업 운영을 위해 교수자는 필요한 경우
            작성자를 확인할 수 있습니다. 개인정보와 타인을 특정할 수 있는 내용은 작성하지 마세요.
          </p>
        </div>
      </div>

      {user ? (
        <NewPostForm authorId={user.id} onCreated={load} />
      ) : (
        <NeedLogin action="글 작성" />
      )}

      <div className="board-panel__head anon-controls">
        <input
          className="input"
          type="search"
          placeholder="제목·내용 검색"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
          aria-label="게시글 검색"
        />
        <select className="select anon-sort" value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")}>
          <option value="new">최신순</option>
          <option value="old">오래된순</option>
        </select>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !posts ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <EmptyState>아직 게시글이 없습니다. 첫 질문을 남겨 보세요.</EmptyState>
      ) : (
        <>
          <ul className="post-list">
            {pageItems.map((p) => (
              <PostItem
                key={p.id}
                post={p}
                userId={user?.id ?? null}
                isInstructor={isInstructor}
                onChanged={load}
              />
            ))}
          </ul>
          {totalPages > 1 && (
            <div className="pager">
              <button className="btn btn-secondary btn-sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
                이전
              </button>
              <span className="muted">{page + 1} / {totalPages}</span>
              <button
                className="btn btn-secondary btn-sm"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const STATUS_LABEL: Record<PostStatus, string> = { open: "질문", answered: "답변 완료", closed: "종료" };

function PostItem({
  post,
  userId,
  isInstructor,
  onChanged,
}: {
  post: AnonymousPost;
  userId: string | null;
  isInstructor: boolean;
  onChanged: () => void;
}) {
  const [open, setOpen] = useState(false);

  async function setStatus(status: PostStatus) {
    await supabase.from("anonymous_posts").update({ status }).eq("id", post.id);
    onChanged();
  }
  async function toggleHidden() {
    await supabase.from("anonymous_posts").update({ is_hidden: !post.is_hidden }).eq("id", post.id);
    onChanged();
  }
  async function remove() {
    if (!confirm("이 글을 삭제할까요?")) return;
    await supabase.from("anonymous_posts").delete().eq("id", post.id);
    onChanged();
  }
  async function report() {
    if (!userId) return;
    const reason = prompt("신고 사유를 입력해 주세요.");
    if (!reason) return;
    await supabase.from("reports").insert({
      reporter_id: userId,
      target_type: "post",
      target_id: post.id,
      reason,
    });
    alert("신고가 접수되었습니다.");
  }

  return (
    <li className={`post-item card-canvas ${post.is_hidden ? "is-hidden" : ""}`}>
      <div className="post-item__head">
        <span className="post-item__label">{post.anonymous_label}</span>
        <span className={`badge ${post.status === "answered" ? "badge-teal" : "badge-outline"}`}>
          {STATUS_LABEL[post.status]}
        </span>
        {post.is_hidden && <span className="badge badge-amber">숨김</span>}
        <span className="muted post-item__date">{new Date(post.created_at).toLocaleString("ko-KR")}</span>
      </div>
      <h3 className="post-item__title">{post.title}</h3>
      <p className="post-item__body">{post.body}</p>

      <div className="post-item__actions">
        <button className="btn btn-secondary btn-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "댓글 접기" : "댓글 보기 / 쓰기"}
        </button>
        {userId && (
          <button className="linkish post-item__report" onClick={report}>신고</button>
        )}
        {isInstructor && (
          <span className="post-item__admin">
            <button className="btn btn-secondary btn-sm" onClick={() => setStatus("answered")}>답변완료</button>
            <button className="btn btn-secondary btn-sm" onClick={toggleHidden}>{post.is_hidden ? "숨김 해제" : "숨기기"}</button>
            <button className="btn btn-secondary btn-sm danger" onClick={remove}>삭제</button>
          </span>
        )}
      </div>

      {open && <Comments postId={post.id} userId={userId} isInstructor={isInstructor} />}
    </li>
  );
}

interface PublicComment {
  id: string;
  post_id: string;
  anonymous_label: string;
  body: string;
  is_instructor_reply: boolean;
  created_at: string;
}

function Comments({
  postId,
  userId,
  isInstructor,
}: {
  postId: string;
  userId: string | null;
  isInstructor: boolean;
}) {
  const [comments, setComments] = useState<PublicComment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("anonymous_comments_public")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) setError(toFriendlyError(error));
    else setComments((data ?? []) as PublicComment[]);
  }, [postId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !body.trim()) return;
    setBusy(true);
    await supabase.from("anonymous_comments").insert({
      post_id: postId,
      author_id: userId,
      anonymous_label: isInstructor ? "교수자" : randomLabel(),
      body: body.trim(),
      is_instructor_reply: isInstructor,
    });
    // 첫 교수자 답변 시 상태를 answered 로
    if (isInstructor) await supabase.from("anonymous_posts").update({ status: "answered" }).eq("id", postId);
    setBody("");
    setBusy(false);
    void load();
  }

  return (
    <div className="comments">
      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !comments ? (
        <Loading label="댓글 불러오는 중…" />
      ) : comments.length === 0 ? (
        <p className="muted comments__empty">아직 댓글이 없습니다.</p>
      ) : (
        <ul className="comments__list">
          {comments.map((c) => (
            <li key={c.id} className={`comment ${c.is_instructor_reply ? "comment--instructor" : ""}`}>
              <span className="comment__label">
                {c.is_instructor_reply ? "👩‍🏫 교수자" : c.anonymous_label}
              </span>
              <p className="comment__body">{c.body}</p>
              <span className="muted comment__date">{new Date(c.created_at).toLocaleString("ko-KR")}</span>
            </li>
          ))}
        </ul>
      )}

      {userId ? (
        <form onSubmit={submit} className="comment-form">
          <textarea
            className="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={isInstructor ? "교수자 답변을 남깁니다." : "댓글을 남깁니다. (익명 표시)"}
            aria-label="댓글 입력"
          />
          <button className="btn btn-primary btn-sm" disabled={busy || !body.trim()} type="submit">
            {busy ? "등록 중…" : "댓글 등록"}
          </button>
        </form>
      ) : (
        <NeedLogin action="댓글 작성" />
      )}
    </div>
  );
}

function NewPostForm({ authorId, onCreated }: { authorId: string; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [ack, setAck] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !body.trim()) return setError("제목과 내용을 입력해 주세요.");
    if (!ack) return setError("공개 범위 안내를 확인해 주세요.");
    setBusy(true);
    const { error } = await supabase.from("anonymous_posts").insert({
      author_id: authorId,
      anonymous_label: randomLabel(),
      title: title.trim(),
      body: body.trim(),
    });
    setBusy(false);
    if (error) return setError(toFriendlyError(error));
    setTitle("");
    setBody("");
    setAck(false);
    setOpen(false);
    onCreated();
  }

  return (
    <div className="board-form card">
      <button className="btn btn-primary btn-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {open ? "작성 취소" : "＋ 새 글 작성"}
      </button>
      {open && (
        <form onSubmit={submit} className="stack">
          <div className="field">
            <label className="label" htmlFor="p-title">제목</label>
            <input id="p-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="p-body">내용</label>
            <textarea id="p-body" className="textarea" value={body} onChange={(e) => setBody(e.target.value)} />
            <p className="field-hint">욕설·개인정보·타인을 특정할 수 있는 내용은 작성하지 마세요.</p>
          </div>
          <label className="check">
            <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
            <span>다른 수강생에게는 익명으로 표시되며, 교수자는 필요 시 작성자를 확인할 수 있음을 이해했습니다.</span>
          </label>
          {error && <p className="field-error" role="alert">⚠ {error}</p>}
          <button className="btn btn-primary" disabled={busy} type="submit">
            {busy ? "등록 중…" : "질문 등록"}
          </button>
        </form>
      )}
    </div>
  );
}
