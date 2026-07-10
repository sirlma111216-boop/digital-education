import type { Session } from "@/types/content";

export const session13: Session = {
  id: "13",
  slug: "generative-ai-ml-to-agent",
  title: "생성형 AI의 이해: 머신러닝에서 LLM과 Agent까지",
  category: "genai",
  summary: "생성형 AI의 발전 과정과 원리, 그리고 한계를 함께 이해한다.",
  duration: 90,
  level: "심화",
  keywords: ["머신러닝", "Transformer", "LLM", "Agent", "할루시네이션"],
  theoryRatio: 55,
  practiceRatio: 45,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 13강"],

  overview:
    "생성형 AI는 언어와 콘텐츠를 확률적으로 생성하는 모델이며, 사실과 논리를 자동으로 보장하지 않습니다. 결과를 잘 쓰려면 발전 과정과 한계를 함께 이해해야 합니다. 이 차시에서는 규칙 기반 AI에서 LLM·Agent까지의 흐름과 유의점을 다룹니다.",

  objectives: [
    "머신러닝–딥러닝–생성형 모델의 발전 흐름을 설명할 수 있다.",
    "Transformer·LLM의 핵심 원리(자기어텐션·확률적 예측)를 설명할 수 있다.",
    "생성형 AI의 한계와 유의점을 수업 맥락에서 적용할 수 있다.",
  ],

  keyQuestion:
    "생성형 AI가 ‘그럴듯한’ 답을 만드는 원리를 알면, 왜 검증이 필수인지 어떻게 설명할 수 있을까?",

  conceptMap: {
    title: "챗봇에서 Agent로",
    caption: "발전 단계는 개념적 흐름이며, 실제 제품·모델명은 빠르게 변한다.",
    nodes: [
      { label: "Chatbot", description: "대화" },
      { label: "Reasoner", description: "추론" },
      { label: "Agent", description: "도구 사용·자율 수행" },
      { label: "Innovator/Organization", description: "확장 개념" },
    ],
  },

  theoryBlocks: [
    {
      heading: "AI 발전의 흐름",
      body: "초기 **규칙 기반 AI** → **머신러닝**(데이터로 학습) → **딥러닝** → **생성형 모델**로 이어집니다. **Teachable Machine**은 데이터 수집·학습·테스트·데이터 보강의 순환과 **편향·데이터 품질** 문제를 직접 체험하게 해 줍니다. GAN·VAE는 생성 모델의 역사적 이정표입니다.",
    },
    {
      heading: "Transformer와 LLM",
      body: "**Transformer**는 Self-Attention으로 긴 맥락을 처리합니다. **LLM**은 토큰 단위로 사전학습되어 **다음 토큰을 확률적으로 예측**하며 텍스트를 생성합니다. ‘ChatGPT’라는 이름 자체가 대화형(Chat) + 생성형 사전학습 트랜스포머(GPT)를 뜻합니다.",
    },
    {
      heading: "생성형 AI의 범위와 산업 계층",
      body: "생성형 AI는 텍스트·이미지·영상·음악·코드를 다룹니다. 산업은 계층으로 이해할 수 있습니다.\n\n- 반도체·하드웨어\n- 클라우드·인프라\n- 모델·플랫폼\n- 애플리케이션",
    },
    {
      heading: "사용상의 유의점",
      body: "- **할루시네이션**(그럴듯한 오답)\n- 편향\n- 개인정보\n- 평가 부정 사용\n- 저작권\n- 출처와 검증\n\n시장 규모 같은 수치는 핵심이 아니며, 사용한다면 출처·조사 시점을 밝히고 별도 업데이트 블록으로 다룹니다.",
    },
  ],

  compareTables: [
    {
      caption: "규칙 기반 vs 머신러닝 vs 생성형",
      headers: ["구분", "규칙 기반", "머신러닝", "생성형"],
      rows: [
        ["동작", "사람이 규칙 작성", "데이터로 패턴 학습", "새 콘텐츠 생성"],
        ["강점", "예측 가능", "복잡한 패턴", "유연한 생성"],
        ["약점", "확장 어려움", "데이터 의존", "할루시네이션"],
      ],
    },
  ],

  practice: {
    title: "분류 모델 만들기 또는 사실 검증",
    goal: "Teachable Machine으로 간단한 분류 모델을 만들거나, 생성형 AI 답변의 사실 검증 활동을 수행한다.",
    steps: [
      "A안: Teachable Machine에서 2~3개 클래스로 이미지/소리 분류 모델을 학습·테스트한다.",
      "A안: 데이터를 보강하며 편향·품질이 결과에 미치는 영향을 관찰한다.",
      "B안: 생성형 AI에 질문하고 답변의 사실을 공식 출처로 검증한다.",
      "B안: 오류·근거 부족 지점을 표시하고 수정 프롬프트를 작성한다.",
    ],
    checklist: [
      "데이터/출처의 한계를 기록했는가",
      "결과를 비판적으로 검토했는가",
      "개인정보를 입력하지 않았는가",
    ],
    deliverable: "모델 테스트 기록 또는 사실 검증 보고(오류·근거 표시).",
  },

  quiz: [
    {
      type: "mcq",
      question: "LLM이 텍스트를 만드는 기본 원리로 가장 적절한 것은?",
      choices: ["사실 데이터베이스 조회", "다음 토큰의 확률적 예측", "사람이 실시간 작성", "무작위 문자 생성"],
      answerIndex: 1,
      explanation: "LLM은 다음 토큰을 확률적으로 예측하며 생성합니다. 그래서 검증이 필요합니다.",
    },
    {
      type: "ox",
      question: "생성형 AI의 답은 항상 사실과 논리가 보장된다.",
      answer: false,
      explanation: "확률적 생성이므로 사실·논리가 자동 보장되지 않습니다(할루시네이션).",
    },
    {
      type: "self",
      question: "학생에게 ‘AI 답을 검증하라’를 가르칠 때 어떤 절차를 제시하겠어요?",
    },
  ],

  reflection: [
    "‘그럴듯함’과 ‘정확함’을 구분하는 나만의 검증 습관은 무엇인가요?",
    "수업에서 AI 사용 규칙을 정한다면 첫 번째 원칙은?",
  ],

  terms: [
    { term: "머신러닝", en: "Machine Learning", definition: "데이터로 패턴을 학습하는 방법." },
    { term: "Transformer", definition: "Self-Attention으로 긴 맥락을 처리하는 신경망 구조." },
    { term: "LLM", en: "대규모 언어 모델", definition: "다음 토큰을 확률적으로 예측해 언어를 생성하는 모델." },
    { term: "Agent", en: "에이전트", definition: "도구를 사용하며 여러 단계를 자율 수행하는 AI." },
    { term: "할루시네이션", en: "Hallucination", definition: "사실이 아닌 내용을 그럴듯하게 생성하는 현상." },
  ],

  sources: [
    { label: "Teachable Machine (공식)", url: "https://teachablemachine.withgoogle.com/", lastVerified: "2026-07-10" },
    { label: "업로드 강의 교안 — 디지털 교육 13강 재구성" },
  ],

  cautions: ["모델명·기능·시장 수치는 빠르게 변합니다. 사용 시 출처와 시점을 명시하세요."],
};
