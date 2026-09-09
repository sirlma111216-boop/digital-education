import { useCallback, useEffect, useState } from "react";
import { toFriendlyError } from "@/lib/firebase";
import { fmtDate } from "@/lib/time";
import { useSessionVisibility } from "@/hooks/useSessionVisibility";
import { allSessions } from "@/content/sessions";
import type { Ms365Registration, Profile } from "@/types/board";
import { listMs365, listProfiles, setBlocked } from "@/features/board/api";
import { BoardNotices } from "@/features/board/BoardNotices";
import { BoardQna } from "@/features/board/BoardQna";
import { Loading, ErrorState } from "@/features/board/states";

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows
    .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }); // 한글 엑셀용 BOM
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function TeacherPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="page-head">
          <p className="eyebrow">Teacher · 교수자 화면</p>
          <h1 className="display-lg">교수자 화면</h1>
          <p className="muted">강의 공개 범위, 공지, MS365 등록 현황, Q&amp;A, 수강생 관리를 한 곳에서 처리합니다.</p>
        </div>

        <TeacherSection title="강의 공개 범위"><VisibilityManager /></TeacherSection>
        <TeacherSection title="공지 관리"><BoardNotices /></TeacherSection>
        <TeacherSection title="MS365 계정 등록 현황"><Ms365Admin /></TeacherSection>
        <TeacherSection title="Q&A 관리"><BoardQna /></TeacherSection>
        <TeacherSection title="수강생 관리"><Roster /></TeacherSection>
      </div>
    </div>
  );
}

function TeacherSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="teacher-section">
      <h2 className="display-sm teacher-section__title">{title}</h2>
      {children}
    </section>
  );
}

/* ---------------- 공개 범위 ---------------- */
function VisibilityManager() {
  const { isOpen, setOne, setAll, resetToFirstOnly } = useSessionVisibility();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function toggle(id: string, next: boolean) {
    setBusy(id);
    setError(null);
    const { error } = await setOne(id, next);
    if (error) setError(error);
    setBusy(null);
  }

  return (
    <div className="stack">
      <div className="teacher-actions">
        <button className="btn btn-secondary btn-sm" onClick={() => resetToFirstOnly()}>1강만 공개로 되돌리기</button>
        <button className="btn btn-secondary btn-sm" onClick={() => setAll(true)}>전체 공개</button>
      </div>
      {error && <ErrorState message={error} />}
      <ul className="vis-list">
        {allSessions.map((s) => {
          const open = isOpen(s.id);
          return (
            <li key={s.id} className="vis-row card-canvas">
              <span className="badge badge-outline">{s.id}차시</span>
              <span className="vis-row__title">{s.title}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={open}
                  disabled={busy === s.id}
                  onChange={(e) => toggle(s.id, e.target.checked)}
                />
                <span className={`switch__label ${open ? "is-on" : ""}`}>{open ? "공개" : "비공개"}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------- MS365 현황 ---------------- */
function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  return `${local.slice(0, 2)}${"*".repeat(Math.max(1, local.length - 2))}@${domain}`;
}

function Ms365Admin() {
  const [rows, setRows] = useState<Ms365Registration[] | null>(null);
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [masked, setMasked] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [regs, profs] = await Promise.all([listMs365(), listProfiles()]);
      setRows(regs);
      setProfiles(profs);
    } catch (e) {
      setError(toFriendlyError(e));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!rows || !profiles) return <Loading />;

  const registeredIds = new Set(rows.map((r) => r.id));
  const missing = profiles.filter((p) => p.role === "student" && !registeredIds.has(p.id));
  const filtered = rows.filter(
    (r) => !query || r.studentName.includes(query) || r.studentNumber.includes(query) || r.ms365Email.includes(query),
  );

  return (
    <div className="stack">
      <div className="board-panel__head ms365-admin-head">
        <input className="input" type="search" placeholder="이름·학번·이메일 검색" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="등록 검색" />
        <div className="ms365-admin-actions">
          <label className="check">
            <input type="checkbox" checked={masked} onChange={(e) => setMasked(e.target.checked)} /> 이메일 마스킹
          </label>
          <button className="btn btn-secondary btn-sm" disabled={rows.length === 0} onClick={() =>
            downloadCsv("ms365-registrations.csv", [
              ["학번", "이름", "MS365 이메일", "비고"],
              ...rows.map((r) => [r.studentNumber, r.studentName, r.ms365Email, r.note ?? ""]),
            ])}>CSV 내보내기</button>
        </div>
      </div>
      <p className="muted">등록 {rows.length}명 · 미등록 {missing.length}명</p>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>학번</th><th>이름</th><th>MS365 이메일</th><th>비고</th></tr></thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>{r.studentNumber}</td>
                <td>{r.studentName}</td>
                <td className="mono-cell">{masked ? maskEmail(r.ms365Email) : r.ms365Email}</td>
                <td>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="title-sm">미등록자 ({missing.length})</h3>
      {missing.length === 0 ? (
        <p className="muted">모든 수강생이 등록했습니다.</p>
      ) : (
        <ul className="chips">
          {missing.map((p) => (
            <li key={p.id} className="badge badge-amber">{p.displayName ?? p.email ?? p.id.slice(0, 6)}</li>
          ))}
        </ul>
      )}
      <p className="muted ms365-retention">
        강의 종료 후에는 등록 데이터를 삭제할 수 있습니다. 삭제는 Firebase 콘솔 또는 관리
        스크립트로 수행하세요. (README의 ‘학기 종료 후 정리’ 참고)
      </p>
    </div>
  );
}

/* ---------------- 수강생 목록 + 차단 ---------------- */
function Roster() {
  const [rows, setRows] = useState<Profile[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setRows(await listProfiles());
    } catch (e) {
      setError(toFriendlyError(e));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggleBlock(p: Profile) {
    setBusy(p.id);
    try {
      await setBlocked(p.id, !p.blocked);
      await load();
    } catch (e) {
      setError(toFriendlyError(e));
    } finally {
      setBusy(null);
    }
  }

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!rows) return <Loading />;

  return (
    <div className="stack">
      <div className="board-panel__head">
        <p className="muted">전체 {rows.length}명</p>
        <button className="btn btn-secondary btn-sm" onClick={() =>
          downloadCsv("roster.csv", [
            ["표시명", "이메일", "학번", "역할", "차단", "가입일"],
            ...rows.map((p) => [p.displayName ?? "", p.email ?? "", p.studentNumber ?? "", p.role, p.blocked ? "차단" : "", fmtDate(p.createdAt)]),
          ])}>CSV 내보내기</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>표시명</th><th>이메일</th><th>학번</th><th>역할</th><th>가입일</th><th>차단</th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className={p.blocked ? "is-blocked" : ""}>
                <td>{p.displayName ?? "—"}</td>
                <td className="mono-cell">{p.email}</td>
                <td>{p.studentNumber ?? "—"}</td>
                <td>{p.role === "instructor" ? "교수자" : "학생"}</td>
                <td>{fmtDate(p.createdAt)}</td>
                <td>
                  <button
                    className={`btn btn-sm ${p.blocked ? "btn-primary" : "btn-secondary danger"}`}
                    disabled={busy === p.id || p.role === "instructor"}
                    onClick={() => toggleBlock(p)}
                  >
                    {p.blocked ? "차단 해제" : "차단"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
