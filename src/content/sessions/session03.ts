import type { Session } from "@/types/content";

export const session03: Session = {
  id: "03",
  slug: "personalized-learning-tpack-terms",
  title: "개인 맞춤형 학습, ITS, TPACK과 에듀테크 핵심 용어",
  category: "theory",
  summary: "개인 맞춤형 학습의 시스템적 이해, TPACK, 그리고 에듀테크 핵심 용어를 구조화한다.",
  duration: 90,
  level: "입문",
  keywords: ["개인 맞춤형 학습", "ITS", "TPACK", "LMS", "에듀테크 용어"],
  theoryRatio: 100,
  practiceRatio: 0,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 3강"],

  overview:
    "개인 맞춤형 학습은 도구 하나가 아니라 데이터·분석·피드백·교사 조율이 연결된 시스템입니다. 이 차시에서는 AI 튜터 기반 맞춤형 학습의 흐름, 교사 전문성의 틀인 TPACK, 그리고 앞으로 계속 만날 에듀테크 핵심 용어를 구조화합니다.",

  objectives: [
    "개인 맞춤형 학습을 데이터–분석–피드백–조율의 순환으로 설명할 수 있다.",
    "TPACK의 일곱 영역을 구분하고 좋은 디지털 수업과 연결할 수 있다.",
    "학습 방식·플랫폼·데이터 관련 핵심 용어를 범주로 묶어 설명할 수 있다.",
  ],

  keyQuestion:
    "‘맞춤형 학습’이 단순한 문제풀이 앱을 넘어서려면, 어떤 요소들이 함께 작동해야 할까?",

  conceptMap: {
    title: "개인 맞춤형 학습의 5단계 순환",
    caption: "데이터가 순환하며 학습이 개인에게 맞춰지되, 마지막에는 반드시 교사의 조율이 있다.",
    nodes: [
      { label: "① 학습 활동 입력", description: "학생의 수행·반응" },
      { label: "② 데이터화", description: "활동을 데이터로 기록" },
      { label: "③ 분석", description: "수준·경로 진단" },
      { label: "④ 적응·피드백", description: "난이도·자료 조정" },
      { label: "⑤ 교사의 조율", description: "데이터를 해석해 수업으로 연결" },
    ],
  },

  theoryBlocks: [
    {
      heading: "AI 튜터 기반 맞춤형 학습의 흐름",
      body: "인공지능 튜터는 학생의 활동을 데이터로 바꾸고 분석해 적응적 피드백을 제공합니다. 그러나 이 순환의 마지막 고리는 **교사의 조율**입니다. 데이터는 판단을 돕는 재료이지, 교사를 대체하는 결론이 아닙니다. 1인 1디바이스, 학습 데이터 표준, LMS, 그리고 가정과 교실의 연결이 이 순환을 뒷받침합니다.",
    },
    {
      heading: "TPACK: 교사 전문성의 세 지식",
      body: "**TPACK**은 세 가지 지식이 교차하는 지점입니다.\n\n- **CK** 내용 지식 · **PK** 교수법 지식 · **TK** 기술 지식\n- 이들이 둘씩 만나면 **PCK**(교수내용), **TPK**(기술교수), **TCK**(기술내용)\n- 셋이 모두 만나는 중심이 **TPACK**\n\n좋은 디지털 수업은 기술 지식(TK)만으로 완성되지 않으며, 내용·교수법과 결합할 때 비로소 힘을 냅니다.",
    },
    {
      heading: "학습 방식 용어 정리",
      body: "- **e-Learning / Blended / Hybrid**: 온라인·대면의 결합 정도\n- **Adaptive / Personalized**: 반응에 따른 조정 vs 학습자 맞춤 전반\n- **Microlearning / On-demand**: 짧은 단위·필요할 때\n- **Synchronous / Asynchronous**: 실시간 vs 비실시간\n- **PBL / PjBL / Competency-Based / Social Learning**: 문제·프로젝트·역량·사회적 학습",
    },
    {
      heading: "플랫폼·기기·데이터 용어",
      body: "- **플랫폼**: LMS(학습관리) · CMS(콘텐츠관리) · SIS(학생정보) · Builder · All-in-one\n- **기기·AI 도구**: MDM(기기관리) · ITS(지능형 튜터) · DTS · AI Courseware\n- **운영·데이터**: BYOD · OER · Educational Data Mining · Data Governance · Dashboard · DX · UI · UX · Drilling/Practice\n\n용어는 암기 대상이 아니라 **서로의 관계**로 이해할 때 오래 남습니다.",
    },
  ],

  compareTables: [
    {
      caption: "적응형 학습 vs 개인 맞춤형 학습",
      headers: ["구분", "Adaptive Learning", "Personalized Learning"],
      rows: [
        ["초점", "반응에 따른 난이도·경로 조정", "학습자 전반(수준·속도·관심)에 맞춘 설계"],
        ["주도", "주로 시스템", "학습자+교사+시스템"],
        ["범위", "콘텐츠 경로", "목표·활동·지원 전반"],
      ],
    },
  ],

  quiz: [
    {
      type: "mcq",
      question: "개인 맞춤형 학습의 5단계 순환에서 마지막 고리로 강조되는 것은?",
      choices: ["더 많은 데이터 수집", "자동 채점", "교사의 조율", "새 앱 도입"],
      answerIndex: 2,
      explanation: "데이터·분석·피드백은 교사의 해석과 조율로 완성됩니다.",
    },
    {
      type: "mcq",
      question: "TPACK에서 ‘기술 지식(TK)만으로는 좋은 수업이 완성되지 않는다’가 의미하는 바로 가장 적절한 것은?",
      choices: [
        "기술을 배우면 안 된다",
        "내용·교수법 지식과 결합해야 한다",
        "교수법이 가장 덜 중요하다",
        "내용 지식은 필요 없다",
      ],
      answerIndex: 1,
      explanation: "TPACK은 CK·PK·TK의 결합을 강조합니다.",
    },
    {
      type: "self",
      question: "LMS·CMS·SIS를 각각 학교 현장의 실제 상황 하나와 연결해 설명해 보세요.",
    },
  ],

  reflection: [
    "내가 자주 쓰는 도구는 TPACK의 어느 조합에 가까운가요? 부족한 축은 무엇인가요?",
    "맞춤형 학습 데이터를 볼 때, 학생을 ‘낙인’이 아니라 ‘지원’으로 잇는 방법은 무엇일까요?",
  ],

  terms: [
    { term: "TPACK", definition: "내용·교수법·기술 지식이 교차하는 교사 전문성 틀." },
    { term: "ITS", en: "지능형 튜터링 시스템", definition: "학습 데이터를 분석해 적응적 피드백을 주는 시스템." },
    { term: "LMS", en: "학습관리시스템", definition: "수업 자료·과제·평가·소통을 관리하는 시스템." },
    { term: "Adaptive Learning", en: "적응형 학습", definition: "학습자 반응에 따라 난이도·경로를 조정하는 학습." },
    { term: "Data Governance", en: "데이터 거버넌스", definition: "학교 데이터의 수집·보관·접근·삭제를 규정하는 관리 체계." },
    { term: "BYOD", definition: "학생 개인 기기를 수업에 활용하는 정책." },
  ],

  sources: [
    { label: "TPACK.org (공식)", url: "https://tpack.org/", lastVerified: "2026-07-10" },
    { label: "업로드 강의 교안 — 디지털 교육 3강 재구성" },
  ],

  cautions: [
    "이 차시는 핵심 개념과 용어를 구조화하는 데 집중합니다. 별도의 실습 활동이나 제출 과제가 없습니다.",
  ],
};
