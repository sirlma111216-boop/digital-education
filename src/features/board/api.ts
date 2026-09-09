/* ==========================================================================
   게시판·수강생 데이터 계층 (Firestore). 게시판 탭과 교수자 화면이 함께 재사용.
   ========================================================================== */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit as fbLimit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toMillis } from "@/lib/time";
import type {
  Notice,
  Ms365Registration,
  Profile,
  QnaAnswer,
  QnaQuestion,
  Visibility,
} from "@/types/board";

/* ---------------- 공지 ---------------- */
function mapNotice(id: string, d: Record<string, unknown>): Notice {
  return {
    id,
    title: (d.title as string) ?? "",
    body: (d.body as string) ?? "",
    isPinned: Boolean(d.isPinned),
    visibility: ((d.visibility as Visibility) ?? "authenticated"),
    publishAt: toMillis(d.publishAt),
    authorId: (d.authorId as string) ?? "",
    createdAt: toMillis(d.createdAt),
    updatedAt: toMillis(d.updatedAt),
  };
}

export async function listNotices(): Promise<Notice[]> {
  const snap = await getDocs(query(collection(db, "notices"), orderBy("createdAt", "desc")));
  const rows = snap.docs.map((d) => mapNotice(d.id, d.data() as Record<string, unknown>));
  // 고정 공지 우선
  return rows.sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
}

export async function listRecentNotices(n: number): Promise<Notice[]> {
  const snap = await getDocs(
    query(collection(db, "notices"), orderBy("createdAt", "desc"), fbLimit(n + 5)),
  );
  const rows = snap.docs.map((d) => mapNotice(d.id, d.data() as Record<string, unknown>));
  return rows.sort((a, b) => Number(b.isPinned) - Number(a.isPinned)).slice(0, n);
}

export async function createNotice(input: {
  title: string;
  body: string;
  isPinned: boolean;
  visibility: Visibility;
  authorId: string;
}): Promise<void> {
  await addDoc(collection(db, "notices"), {
    ...input,
    publishAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateNotice(
  id: string,
  patch: Partial<Pick<Notice, "title" | "body" | "isPinned" | "visibility">>,
): Promise<void> {
  await updateDoc(doc(db, "notices", id), { ...patch, updatedAt: serverTimestamp() });
}

export async function deleteNotice(id: string): Promise<void> {
  await deleteDoc(doc(db, "notices", id));
}

/* ---------------- MS365 계정 등록 ---------------- */
function mapMs365(id: string, d: Record<string, unknown>): Ms365Registration {
  return {
    id,
    studentNumber: (d.studentNumber as string) ?? "",
    studentName: (d.studentName as string) ?? "",
    ms365Email: (d.ms365Email as string) ?? "",
    note: (d.note as string) ?? null,
    consentedAt: toMillis(d.consentedAt),
    updatedAt: toMillis(d.updatedAt),
  };
}

export async function getMyMs365(uid: string): Promise<Ms365Registration | null> {
  const snap = await getDoc(doc(db, "ms365Registrations", uid));
  return snap.exists() ? mapMs365(uid, snap.data() as Record<string, unknown>) : null;
}

export async function upsertMs365(
  uid: string,
  input: { studentNumber: string; studentName: string; ms365Email: string; note: string | null },
): Promise<void> {
  await setDoc(
    doc(db, "ms365Registrations", uid),
    { ...input, consentedAt: serverTimestamp(), updatedAt: serverTimestamp() },
    { merge: true },
  );
}

export async function listMs365(): Promise<Ms365Registration[]> {
  const snap = await getDocs(collection(db, "ms365Registrations"));
  return snap.docs
    .map((d) => mapMs365(d.id, d.data() as Record<string, unknown>))
    .sort((a, b) => a.studentNumber.localeCompare(b.studentNumber));
}

/* ---------------- 수강생(프로필) ---------------- */
function mapProfile(id: string, d: Record<string, unknown>): Profile {
  return {
    id,
    role: (d.role as Profile["role"]) ?? "student",
    displayName: (d.displayName as string) ?? null,
    email: (d.email as string) ?? null,
    studentNumber: (d.studentNumber as string) ?? null,
    blocked: Boolean(d.blocked),
    createdAt: toMillis(d.createdAt),
  };
}

export async function listProfiles(): Promise<Profile[]> {
  const snap = await getDocs(collection(db, "profiles"));
  return snap.docs
    .map((d) => mapProfile(d.id, d.data() as Record<string, unknown>))
    .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
}

export async function setBlocked(uid: string, blocked: boolean): Promise<void> {
  await updateDoc(doc(db, "profiles", uid), { blocked });
}

/* ---------------- Q&A ---------------- */
function mapQuestion(id: string, d: Record<string, unknown>): QnaQuestion {
  return {
    id,
    authorId: (d.authorId as string) ?? "",
    authorName: (d.authorName as string) ?? "익명",
    title: (d.title as string) ?? "",
    body: (d.body as string) ?? "",
    isPrivate: Boolean(d.isPrivate),
    isHidden: Boolean(d.isHidden),
    status: ((d.status as QnaQuestion["status"]) ?? "pending"),
    answerCount: (d.answerCount as number) ?? 0,
    createdAt: toMillis(d.createdAt),
    updatedAt: toMillis(d.updatedAt),
  };
}

/** 학생·비로그인 화면: 공개글 + 내 글을 각각 조회해 합치고 숨김 제외. */
export async function listQuestionsForStudent(uid: string | null): Promise<QnaQuestion[]> {
  const base = collection(db, "qna");
  const pubSnap = await getDocs(
    query(base, where("isPrivate", "==", false), orderBy("createdAt", "desc")),
  );
  const rows = new Map<string, QnaQuestion>();
  pubSnap.docs.forEach((d) => rows.set(d.id, mapQuestion(d.id, d.data() as Record<string, unknown>)));
  if (uid) {
    const mineSnap = await getDocs(
      query(base, where("authorId", "==", uid), orderBy("createdAt", "desc")),
    );
    mineSnap.docs.forEach((d) =>
      rows.set(d.id, mapQuestion(d.id, d.data() as Record<string, unknown>)),
    );
  }
  return [...rows.values()]
    .filter((q) => !q.isHidden)
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
}

/** 교수자 화면: 전체(숨김 포함). */
export async function listAllQuestions(): Promise<QnaQuestion[]> {
  const snap = await getDocs(query(collection(db, "qna"), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => mapQuestion(d.id, d.data() as Record<string, unknown>));
}

export async function createQuestion(input: {
  authorId: string;
  authorName: string;
  title: string;
  body: string;
  isPrivate: boolean;
}): Promise<void> {
  await addDoc(collection(db, "qna"), {
    ...input,
    isHidden: false,
    status: "pending",
    answerCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateQuestion(
  id: string,
  patch: Partial<Pick<QnaQuestion, "title" | "body" | "isPrivate" | "isHidden">>,
): Promise<void> {
  await updateDoc(doc(db, "qna", id), { ...patch, updatedAt: serverTimestamp() });
}

export async function deleteQuestion(id: string): Promise<void> {
  await deleteDoc(doc(db, "qna", id));
}

function mapAnswer(id: string, d: Record<string, unknown>): QnaAnswer {
  return {
    id,
    authorId: (d.authorId as string) ?? "",
    authorName: (d.authorName as string) ?? "",
    isInstructor: Boolean(d.isInstructor),
    body: (d.body as string) ?? "",
    createdAt: toMillis(d.createdAt),
  };
}

export async function listAnswers(qid: string): Promise<QnaAnswer[]> {
  const snap = await getDocs(
    query(collection(db, "qna", qid, "answers"), orderBy("createdAt", "asc")),
  );
  return snap.docs.map((d) => mapAnswer(d.id, d.data() as Record<string, unknown>));
}

export async function addInstructorAnswer(
  qid: string,
  input: { authorId: string; authorName: string; body: string },
): Promise<void> {
  await addDoc(collection(db, "qna", qid, "answers"), {
    ...input,
    isInstructor: true,
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, "qna", qid), {
    status: "answered",
    answerCount: increment(1),
    updatedAt: serverTimestamp(),
  });
}
