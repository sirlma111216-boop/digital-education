import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { isFirebaseConfigured, toFriendlyError } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import type { Ms365Registration } from "@/types/board";
import { getMyMs365, upsertMs365 } from "./api";
import { Loading, NotConfigured, NeedLogin } from "./states";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCHOOL_DOMAIN = "@office.khu.ac.kr";

export function BoardMs365() {
  const { user, role } = useAuth();
  if (!isFirebaseConfigured) return <NotConfigured />;
  if (!user) return <NeedLogin action="계정 등록" />;

  return (
    <div className="board-panel">
      <div className="board-panel__head">
        <div>
          <h2 className="display-sm">MS365 계정 등록</h2>
          <p className="muted">
            6~10차시 수업에서 사용할 <strong>학교 Microsoft 365 계정</strong>을 등록하는 비공개 폼입니다.
            입력한 정보는 다른 학생에게 공개되지 않습니다.
          </p>
        </div>
      </div>

      <div className="alert alert-info board-state">
        입력한 MS365 계정 주소는 수업용 Microsoft 365 환경 구성과 계정 확인을 위해서만 사용되며,
        다른 학생에게 공개되지 않습니다.
      </div>

      {role === "instructor" ? (
        <div className="alert alert-info board-state">
          교수자는 <Link to="/teacher" className="text-link">교수자 화면</Link>에서 전체 등록 현황과
          미등록자를 확인할 수 있습니다.
        </div>
      ) : (
        <StudentRegistration uid={user.uid} />
      )}
    </div>
  );
}

function StudentRegistration({ uid }: { uid: string }) {
  const { profile } = useAuth();
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
    try {
      const r = await getMyMs365(uid);
      if (r) {
        setReg(r);
        setStudentNumber(r.studentNumber);
        setStudentName(r.studentName);
        setEmail(r.ms365Email);
        setEmailConfirm(r.ms365Email);
        setNote(r.note ?? "");
        setConsent(true);
      } else {
        // 프로필의 표시명·학번으로 초기값 채움
        setStudentName(profile?.displayName ?? "");
        setStudentNumber(profile?.studentNumber ?? "");
      }
    } finally {
      setLoading(false);
    }
  }, [uid, profile]);

  useEffect(() => {
    void load();
  }, [load]);

  const domainWarn = email.length > 0 && !email.toLowerCase().endsWith(SCHOOL_DOMAIN);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    if (!studentNumber.trim() || !studentName.trim()) return setError("학번과 이름을 입력해 주세요.");
    if (!EMAIL_RE.test(email)) return setError("올바른 이메일 형식이 아닙니다.");
    if (email !== emailConfirm) return setError("확인용 이메일이 일치하지 않습니다.");
    if (!consent) return setError("개인정보 이용 안내에 동의해 주세요.");

    setBusy(true);
    try {
      await upsertMs365(uid, {
        studentNumber: studentNumber.trim(),
        studentName: studentName.trim(),
        ms365Email: email.trim().toLowerCase(),
        note: note.trim() || null,
      });
      setMsg("등록 정보가 저장되었습니다.");
      void load();
    } catch (err) {
      setError(toFriendlyError(err));
    } finally {
      setBusy(false);
    }
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
        <label className="label" htmlFor="ms-email">학교 MS365 계정 이메일</label>
        <input id="ms-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`name${SCHOOL_DOMAIN}`} />
        {domainWarn && (
          <p className="field-hint">보통 학교 MS365 계정은 <code>{SCHOOL_DOMAIN}</code>로 끝납니다. 맞는지 확인해 주세요.</p>
        )}
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
