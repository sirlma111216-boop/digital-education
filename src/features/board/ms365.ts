/* MS365 계정 등록 공용 설정. 등록 폼·교수자 화면·안내 팝업이 함께 쓴다. */

/** 수업에서 쓰는 학교 MS365 계정 도메인. */
export const SCHOOL_DOMAIN = "@office.khu.ac.kr";

/** 학교 MS365 계정(@office.khu.ac.kr)인지 확인. 대소문자·앞뒤 공백 무시. */
export function isSchoolMs365(email: string | null | undefined): boolean {
  return Boolean(email && email.trim().toLowerCase().endsWith(SCHOOL_DOMAIN));
}

/** 수강생이 고르는 수업 종류. 순서대로 화면에 표시된다. */
export const CLASS_SECTIONS = ["월요일 5:00 수업", "목요일 5:40 수업", "목요일 6:30 수업"] as const;

/** 저장된 값이 현재 선택지 중 하나인지 확인(선택지가 바뀌면 다시 고르게 하기 위함). */
export function isClassSection(v: string | null | undefined): boolean {
  return Boolean(v && (CLASS_SECTIONS as readonly string[]).includes(v));
}
