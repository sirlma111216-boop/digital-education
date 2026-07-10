/* ==========================================================================
   전체 15주 일정. 정확한 날짜가 미정이므로 date는 null로 두고, 확정되면 이 파일만 수정.
   `일정 추후 안내` 처리는 UI가 date == null 을 보고 자동으로 표시합니다.
   ========================================================================== */

export type ScheduleMode = "대면" | "온라인" | "혼합" | "추후 안내";
export type ScheduleStatus = "예정" | "진행 중" | "완료";

export interface CourseScheduleItem {
  week: number;
  sessionId: string; // matches Session.id ("01".."15")
  title: string;
  date?: string | null; // YYYY-MM-DD or null(미정)
  mode?: ScheduleMode;
  status?: ScheduleStatus;
  note?: string;
}

export const courseSchedule: CourseScheduleItem[] = [
  { week: 1, sessionId: "01", title: "디지털 교육의 출발점: 교육이 먼저, 기술은 수단", date: null, mode: "추후 안내", status: "예정" },
  { week: 2, sessionId: "02", title: "2022 개정 교육과정과 미래 교실", date: null, mode: "추후 안내", status: "예정" },
  { week: 3, sessionId: "03", title: "개인 맞춤형 학습, ITS, TPACK과 핵심 용어", date: null, mode: "추후 안내", status: "예정" },
  { week: 4, sessionId: "04", title: "Google Workspace for Education 생태계", date: null, mode: "추후 안내", status: "예정" },
  { week: 5, sessionId: "05", title: "Google Classroom과 Brisk Teaching 실습", date: null, mode: "추후 안내", status: "예정" },
  { week: 6, sessionId: "06", title: "Microsoft 365 Education과 A3 생태계", date: null, mode: "추후 안내", status: "예정" },
  { week: 7, sessionId: "07", title: "OneDrive와 SharePoint 기반 파일 협업", date: null, mode: "추후 안내", status: "예정" },
  { week: 8, sessionId: "08", title: "Teams for Education과 학습 가속기", date: null, mode: "추후 안내", status: "예정" },
  { week: 9, sessionId: "09", title: "OneNote Class Notebook과 Whiteboard", date: null, mode: "추후 안내", status: "예정" },
  { week: 10, sessionId: "10", title: "Microsoft 365 기타 도구와 교사 워크플로", date: null, mode: "추후 안내", status: "예정" },
  { week: 11, sessionId: "11", title: "퀴즈·게임 기반 학습과 콘텐츠 저작 도구", date: null, mode: "추후 안내", status: "예정" },
  { week: 12, sessionId: "12", title: "메타버스·XR와 과정 중심 평가", date: null, mode: "추후 안내", status: "예정" },
  { week: 13, sessionId: "13", title: "생성형 AI의 이해: 머신러닝에서 LLM과 Agent까지", date: null, mode: "추후 안내", status: "예정" },
  { week: 14, sessionId: "14", title: "생성형 AI의 교육적 실제와 멀티모달 활용", date: null, mode: "추후 안내", status: "예정" },
  { week: 15, sessionId: "15", title: "바이브 코딩과 교육용 웹앱 제작 캡스톤", date: null, mode: "추후 안내", status: "예정" },
];

/** Format a schedule date for display; null → 일정 추후 안내. */
export function formatScheduleDate(date?: string | null): string {
  if (!date) return "일정 추후 안내";
  const d = new Date(date + "T00:00:00");
  if (Number.isNaN(d.getTime())) return "일정 추후 안내";
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
}
