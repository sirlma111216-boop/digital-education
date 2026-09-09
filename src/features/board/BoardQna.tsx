/* 실명 Q&A 게시판. 비밀글(작성자·교수자만), 답변대기/답변완료, 교수자 답변·숨김·삭제. */
import { useCallback, useEffect, useState } from "react";
import { isFirebaseConfigured, toFriendlyError } from "@/lib/firebase";
import { fmtDateTime } from "@/lib/time";
import { useAuth } from "@/hooks/useAuth";
import type { QnaAnswer, QnaQuestion } from "@/types/board";
import {
  addInstructorAnswer,
  createQuestion,
  deleteQuestion,
  listAllQuestions,
  listAnswers,
  listQuestionsForStudent,
  updateQuestion,
} from "./api";
import { Loading, ErrorState, EmptyState, NotConfigured, NeedLogin, NeedOnboarding } from "./states";

const PAGE = 8;

export function BoardQna() {
  const { user, role, needsOnboarding, profile } = useAuth();
  const isInstructor = role === "instructor";
  const [questions, setQuestions] = useState<QnaQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const load = useCallback(async () => {
    setError(null);
    try {
      setQuestions(isInstructor ? await listAllQuestions() : await listQuestionsForStudent(user?.uid ?? null));
    } catch (e) {
      setError(toFriendlyError(e));
    }
  }, [isInstructor, user]);

  useEffect(() => {
    if (isFirebaseConfigured) void load();
  }, [load]);

  if (!isFirebaseConfigured) return <NotConfigured />;

  const filtered = (questions ?? []).filter(
    (q) => !query || q.title.includes(query) || q.body.includes(query),
  );
  const pageItems = filtered.slice(page * PAGE, page * PAGE + PAGE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));

  return (
    <div className="board-panel">
      <div className="board-panel__head">
        <div>
          <h2 className="display-sm">Q&amp;A</h2>
          <p className="muted">
            수업 관련 질문을 실명으로 남기고 교수자의 답변을 받습니다. 공개하기 어려운 내용은
            <strong> 비밀글</strong>로 올리면 작성자와 교수자만 볼 수 있습니다.
          </p>
        </div>
      </div>

      {!user ? (
        <NeedLogin action="질문 작성" />
      ) : needsOnboarding ? (
        <NeedOnboarding />
      ) : (
        <NewQuestionForm
          authorId={user.uid}
          authorName={profile?.displayName ?? "수강생"}
          onCreated={load}
        />
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
          aria-label="질문 검색"
        />
      </div>

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !questions ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <EmptyState>아직 질문이 없습니다. 첫 질문을 남겨 보세요.</EmptyState>
      ) : (
        <>
          <ul className="post-list">
            {pageItems.map((q) => (
              <QuestionItem key={q.id} q={q} onChanged={load} />
            ))}
          </ul>
          {totalPages > 1 && (
            <div className="pager">
              <button className="btn btn-secondary btn-sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>이전</button>
              <span className="muted">{page + 1} / {totalPages}</span>
              <button className="btn btn-secondary btn-sm" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>다음</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function QuestionItem({ q, onChanged }: { q: QnaQuestion; onChanged: () => void }) {
  const { user, role } = useAuth();
  const isInstructor = role === "instructor";
  const isOwner = user?.uid === q.authorId;
  const [open, setOpen] = useState(false);

  async function toggleHidden() {
    await updateQuestion(q.id, { isHidden: !q.isHidden });
    onChanged();
  }
  async function remove() {
    if (!confirm("이 질문을 삭제할까요?")) return;
    await deleteQuestion(q.id);
    onChanged();
  }
  async function togglePrivate() {
    await updateQuestion(q.id, { isPrivate: !q.isPrivate });
    onChanged();
  }

  return (
    <li className={`post-item card-canvas ${q.isHidden ? "is-hidden" : ""}`}>
      <div className="post-item__head">
        <span className="post-item__label">{q.authorName}</span>
        <span className={`badge ${q.status === "answered" ? "badge-teal" : "badge-outline"}`}>
          {q.status === "answered" ? "답변완료" : "답변대기"}
        </span>
        {q.isPrivate && <span className="badge badge-amber">비밀글</span>}
        {q.isHidden && <span className="badge badge-outline">숨김</span>}
        <span className="muted post-item__date">{fmtDateTime(q.createdAt)}</span>
      </div>
      <h3 className="post-item__title">{q.title}</h3>
      <p className="post-item__body">{q.body}</p>

      <div className="post-item__actions">
        <button className="btn btn-secondary btn-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "답변 접기" : `답변 보기${q.answerCount ? ` (${q.answerCount})` : ""}`}
        </button>
        {isOwner && !isInstructor && (
          <>
            <button className="linkish" onClick={togglePrivate}>{q.isPrivate ? "공개로 전환" : "비밀글로 전환"}</button>
            <button className="linkish" onClick={remove}>삭제</button>
          </>
        )}
        {isInstructor && (
          <span className="post-item__admin">
            <button className="btn btn-secondary btn-sm" onClick={toggleHidden}>{q.isHidden ? "숨김 해제" : "숨기기"}</button>
            <button className="btn btn-secondary btn-sm danger" onClick={remove}>삭제</button>
          </span>
        )}
      </div>

      {open && <Answers qid={q.id} onAnswered={onChanged} />}
    </li>
  );
}

function Answers({ qid, onAnswered }: { qid: string; onAnswered: () => void }) {
  const { user, role, profile } = useAuth();
  const isInstructor = role === "instructor";
  const [answers, setAnswers] = useState<QnaAnswer[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setAnswers(await listAnswers(qid));
    } catch (e) {
      setError(toFriendlyError(e));
    }
  }, [qid]);

  useEffect(() => {
    void load();
  }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !body.trim()) return;
    setBusy(true);
    try {
      await addInstructorAnswer(qid, {
        authorId: user.uid,
        authorName: profile?.displayName ?? "교수자",
        body: body.trim(),
      });
      setBody("");
      await load();
      onAnswered();
    } catch (err) {
      setError(toFriendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="comments">
      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !answers ? (
        <Loading label="답변 불러오는 중…" />
      ) : answers.length === 0 ? (
        <p className="muted comments__empty">아직 답변이 없습니다.</p>
      ) : (
        <ul className="comments__list">
          {answers.map((a) => (
            <li key={a.id} className={`comment ${a.isInstructor ? "comment--instructor" : ""}`}>
              <span className="comment__label">
                {a.isInstructor ? "👩‍🏫 교수자" : a.authorName}
              </span>
              <p className="comment__body">{a.body}</p>
              <span className="muted comment__date">{fmtDateTime(a.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}

      {isInstructor && (
        <form onSubmit={submit} className="comment-form">
          <textarea
            className="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="교수자 답변을 남깁니다."
            aria-label="답변 입력"
          />
          <button className="btn btn-primary btn-sm" disabled={busy || !body.trim()} type="submit">
            {busy ? "등록 중…" : "답변 등록"}
          </button>
        </form>
      )}
    </div>
  );
}

function NewQuestionForm({
  authorId,
  authorName,
  onCreated,
}: {
  authorId: string;
  authorName: string;
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !body.trim()) return setError("제목과 내용을 입력해 주세요.");
    setBusy(true);
    try {
      await createQuestion({ authorId, authorName, title: title.trim(), body: body.trim(), isPrivate });
      setTitle("");
      setBody("");
      setIsPrivate(false);
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
        {open ? "작성 취소" : "＋ 질문하기"}
      </button>
      {open && (
        <form onSubmit={submit} className="stack">
          <div className="field">
            <label className="label" htmlFor="q-title">제목</label>
            <input id="q-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="field">
            <label className="label" htmlFor="q-body">내용</label>
            <textarea id="q-body" className="textarea" value={body} onChange={(e) => setBody(e.target.value)} />
            <p className="field-hint">실명({authorName})으로 등록됩니다.</p>
          </div>
          <label className="check">
            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
            <span>비밀글로 올리기 (작성자와 교수자만 볼 수 있습니다)</span>
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
