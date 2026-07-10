/* ==========================================================================
   도구 사전. 빠르게 바뀌는 서비스 정보(가격·기능·라이선스)는 단정하지 말고
   `lastVerified`, `officialUrl`, `changeable`로 관리합니다. 공식 문서를 우선 확인하세요.
   ========================================================================== */

export type ToolPlatform = "Google" | "Microsoft" | "독립형" | "생성형 AI";
export type ToolPurpose =
  | "자료 제작"
  | "협업"
  | "평가"
  | "퀴즈"
  | "메타버스"
  | "영상"
  | "필기"
  | "코딩";
export type ToolAudience = "교사" | "학생" | "공동";
export type ToolLevel = "입문" | "중급" | "심화";
export type ToolTiming = "동기형" | "비동기형" | "혼합";
export type ToolPricing =
  | "무료"
  | "유료"
  | "기관 라이선스"
  | "부분 무료"
  | "확인 필요";

export interface ToolCard {
  id: string;
  name: string;
  platform: ToolPlatform;
  purposes: ToolPurpose[];
  audience: ToolAudience;
  level: ToolLevel;
  timing: ToolTiming;
  pricing: ToolPricing;
  summary: string;
  strengths: string[];
  limits: string[];
  recommendedFor: string;
  notRecommendedFor: string;
  licenseNote: string;
  officialUrl: string;
  lastVerified: string; // YYYY-MM-DD
  changeable: boolean;
}

export const tools: ToolCard[] = [
  {
    id: "google-classroom",
    name: "Google Classroom",
    platform: "Google",
    purposes: ["협업", "평가"],
    audience: "공동",
    level: "입문",
    timing: "혼합",
    pricing: "기관 라이선스",
    summary: "과제 배포·제출·피드백을 관리하는 Google의 학습 관리 허브(LMS 역할).",
    strengths: ["Drive·Docs·Forms와 자연스럽게 연결", "과제 사본 자동 생성", "학생 제출/미제출 확인이 쉬움"],
    limits: ["세밀한 성적 처리·통계는 제한적", "기관(교육용) 계정 환경에서 가장 안정적"],
    recommendedFor: "Docs·Forms 중심의 과제 흐름을 운영하는 수업",
    notRecommendedFor: "복잡한 성적 산출·역량 기반 평가가 핵심인 경우",
    licenseNote: "Google Workspace for Education 계정이 필요합니다. 개인 계정과 정책이 다릅니다.",
    officialUrl: "https://edu.google.com/workspace-for-education/classroom/",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "brisk-teaching",
    name: "Brisk Teaching",
    platform: "생성형 AI",
    purposes: ["자료 제작", "평가"],
    audience: "교사",
    level: "중급",
    timing: "비동기형",
    pricing: "부분 무료",
    summary: "브라우저 확장으로 수업안·활동지·퀴즈·루브릭·수준별 자료 초안을 생성하는 교사용 AI 보조 도구.",
    strengths: ["Docs/웹 위에서 바로 동작", "수준별 자료·피드백 초안 생성", "루브릭 생성"],
    limits: ["생성 결과는 반드시 교사 검토 필요", "성취기준 정렬·사실 검증은 사람이 확인"],
    recommendedFor: "자료 초안을 빠르게 만들고 교사가 다듬는 워크플로",
    notRecommendedFor: "검토 없이 그대로 배포하려는 경우",
    licenseNote: "무료/유료 기능 범위와 데이터 처리 정책은 공식 문서에서 확인하세요.",
    officialUrl: "https://www.briskteaching.com/",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "ms-teams-education",
    name: "Microsoft Teams for Education",
    platform: "Microsoft",
    purposes: ["협업", "평가"],
    audience: "공동",
    level: "중급",
    timing: "혼합",
    pricing: "기관 라이선스",
    summary: "수업 자료·과제·회의·필기장·데이터가 연결되는 교육 허브.",
    strengths: ["채널로 단원/프로젝트 구조화", "Forms 퀴즈·과제·루브릭 연동", "Class Notebook 연결"],
    limits: ["초기 구조 설계가 중요", "기능 제공 범위는 라이선스(A1/A3/A5)에 따라 다름"],
    recommendedFor: "한 학기 수업을 팀·채널로 체계적으로 운영",
    notRecommendedFor: "아주 단순한 자료 공유만 필요한 경우",
    licenseNote: "학교(기관) Microsoft 365 Education 계정 기준. 개인 계정과 다릅니다.",
    officialUrl: "https://www.microsoft.com/en-us/education/products/teams",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "onenote-class-notebook",
    name: "OneNote Class Notebook",
    platform: "Microsoft",
    purposes: ["필기", "협업"],
    audience: "공동",
    level: "중급",
    timing: "혼합",
    pricing: "기관 라이선스",
    summary: "교사 전용·콘텐츠 라이브러리·협업·학생 개인 공간을 한 구조로 운영하는 전자 필기장.",
    strengths: ["학생 개별 공간 + 공동 공간 동시 운영", "페이지 배포/검토/피드백", "포트폴리오 축적"],
    limits: ["구조 이해 전에는 혼란스러울 수 있음", "상담 기록 등은 접근 권한 특별 주의"],
    recommendedFor: "단원별 자료 제공과 학생 개별 작업을 함께 운영",
    notRecommendedFor: "단순 공지/파일 공유만 필요한 경우",
    licenseNote: "Teams와 연결해 배포하는 것이 일반적입니다.",
    officialUrl: "https://www.onenote.com/classnotebook",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "kahoot",
    name: "Kahoot!",
    platform: "독립형",
    purposes: ["퀴즈"],
    audience: "공동",
    level: "입문",
    timing: "동기형",
    pricing: "부분 무료",
    summary: "실시간 게임형 퀴즈로 참여와 형성평가를 유도하는 대표 도구.",
    strengths: ["높은 참여·몰입", "즉각적 정오답 피드백", "간단한 제작"],
    limits: ["속도 경쟁이 깊은 사고를 가릴 수 있음", "서술형·과정 평가에는 부적합"],
    recommendedFor: "복습·진단·형성평가의 워밍업",
    notRecommendedFor: "깊은 서술형 사고 평가",
    licenseNote: "무료/유료 기능 범위는 변동될 수 있습니다.",
    officialUrl: "https://kahoot.com/",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "quizlet",
    name: "Quizlet",
    platform: "독립형",
    purposes: ["퀴즈"],
    audience: "학생",
    level: "입문",
    timing: "비동기형",
    pricing: "부분 무료",
    summary: "플래시카드 기반의 반복 학습과 자기주도 복습 도구.",
    strengths: ["반복 학습·암기에 강점", "자기주도 학습 지원", "다양한 학습 모드"],
    limits: ["단순 암기에 치우칠 수 있음", "심화 사고 평가에는 한계"],
    recommendedFor: "용어·개념 반복 학습",
    notRecommendedFor: "실시간 협력 활동",
    licenseNote: "무료/유료 기능은 변동될 수 있습니다.",
    officialUrl: "https://quizlet.com/",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "canva",
    name: "Canva",
    platform: "독립형",
    purposes: ["자료 제작"],
    audience: "공동",
    level: "입문",
    timing: "비동기형",
    pricing: "부분 무료",
    summary: "카드뉴스·포스터·발표자료·간단한 웹까지 만드는 시각 저작 도구.",
    strengths: ["풍부한 템플릿", "교육용 무료 플랜 제공(확인 필요)", "협업 편집"],
    limits: ["저작권·라이선스 확인 필요", "결과물 획일화 가능"],
    recommendedFor: "시각 자료·활동지 제작",
    notRecommendedFor: "정밀한 데이터 분석",
    licenseNote: "Canva for Education 자격·기능은 공식 문서에서 확인하세요.",
    officialUrl: "https://www.canva.com/education/",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    platform: "생성형 AI",
    purposes: ["자료 제작", "코딩"],
    audience: "공동",
    level: "중급",
    timing: "비동기형",
    pricing: "부분 무료",
    summary: "대화형 생성형 AI. 수업 설계·자료 제작·글쓰기·코딩 보조에 폭넓게 활용.",
    strengths: ["범용 대화·생성 능력", "멀티모달·코딩 지원", "빠른 초안"],
    limits: ["할루시네이션·편향 가능", "개인정보 입력 주의", "사실 검증 필요"],
    recommendedFor: "초안 생성과 아이디어 확장",
    notRecommendedFor: "검증 없는 사실 확정, 민감 정보 처리",
    licenseNote: "기관 계정·데이터 처리 정책과 최신 기능은 변동됩니다.",
    officialUrl: "https://openai.com/chatgpt",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "gemini",
    name: "Gemini",
    platform: "생성형 AI",
    purposes: ["자료 제작", "코딩"],
    audience: "공동",
    level: "중급",
    timing: "비동기형",
    pricing: "부분 무료",
    summary: "Google의 생성형 AI. 검색·Workspace 생태계와의 연계가 특징.",
    strengths: ["Google 생태계 연계", "멀티모달", "긴 맥락 처리"],
    limits: ["기능·정책 변동", "사실 검증 필요"],
    recommendedFor: "Google 도구 중심 워크플로",
    notRecommendedFor: "검증 없는 사실 확정",
    licenseNote: "기관 계정·기능 제공 여부는 공식 문서 확인 필요.",
    officialUrl: "https://gemini.google.com/",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "claude",
    name: "Claude",
    platform: "생성형 AI",
    purposes: ["자료 제작", "코딩"],
    audience: "공동",
    level: "중급",
    timing: "비동기형",
    pricing: "부분 무료",
    summary: "Anthropic의 생성형 AI. 긴 문서 처리와 구조화된 글쓰기, 코딩에 강점.",
    strengths: ["긴 문서·문체·구조화", "코딩(Artifacts·Claude Code)", "안전 지향 설계"],
    limits: ["기능·정책 변동", "사실 검증 필요"],
    recommendedFor: "긴 자료 정리·글쓰기·바이브 코딩",
    notRecommendedFor: "검증 없는 사실 확정",
    licenseNote: "기관 계정·기능은 공식 문서에서 확인하세요.",
    officialUrl: "https://claude.ai/",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "notebooklm",
    name: "NotebookLM",
    platform: "생성형 AI",
    purposes: ["자료 제작", "평가"],
    audience: "공동",
    level: "중급",
    timing: "비동기형",
    pricing: "부분 무료",
    summary: "사용자가 제공한 자료를 기반으로 요약·질문·학습 가이드를 만드는 Google AI 도구.",
    strengths: ["제공 자료 기반이라 근거 추적 용이", "요약·퀴즈·가이드", "오디오/영상 개요 등 기능(변동)"],
    limits: ["제공 자료 품질에 좌우", "기능 변동"],
    recommendedFor: "특정 교재·자료 기반 학습 지원",
    notRecommendedFor: "자료 없이 일반 지식 질의",
    licenseNote: "현재 제공 기능은 변동됩니다. 공식 문서 확인.",
    officialUrl: "https://notebooklm.google/",
    lastVerified: "2026-07-10",
    changeable: true,
  },
  {
    id: "claude-code",
    name: "Claude Code",
    platform: "생성형 AI",
    purposes: ["코딩"],
    audience: "교사",
    level: "심화",
    timing: "비동기형",
    pricing: "확인 필요",
    summary: "터미널·에디터에서 실제 코드베이스를 다루는 AI 코딩 도구(바이브 코딩용).",
    strengths: ["실제 파일·프로젝트 단위 작업", "수정 자유도 높음", "배포까지 연결 가능"],
    limits: ["개발 개념 이해 필요", "API 키·개인정보 보안 주의"],
    recommendedFor: "실제 교육용 웹앱 제작 캡스톤",
    notRecommendedFor: "코드 없이 즉석 결과만 원하는 경우",
    licenseNote: "요금·기능은 공식 문서 확인. API 키는 프런트엔드에 노출 금지.",
    officialUrl: "https://claude.com/claude-code",
    lastVerified: "2026-07-10",
    changeable: true,
  },
];

export const toolPlatforms: ToolPlatform[] = ["Google", "Microsoft", "독립형", "생성형 AI"];
export const toolPurposes: ToolPurpose[] = [
  "자료 제작",
  "협업",
  "평가",
  "퀴즈",
  "메타버스",
  "영상",
  "필기",
  "코딩",
];
