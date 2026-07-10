import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured, toFriendlyError } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Ms365Registration } from "@/types/board";
import { Loading, ErrorState, NotConfigured, NeedLogin } from "./states";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BoardMs365() {
  const { user, role } = useAuth();
  if (!isSupabaseConfigured) return <NotConfigured />;
  if (!user) return <NeedLogin action="계정 등록" />;

  return (
    <div className="board-panel">
      <div className="board-panel__head">
        <div>
          <h2 className="display-sm">MS365 계정 등록</h2>
          <p className="muted">
            학교용 Microsoft 365 계정을 교수자에게 제출하는 <strong>비공개 등록</strong>입니다. 입력한
            정보는 다른 학생에게 공개되지 않습니다.
          </p>
        </div>
      </div>

      <div className="alert alert-info board-state">
        입력한 MS365 계정 주소는 수업용 Microsoft 365 환경 구성과 계정 확인을 위해서만 사용되며,
        다른 학생에게 공개되지 않습니다.
      </div>

      {role === "instructor" ? <InstructorList /> : <StudentRegistration userId={user.id} />}
    </div>
  );
}

/* ---------- 학생: 본인 등록/수정 ---------- */
function StudentRegistration({ userId }: { userId: string }) {
  const [reg, setReg] = useState<Ms365Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentNumber, setStudentNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("ms365_registrations")
      .select("*")
      .eq("student_id", userId)
      .maybeSingle();
    if (data) {
      const r = data as Ms365Registration;
      setReg(r);
      setStudentNumber(r.student_number);
      setStudentName(r.student_name);
      setEmail(r.ms365_email);
      setEmailConfirm(r.ms365_email);
      setNote(r.note ?? "");
      setConsent(true);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    if (!studentNumber.trim() || !studentName.trim()) return setError("학번과 이름을 입력해 주세요.");
    if (!EMAIL_RE.test(email)) return setError("올바른 이메일 형식이 아닙니다.");
    if (email !== emailConfirm) return setError("확인용 이메일이 일치하지 않습니다.");
    if (!consent) return setError("개인정보 이용 안내에 동의해 주세요.");

    setBusy(true);
    const { error } = await supabase.from("ms365_registrations").upsert(
      {
        student_id: userId,
        student_number: studentNumber.trim(),
        student_name: studentName.trim(),
        ms365_email: email.trim().toLowerCase(),
        note: note.trim() || null,
      },
      { onConflict: "student_id" },
    );
    setBusy(false);
    if (error) {
      setError(toFriendlyError(error));
      return;
    }
    setMsg("등록 정보가 저장되었습니다.");
    void load();
  }

  if (loading) return <Loading />;

  return (
    <form onSubmit={submit} className="card stack ms365-form">
      {reg && <span className="status-chip status-chip--done">등록 완료 — 아래에서 수정할 수 있습니다</span>}
      <div className="form-row">
        <div className="field">
          <label className="label" htmlFor="sn">학번 / 수강생 번호</label>
          <input id="sn" className="input" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
        </div>
        <div className="field">
          <label className="label" htmlFor="name">이름</label>
          <input id="name" className="input" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="ms-email">MS365 계정 이메일</label>
        <input id="ms-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@school.edu" />
      </div>
      <div className="field">
        <label className="label" htmlFor="ms-email2">확인용 이메일 재입력</label>
        <input id="ms-email2" className="input" type="email" value={emailConfirm} onChange={(e) => setEmailConfirm(e.target.value)} />
      </div>
      <div className="field">
        <label className="label" htmlFor="note">비고 (선택)</label>
        <input id="note" className="input" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <label className="check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>개인정보 이용 안내를 확인했으며, 수업용 계정 확인 목적의 수집에 동의합니다.</span>
      </label>
      {error && <p className="field-error" role="alert">⚠ {error}</p>}
      {msg && <p className="alert alert-success" role="status">{msg}</p>}
      <button className="btn btn-primary" disabled={busy} type="submit">
        {busy ? "저장 중…" : reg ? "등록 정보 수정" : "등록하기"}
      </button>
    </form>
  );
}

/* ---------- 교수자: 전체 목록 ---------- */
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const shown = local.slice(0, 2);
  return `${shown}${"*".repeat(Math.max(1, local.length - 2))}@${domain}`;
}

function InstructorList() {
  const [rows, setRows] = useState<Ms365Registration[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [masked, setMasked] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    const { data, error } = await supabase
      .from("ms365_registrations")
      .select("*")
      .order("student_number", { ascending: true });
    if (error) setError(toFriendlyError(error));
    else setRows((data ?? []) as Ms365Registration[]);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function exportCsv() {
    if (!rows) return;
    const header = ["student_number", "student_name", "ms365_email", "note", "consented_at"];
    const csv = [header, ...rows.map((r) => [r.student_number, r.student_name, r.ms365_email, r.note ?? "", r.consented_at])]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ms365-registrations.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!rows) return <Loading />;

  const filtered = rows.filter(
    (r) =>
      !query ||
      r.student_name.includes(query) ||
      r.student_number.includes(query) ||
      r.ms365_email.includes(query),
  );

  return (
    <div className="stack">
      <div className="board-panel__head ms365-admin-head">
        <input
          className="input"
          type="search"
          placeholder="이름·학번·이메일 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="등록 검색"
        />
        <div className="ms365-admin-actions">
          <label className="check">
            <input type="checkbox" checked={masked} onChange={(e) => setMasked(e.target.checked)} /> 이메일 마스킹
          </label>
          <button className="btn btn-secondary btn-sm" onClick={exportCsv} disabled={rows.length === 0}>CSV 내보내기</button>
        </div>
      </div>
      <p className="muted">등록 {rows.length}명</p>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr><th>학번</th><th>이름</th><th>MS365 이메일</th><th>비고</th></tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.student_number}</td>
                <td>{r.student_name}</td>
                <td className="mono-cell">{masked ? maskEmail(r.ms365_email) : r.ms365_email}</td>
                <td>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted ms365-retention">
        강의 종료 후에는 등록 데이터를 삭제할 수 있습니다. 삭제는 Supabase 관리 콘솔 또는 관리
        스크립트로 수행하세요. (README의 ‘학기 종료 후 정리’ 참고)
      </p>
    </div>
  );
}
