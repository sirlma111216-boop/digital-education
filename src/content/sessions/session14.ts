import type { Session } from "@/types/content";

export const session14: Session = {
  id: "14",
  slug: "generative-ai-in-practice-multimodal",
  title: "생성형 AI의 교육적 실제와 멀티모달 활용",
  category: "genai",
  summary: "생성형 AI를 수업 설계·자료·피드백을 돕는 협력 도구로 활용하고, 프롬프트를 설계한다.",
  duration: 90,
  level: "심화",
  keywords: ["프롬프트 설계", "NotebookLM", "AI Studio", "멀티모달", "사실 검증"],
  theoryRatio: 40,
  practiceRatio: 60,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 14강"],

  overview:
    "생성형 AI는 교사를 대체하는 정답 기계가 아니라 수업 설계·자료 제작·피드백·연구를 보조하는 협력 도구입니다. 학생에게는 답을 대신 주는 도구보다 질문·설명·연습·성찰을 돕는 튜터로 설계해야 합니다. 이 차시에서는 서비스 비교와 프롬프트 설계 프레임을 다룹니다.",

  objectives: [
    "대표 생성형 AI 서비스를 순위가 아닌 기준으로 비교할 수 있다.",
    "8단계 프롬프트 설계 프레임으로 좋은 프롬프트를 작성할 수 있다.",
    "결과를 검토·수정하는 루브릭을 만들 수 있다.",
  ],

  keyQuestion:
    "AI에게 ‘답’이 아니라 ‘좋은 도움’을 얻으려면, 나는 무엇을 어떻게 요청해야 할까?",

  conceptMap: {
    title: "프롬프트 설계 프레임",
    caption: "역할–목표–학습자–맥락–제약–형식–기준–검증의 8요소로 요청을 구조화한다.",
    nodes: [
      { label: "역할·목표", description: "누가·무엇을" },
      { label: "학습자·맥락", description: "상황·참고 자료" },
      { label: "제약·형식", description: "조건·출력 형태" },
      { label: "기준·검증", description: "평가·사실 확인" },
    ],
  },

  theoryBlocks: [
    {
      heading: "서비스 비교(순위 아님)",
      body: "ChatGPT·Gemini·Claude를 다음 기준으로 비교합니다: 대화·범용성, 검색·생태계, 긴 문서, 문체·구조화, 코딩, 멀티모달, 기관 계정·개인정보, 최신 기능 변동 가능성. **순위를 매기지 말고** 목적에 맞게 고릅니다.",
    },
    {
      heading: "Google AI 도구",
      body: "- **NotebookLM**: 사용자가 제공한 자료 기반 요약·질문·퀴즈·학습 가이드, 오디오/영상 개요 등(기능 변동)\n- **Google AI Studio**: 프롬프트 실험·모델 설정·구조화된 출력·간단한 AI 앱 프로토타입. **API 키 보안** 주의",
    },
    {
      heading: "프롬프트 설계 8단계",
      body: "1. 역할\n2. 목표\n3. 학습자와 상황\n4. 참고 자료와 맥락\n5. 제약 조건\n6. 원하는 출력 형식\n7. 평가 기준\n8. 사실 검증과 수정 요청\n\n‘숨겨진 사고과정을 보여 달라’가 아니라 **단계별 설명·가정 명시·근거와 한계 요약·체크리스트 검토·오류 가능 지점 표시**를 요청합니다.",
    },
    {
      heading: "교사·학생 활용과 멀티모달",
      body: "교사는 수업안·수준별 설명·활동지 변형·예시 답안·루브릭·피드백 문장·안내문·자료 요약에, 학생은 개인 튜터·영어 회화·면접 연습·토론 관점·글쓰기 구조화·자기 설명·AI 답변 검증에 활용합니다. 이미지·영상·음악 생성은 **저작권·진위·워터마크·출처 표기**를 고려하고, 특정 서비스명은 변경 가능한 데이터로 관리합니다.",
    },
  ],

  compareTables: [
    {
      caption: "서비스 비교 기준(예시 · 특정 우열 아님)",
      headers: ["기준", "확인 관점"],
      rows: [
        ["긴 문서", "많은 자료를 한 번에 다루는가"],
        ["멀티모달", "이미지·음성·영상 처리"],
        ["기관 계정", "학교 데이터 보호·정책"],
        ["기능 변동", "최신 기능은 변할 수 있음"],
      ],
    },
  ],

  practice: {
    title: "프롬프트–루브릭–수정 프롬프트 완성",
    goal: "하나의 수업 목적을 정하고 프롬프트, 결과 평가 루브릭, 수정 프롬프트까지 완성한다.",
    steps: [
      "수업 목적과 산출물을 정한다.",
      "8단계 프레임으로 첫 프롬프트를 작성한다(사실 검증 요청 포함).",
      "결과를 평가할 루브릭을 만든다.",
      "루브릭에 비춰 부족한 점을 개선하는 수정 프롬프트를 작성한다.",
    ],
    checklist: [
      "8단계 요소가 포함되었는가",
      "사실 검증·근거 요약을 요청했는가",
      "개인정보를 프롬프트에 넣지 않았는가",
    ],
    deliverable: "첫 프롬프트 + 평가 루브릭 + 수정 프롬프트.",
  },

  quiz: [
    {
      type: "mcq",
      question: "좋은 교육용 프롬프트에 포함하기 어려운 요청은?",
      choices: ["가정을 명시해 달라", "근거와 한계를 요약해 달라", "숨겨진 내부 사고과정을 그대로 공개해 달라", "단계별로 설명해 달라"],
      answerIndex: 2,
      explanation: "숨겨진 사고과정 공개가 아니라 단계별 설명·가정·근거·한계 요약을 요청합니다.",
    },
    {
      type: "ox",
      question: "생성형 AI 서비스는 항상 순위를 매겨 하나만 쓰는 것이 좋다.",
      answer: false,
      explanation: "순위가 아니라 목적·상황에 맞게 선택합니다.",
    },
    {
      type: "self",
      question: "학생용 ‘튜터형’ 프롬프트와 교사용 ‘자료 제작’ 프롬프트는 어떻게 달라야 할까요?",
    },
  ],

  reflection: [
    "내가 자주 쓰는 프롬프트에 빠져 있던 요소는 8단계 중 무엇이었나요?",
    "학생이 AI를 ‘답 기계’가 아니라 ‘튜터’로 쓰게 하려면 어떤 규칙이 필요할까요?",
  ],

  terms: [
    { term: "프롬프트", en: "Prompt", definition: "AI에게 주는 요청·지시문." },
    { term: "NotebookLM", definition: "제공 자료 기반으로 요약·질문·가이드를 만드는 도구." },
    { term: "Google AI Studio", definition: "프롬프트 실험·모델 설정·프로토타입 도구." },
    { term: "멀티모달", en: "Multimodal", definition: "텍스트·이미지·음성·영상 등 여러 형식을 다루는 것." },
    { term: "API 키", definition: "서비스 접근 인증 값. 프런트엔드에 노출하면 안 됨." },
  ],

  sources: [
    { label: "NotebookLM (공식)", url: "https://notebooklm.google/", lastVerified: "2026-07-10" },
    { label: "Google AI Studio (공식)", url: "https://aistudio.google.com/", lastVerified: "2026-07-10" },
    { label: "업로드 강의 교안 — 디지털 교육 14강 재구성" },
  ],

  cautions: ["서비스 기능·정책은 변동됩니다. API 키·학생 개인정보를 외부 AI에 노출하지 마세요."],
};
