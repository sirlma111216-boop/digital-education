/* ==========================================================================
   Course-wide configuration: identity, categories, contact, external links.
   Edit these values to rebrand or adjust the course without touching components.
   ========================================================================== */

import type { CategoryInfo, CategoryId } from "@/types/content";

export const courseConfig = {
  title: "디지털 교육",
  subtitle: "교육이 먼저이고, 기술은 배움을 더 깊고 공평하게 만드는 수단입니다.",
  totalWeeks: 12,
  contactEmail: "sirlma@naver.com",
  contactSubject: "[디지털교육 수업 문의]",
  contactBodyTemplate:
    "이름:\n수업 구분(학부/교육대학원):\n문의 내용:\n",
  instructorProfileUrl: "https://teacher.labbitory.com/",
  microsoftReferenceUrl: "https://microsofta3.com/",
} as const;

/** The 5 top-level groupings that organize the 12 sessions. */
export const categories: CategoryInfo[] = [
  {
    id: "theory",
    label: "디지털 교육의 이론과 기반",
    range: "1~3차시",
    description:
      "교육과 기술의 관계, 2022 개정 교육과정, 개인 맞춤형 학습과 핵심 용어를 이론 중심으로 다룹니다.",
  },
  {
    id: "google",
    label: "Google Workspace와 수업 설계",
    range: "4~5차시",
    description:
      "Google 교육용 생태계와 Classroom으로 수업 흐름을 설계하고, Brisk Teaching·Google AI Studio·Gemini Notebook으로 교육용 AI를 활용합니다.",
  },
  {
    id: "microsoft",
    label: "Microsoft 365 Education과 학교 플랫폼",
    range: "6~9차시",
    description:
      "MS365 Education 생태계와 OneDrive, Teams, 학교 안 활용 사례, 교사 워크플로를 다룹니다.",
  },
  {
    id: "edutech",
    label: "MS365 앱과 수업용 퀴즈 도구",
    range: "10차시",
    description:
      "Clipchamp·Sway·Outlook 등 MS365의 다른 앱과, Kahoot!·퀴즈앤·Gimkit·ZEP QUIZ·Blooket 같은 퀴즈 앱을 수업 장면에 맞춰 고릅니다.",
  },
  {
    id: "genai",
    label: "바이브 코딩으로 만드는 수업 도구",
    range: "11~12차시",
    description:
      "바이브 코딩의 개념을 익히고, 캔바 코드와 Google AI Studio로 수업 도구를 직접 만들며 교육적 활용과 안전 원칙을 정리합니다.",
  },
];

export const categoryMap: Record<CategoryId, CategoryInfo> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<CategoryId, CategoryInfo>;

export function categoryLabel(id: CategoryId): string {
  return categoryMap[id]?.label ?? id;
}

/** Build the mailto: link for "이메일 보내기". */
export function buildMailto(): string {
  const subject = encodeURIComponent(courseConfig.contactSubject);
  const body = encodeURIComponent(courseConfig.contactBodyTemplate);
  return `mailto:${courseConfig.contactEmail}?subject=${subject}&body=${body}`;
}
