import type { Session } from "@/types/content";

export const session08: Session = {
  id: "08",
  slug: "teams-for-education-accelerators",
  title: "Teams for Education과 학습 가속기",
  category: "microsoft",
  summary: "Teams를 수업 자료·과제·평가·데이터가 연결되는 교육 허브로 설계하고, 학습 데이터를 해석한다.",
  duration: 90,
  level: "중급",
  keywords: ["Teams", "채널", "과제", "Learning Accelerators", "학습 데이터"],
  theoryRatio: 50,
  practiceRatio: 50,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 8강"],

  overview:
    "Teams는 게시판이나 화상회의 앱이 아니라 수업 자료·과제·평가·필기장·데이터가 연결되는 교육 허브입니다. 이 차시에서는 팀·채널·탭 구조와 과제 흐름, 그리고 학습 가속기가 만드는 데이터를 ‘낙인’이 아니라 ‘지원’으로 해석하는 법을 다룹니다.",

  objectives: [
    "Team·Channel·Tab 구조로 수업을 설계할 수 있다.",
    "Forms 퀴즈를 과제로 배포하고 루브릭으로 피드백할 수 있다.",
    "학습 가속기 데이터를 지원 관점에서 해석할 수 있다.",
  ],

  keyQuestion:
    "학습 데이터를 볼 때, 학생을 낙인찍지 않으면서 지원으로 잇는 해석은 어떻게 가능할까?",

  conceptMap: {
    title: "Teams 교육 허브",
    caption: "팀 안에서 자료·과제·평가·데이터가 하나로 연결된다.",
    nodes: [
      { label: "Team", description: "수업 단위" },
      { label: "Channel", description: "단원·프로젝트" },
      { label: "Tab", description: "Forms·Notebook·자료" },
      { label: "과제·성적", description: "배포·제출·루브릭" },
      { label: "학습 가속기", description: "읽기·발표·검색·성찰" },
    ],
  },

  theoryBlocks: [
    {
      heading: "팀·채널·탭 구조",
      body: "Team은 수업 단위, Channel은 단원·프로젝트, Tab은 자주 쓰는 도구(Forms·Class Notebook·자료)를 고정하는 자리입니다. 수업 팀과 일반 팀은 기능이 다르며, 수업 팀은 과제·성적을 지원합니다.",
    },
    {
      heading: "과제 흐름",
      body: "Forms 퀴즈를 과제로 배포하고, 제출·피드백·루브릭을 연결합니다. Class Notebook과 연동하면 개별 작업까지 한 흐름으로 이어집니다.",
    },
    {
      heading: "학습 가속기(Learning Accelerators)",
      body: "- **Reading Progress / Reading Coach**: 읽기 유창성\n- **Speaker Coach / Speaker Progress**: 발표\n- **Search Coach / Search Progress**: 정보 탐색\n- **Reflect**: 정서·성찰\n- **Education Insights**: 데이터 요약\n- 필요 시 Math Progress 등\n\n제공 기능은 라이선스·출시 상태에 따라 달라질 수 있습니다.",
    },
    {
      heading: "데이터 해석의 윤리",
      body: "데이터는 학생을 규정하는 낙인이 아니라 **보충·심화·상담을 설계하는 재료**입니다. 교사는 수치의 맥락을 살피고, 학생과의 대화 속에서 데이터를 활용해야 합니다.",
    },
  ],

  compareTables: [
    {
      caption: "학습 가속기 개요",
      headers: ["도구", "지원 역량", "데이터 예"],
      rows: [
        ["Reading Progress", "읽기 유창성", "정확도·속도"],
        ["Speaker Progress", "발표", "속도·필러워드"],
        ["Search Progress", "정보 탐색", "검색 질의 개선"],
        ["Reflect", "정서·성찰", "감정 체크인"],
      ],
    },
  ],

  practice: {
    title: "한 학기 수업 팀 설계 + 가속기 1개 연결",
    goal: "수업 팀의 채널 구조를 설계하고 과제 1개와 학습 가속기 1개를 연결한다.",
    steps: [
      "수업 팀의 채널 구조를 단원/프로젝트 기준으로 설계한다.",
      "과제 1개를 만들고 루브릭 또는 Forms 퀴즈를 연결한다.",
      "학습 가속기 1개를 골라 활동에 연결한다.",
      "생성될 데이터를 어떻게 ‘지원’으로 해석·활용할지 메모한다.",
    ],
    checklist: [
      "채널 구조가 단원 흐름과 맞는가",
      "과제에 평가 기준이 연결되었는가",
      "데이터 해석이 지원 관점인가",
    ],
    deliverable: "채널 구조도 + 데이터 활용 계획 메모.",
  },

  quiz: [
    {
      type: "mcq",
      question: "Teams를 가장 잘 설명하는 것은?",
      choices: ["화상회의 전용 앱", "게시판 앱", "자료·과제·평가·데이터가 연결되는 교육 허브", "메일 앱"],
      answerIndex: 2,
      explanation: "Teams는 교육 허브로 이해해야 합니다.",
    },
    {
      type: "ox",
      question: "학습 가속기 데이터는 학생을 평가·분류하는 낙인 도구로 쓰는 것이 바람직하다.",
      answer: false,
      explanation: "데이터는 보충·심화·상담을 설계하는 지원의 근거로 활용해야 합니다.",
    },
    {
      type: "self",
      question: "Reading Progress 데이터를 학생과 함께 볼 때 어떤 말로 시작하면 좋을지 적어 보세요.",
    },
  ],

  reflection: [
    "내 수업 팀에서 채널이 너무 많거나 적어 생긴 혼란은 없었나요?",
    "데이터를 ‘지원’으로 바꾸는 나만의 원칙을 한 줄로 정해 보세요.",
  ],

  terms: [
    { term: "Channel", en: "채널", definition: "팀 안에서 단원·프로젝트를 나누는 공간." },
    { term: "Class Notebook", definition: "Teams와 연동되는 수업용 전자 필기장." },
    { term: "Learning Accelerators", en: "학습 가속기", definition: "읽기·발표·검색·성찰 등을 지원하는 MS 도구 묶음." },
    { term: "Education Insights", definition: "학습 활동 데이터를 요약해 보여 주는 기능." },
    { term: "Reflect", definition: "학생의 정서·성찰을 돕는 체크인 도구." },
  ],

  sources: [
    { label: "Microsoft Teams for Education (공식)", url: "https://www.microsoft.com/en-us/education/products/teams", lastVerified: "2026-07-10" },
    { label: "Learning Accelerators (Microsoft Learn)", url: "https://learn.microsoft.com/en-us/training/educator-center/", lastVerified: "2026-07-10" },  ],
};
