/* ==========================================================================
   Board / auth domain types. Firestore(camelCase) 기준.
   시간 필드는 화면에서 다루기 쉽게 number(ms epoch) 또는 ISO 문자열로 정규화한다.
   ========================================================================== */

export type Role = "guest" | "student" | "instructor";

/** profiles/{uid} */
export interface Profile {
  id: string; // == uid
  role: Exclude<Role, "guest">; // 'student' | 'instructor'
  displayName: string | null;
  email: string | null;
  studentNumber: string | null;
  blocked: boolean;
  createdAt: number | null; // ms epoch
}

export type Visibility = "public" | "authenticated";

/** notices/{noticeId} */
export interface Notice {
  id: string;
  title: string;
  body: string;
  isPinned: boolean;
  visibility: Visibility;
  publishAt: number | null;
  authorId: string;
  createdAt: number | null;
  updatedAt: number | null;
}

/** ms365Registrations/{uid} — uid 를 문서 ID로 써서 1인 1건 보장 */
export interface Ms365Registration {
  id: string; // == uid
  studentNumber: string;
  studentName: string;
  ms365Email: string;
  note: string | null;
  consentedAt: number | null;
  updatedAt: number | null;
}

/** courseSettings/sessionVisibility */
export interface SessionVisibility {
  visibility: Record<string, boolean>; // { "01": true, "02": false, ... }
  updatedAt: number | null;
  updatedBy: string | null;
}

export type QnaStatus = "pending" | "answered"; // 답변대기 | 답변완료

/** qna/{questionId} */
export interface QnaQuestion {
  id: string;
  authorId: string;
  authorName: string; // 실명(표시명)
  title: string;
  body: string;
  isPrivate: boolean; // 비밀글
  isHidden: boolean; // 교수자 숨김
  status: QnaStatus;
  answerCount: number;
  createdAt: number | null;
  updatedAt: number | null;
}

/** qna/{questionId}/answers/{answerId} */
export interface QnaAnswer {
  id: string;
  authorId: string;
  authorName: string;
  isInstructor: boolean;
  body: string;
  createdAt: number | null;
}
