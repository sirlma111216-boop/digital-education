import type { Session } from "@/types/content";

export const session04: Session = {
  id: "04",
  slug: "google-workspace-ecosystem",
  title: "Google Workspace for Education 생태계",
  category: "google",
  summary: "하나의 계정과 Drive를 중심으로 연결되는 Google 학교 협업 생태계를 이해한다.",
  duration: 90,
  level: "입문",
  keywords: ["Google Workspace", "Drive", "Classroom", "Forms", "교육용 계정"],
  theoryRatio: 60,
  practiceRatio: 40,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 4강"],

  overview:
    "Google Workspace for Education은 개별 앱의 집합이 아니라 하나의 계정과 Drive를 중심으로 연결되는 학교 협업 생태계입니다. 이 차시에서는 교육용 기관 계정의 특성과 주요 앱의 역할, 그리고 실시간 협업의 흐름을 살펴봅니다.",

  objectives: [
    "일반 Google 계정과 교육용 기관 계정의 차이를 설명할 수 있다.",
    "Drive를 중심으로 앱들이 연결되는 구조를 도식화할 수 있다.",
    "Docs·Sheets·Slides·Forms·Classroom의 역할을 구분할 수 있다.",
  ],

  keyQuestion:
    "왜 ‘앱 하나하나’가 아니라 ‘계정과 Drive를 중심으로 연결된 생태계’로 이해해야 할까?",

  conceptMap: {
    title: "Google Workspace 연결 구조",
    caption: "Chromebook → Google 계정 → Workspace → Classroom → Drive 로 이어지는 하나의 흐름.",
    nodes: [
      { label: "Chromebook", description: "기기" },
      { label: "Google 계정", description: "정체성·권한의 중심" },
      { label: "Workspace 앱", description: "Docs·Sheets·Slides·Forms·Meet" },
      { label: "Classroom", description: "LMS 역할" },
      { label: "Drive", description: "저장·공유·권한의 허브" },
    ],
  },

  theoryBlocks: [
    {
      heading: "일반 계정과 교육용 기관 계정",
      body: "교육용(기관) 계정은 관리자가 보안·개인정보·앱 사용 정책을 통제할 수 있고, 학생 데이터 보호를 위한 별도 약정이 적용됩니다. 개인 계정과 정책·기능이 다르므로, 수업에서는 반드시 기관 계정 기준으로 확인해야 합니다.",
    },
    {
      heading: "Drive: 생태계의 허브",
      body: "Drive는 저장을 넘어 **공유·권한·공동 편집**의 중심입니다. 폴더 구조와 파일명 규칙을 처음에 잘 세우면, 이후 모든 앱의 협업이 정돈됩니다. 보기/편집/특정 사용자/조직 내부 등 권한 범위를 의식적으로 선택해야 합니다.",
    },
    {
      heading: "앱의 역할",
      body: "- **Docs·Slides·Sheets**: 실시간 공동 편집 문서·발표·표\n- **Forms**: 설문과 퀴즈(자동 채점)\n- **Meet·Chat**: 화상·메신저 소통\n- **Classroom**: 과제 배포·제출·피드백을 관리하는 LMS 역할\n\n각 앱은 Drive와 계정을 통해 서로 연결됩니다.",
    },
    {
      heading: "개인정보와 정책 점검",
      body: "교육용 계정을 사용할 때도 학생의 데이터가 어디에 저장되고 누가 접근하는지 확인해야 합니다. 외부 확장·서드파티 앱 연동 시 특히 주의가 필요합니다.",
    },
  ],

  compareTables: [
    {
      caption: "주요 앱 역할 비교",
      headers: ["앱", "핵심 역할", "대표 수업 활용"],
      rows: [
        ["Docs", "공동 문서 작성", "협동 글쓰기·피드백"],
        ["Sheets", "표·데이터", "탐구 데이터 정리"],
        ["Slides", "발표 자료", "모둠 발표"],
        ["Forms", "설문·퀴즈", "진단·형성평가"],
        ["Classroom", "LMS", "과제 배포·제출·성적"],
      ],
    },
  ],

  practice: {
    title: "Drive 기반 협업 흐름 경험하기",
    goal: "Drive 폴더 구조를 만들고 Docs 공동 편집과 Forms 응답 수합까지 하나의 흐름으로 경험한다.",
    steps: [
      "수업용 Drive 폴더 구조를 설계한다(예: 00_공지 / 01_자료 / 02_학생제출).",
      "Docs 문서 1개를 만들어 공동 편집 권한을 설정하고 동료와 함께 편집한다.",
      "Forms로 간단한 설문 또는 퀴즈를 만들고 응답을 Sheets로 수합한다.",
      "폴더·파일 권한 범위(보기/편집/조직 내부)를 점검한다.",
    ],
    checklist: [
      "폴더 구조와 파일명 규칙이 일관적인가",
      "공동 편집 권한이 의도대로 설정되었는가",
      "Forms 응답이 Sheets로 정상 수합되는가",
    ],
    deliverable: "Drive 폴더 링크와 Forms 응답 요약(개인정보 제외).",
  },

  quiz: [
    {
      type: "mcq",
      question: "Google Workspace 생태계에서 저장·공유·권한의 허브 역할을 하는 것은?",
      choices: ["Gmail", "Drive", "Meet", "Chat"],
      answerIndex: 1,
      explanation: "Drive가 저장·공유·권한·공동 편집의 중심 허브입니다.",
    },
    {
      type: "ox",
      question: "교육용 기관 계정과 개인 계정은 보안·개인정보 정책이 동일하다.",
      answer: false,
      explanation: "기관 계정은 관리자가 정책을 통제하며 학생 데이터 보호 약정이 적용됩니다.",
    },
    {
      type: "self",
      question: "내 수업의 Drive 폴더 구조를 3단계로 스케치해 보세요.",
    },
  ],

  reflection: [
    "지금 내 자료 공유 방식에서 권한 범위 때문에 생겼던 문제는 없었나요?",
    "Classroom을 LMS로 쓸 때 가장 먼저 자동화하고 싶은 흐름은 무엇인가요?",
  ],

  terms: [
    { term: "Google Workspace for Education", definition: "학교용 Google 협업 앱 묶음과 관리 환경." },
    { term: "Drive", definition: "저장·공유·권한·공동 편집의 중심 클라우드 저장소." },
    { term: "Classroom", definition: "과제 배포·제출·피드백을 관리하는 Google의 LMS." },
    { term: "Forms", definition: "설문과 자동 채점 퀴즈를 만드는 도구." },
    { term: "기관 계정", definition: "관리자가 보안·정책을 통제하는 교육용 조직 계정." },
  ],

  sources: [
    { label: "Google Workspace for Education (공식)", url: "https://edu.google.com/workspace-for-education/", lastVerified: "2026-07-10" },  ],
};
