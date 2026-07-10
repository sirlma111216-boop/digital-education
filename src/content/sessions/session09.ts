import type { Session } from "@/types/content";

export const session09: Session = {
  id: "09",
  slug: "onenote-class-notebook-whiteboard",
  title: "OneNote Class Notebook과 Whiteboard",
  category: "microsoft",
  summary: "자료 제공·학생 개별 작업·협업을 한 구조로 운영하는 Class Notebook과 Whiteboard를 익힌다.",
  duration: 90,
  level: "중급",
  keywords: ["OneNote", "Class Notebook", "협업 공간", "Whiteboard", "포트폴리오"],
  theoryRatio: 55,
  practiceRatio: 45,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 9강"],

  overview:
    "OneNote는 자유로운 전자 필기장이며, Class Notebook은 자료 제공·학생 개별 작업·협업을 한 구조에서 운영하게 해 줍니다. 이 차시에서는 필기장 계층 구조와 Class Notebook의 네 공간, 그리고 Whiteboard의 협업 활용을 다룹니다.",

  objectives: [
    "Notebook–Section–Page 구조를 설명할 수 있다.",
    "Class Notebook의 네 공간을 구분해 활용할 수 있다.",
    "포트폴리오·협업 등 다양한 운영 시나리오를 설계할 수 있다.",
  ],

  keyQuestion:
    "‘자료 제공’과 ‘학생 개별 작업’과 ‘협업’을 어떻게 한 공간에서 동시에 운영할 수 있을까?",

  conceptMap: {
    title: "Class Notebook의 네 공간",
    caption: "교사 전용·콘텐츠 라이브러리·협업·학생 개인 공간이 한 필기장 안에 공존한다.",
    nodes: [
      { label: "교사 전용", description: "교사만 보는 공간" },
      { label: "콘텐츠 라이브러리", description: "읽기 전용 자료 배포" },
      { label: "협업 공간", description: "함께 편집" },
      { label: "학생 개인 공간", description: "학생별 비공개 작업" },
    ],
  },

  theoryBlocks: [
    {
      heading: "OneNote 기본 구조",
      body: "Notebook > Section > Page의 계층으로 자유롭게 필기합니다. 텍스트·그림·표·파일·오디오·펜 필기를 담고, OneDrive 기반으로 자동 저장·동기화·검색됩니다.",
    },
    {
      heading: "Class Notebook의 네 공간",
      body: "- **교사 전용**: 교사만 접근\n- **콘텐츠 라이브러리**: 읽기 전용 자료 배포\n- **협업 공간**: 함께 편집\n- **학생 개인 공간**: 학생마다 비공개, 교사는 열람\n\n이 구조 덕분에 자료 제공·개별 작업·협업을 한 필기장에서 운영할 수 있습니다.",
    },
    {
      heading: "운영 시나리오",
      body: "개인 교무수첩, 수업용 전자 필기장, 학생 장기 포트폴리오, 회의록·연구회 기록 등으로 활용할 수 있습니다. 단, **상담 기록**은 개인정보와 접근 권한을 특별히 주의해야 합니다.",
    },
    {
      heading: "Microsoft Whiteboard",
      body: "Whiteboard는 브레인스토밍·마인드맵·공동 스케치·수업 전후 생각 비교에 적합한 무한 캔버스입니다. Teams 회의와 연동해 실시간 협업을 지원합니다.",
    },
  ],

  compareTables: [
    {
      caption: "OneNote vs Whiteboard",
      headers: ["구분", "OneNote", "Whiteboard"],
      rows: [
        ["형태", "구조화된 필기장", "무한 캔버스"],
        ["강점", "자료 축적·포트폴리오", "발산적 협업"],
        ["적합 활동", "정리·기록", "브레인스토밍"],
      ],
    },
  ],

  practice: {
    title: "단원 Class Notebook 구조 설계",
    goal: "단원 1개의 Class Notebook 구조와 학생 페이지 배포 계획을 만든다.",
    steps: [
      "단원의 콘텐츠 라이브러리에 배포할 자료 목록을 정한다.",
      "학생 개인 공간에 배포할 페이지(활동지 등)를 설계한다.",
      "협업 공간에서 진행할 모둠 활동을 1개 정한다.",
      "검토·피드백 방식을 정한다.",
    ],
    checklist: [
      "네 공간의 용도가 명확한가",
      "학생 개인 공간이 비공개로 설정되는가",
      "피드백 흐름이 정해졌는가",
    ],
    deliverable: "Class Notebook 구조도 + 페이지 배포 계획.",
  },

  quiz: [
    {
      type: "mcq",
      question: "Class Notebook에서 ‘읽기 전용 자료 배포’에 쓰는 공간은?",
      choices: ["교사 전용", "콘텐츠 라이브러리", "협업 공간", "학생 개인 공간"],
      answerIndex: 1,
      explanation: "콘텐츠 라이브러리는 읽기 전용 자료 배포 공간입니다.",
    },
    {
      type: "ox",
      question: "학생 개인 공간은 다른 학생도 열람할 수 있다.",
      answer: false,
      explanation: "학생 개인 공간은 학생별 비공개이며 교사만 열람합니다.",
    },
    {
      type: "self",
      question: "Whiteboard로 ‘수업 전/후 생각 비교’ 활동을 어떻게 설계할지 적어 보세요.",
    },
  ],

  reflection: [
    "포트폴리오를 축적한다면 어떤 페이지를 학기 내내 이어 가고 싶나요?",
    "상담 기록을 다룰 때 접근 권한을 어떻게 제한하겠어요?",
  ],

  terms: [
    { term: "Notebook/Section/Page", definition: "OneNote의 필기장–구역–페이지 계층." },
    { term: "콘텐츠 라이브러리", en: "Content Library", definition: "학생에게 읽기 전용으로 자료를 배포하는 공간." },
    { term: "협업 공간", en: "Collaboration Space", definition: "학생·교사가 함께 편집하는 공간." },
    { term: "학생 개인 공간", definition: "학생마다 비공개인 개별 작업 공간(교사 열람)." },
    { term: "Microsoft Whiteboard", definition: "브레인스토밍·공동 스케치용 무한 캔버스." },
  ],

  sources: [
    { label: "OneNote Class Notebook (공식)", url: "https://www.onenote.com/classnotebook", lastVerified: "2026-07-10" },  ],

  cautions: ["상담 기록 등 민감 정보는 개인정보와 접근 권한을 특별히 주의하세요."],
};
