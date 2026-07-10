import type { Session } from "@/types/content";

export const session11: Session = {
  id: "11",
  slug: "quiz-game-based-learning",
  title: "퀴즈·게임 기반 학습과 콘텐츠 저작 도구",
  category: "edutech",
  summary: "게임성이 학습 목표를 강화하도록 설계하고, 대표 퀴즈 도구를 기준으로 비교한다.",
  duration: 90,
  level: "중급",
  keywords: ["Kahoot", "Blooket", "Quizlet", "게임 기반 학습", "형성평가"],
  theoryRatio: 45,
  practiceRatio: 55,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 11강"],

  overview:
    "게임성은 학습 목표를 강화할 때 의미가 있으며, 속도 경쟁이나 보상 구조가 학습을 가리지 않도록 설계해야 합니다. 이 차시에서는 대표 퀴즈·게임 도구를 공통 기준으로 비교하고, 같은 목표를 세 가지 방식으로 바꾸어 설계합니다.",

  objectives: [
    "퀴즈·게임 도구를 공통 기준으로 비교·선택할 수 있다.",
    "게임 기반 학습의 한계(속도 경쟁 등)를 설명할 수 있다.",
    "같은 학습 목표를 실시간·반복·협력의 세 방식으로 설계할 수 있다.",
  ],

  keyQuestion:
    "게임이 ‘재미’를 넘어 ‘학습 목표’를 강화하려면 무엇을 설계해야 할까?",

  conceptMap: {
    title: "목적별 도구 선택",
    caption: "진단·형성·복습·협력 등 목적에 따라 도구와 방식이 달라진다.",
    nodes: [
      { label: "진단·형성", description: "이해 확인" },
      { label: "복습·반복", description: "기억 강화" },
      { label: "협력 게임", description: "상호작용" },
      { label: "서술·깊은 사고", description: "게임형 한계 지점" },
    ],
  },

  theoryBlocks: [
    {
      heading: "대표 도구 개관",
      body: "Kahoot!, 퀴즈앤, 클래스카드, Blooket, ZEP Quiz, Quizlet 등은 각각 강점이 다릅니다. ‘무엇이 최고냐’가 아니라 ‘어떤 수업 장면에 맞느냐’로 접근합니다.",
    },
    {
      heading: "비교 기준",
      body: "다음 기준으로 비교합니다.\n\n- 실시간 vs 자기주도\n- 문항 유형\n- 게임성\n- 통계·오답 분석\n- 반복 학습\n- 한글 사용성\n- 기기·네트워크\n- 무료/유료 범위\n- 학생 부담\n- 적합한 수업 장면",
    },
    {
      heading: "게임 기반 학습의 한계",
      body: "- 속도 경쟁이 깊은 사고를 가릴 수 있음\n- 서술형·과정 평가에는 부적합\n- 게임 규칙 설명에 시간 소요\n- 학습 목표보다 게임 자체에 몰입\n\n이 한계를 알고 **에듀테크 선택 체크리스트**로 점검해야 합니다.",
    },
    {
      heading: "콘텐츠 저작 도구",
      body: "Canva·Notion·Goodnotes 등은 자료 제작·정리·필기를 돕습니다. 필요 시 Loop 등 다른 차시 도구와 연결할 수 있습니다.",
    },
  ],

  compareTables: [
    {
      caption: "퀴즈 도구 비교(예시 · 세부 기능은 변동)",
      headers: ["도구", "방식", "강점", "유의점"],
      rows: [
        ["Kahoot!", "실시간", "높은 참여", "속도 경쟁"],
        ["Blooket", "실시간·게임", "게임성 다양", "게임에 몰입 과다"],
        ["Quizlet", "자기주도", "반복 학습", "단순 암기 편향"],
        ["클래스카드", "자기주도", "한글 어휘 학습", "선택형 위주"],
      ],
    },
  ],

  practice: {
    title: "같은 목표, 세 가지 방식으로",
    goal: "하나의 학습 목표를 실시간 퀴즈·반복 학습·협력 게임의 세 방식으로 바꾸어 설계한다.",
    steps: [
      "학습 목표 1개를 정한다.",
      "실시간 퀴즈 버전을 설계한다(도구·문항·운영).",
      "반복 학습 버전을 설계한다.",
      "협력 게임 버전을 설계하고, 각 방식의 장단점을 비교한다.",
    ],
    checklist: [
      "세 방식이 같은 목표를 향하는가",
      "속도 경쟁의 한계를 보완했는가",
      "학생 부담을 고려했는가",
    ],
    deliverable: "3방식 설계 비교표 + 선택 이유.",
  },

  quiz: [
    {
      type: "mcq",
      question: "게임 기반 학습의 대표적 한계로 보기 어려운 것은?",
      choices: ["속도 경쟁이 사고를 가릴 수 있음", "서술형 평가에 부적합", "규칙 설명 시간 소요", "반복 학습이 전혀 불가능"],
      answerIndex: 3,
      explanation: "Quizlet 등은 반복 학습에 강합니다. 반복 자체가 불가능한 것은 아닙니다.",
    },
    {
      type: "ox",
      question: "도구 선택은 ‘가장 유명한 것’을 고르는 것이 원칙이다.",
      answer: false,
      explanation: "수업 목적·장면에 맞는 도구를 고르는 것이 원칙입니다.",
    },
    {
      type: "self",
      question: "내 수업에서 게임형이 오히려 방해가 됐던 순간이 있다면 무엇이었나요?",
    },
  ],

  reflection: [
    "‘재미’와 ‘학습 목표’ 사이에서 나는 어디에 무게를 두고 있나요?",
    "에듀테크 선택 체크리스트에 내가 꼭 넣고 싶은 항목은?",
  ],

  terms: [
    { term: "게임 기반 학습", en: "Game-Based Learning", definition: "게임 요소로 학습 동기·참여를 높이는 방식." },
    { term: "형성평가", definition: "학습 중 이해를 확인해 수업을 조정하는 평가." },
    { term: "오답 분석", definition: "틀린 문항을 분석해 학습을 보완하는 활동." },
    { term: "반복 학습", en: "Spaced Practice", definition: "간격을 두고 반복해 기억을 강화하는 학습." },
    { term: "에듀테크 선택 체크리스트", definition: "도구 도입 전 안전·근거·부담 등을 점검하는 목록." },
  ],

  sources: [
    { label: "Kahoot! (공식)", url: "https://kahoot.com/", lastVerified: "2026-07-10" },
    { label: "Quizlet (공식)", url: "https://quizlet.com/", lastVerified: "2026-07-10" },
    { label: "업로드 강의 교안 — 디지털 교육 11강 재구성" },
  ],

  cautions: ["도구의 무료/유료 범위와 기능은 변동될 수 있으니 공식 문서를 확인하세요."],
};
