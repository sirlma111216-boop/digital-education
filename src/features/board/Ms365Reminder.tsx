/* ==========================================================================
   MS365 계정 등록 안내 팝업 (기간 한정, 설정: src/data/ms365Reminder.ts).
   로그인한 학생 중 다음 경우에만 띄운다.
     - missing: MS365 계정을 아직 등록하지 않음
     - wrong:   학교 도메인(@office.khu.ac.kr)이 아닌 계정으로 등록함
     - section: 계정은 맞지만 수업 종류를 고르지 않음(수업 종류 칸이 생기기 전에 등록)
   - 닫으면 사이트 안에서 이동하는 동안은 다시 뜨지 않고, 새로고침하면 다시 뜬다
     (수업 안내 팝업과 같은 방식). 올바르게 등록하면 더 이상 뜨지 않는다.
   - 교수자는 주소 뒤에 ?ms365-reminder=preview(-missing|-section)를 붙여 학생 화면을 미리 볼 수 있다.
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { ms365Reminder } from "@/data/ms365Reminder";
import { useLessonDialogOpen } from "@/features/lesson/LessonAnnouncer";
import { getMyMs365 } from "./api";
import { CLASS_SECTIONS, SCHOOL_DOMAIN, isClassSection, isSchoolMs365 } from "./ms365";

const REGISTER_PATH = "/board/ms365-registration";
/** 이 페이지들에서는 띄우지 않는다(등록 화면 자체, 로그인·온보딩 중). */
const HIDDEN_PATHS = [REGISTER_PATH, "/login", "/onboarding"];

type Kind = "missing" | "wrong" | "section";
type Check = "unknown" | "ok" | Kind;

const startMs = Date.parse(ms365Reminder.start);
const endMs = Date.parse(ms365Reminder.end);
const deadlineLabel = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
  timeZone: "Asia/Seoul",
}).format(endMs);

function inWindow(): boolean {
  const now = Date.now();
  return now >= startMs && now <= endMs;
}

/** ?ms365-reminder=preview → wrong, preview-missing, preview-section */
function previewKind(search: string): Kind | null {
  const v = new URLSearchParams(search).get("ms365-reminder");
  if (v === "preview") return "wrong";
  if (v === "preview-missing") return "missing";
  if (v === "preview-section") return "section";
  return null;
}

export function Ms365Reminder() {
  const { user, role, loading, blocked } = useAuth();
  const { pathname, search } = useLocation();
  const lessonOpen = useLessonDialogOpen();
  const [check, setCheck] = useState<Check>("unknown");
  const [email, setEmail] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const okRef = useRef(false);

  const preview = role === "instructor" || import.meta.env.DEV ? previewKind(search) : null;
  const eligible = isFirebaseConfigured && !loading && !!user && role === "student" && !blocked && inWindow();
  const hiddenHere = HIDDEN_PATHS.includes(pathname);

  // 페이지를 옮길 때마다 다시 확인한다 → 등록 화면에서 고치고 나오면 바로 사라짐(이미 올바르면 생략).
  useEffect(() => {
    if (!eligible || hiddenHere || okRef.current || !user) return;
    let alive = true;
    getMyMs365(user.uid)
      .then((reg) => {
        if (!alive) return;
        if (!reg || !reg.ms365Email) {
          setCheck("missing");
        } else if (!isSchoolMs365(reg.ms365Email)) {
          setEmail(reg.ms365Email);
          setCheck("wrong");
        } else if (!isClassSection(reg.classSection)) {
          setCheck("section");
        } else {
          okRef.current = true;
          setCheck("ok");
        }
      })
      .catch(() => undefined); // 확인에 실패하면 조용히 넘어간다(팝업 없음)
    return () => {
      alive = false;
    };
  }, [eligible, hiddenHere, pathname, user]);

  const close = useCallback(() => setDismissed(true), []);

  if (dismissed || hiddenHere || lessonOpen) return null;
  if (preview) return <ReminderDialog kind={preview} email="hong.gildong@gmail.com" preview onClose={close} />;
  if (!eligible || check === "unknown" || check === "ok") return null;
  return <ReminderDialog kind={check} email={email} onClose={close} />;
}

const TITLES: Record<Kind, string> = {
  missing: "MS365 계정을 등록해 주세요",
  wrong: "학교 MS365 계정으로 다시 등록해 주세요",
  section: "수업 종류를 선택해 주세요",
};
const ACTIONS: Record<Kind, string> = {
  missing: "지금 등록하러 가기",
  wrong: "지금 수정하러 가기",
  section: "지금 선택하러 가기",
};

function ReminderDialog({
  kind,
  email,
  preview = false,
  onClose,
}: {
  kind: Kind;
  email: string | null;
  preview?: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const goRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    goRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="lesson-modal-backdrop">
      <div className="lesson-announce" role="dialog" aria-modal="true" aria-labelledby="ms365-reminder-title">
        <p className="eyebrow">MS365 계정 등록 안내{preview && " · 교수자 미리보기"}</p>
        <h2 id="ms365-reminder-title" className="display-sm">
          {TITLES[kind]}
        </h2>
        {kind === "section" ? (
          <p className="lesson-announce__text">
            MS365 계정은 등록되어 있지만 <strong>수업 종류</strong>가 선택되지 않았습니다. <strong>{deadlineLabel}까지</strong>{" "}
            게시판의 ‘MS365 계정 등록’에서 내 수업({CLASS_SECTIONS.join(" / ")})을 고른 뒤 ‘등록 정보 수정’을 눌러 주세요.
          </p>
        ) : (
          <>
            <p className="lesson-announce__text">
              {kind === "missing" ? (
                <>아직 MS365 계정이 등록되지 않았습니다.</>
              ) : (
                <>
                  지금 등록된 계정 <strong>{email}</strong>은(는) 학교 MS365 계정이 아닙니다.
                </>
              )}
            </p>
            <p className="lesson-announce__text">
              6~10차시 Microsoft 365 수업에서는 경희대학교 MS365 계정(<strong>{SCHOOL_DOMAIN}</strong>)을 사용합니다.{" "}
              <strong>{deadlineLabel}까지</strong> 게시판의 ‘MS365 계정 등록’에서 <strong>{SCHOOL_DOMAIN}</strong>로 끝나는
              계정과 수업 종류를 {kind === "missing" ? "등록" : "수정"}해 주세요.
            </p>
          </>
        )}
        <div className="lesson-announce__actions">
          <button
            ref={goRef}
            className="btn btn-primary"
            onClick={() => {
              onClose();
              navigate(REGISTER_PATH);
            }}
          >
            {ACTIONS[kind]}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
