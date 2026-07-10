import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, toFriendlyError } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Assignment, AssignmentSubmission, SubmissionType } from "@/types/board";
import { allSessions } from "@/content/sessions";
import { Loading, ErrorState, EmptyState, NotConfigured, NeedLogin } from "./states";

export function BoardAssignments() {
  const { user, role } = useAuth();
  const isInstructor = role === "instructor";
  const [assignments, setAssignments] = useState<Assignment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const { data, error } = await supabase
      .from("assignments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(toFriendlyError(error));
    else setAssignments((data ?? []) as Assignment[]);
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured) void load();
  }, [load]);

  if (!isSupabaseConfigured) return <NotConfigured />;

  return (
    <div className="board-panel">
      <div className="board-panel__head">
        <div>
          <h2 className="display-sm">과제 안내 및 제출</h2>
          <p className="muted">
            과제 목록과 마감일을 확인하고, 허용된 방식으로 제출하세요. 다른 학생의 제출물은 볼 수 없습니다.
          </p>
        </div>
      </div>

      {isInstructor && user && <AssignmentForm authorId={user.id} onCreated={load} />}

      {error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !assignments ? (
        <Loading />
      ) : assignments.length === 0 ? (
        <EmptyState>아직 등록된 과제가 없습니다.</EmptyState>
      ) : (
        <ul className="assignment-list">
          {assignments.map((a) => (
            <AssignmentItem key={a.id} assignment={a} isInstructor={isInstructor} userId={user?.id ?? null} />
          ))}
        </ul>
      )}
    </div>
  );
}

function dueLabel(a: Assignment): string {
  if (!a.due_at) return "마감 미정";
  const d = new Date(a.due_at);
  const past = d.getTime() < Date.now();
  return `${d.toLocaleString("ko-KR")}${past ? " (마감됨)" : ""}`;
}

function AssignmentItem({
  assignment: a,
  isInstructor,
  userId,
}: {
  assignment: Assignment;
  isInstructor: boolean;
  userId: string | null;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li className="assignment-item card-canvas">
      <div className="assignment-item__head">
        <div>
          {a.session_id && <span className="badge badge-outline">{a.session_id}차시</span>}
          <h3 className="assignment-item__title">{a.title}</h3>
        </div>
        <span className="muted">{dueLabel(a)}</span>
      </div>
      <p className="muted">{a.description}</p>
      <div className="assignment-item__meta">
        <span className="badge">제출 방식: {submissionLabel(a.submission_type)}</span>
        {a.points != null && <span className="badge">배점 {a.points}</span>}
        {a.allow_late && <span className="badge badge-amber">지각 허용</span>}
      </div>

      <button className="btn btn-secondary btn-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {open ? "닫기" : isInstructor ? "제출 현황 보기" : "제출하기 / 내 제출 확인"}
      </button>

      {open &&
        (isInstructor ? (
          <InstructorSubmissions assignment={a} />
        ) : userId ? (
          <StudentSubmission assignment={a} userId={userId} />
        ) : (
          <NeedLogin action="제출" />
        ))}
    </li>
  );
}

function submissionLabel(t: SubmissionType): string {
  return { text: "텍스트 입력", url: "URL 제출", file: "파일 제출", external_lms: "외부 LMS" }[t];
}

/* ---------- 학생 제출 ---------- */
function StudentSubmission({ assignment: a, userId }: { assignment: Assignment; userId: string }) {
  const [sub, setSub] = useState<AssignmentSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("assignment_submissions")
      .select("*")
      .eq("assignment_id", a.id)
      .eq("student_id", userId)
      .maybeSingle();
    if (data) {
      const s = data as AssignmentSubmission;
      setSub(s);
      setText(s.text_content ?? "");
      setUrl(s.submitted_url ?? "");
    }
    setLoading(false);
  }, [a.id, userId]);

  useEffect(() => {
    void load();
  }, [load]);

  const pastDue = a.due_at ? new Date(a.due_at).getTime() < Date.now() : false;
  const locked = pastDue && !a.allow_late && !!sub;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMsg(null);
    try {
      let filePath = sub?.file_path ?? null;
      if (a.submission_type === "file" && file) {
        const path = `${userId}/${a.id}/${Date.now()}-${file.name}`;
        const { error: upErr } = await supabase.storage.from("assignments").upload(path, file, { upsert: true });
        if (upErr) throw upErr;
        filePath = path;
      }
      const payload = {
        assignment_id: a.id,
        student_id: userId,
        text_content: a.submission_type === "text" ? text : null,
        submitted_url: a.submission_type === "url" || a.submission_type === "external_lms" ? url : null,
        file_path: filePath,
        status: (pastDue ? "late" : sub ? "resubmitted" : "submitted") as AssignmentSubmission["status"],
      };
      const { error } = await supabase
        .from("assignment_submissions")
        .upsert(payload, { onConflict: "assignment_id,student_id" });
      if (error) throw error;
      setMsg("제출이 저장되었습니다.");
      await load();
    } catch (err) {
      setError(toFriendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="submission-box">
      {sub && (
        <div className="submission-status">
          <span className="status-chip status-chip--done">제출됨</span>
          <span className="muted">최근 수정 {new Date(sub.updated_at).toLocaleString("ko-KR")}</span>
          {sub.feedback && (
            <div className="alert alert-info submission-feedback">
              <strong>교수자 피드백</strong>
              <p>{sub.feedback}</p>
            </div>
          )}
        </div>
      )}

      {locked ? (
        <p className="muted">마감되어 수정할 수 없습니다.</p>
      ) : (
        <form onSubmit={submit} className="stack">
          {a.submission_type === "text" && (
            <div className="field">
              <label className="label">답안 (텍스트)</label>
              <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
          )}
          {(a.submission_type === "url" || a.submission_type === "external_lms") && (
            <div className="field">
              <label className="label">제출 URL</label>
              <input className="input" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
            </div>
          )}
          {a.submission_type === "file" && (
            <div className="field">
              <label className="label">파일 첨부</label>
              <input className="input" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
              {sub?.file_path && <p className="field-hint">기존 제출 파일이 있습니다. 새 파일을 올리면 교체됩니다.</p>}
            </div>
          )}
          {error && <p className="field-error" role="alert">⚠ {error}</p>}
          {msg && <p className="alert alert-success" role="status">{msg}</p>}
          <button className="btn btn-primary" disabled={busy} type="submit">
            {busy ? "제출 중…" : sub ? "제출 수정" : "제출하기"}
          </button>
        </form>
      )}
    </div>
  );
}

/* ---------- 교수자: 제출 현황 ---------- */
function InstructorSubmissions({ assignment: a }: { assignment: Assignment }) {
  const [subs, setSubs] = useState<AssignmentSubmission[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("assignment_submissions")
      .select("*")
      .eq("assignment_id", a.id)
      .order("submitted_at", { ascending: true });
    if (error) setError(toFriendlyError(error));
    else setSubs((data ?? []) as AssignmentSubmission[]);
  }, [a.id]);

  useEffect(() => {
    void load();
  }, [load]);

  function exportCsv() {
    if (!subs) return;
    const rows = [
      ["student_id", "status", "submitted_url", "file_path", "submitted_at", "text_content"],
      ...subs.map((s) => [
        s.student_id,
        s.status,
        s.submitted_url ?? "",
        s.file_path ?? "",
        s.submitted_at,
        (s.text_content ?? "").replace(/[\r\n]+/g, " "),
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `submissions-${a.id}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!subs) return <Loading />;

  return (
    <div className="submission-box">
      <div className="board-panel__head">
        <p className="muted">제출 {subs.length}건</p>
        <button className="btn btn-secondary btn-sm" onClick={exportCsv} disabled={subs.length === 0}>
          CSV 내보내기
        </button>
      </div>
      {subs.length === 0 ? (
        <EmptyState>아직 제출이 없습니다.</EmptyState>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>학생 ID</th>
                <th>상태</th>
                <th>내용/링크</th>
                <th>피드백</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <InstructorSubRow key={s.id} sub={s} onSaved={load} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function InstructorSubRow({ sub, onSaved }: { sub: AssignmentSubmission; onSaved: () => void }) {
  const [feedback, setFeedback] = useState(sub.feedback ?? "");
  const [busy, setBusy] = useState(false);

  async function saveFeedback() {
    setBusy(true);
    await supabase
      .from("assignment_submissions")
      .update({ feedback, status: "returned" })
      .eq("id", sub.id);
    setBusy(false);
    onSaved();
  }

  async function downloadFile() {
    if (!sub.file_path) return;
    const { data, error } = await supabase.storage.from("assignments").createSignedUrl(sub.file_path, 60);
    if (!error && data) window.open(data.signedUrl, "_blank", "noopener");
  }

  return (
    <tr>
      <td className="mono-cell">{sub.student_id.slice(0, 8)}…</td>
      <td>{sub.status}</td>
      <td>
        {sub.text_content && <p className="cell-text">{sub.text_content}</p>}
        {sub.submitted_url && (
          <a href={sub.submitted_url} target="_blank" rel="noopener noreferrer" className="text-link">링크 ↗</a>
        )}
        {sub.file_path && (
          <button className="btn btn-secondary btn-sm" onClick={downloadFile}>파일 다운로드</button>
        )}
      </td>
      <td>
        <textarea className="textarea feedback-input" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        <button className="btn btn-primary btn-sm" onClick={saveFeedback} disabled={busy}>
          {busy ? "저장 중…" : "피드백 저장"}
        </button>
      </td>
    </tr>
  );
}

/* ---------- 교수자: 과제 생성 ---------- */
function AssignmentForm({ authorId, onCreated }: { authorId: string; onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [type, setType] = useState<SubmissionType>("text");
  const [allowLate, setAllowLate] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("과제명을 입력해 주세요.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error } = await supabase.from("assignments").insert({
      title: title.trim(),
      description: description.trim(),
      session_id: sessionId || null,
      due_at: dueAt ? new Date(dueAt).toISOString() : null,
      submission_type: type,
      allow_late: allowLate,
      author_id: authorId,
    });
    setBusy(false);
    if (error) {
      setError(toFriendlyError(error));
      return;
    }
    setTitle("");
    setDescription("");
    setSessionId("");
    setDueAt("");
    setOpen(false);
    onCreated();
  }

  return (
    <div className="board-form card">
      <button className="btn btn-primary btn-sm" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {open ? "작성 취소" : "＋ 새 과제 등록"}
      </button>
      {open && (
        <form onSubmit={submit} className="stack">
          <div className="field">
            <label className="label">과제명</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="field">
            <label className="label">설명</label>
            <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-row">
            <div className="field">
              <label className="label">관련 차시</label>
              <select className="select" value={sessionId} onChange={(e) => setSessionId(e.target.value)}>
                <option value="">선택 안 함</option>
                {allSessions.map((s) => (
                  <option key={s.id} value={s.id}>{s.id}차시 · {s.title}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="label">마감일</label>
              <input className="input" type="datetime-local" value={dueAt} onChange={(e) => setDueAt(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label className="label">제출 방식</label>
              <select className="select" value={type} onChange={(e) => setType(e.target.value as SubmissionType)}>
                <option value="text">텍스트 입력</option>
                <option value="url">URL 제출</option>
                <option value="file">파일 제출</option>
                <option value="external_lms">외부 LMS</option>
              </select>
            </div>
            <label className="check assignment-late">
              <input type="checkbox" checked={allowLate} onChange={(e) => setAllowLate(e.target.checked)} /> 지각 제출 허용
            </label>
          </div>
          {error && <p className="field-error" role="alert">⚠ {error}</p>}
          <button className="btn btn-primary" disabled={busy} type="submit">
            {busy ? "등록 중…" : "과제 등록"}
          </button>
        </form>
      )}
    </div>
  );
}
