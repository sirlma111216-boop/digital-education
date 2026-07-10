import type { Session } from "@/types/content";

export const session07: Session = {
  id: "07",
  slug: "onedrive-sharepoint-collaboration",
  title: "OneDrive와 SharePoint 기반 파일 협업",
  category: "microsoft",
  summary: "개인 저장소(OneDrive)와 공동 저장소(SharePoint)의 차이를 이해하고 협업 구조를 설계한다.",
  duration: 90,
  level: "중급",
  keywords: ["OneDrive", "SharePoint", "링크 공유", "버전 기록", "파일 요청"],
  theoryRatio: 55,
  practiceRatio: 45,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 7강"],

  overview:
    "OneDrive는 개인 클라우드 저장소이고, Teams의 공동 파일은 SharePoint 기반으로 관리됩니다. 이 차이를 이해하면 공유·권한·보관 전략이 명확해집니다. 이 차시에서는 링크 공유·버전 관리·파일 요청 등 실무 협업 기능을 다룹니다.",

  objectives: [
    "OneDrive와 SharePoint의 차이를 설명할 수 있다.",
    "링크 기반 공유의 권한 범위를 상황에 맞게 선택할 수 있다.",
    "버전 기록·휴지통·복구로 문서를 안전하게 관리할 수 있다.",
  ],

  keyQuestion:
    "‘내 파일’과 ‘우리 파일’을 어디에 두어야 협업과 보안이 함께 지켜질까?",

  conceptMap: {
    title: "개인 저장소 vs 공동 저장소",
    caption: "Teams 파일은 실제로 SharePoint에 저장된다는 점이 핵심.",
    nodes: [
      { label: "OneDrive", description: "개인 클라우드 저장소" },
      { label: "SharePoint", description: "팀·조직 공동 저장소" },
      { label: "Teams 파일", description: "SharePoint에 저장" },
      { label: "공유 링크", description: "보기/편집/특정 사용자" },
    ],
  },

  theoryBlocks: [
    {
      heading: "OneDrive 기본",
      body: "OneDrive는 웹과 데스크톱 앱에서 ‘내 파일·공유됨·검색·동기화’를 제공합니다. **자동 저장·버전 기록·휴지통·복구**로 실수해도 되돌릴 수 있습니다.",
    },
    {
      heading: "링크 기반 공유",
      body: "공유 링크는 권한 범위를 선택해야 합니다.\n\n- 보기 / 편집\n- 특정 사용자 / 조직 내부\n- 링크 만료·비밀번호\n\n무심코 ‘링크가 있는 모든 사용자’로 두면 개인정보 유출 위험이 커집니다.",
    },
    {
      heading: "OneDrive와 SharePoint의 차이",
      body: "OneDrive는 개인 소유 중심, SharePoint는 팀·조직 소유 중심입니다. **Teams의 공동 파일은 SharePoint에 저장**됩니다. 학년부·연구회·프로젝트 팀 문서는 개인 OneDrive가 아니라 SharePoint(팀)에서 관리하는 것이 원칙입니다.",
    },
    {
      heading: "보안과 아카이빙",
      body: "외부 공유·학생 개인정보·민감 문서는 별도 주의가 필요합니다. 학기 종료 시 보관·아카이빙 정책을 미리 정하면 데이터가 흩어지지 않습니다.",
    },
  ],

  compareTables: [
    {
      caption: "OneDrive vs SharePoint",
      headers: ["구분", "OneDrive", "SharePoint"],
      rows: [
        ["소유", "개인", "팀·조직"],
        ["적합 용도", "개인 작업·초안", "공동 문서·자료실"],
        ["Teams 연결", "개인 공유", "팀 파일 저장소"],
        ["권한 관리", "개인 중심", "그룹·사이트 권한"],
      ],
    },
  ],

  practice: {
    title: "수업 파일 협업 구조 만들기",
    goal: "수업 자료·공동 작업·학생 제출용 구조를 OneDrive/SharePoint로 설계한다.",
    steps: [
      "수업 자료 폴더 구조와 파일명 규칙을 정한다.",
      "공동 작업 폴더를 만들고 편집 권한을 팀 범위로 설정한다.",
      "학생 제출용으로 ‘파일 요청’을 만들어 서로의 파일이 보이지 않게 한다.",
      "버전 기록·휴지통 복구를 테스트한다.",
    ],
    checklist: [
      "공동 문서가 SharePoint(팀)에 있는가",
      "학생 제출이 서로 비공개인가",
      "공유 링크 권한이 최소 범위인가",
    ],
    deliverable: "폴더 구조 다이어그램과 공유 권한 설정 캡처(개인정보 제외).",
  },

  quiz: [
    {
      type: "mcq",
      question: "Teams의 공동 파일이 실제로 저장되는 곳은?",
      choices: ["개인 OneDrive", "SharePoint", "로컬 PC만", "Outlook"],
      answerIndex: 1,
      explanation: "Teams 파일은 SharePoint에 저장됩니다.",
    },
    {
      type: "ox",
      question: "학생 제출 파일은 서로 볼 수 있게 공개하는 것이 기본이다.",
      answer: false,
      explanation: "학생 제출물은 서로 보이지 않도록(예: 파일 요청) 설계해야 합니다.",
    },
    {
      type: "self",
      question: "지금 내 자료가 개인 OneDrive에 있어 협업이 어려운 사례가 있나요? 어디로 옮기면 좋을까요?",
    },
  ],

  reflection: [
    "실수로 잘못 공유한 경험이 있다면, 어떤 권한 습관으로 예방할 수 있을까요?",
    "학기 말 자료 아카이빙 규칙을 한 문장으로 정해 보세요.",
  ],

  terms: [
    { term: "OneDrive", definition: "개인 클라우드 저장소." },
    { term: "SharePoint", definition: "팀·조직 공동 저장소이자 사이트 플랫폼." },
    { term: "버전 기록", en: "Version History", definition: "문서의 이전 상태를 보관·복원하는 기능." },
    { term: "파일 요청", en: "File Request", definition: "서로의 제출물이 보이지 않게 파일을 수합하는 기능." },
    { term: "아카이빙", en: "Archiving", definition: "학기·프로젝트 종료 후 자료를 보관·정리하는 것." },
  ],

  sources: [
    { label: "Microsoft OneDrive/SharePoint 도움말(공식)", url: "https://support.microsoft.com/", lastVerified: "2026-07-10" },
    { label: "업로드 강의 교안 — 디지털 교육 7강 재구성" },
  ],
};
