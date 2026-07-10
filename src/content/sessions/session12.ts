import type { Session } from "@/types/content";

export const session12: Session = {
  id: "12",
  slug: "metaverse-xr-process-assessment",
  title: "메타버스·XR와 과정 중심 평가",
  category: "edutech",
  summary: "몰입 경험이 학습 목표와 연결되도록 설계하고, 과정 중심 평가 도구로 사고·수행의 증거를 모은다.",
  duration: 90,
  level: "심화",
  keywords: ["메타버스", "XR", "몰입감", "과정 중심 평가", "루브릭"],
  theoryRatio: 45,
  practiceRatio: 55,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 12강"],

  overview:
    "메타버스는 단순히 VR 기기를 쓰는 활동이 아닙니다. 몰입·상호작용·공동 활동·공간적 경험이 학습 목표와 연결되어야 합니다. 과정 중심 평가는 최종 정답뿐 아니라 학생의 사고와 수행 흔적을 봅니다. 이 차시에서는 XR와 과정 중심 평가를 함께 설계합니다.",

  objectives: [
    "VR·AR·MR·XR의 개념과 몰입 요소를 구분할 수 있다.",
    "XR 활용의 안전·접근성 이슈를 점검할 수 있다.",
    "과정 중심 평가 도구로 수집할 증거를 설계할 수 있다.",
  ],

  keyQuestion:
    "몰입 기술과 과정 평가가 ‘신기함’을 넘어 학습의 증거가 되려면 무엇이 필요할까?",

  conceptMap: {
    title: "몰입 경험 → 학습 증거",
    caption: "몰입·상호작용이 목표와 연결되고, 그 과정이 평가의 증거로 남는다.",
    nodes: [
      { label: "몰입·실재감", description: "VR/AR/MR/XR" },
      { label: "상호작용·공동활동", description: "역할·공간 경험" },
      { label: "학습 목표", description: "연결의 기준" },
      { label: "과정 증거", description: "사고·수행 흔적" },
    ],
  },

  theoryBlocks: [
    {
      heading: "메타버스와 XR 개념",
      body: "메타버스는 넓은 개념이며, 그 안에 VR(가상)·AR(증강)·MR(혼합)·XR(확장)이 있습니다. 몰입감·실재감·상호작용·햅틱, 360도 영상과 가상 현장학습, HMD·스마트 글래스 등이 핵심 요소입니다.",
    },
    {
      heading: "교육 활용과 플랫폼",
      body: "가상 박물관·과학 시뮬레이션·역사 공간 탐방·공동 전시·역할 수행·공간 설계 프로젝트 등으로 활용합니다. Spatial 등 플랫폼 예시가 있으나 **현재 이용 가능한 플랫폼은 변경될 수 있습니다.**",
    },
    {
      heading: "안전과 접근성",
      body: "- 멀미\n- 시야·이동\n- 사용 시간\n- 신체적 접근성\n- 기기 수와 수업 운영\n\n몰입 기술일수록 안전·접근성 설계가 선행되어야 합니다.",
    },
    {
      heading: "과정 중심 평가 도구",
      body: "CLIPO·Snorkl·자작자작·Desmos(또는 Amplify Classroom) 등은 서술 답안·음성 설명·화이트보드 기록·글쓰기 과정·그래프 조작·피드백 등 다양한 증거를 수집합니다. **AI 채점은 교사 판단을 보조**하며, 루브릭·문항 설계가 먼저이고 표본 검토·이의 제기 절차를 둡니다.",
    },
  ],

  compareTables: [
    {
      caption: "과정 평가 도구가 남기는 증거(예시)",
      headers: ["증거 유형", "예시 도구 성격", "평가 초점"],
      rows: [
        ["음성 설명", "말하기 기반", "개념 이해 설명력"],
        ["화이트보드 기록", "풀이 과정", "사고 과정"],
        ["글쓰기 과정", "초안·수정", "논증·구성"],
        ["그래프 조작", "수학 탐구", "표현·해석"],
      ],
    },
  ],

  practice: {
    title: "XR 또는 과정 평가 활동 설계",
    goal: "XR 기반 수업 또는 과정 중심 평가 활동 중 하나를 골라 목표·활동·증거·루브릭을 설계한다.",
    steps: [
      "학습 목표를 정하고 XR/과정평가 중 하나를 선택한다.",
      "활동을 설계하고, 수집할 증거의 유형을 정한다.",
      "루브릭(기준·수준)을 작성한다.",
      "안전·접근성·개인정보 점검 항목을 추가한다.",
    ],
    checklist: [
      "몰입/평가가 목표와 연결되는가",
      "증거가 루브릭과 대응하는가",
      "안전·개인정보를 점검했는가",
    ],
    deliverable: "목표–활동–증거–루브릭 설계서.",
  },

  quiz: [
    {
      type: "mcq",
      question: "과정 중심 평가에서 AI 채점의 올바른 위치는?",
      choices: ["교사를 대체", "교사 판단을 보조", "학생이 최종 결정", "평가에서 제외"],
      answerIndex: 1,
      explanation: "AI 채점은 교사 판단을 보조하며, 루브릭·문항 설계가 우선입니다.",
    },
    {
      type: "ox",
      question: "XR 수업은 신기함 자체가 학습 목표가 될 수 있다.",
      answer: false,
      explanation: "몰입은 반드시 학습 목표와 연결되어야 의미가 있습니다.",
    },
    {
      type: "self",
      question: "학생의 ‘음성 설명’을 평가할 때 배려해야 할 부담·개인정보는 무엇일까요?",
    },
  ],

  reflection: [
    "몰입 기술을 도입하기 전, 우리 교실의 안전·접근성 여건은 어떤가요?",
    "‘과정의 증거’ 중 내 교과에서 가장 가치 있는 것은 무엇인가요?",
  ],

  terms: [
    { term: "XR", en: "확장현실", definition: "VR·AR·MR을 아우르는 확장현실 개념." },
    { term: "실재감", en: "Presence", definition: "가상 환경에 실제로 있는 듯한 느낌." },
    { term: "과정 중심 평가", definition: "결과뿐 아니라 사고·수행 과정을 평가하는 방식." },
    { term: "루브릭", definition: "평가 기준과 수준을 명시한 채점 틀." },
    { term: "HMD", definition: "머리에 착용하는 몰입형 디스플레이 장치." },
  ],

  sources: [
    { label: "Spatial (공식)", url: "https://www.spatial.io/", note: "이용 가능 플랫폼은 변경될 수 있음", lastVerified: "2026-07-10" },
    { label: "Desmos (공식)", url: "https://www.desmos.com/", lastVerified: "2026-07-10" },  ],

  cautions: ["플랫폼·도구의 제공 여부와 기능은 변경될 수 있으니 공식 문서를 확인하세요."],
};
