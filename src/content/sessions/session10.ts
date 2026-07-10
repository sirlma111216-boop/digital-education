import type { Session } from "@/types/content";

export const session10: Session = {
  id: "10",
  slug: "microsoft-365-other-tools-workflow",
  title: "Microsoft 365 기타 도구와 교사 워크플로",
  category: "microsoft",
  summary: "Forms·Outlook·To Do·Copilot·Loop·Sway·Clipchamp 등을 조합해 업무·수업 흐름을 줄인다.",
  duration: 90,
  level: "중급",
  keywords: ["Forms", "Copilot", "Loop", "Sway", "Clipchamp", "도구 선택 매트릭스"],
  theoryRatio: 45,
  practiceRatio: 55,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 10강"],

  overview:
    "모든 도구를 다 쓰는 것이 아니라, 업무와 수업의 흐름을 줄여 주는 조합을 선택하는 것이 핵심입니다. 이 차시에서는 MS365의 다양한 도구를 훑고, ‘목적–학습자–시간–데이터–난이도–정책’ 기준으로 조합을 고르는 법을 익힙니다.",

  objectives: [
    "업무·수업에 맞는 MS365 도구 조합을 선택할 수 있다.",
    "Copilot·Agent 활용 시 데이터 보호·라이선스 확인의 필요성을 설명할 수 있다.",
    "접근성 기능을 수업에 반영할 수 있다.",
  ],

  keyQuestion:
    "‘다 쓰기’가 아니라 ‘잘 고르기’라면, 나는 어떤 기준으로 도구를 선택할까?",

  conceptMap: {
    title: "도구 선택 매트릭스",
    caption: "목적·학습자·시간·데이터·난이도·정책을 축으로 최소 조합을 고른다.",
    nodes: [
      { label: "목적", description: "무엇을 이루려는가" },
      { label: "학습자·시간", description: "부담과 여건" },
      { label: "데이터", description: "무엇이 남는가" },
      { label: "정책·난이도", description: "기관 정책·진입 장벽" },
    ],
  },

  theoryBlocks: [
    {
      heading: "생산성·소통 도구",
      body: "- **Forms**: 설문·퀴즈·분기·자동 채점·Excel 내보내기·Teams 연동\n- **Outlook**: 메일·일정·회의·카테고리\n- **To Do**: 개인 할 일과 업무 연결",
    },
    {
      heading: "AI·협업 도구",
      body: "- **Copilot·Agent**: 문서 초안·요약·데이터 분석 보조, 맞춤형 에이전트 개념. **기관 데이터 보호와 라이선스 확인**이 전제\n- **Loop**: 실시간 공동 편집 컴포넌트, 프로젝트 역할·할 일·상태 관리",
    },
    {
      heading: "표현·영상 도구",
      body: "- **Sway**: 카드뉴스·브로슈어·인터랙티브 보고서\n- **Clipchamp**: 영상 편집·자동 자막·수업용 짧은 영상\n- **PowerPoint 발표 연습**: 스피커 코치 기능\n- **Minecraft Education**: 몰입형 프로젝트·교과 융합·협업/평가",
    },
    {
      heading: "접근성",
      body: "몰입형 리더, 자막, 음성 입력 등 접근성 기능은 UDL의 ‘표상·표현’을 실제로 구현하는 수단입니다. 도구를 고를 때 접근성을 함께 고려하세요.",
    },
  ],

  compareTables: [
    {
      caption: "표현 도구 비교",
      headers: ["도구", "결과물", "적합 상황"],
      rows: [
        ["Sway", "인터랙티브 보고서", "카드뉴스·안내문"],
        ["Clipchamp", "짧은 영상", "수업 영상·자막"],
        ["PowerPoint", "발표 자료", "발표+연습 코치"],
      ],
    },
  ],

  practice: {
    title: "3개 도구로 워크플로 설계",
    goal: "수업 준비–배포–학생 활동–피드백–공유까지 3개 MS 도구로 워크플로를 설계한다.",
    steps: [
      "하나의 수업 목적을 정한다.",
      "준비·배포·활동·피드백·공유 단계에 각각 도구를 배치한다(총 3개 이내).",
      "Copilot/Agent를 쓴다면 데이터 보호·라이선스 확인 항목을 적는다.",
      "접근성 기능을 최소 1개 포함한다.",
    ],
    checklist: [
      "도구가 3개 이내로 최소화되었는가",
      "각 단계가 하나의 도구와 연결되는가",
      "접근성·데이터 보호를 반영했는가",
    ],
    deliverable: "5단계 워크플로 표(도구·이유 포함).",
  },

  quiz: [
    {
      type: "mcq",
      question: "Copilot/Agent를 학교에서 사용할 때 우선 확인해야 하는 것은?",
      choices: ["색상 테마", "기관 데이터 보호와 라이선스", "글꼴", "아이콘"],
      answerIndex: 1,
      explanation: "기관 데이터 보호·라이선스 확인이 전제입니다.",
    },
    {
      type: "ox",
      question: "좋은 워크플로는 가능한 한 많은 도구를 쓰는 것이다.",
      answer: false,
      explanation: "흐름을 줄여 주는 최소 조합을 고르는 것이 좋습니다.",
    },
    {
      type: "self",
      question: "내 반복 업무 하나를 골라 어떤 도구로 자동화·간소화할지 적어 보세요.",
    },
  ],

  reflection: [
    "지금 쓰는 도구 중 겹치거나 불필요한 것은 없나요?",
    "접근성 기능을 기본값으로 넣는다면 무엇부터 시작하겠어요?",
  ],

  terms: [
    { term: "Copilot", definition: "문서·데이터 작업을 돕는 MS의 AI 어시스턴트." },
    { term: "Loop", definition: "실시간 공동 편집 컴포넌트·워크스페이스." },
    { term: "Sway", definition: "인터랙티브 보고서·카드뉴스 저작 도구." },
    { term: "Clipchamp", definition: "자동 자막을 지원하는 영상 편집 도구." },
    { term: "몰입형 리더", en: "Immersive Reader", definition: "읽기·이해를 돕는 접근성 기능." },
  ],

  sources: [
    { label: "Microsoft 365 (공식)", url: "https://www.microsoft.com/microsoft-365", lastVerified: "2026-07-10" },
    { label: "Minecraft Education (공식)", url: "https://education.minecraft.net/", lastVerified: "2026-07-10" },
    { label: "업로드 강의 교안 — 디지털 교육 10강 재구성" },
  ],
};
