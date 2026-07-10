import type { Session } from "@/types/content";

export const session05: Session = {
  id: "05",
  slug: "google-classroom-brisk",
  title: "Google Classroom과 Brisk Teaching 실습",
  category: "google",
  summary: "수업의 배포–수행–제출–피드백 흐름을 설계하고, AI 생성 자료를 검토하는 원칙을 익힌다.",
  duration: 90,
  level: "중급",
  keywords: ["Google Classroom", "Brisk Teaching", "루브릭", "AI 자료 검토", "형성평가"],
  theoryRatio: 50,
  practiceRatio: 50,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 5강"],

  overview:
    "좋은 플랫폼 활용은 기능 소개보다 수업의 배포·수행·제출·피드백 흐름을 설계하는 데 있습니다. 또한 AI가 만든 자료는 교사가 최종 검토하고 교육과정·학습자에 맞게 수정해야 합니다. 이 차시에서는 Classroom의 과제 흐름과 Brisk Teaching의 자료 생성·검토를 실습합니다.",

  objectives: [
    "Classroom의 화면 구조(스트림·수업·사람·성적)를 설명할 수 있다.",
    "Docs 과제와 Forms 퀴즈의 배포·채점 흐름을 설계할 수 있다.",
    "Brisk 생성 결과를 검토하는 5가지 원칙을 적용할 수 있다.",
  ],

  keyQuestion:
    "AI가 만든 자료를 그대로 쓰지 않으려면, 교사는 무엇을 기준으로 검토해야 할까?",

  conceptMap: {
    title: "과제의 생애주기",
    caption: "배포에서 피드백까지 하나의 흐름으로 설계할 때 플랫폼이 제 역할을 한다.",
    nodes: [
      { label: "배포", description: "템플릿·사본·루브릭 제공" },
      { label: "수행", description: "학생 작업" },
      { label: "제출", description: "제출/미제출 확인" },
      { label: "피드백", description: "댓글·루브릭·재제출" },
    ],
  },

  theoryBlocks: [
    {
      heading: "Classroom 화면 구조",
      body: "- **스트림**: 공지·활동 흐름\n- **수업**: 과제·자료를 주제별로 구조화\n- **사람**: 교사·학생 관리\n- **성적**: 채점·피드백\n\n주제(Topic)로 단원을 나누면 자료가 흩어지지 않습니다.",
    },
    {
      heading: "Docs 과제와 Forms 퀴즈",
      body: "Docs 과제는 **각 학생에게 사본 만들기**로 개별 작업을 보장하고, **루브릭**과 댓글로 피드백합니다. Forms 퀴즈는 정답·배점·자동 채점과 오답 분석을 제공해 형성평가에 강합니다.",
    },
    {
      heading: "Brisk Teaching이란",
      body: "Brisk는 브라우저 확장으로 Docs·웹 위에서 수업안·활동지·퀴즈·루브릭·예시 답안·수준별 자료·피드백 초안을 생성합니다. 핵심은 ‘초안 생성’이며, 교육적 판단은 교사의 몫입니다.",
    },
    {
      heading: "Brisk 결과 검토 원칙",
      body: "AI 생성 자료는 다음을 검토합니다.\n\n1. **성취기준과의 정렬**\n2. **난이도** 적정성\n3. **사실 검증**\n4. **표현과 편향**\n5. **개인정보** 노출 여부\n\nGemini와 NotebookLM은 이후 생성형 AI 차시(13~14)와 연결되는 예고 개념으로 간단히 소개합니다.",
    },
  ],

  compareTables: [
    {
      caption: "Docs 과제 vs Forms 퀴즈",
      headers: ["구분", "Docs 과제", "Forms 퀴즈"],
      rows: [
        ["적합 평가", "서술·과정형", "선택형·형성평가"],
        ["채점", "루브릭·댓글", "자동 채점"],
        ["피드백", "개별 코멘트", "오답 분석"],
        ["개별화", "학생별 사본", "분기 문항"],
      ],
    },
  ],

  practice: {
    title: "Classroom 과제 + Brisk 자료 만들기",
    goal: "Classroom에서 Docs 과제 또는 Forms 퀴즈를 만들고, Brisk로 루브릭 또는 수준별 자료를 생성해 검토한다.",
    steps: [
      "Classroom 수업 탭에 주제(Topic)를 만들고 과제 1개를 배포한다.",
      "Docs 과제는 ‘각 학생에게 사본’ + 루브릭을, Forms 퀴즈는 자동 채점을 설정한다.",
      "Brisk로 루브릭 또는 수준별 자료 초안을 생성한다.",
      "생성 결과를 5가지 원칙(정렬·난이도·사실·표현·개인정보)으로 검토하고 수정한다.",
    ],
    checklist: [
      "과제가 주제별로 구조화되었는가",
      "루브릭 또는 자동 채점이 목표와 정렬되는가",
      "AI 생성 자료를 검토·수정했는가",
    ],
    deliverable: "과제 링크(또는 스크린샷)와 Brisk 생성 자료의 ‘수정 전/후’ 메모.",
  },

  quiz: [
    {
      type: "mcq",
      question: "Brisk가 생성한 활동지를 사용할 때 가장 먼저 해야 할 일은?",
      choices: ["그대로 배포한다", "성취기준 정렬·사실 등을 교사가 검토·수정한다", "학생에게 검토를 맡긴다", "삭제한다"],
      answerIndex: 1,
      explanation: "AI 생성 자료는 교사의 검토와 수정이 전제입니다.",
    },
    {
      type: "ox",
      question: "Forms 퀴즈는 서술형 과정 평가에 가장 적합하다.",
      answer: false,
      explanation: "Forms 퀴즈는 선택형·형성평가에 강하고, 서술·과정형은 Docs 과제가 적합합니다.",
    },
    {
      type: "self",
      question: "내 단원 하나를 골라 ‘배포–수행–제출–피드백’ 흐름을 한 문장씩 설계해 보세요.",
    },
  ],

  reflection: [
    "AI 자료 검토 5원칙 중 내가 가장 놓치기 쉬운 것은 무엇인가요?",
    "루브릭을 먼저 만들면 과제 설계가 어떻게 달라질까요?",
  ],

  terms: [
    { term: "스트림", en: "Stream", definition: "Classroom의 공지·활동 흐름 화면." },
    { term: "루브릭", en: "Rubric", definition: "평가 기준과 수준을 표로 명시한 채점 틀." },
    { term: "Brisk Teaching", definition: "브라우저 확장으로 수업 자료 초안을 생성하는 교사용 AI 도구." },
    { term: "자동 채점", definition: "정답·배점을 설정해 시스템이 채점하는 기능." },
    { term: "형성평가", en: "Formative Assessment", definition: "학습 도중 이해를 확인해 수업을 조정하는 평가." },
  ],

  sources: [
    { label: "Google Classroom 도움말(공식)", url: "https://support.google.com/edu/classroom/", lastVerified: "2026-07-10" },
    { label: "Brisk Teaching(공식)", url: "https://www.briskteaching.com/", lastVerified: "2026-07-10" },  ],
};
