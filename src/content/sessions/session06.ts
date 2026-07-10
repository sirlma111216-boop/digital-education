import type { Session } from "@/types/content";

export const session06: Session = {
  id: "06",
  slug: "microsoft-365-education-a3",
  title: "Microsoft 365 Education과 A3 생태계",
  category: "microsoft",
  summary: "MS365 Education을 수업·평가·협업·기기관리·학생지원이 연결된 학교 플랫폼으로 이해한다.",
  duration: 90,
  level: "입문",
  keywords: ["Microsoft 365 Education", "A1 A3 A5", "Teams", "Intune", "Learning Accelerators"],
  theoryRatio: 60,
  practiceRatio: 40,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 6강"],

  overview:
    "Microsoft 365 Education은 Office 프로그램 묶음이 아니라 수업·평가·협업·기기 관리·학생 지원을 연결하는 학교 플랫폼입니다. 이 차시에서는 A1/A3/A5의 개념적 차이와 A3에서 확인할 주요 범주를 살펴봅니다.",

  objectives: [
    "MS365 Education의 기본 철학을 ‘플랫폼’ 관점에서 설명할 수 있다.",
    "A1·A3·A5의 개념적 차이를 구분할 수 있다.",
    "A3에서 확인할 주요 범주를 나열할 수 있다.",
  ],

  keyQuestion:
    "‘Office 앱 묶음’과 ‘학교 플랫폼’으로서의 MS365는 무엇이 다른가?",

  conceptMap: {
    title: "MS365 교육 생태계",
    caption: "하나의 계정과 클라우드에서 앱·관리·보안·학습 지원이 연결된다.",
    nodes: [
      { label: "계정·ID", description: "Entra/조직 계정" },
      { label: "협업", description: "Teams·OneDrive·SharePoint" },
      { label: "생산성", description: "Office·OneNote·Forms" },
      { label: "관리·보안", description: "Intune(MDM)·보안 정책" },
      { label: "학습 지원", description: "Learning Accelerators" },
    ],
  },

  theoryBlocks: [
    {
      heading: "플랫폼으로서의 MS365 Education",
      body: "MS365 Education은 개별 앱이 아니라 **하나의 계정과 클라우드**로 앱·데이터·관리가 연결되는 플랫폼입니다. 기관 계정과 개인 계정은 데이터·정책이 다르므로 학교 환경 기준으로 확인해야 합니다.",
    },
    {
      heading: "A1 · A3 · A5의 개념적 차이",
      body: "라이선스 등급은 제공 범위가 다릅니다(개념적 구분).\n\n- **A1**: 주로 웹 기반, 기본 기능\n- **A3**: 데스크톱 Office 포함, 관리·보안이 확장\n- **A5**: 고급 보안·분석 등 최상위\n\n※ 특정 기능이 ‘모든 A3에서 항상 제공된다’고 단정하지 말고, 기관 정책과 출시 상태를 확인하세요.",
    },
    {
      heading: "A3에서 확인할 주요 범주",
      body: "- 데스크톱·웹 Office 앱\n- Teams\n- OneDrive·SharePoint\n- OneNote\n- Forms\n- 기기 관리(Intune·MDM)\n- 보안\n- 접근성\n- 학습 가속기(Learning Accelerators)\n\nCopilot Chat 등 교육용 AI 기능은 라이선스·기관 정책에 따라 달라질 수 있습니다.",
    },
  ],

  compareTables: [
    {
      caption: "학교 계정과 개인 계정",
      headers: ["구분", "학교(기관) 계정", "개인 계정"],
      rows: [
        ["관리", "관리자 정책 통제", "개인이 관리"],
        ["데이터 보호", "학교 데이터 정책 적용", "개인 약관"],
        ["기능 제공", "라이선스(A1/A3/A5)에 따름", "소비자 플랜"],
      ],
    },
  ],

  practice: {
    title: "학교 업무·수업을 MS365 앱에 매핑하기",
    goal: "실제 업무와 수업 흐름을 MS365 앱에 대응시켜 ‘어떤 일에 어떤 앱’을 정리한다.",
    steps: [
      "학교의 대표 업무·수업 흐름 5가지를 적는다(예: 공지, 과제, 회의, 자료 보관, 설문).",
      "각 흐름을 가장 적합한 MS365 앱과 연결한다.",
      "라이선스·정책 확인이 필요한 항목에 ‘확인 필요’ 표시를 단다.",
    ],
    checklist: [
      "각 업무가 하나의 주 앱과 연결되었는가",
      "중복·과잉 도구는 없는가",
      "확인이 필요한 정책 항목을 표시했는가",
    ],
    deliverable: "업무–앱 매핑 표(5행 이상).",
  },

  quiz: [
    {
      type: "mcq",
      question: "MS365 Education을 가장 잘 설명하는 것은?",
      choices: ["Office 앱 묶음", "수업·평가·협업·관리를 연결하는 학교 플랫폼", "화상회의 앱", "메일 서비스"],
      answerIndex: 1,
      explanation: "MS365 Education은 학교 플랫폼으로 이해해야 합니다.",
    },
    {
      type: "ox",
      question: "특정 기능은 모든 A3 계정에서 항상 동일하게 제공된다고 단정할 수 있다.",
      answer: false,
      explanation: "기능 제공은 기관 정책·출시 상태에 따라 달라질 수 있어 확인이 필요합니다.",
    },
    {
      type: "self",
      question: "우리 학교/수업에서 지금 가장 아쉬운 흐름 하나를 골라 어떤 MS365 앱으로 개선할지 적어 보세요.",
    },
  ],

  reflection: [
    "‘모든 도구를 다 쓰기’보다 ‘꼭 필요한 조합’을 고른다면 무엇을 남기겠어요?",
    "라이선스·정책을 단정하지 않는 습관이 왜 중요할까요?",
  ],

  terms: [
    { term: "Microsoft 365 Education", definition: "수업·협업·관리·학생지원을 연결하는 학교 플랫폼." },
    { term: "A1/A3/A5", definition: "제공 범위가 다른 교육용 라이선스 등급(개념적 구분)." },
    { term: "Intune", definition: "학교 기기를 원격 관리하는 MDM 서비스." },
    { term: "Learning Accelerators", en: "학습 가속기", definition: "읽기·발표·검색 등 역량을 지원하는 MS 학습 도구 묶음." },
    { term: "SharePoint", definition: "팀·조직의 공동 파일·사이트를 관리하는 플랫폼." },
  ],

  sources: [
    { label: "Microsoft Education (공식)", url: "https://www.microsoft.com/en-us/education", lastVerified: "2026-07-10" },
    { label: "microsofta3.com (교사용 참고)", url: "https://microsofta3.com/", note: "라이선스·기능은 공식 문서로 최종 확인", lastVerified: "2026-07-10" },
    { label: "업로드 강의 교안 — 디지털 교육 6강 재구성" },
  ],

  cautions: [
    "라이선스와 기능 제공 여부는 Microsoft 공식 Education·Learn 문서를 최우선으로 검증하세요.",
  ],
};
