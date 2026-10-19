import type { Session } from "@/types/content";

export const session05: Session = {
  id: "05",
  slug: "google-ai-for-education",
  title: "구글의 교육용 AI 서비스",
  category: "google",
  summary: "교사용 AI 도우미 Brisk Teaching, 직접 만들어 보는 Google AI Studio, 자료 기반 학습 파트너 Gemini Notebook(이전 NotebookLM)을 비교하며 교육적 활용 원칙을 익힌다.",
  duration: 90,
  level: "중급",
  keywords: ["Brisk Teaching", "Google AI Studio", "Gemini Notebook", "NotebookLM", "교육용 AI"],
  theoryRatio: 50,
  practiceRatio: 50,
  published: true,
  lastUpdated: "2026-10-19",
  sourceFiles: ["디지털 교육 교안 5강"],

  overview:
    "4차시에서 Google Workspace와 Classroom으로 수업의 뼈대를 세웠다면, 이번 차시에서는 그 위에서 쓰는 AI 서비스를 살펴봅니다. 세 가지 도구를 다룹니다. 지금 보는 브라우저 화면 위에서 수업 자료와 피드백을 만들어 주는 교사용 도우미 **Brisk Teaching**, Gemini 모델을 직접 시험하고 말로 설명해 수업용 앱까지 만들어 보는 **Google AI Studio**, 그리고 내가 넣은 자료만을 근거로 요약·질문·오디오 해설·퀴즈를 만들어 주는 **Gemini Notebook(이전 NotebookLM)** 입니다. 세 도구는 각각 ‘만들어 주는 AI’, ‘직접 만드는 AI’, ‘자료로 공부하는 AI’라는 서로 다른 역할을 합니다. 각 도구의 개요와 주요 기능, 교육적 활용 방법을 익히고, AI 결과를 검토하고 학생 데이터를 지키는 원칙까지 함께 정리합니다.",

  objectives: [
    "Brisk Teaching, Google AI Studio, Gemini Notebook의 성격과 역할 차이를 설명할 수 있다.",
    "Brisk Teaching으로 수업 자료·수준별 자료·피드백 초안을 만들고 교사 관점으로 고칠 수 있다.",
    "Google AI Studio에서 프롬프트를 시험하고, 말로 설명해 간단한 수업용 웹앱 초안을 만들 수 있다.",
    "Gemini Notebook에 수업 자료를 넣어 근거 있는 요약·오디오 해설·퀴즈를 만들고, 출처를 확인할 수 있다.",
  ],

  keyQuestion:
    "AI가 자료를 만들어 주고, 앱을 만들어 주고, 함께 공부해 준다면 — 교사는 어떤 도구를 언제 고르고, 무엇을 직접 확인해야 할까?",

  conceptMap: {
    title: "구글 생태계의 교육용 AI 세 가지",
    caption: "같은 Gemini 계열 AI라도, 무엇을 맡기느냐에 따라 고를 도구가 달라진다. 어떤 도구든 마지막 확인은 교사의 몫이다.",
    nodes: [
      { label: "Brisk Teaching", description: "만들어 주는 AI — 수업 자료·피드백 초안" },
      { label: "Google AI Studio", description: "직접 만드는 AI — 프롬프트 실험·앱 제작" },
      { label: "Gemini Notebook", description: "자료로 공부하는 AI — 출처 기반 요약·학습 자료" },
      { label: "교사의 검토", description: "사실·난이도·개인정보 확인" },
    ],
  },

  theoryBlocks: [
    /* ---------------- 도입 ---------------- */
    {
      heading: "왜 ‘구글의 교육용 AI’를 함께 보나",
      body: "학교에서 Google Workspace for Education을 쓰고 있다면, 같은 계정으로 여러 AI 서비스를 바로 이어서 쓸 수 있습니다. 이번 차시의 세 도구는 다음처럼 역할이 나뉩니다.\n\n| 도구 | 한 줄 요약 | 주로 쓰는 사람 |\n|---|---|---|\n| **Brisk Teaching** | 지금 보는 화면으로 수업 자료·피드백을 **만들어 주는** AI | 교사 |\n| **Google AI Studio** | Gemini를 시험하고 앱까지 **직접 만드는** AI 작업실 | 교사(성인) |\n| **Gemini Notebook** | 내가 넣은 자료만 근거로 **함께 공부하는** AI | 교사·학생 |\n\n엄밀히 말하면 **Brisk Teaching은 Google이 만든 서비스가 아닙니다.** 미국 교육 기업이 만든 교사용 AI 확장 프로그램으로, Google Docs·Slides·Classroom 위에서 가장 잘 동작해서 구글 생태계 도구와 함께 소개합니다.",
    },

    /* ---------------- 1. Brisk Teaching ---------------- */
    {
      heading: "① Brisk Teaching — 개요",
      body: "**Brisk Teaching**(brisk: ‘빠른, 활발한’)은 교사를 위한 **시간 절약형 AI 보조 도구**입니다. Chrome·Edge 브라우저에 확장 프로그램으로 설치하면 화면 한쪽에 Brisk 버튼이 생기고, 지금 열어 둔 **Google Docs·Slides, PDF, YouTube 영상, 웹 기사** 위에서 바로 수업 자료를 만들거나 학생 글에 피드백을 줄 수 있습니다. Microsoft Word 같은 환경에서도 쓸 수 있고, 웹사이트에서 바로 쓰는 버전도 있습니다.\n\n**주요 기능 다섯 가지**\n1. **생성(만들기)** — 유튜브·웹페이지 등의 내용을 바탕으로 퀴즈, 프레젠테이션, 루브릭 채점표, 지도안, DOK 질문 등을 만듭니다.\n2. **피드백 제공** — 학생이 쓴 글에 첨삭 코멘트와 루브릭 기반 피드백을 답니다.\n3. **글쓰기 검사** — Replay 기능으로 학생의 문서 수정·붙여넣기 기록을 단계별로 확인합니다.\n4. **레벨 변경** — 뉴스·웹페이지 등을 학생의 독해 수준에 맞게 조정합니다.\n5. **Boost 학생 활동** — 자료를 바탕으로 참여·평가·쓰기 활동을 만들고 진행을 돕습니다.\n\n**2026년 새 버전**에서는 원하는 것을 **대화하듯 말하면** 알맞은 도구를 찾아 주고, 결과도 대화로 고칠 수 있게 바뀌었습니다(기존 화면은 2026년 12월 31일까지 전환해 쓸 수 있음). 메뉴 이름과 배치가 아래 화면과 조금 다를 수 있습니다.\n\n4차시의 Gemini in Classroom이 **Classroom 안의 AI**라면, Brisk는 **브라우저 어디서나 따라다니는 교사용 AI**입니다.",
      images: [
        { src: "/assets/sessions/05/brisk-overview.webp", alt: "Brisk Teaching 소개와 주요 기능 다섯 가지(생성, 피드백 제공, 글쓰기 검사, 레벨 변경, Boost 학생 활동)", caption: "Brisk Teaching의 다섯 가지 주요 기능" },
      ],
    },
    {
      heading: "Brisk Teaching — 설치와 한국어 설정",
      body: "1. Chrome 브라우저에서 **briskteaching.com/ko** 에 접속합니다(검색창에 ‘Brisk’를 검색해도 됩니다).\n2. 오른쪽 위의 **‘무료로 크롬에 추가하기’** 를 누릅니다.\n3. Chrome 웹 스토어에서 **‘Chrome에 추가’ → ‘확장 프로그램 추가’** 를 누릅니다.\n4. 브라우저 오른쪽 위의 **확장 프로그램(퍼즐 모양)** 을 누르고, Brisk Teaching 옆의 **압정**을 눌러 고정합니다.\n5. Brisk 아이콘을 눌러 **Google 계정으로 로그인**합니다(약관 동의 → ‘Continue with Google’).\n6. Brisk 아이콘 → **[…] → [Language & Region]** 에서 **한국어**를 고르면 모든 메뉴가 한국어로 바뀝니다.\n\n학교 기기나 학교 계정에서는 확장 프로그램 설치가 관리자 설정으로 막혀 있을 수 있습니다. 설치 전에 학교의 정보보호 지침을 확인하세요.",
      imageLayout: "row",
      images: [
        { src: "/assets/sessions/05/brisk-install-1.webp", alt: "Brisk 사이트에서 무료로 크롬에 추가하기를 누르고, Chrome 웹 스토어에서 확장 프로그램을 추가하는 화면", caption: "크롬에 추가 → 확장 프로그램 추가" },
        { src: "/assets/sessions/05/brisk-install-2.webp", alt: "Chrome 확장 프로그램 메뉴에서 Brisk Teaching 옆 압정을 눌러 고정하는 화면", caption: "확장 프로그램 메뉴에서 압정으로 고정" },
        { src: "/assets/sessions/05/brisk-install-3.webp", alt: "Brisk 아이콘을 눌러 Google 계정으로 로그인하는 화면", caption: "Google 계정으로 로그인" },
        { src: "/assets/sessions/05/brisk-install-4.webp", alt: "Brisk 메뉴의 Language & Region에서 한국어를 선택하는 화면", caption: "Language & Region에서 한국어 선택" },
      ],
    },
    {
      heading: "Brisk Teaching — 생성(만들기)",
      body: "지금 열어 둔 페이지(유튜브 영상, 웹 기사, Google 문서 등)를 바탕으로 수업 자료를 만듭니다. 생성하기 전에 **참고하는 자료 유형**(예: 유튜브 비디오)과 **출력 언어**를 꼭 확인하세요.\n\n| 자료 | 순서 | 결과 |\n|---|---|---|\n| **퀴즈** | 생성 → 퀴즈 → 학년·문제 유형·문제 수 → 문서 또는 설문지 | Google 문서나 Google Forms 퀴즈. 이후 Brisk로 문제 추가, 답안지, 번역 |\n| **프레젠테이션** | 생성 → 프레젠테이션 → 학년·슬라이드 수·이미지 여부·템플릿 | Google Slides(이미지 출처는 슬라이드 아래 표시) |\n| **DOK 질문** | 생성 → DOK 질문 → 학년 | 지식의 깊이(DOK) 단계별 심층 질문과 활동 아이디어 |\n| **수업 계획(지도안)** | 생성 → 수업 계획 → 학년·수업 시간 | 수업 목표, 준비물, 수업 진행 시나리오 |\n| **평가 기준표(루브릭)** | 생성 → 평가 기준표 → 평가 요소·학년·척도 | 평가 요소 × 단계 루브릭 표 |\n\n**DOK(Depth of Knowledge, 지식의 깊이)** 는 질문을 ‘회상·재생산 → 기술·개념 → 전략적 사고 → 확장적 사고’의 깊이로 나누는 틀입니다. 한 자료로 여러 수준의 질문을 고르게 만들 때 유용합니다.",
      imageLayout: "row",
      images: [
        { src: "/assets/sessions/05/brisk-create-quiz.webp", alt: "유튜브 영상을 바탕으로 Brisk 퀴즈 생성 옵션을 고르고, Google Forms 퀴즈가 만들어진 화면", caption: "퀴즈 생성 — 자료 유형과 언어를 확인" },
        { src: "/assets/sessions/05/brisk-create-quiz-more.webp", alt: "생성된 퀴즈에서 Brisk로 문제 추가, 답안지, 번역을 고르는 화면", caption: "생성 후 문제 추가·답안지·번역" },
        { src: "/assets/sessions/05/brisk-create-slides.webp", alt: "유튜브 영상을 바탕으로 템플릿을 골라 Google Slides 프레젠테이션을 만든 화면", caption: "프레젠테이션 생성" },
        { src: "/assets/sessions/05/brisk-create-dok.webp", alt: "웹페이지를 바탕으로 DOK 단계별 심층 질문을 만든 화면", caption: "DOK(지식의 깊이) 질문 생성" },
        { src: "/assets/sessions/05/brisk-create-lesson-plan.webp", alt: "웹페이지를 바탕으로 수업 목표, 준비물, 수업 진행이 담긴 수업 계획을 만든 화면", caption: "수업 계획(지도안) 생성" },
        { src: "/assets/sessions/05/brisk-create-rubric.webp", alt: "평가 요소를 입력해 5단계 루브릭 채점 기준표를 만든 화면", caption: "루브릭(평가 기준표) 생성" },
      ],
    },
    {
      heading: "Brisk Teaching — 피드백 제공",
      body: "학생이 Google 문서로 낸 글을 열고 **피드백 제공**을 누릅니다. 학년을 고르고, **프롬프트를 입력하거나 채점 기준표(루브릭)를 업로드**한 뒤 생성합니다.\n\n- **루브릭 기준** — 루브릭의 평가 요소별로 잘한 점과 보완할 점을 정리해 줍니다.\n- **대상 지정** — 글의 특정 문장에 **Google 문서 댓글**로 첨삭을 답니다. 학생은 자기 글 옆에서 바로 피드백을 봅니다.\n- **발전 & 성장(Glow & Grow)** — **Glow(잘한 점)**, **Grow(성장할 점)**, **Wondering(더 생각해 볼 질문)** 으로 나눠 피드백합니다.\n\n만들어진 피드백은 **‘모두 복사’ 또는 ‘삽입’** 으로 문서에 넣기 전에 교사가 읽고 고칩니다. AI가 쓴 문장을 그대로 주기보다 **우리 반 학생에게 맞는 말투와 구체적인 예**를 더하는 것이 좋습니다.",
      imageLayout: "row",
      images: [
        { src: "/assets/sessions/05/brisk-feedback-rubric.webp", alt: "학생 글에 루브릭 기준 피드백을 생성한 화면", caption: "루브릭 기준 피드백" },
        { src: "/assets/sessions/05/brisk-feedback-comments.webp", alt: "학생 글의 특정 문장에 Google 문서 댓글로 피드백이 달린 화면", caption: "대상 지정 — 문서 댓글로 첨삭" },
        { src: "/assets/sessions/05/brisk-feedback-glow-grow.webp", alt: "Glow, Grow, Wondering으로 나뉜 발전과 성장 피드백 화면", caption: "발전 & 성장(Glow·Grow·Wondering)" },
      ],
    },
    {
      heading: "Brisk Teaching — 글쓰기 검사와 레벨 변경",
      body: "**글쓰기 검사(Inspect Writing)** — Google 문서에서만 쓸 수 있습니다. 학생의 문서를 열고 글쓰기 검사를 누르면 **붙여넣기 횟수, 수정 횟수, 작성 소요 시간**을 보여 주고, **Replay**로 글이 써진 과정을 처음부터 다시 재생합니다. 붙여넣은 부분은 색으로 표시됩니다.\n\n- 결과는 ‘AI 사용 여부의 증거’가 아니라 **대화의 실마리**입니다. 학생과 함께 과정을 보며 어떻게 썼는지 묻는 데 씁니다.\n- 과제를 내기 전에 **글쓰기 과정이 피드백에 쓰인다는 것을 학생에게 미리 알립니다**.\n\n**레벨 변경(Change Level)** — 뉴스·웹페이지·문서의 **읽기 레벨을 먼저 판별**한 뒤, 원하는 **학년 수준을 골라** 다시 쓴 글을 Google 문서로 만들어 줍니다. 같은 내용을 수준별 읽기 자료로 나누거나, 어려운 개념 글을 쉽게 풀어 줄 때 씁니다. 바꾼 글은 **용어가 빠지거나 뜻이 달라지지 않았는지** 원문과 비교해 확인합니다.",
      imageLayout: "row",
      images: [
        { src: "/assets/sessions/05/brisk-inspect-writing.webp", alt: "Google 문서에서 붙여넣기 횟수, 수정 횟수, 작성 시간과 Replay 재생 막대가 표시된 글쓰기 검사 화면", caption: "글쓰기 검사 — 붙여넣기·수정 횟수와 Replay" },
        { src: "/assets/sessions/05/brisk-change-level.webp", alt: "웹페이지와 문서의 읽기 레벨을 바꿔 새 Google 문서로 만든 화면", caption: "레벨 변경 — 학년 수준에 맞춰 다시 쓰기" },
      ],
    },
    {
      heading: "Brisk Teaching — Boost 학생 활동",
      body: "**Boost 학생 활동**은 지금 보는 자료를 바탕으로 **학생이 직접 AI와 상호작용하는 활동**을 만듭니다. 활동은 **참여·평가·쓰기** 세 갈래, 총 13가지입니다.\n\n| 구분 | 활동 |\n|---|---|\n| **참여** | 튜터, 후크(수업 도입), 캐릭터 채팅, 토론, 조사, 브레인스토밍, 실생활 수학 |\n| **평가** | 학습 이해도 확인, 출구 티켓 |\n| **쓰기** | 글쓰기 코치, 빛나는 점 & 성장할 점, 다음 단계, 목표 설정 |\n\n**운영 순서**\n1. 활동을 고른 뒤 **학생 활동 공간을 편집**합니다(학습 목표, 안내 문구 등).\n2. **QR 코드 또는 사이트(app.briskteaching.com/show)와 입장 코드**로 학생에게 공유합니다. Classroom에 링크로 올릴 수도 있습니다.\n3. 교사 화면에서 **학생 전체 또는 개별 진행 상황을 실시간으로 확인**하고, 학생과 AI의 **대화 기록을 내려받을** 수 있습니다.\n\n학생이 AI와 대화하는 활동이므로, 시작 전에 **개인정보를 쓰지 않기**와 **AI 답을 그대로 믿지 않기**를 약속하고 진행합니다.",
      imageLayout: "row",
      images: [
        { src: "/assets/sessions/05/brisk-boost-activities.webp", alt: "참여, 평가, 쓰기로 나뉜 Boost 학생 활동 13가지 목록", caption: "Boost 활동 13가지(참여·평가·쓰기)" },
        { src: "/assets/sessions/05/brisk-boost-share.webp", alt: "학생 활동 공간을 편집하고 QR 코드와 입장 코드로 공유하는 화면", caption: "활동 공간 편집 → QR·입장 코드로 공유" },
        { src: "/assets/sessions/05/brisk-boost-monitor.webp", alt: "학생 전체 진행 상황을 실시간으로 보는 교사 화면", caption: "학생 진행 상황 실시간 확인" },
        { src: "/assets/sessions/05/brisk-boost-monitor-2.webp", alt: "학생 개별 대화 기록을 확인하고 내려받는 화면", caption: "개별 대화 기록 확인·다운로드" },
      ],
    },
    {
      heading: "Brisk Teaching — 요금제",
      body: "| 요금제 | 가격 | 주요 내용 |\n|---|---|---|\n| **Brisk Educator 무료** | 교사 무료 | 표준 AI 모델, 23가지 이상 생성 도구, 3가지 피드백 스타일(Glow & Grow·루브릭 기준·다음 단계), 글쓰기 검사, 레벨 변경, 30개 이상 언어, Boost 활동 |\n| **Brisk Educator Pro** | 월 9.99달러 / 연 99.99달러 | 더 빠른 AI 모델, 대상 지정 피드백, 글쓰기 검사의 AI 작성 가능성 표시, 슬라이드 업그레이드 |\n| **학교·학군용** | 견적 문의 | Pro 기능 + 추가 생성 도구, 관리자 대시보드, 기관용 개인정보 보호 계약 등 |\n\n가격과 포함 기능은 강의 자료 작성 시점 기준이며 자주 바뀝니다. 최신 내용은 공식 사이트의 요금제 페이지에서 확인하세요. 특히 **‘AI 작성 가능성’ 표시는 추정치**일 뿐이므로, 이것만으로 학생을 판단하지 않습니다.",
      images: [
        { src: "/assets/sessions/05/brisk-pricing.webp", alt: "Brisk Educator 무료, Educator Pro, 학교 및 학군용 요금제를 비교한 화면", caption: "Brisk 요금제(자료 작성 시점 기준)" },
      ],
    },
    {
      heading: "Brisk Teaching — 교육적 활용",
      body: "4차시에서 만든 Classroom 수업 흐름에 Brisk를 얹으면 다음과 같습니다.\n\n1. **준비** — 수업에 쓸 기사(웹페이지)를 열고 **수준 조정**으로 두 가지 난이도 버전을 만든다.\n2. **자료 만들기** — 같은 기사로 **퀴즈**와 **활동지** 초안을 만든다 → 교사가 검토·수정한다.\n3. **배포** — Classroom에 활동지(학생별 사본)와 퀴즈를 과제로 낸다.\n4. **수행** — 학생은 **Brisk Boost** 활동으로 어휘·이해를 점검하며 글을 쓴다.\n5. **피드백** — 학생 글에 **루브릭 기준 피드백 초안**을 만들고, 교사가 다듬어 돌려준다.\n6. **과정 확인** — 필요하면 **글쓰기 점검**으로 작성 과정을 보고, 학생과 대화하는 실마리로 쓴다.\n\n**잘 맞는 일**: 수준별 읽기 자료, 형성평가 문항 초안, 반복되는 피드백 초안.\n**주의할 점**: AI 피드백은 초안일 뿐입니다. 교사의 목소리로 고쳐서 주고, 글쓰기 점검은 ‘감시’가 아닌 ‘성장 지원’의 도구로 학생과 미리 약속하고 씁니다.",
    },

    /* ---------------- 2. Google AI Studio ---------------- */
    {
      heading: "② Google AI Studio — 개요와 첫 화면",
      body: "**Google AI Studio**(aistudio.google.com)는 Google의 최신 **Gemini 모델을 직접 시험하고, 말로 설명해 앱까지 만들어 보는 웹 작업실**입니다. 원래는 개발자를 위한 도구지만, 화면이 간단하고 브라우저에서 바로 쓸 수 있어 교사도 충분히 활용할 수 있습니다. AI Studio 화면 자체는 **무료**로 쓸 수 있고, 무료 사용량에는 한도가 있습니다.\n\n접속하면 가운데에 **‘Build your ideas with Gemini’** 와 앱 설명을 적는 입력창이 보이고, 왼쪽 메뉴는 세 묶음으로 나뉩니다.\n\n| 묶음 | 메뉴 | 하는 일 |\n|---|---|---|\n| **EXPLORE**(탐색) | **Playground** | 모델과 대화하며 프롬프트·설정을 시험하는 곳 |\n| | **History** | 지난 대화와 실험 기록 |\n| **BUILD**(만들기) | **New app** | 말로 설명해 새 웹앱을 만드는 곳(첫 화면) |\n| | **My apps** | 내가 만든 앱 목록 |\n| | **Gallery** | 다른 사람이 만든 예시 앱 모음(복사해서 고쳐 쓸 수 있음) |\n| **MANAGE**(관리) | **Dashboard** | API 키, 사용량, 요금 관리 |\n| | **Documentation** | 개발 문서 |\n\n화면 위쪽에는 새로 나온 모델 안내가 뜨기도 합니다. 모델 이름과 메뉴 구성은 자주 바뀌므로, 화면이 조금 달라도 **Playground(시험)와 Build(만들기)** 두 축만 기억하면 됩니다.\n\n**꼭 알아 둘 점**: Google Workspace for Education 계정 중 **만 18세 미만 사용자는 AI Studio를 쓸 수 없습니다**(관리자가 켜 두어도 마찬가지). 초·중·고에서는 **교사가 쓰는 도구**로, 대학에서는 학생도 함께 쓰는 실습 도구로 보는 것이 맞습니다.",
      images: [
        { src: "/assets/sessions/05/aistudio-home.webp", alt: "Google AI Studio 첫 화면. 왼쪽에 Playground, History, New app, My apps, Gallery, Dashboard, Documentation 메뉴가 있고 가운데에 앱 설명 입력창이 있다", caption: "AI Studio 첫 화면 — 왼쪽 메뉴(탐색·만들기·관리)와 앱 설명 입력창" },
      ],
    },
    {
      heading: "Google AI Studio — Playground: 프롬프트를 시험하는 곳",
      body: "**Playground**는 AI 모델과 **대화하며 결과를 시험**하는 곳입니다. 아래 입력창에 프롬프트를 넣고, 오른쪽 **Run settings(실행 설정)** 에서 AI가 일하는 방식을 바꿔 가며 결과를 비교합니다.\n\n**Run settings 주요 항목**\n- **모델 선택** — 맨 위 카드에서 사용할 Gemini 모델을 고릅니다(예: 빠른 Flash 모델, 더 깊이 생각하는 Pro 모델).\n- **System instructions(시스템 지시)** — AI의 **역할·말투·규칙**을 대화 전에 정해 둡니다. 예: “너는 중학교 과학 교사의 조교다. 정답을 바로 말하지 말고 힌트부터 준다.”\n- **Thinking level(생각 수준)** — 답하기 전에 얼마나 깊이 생각할지 정합니다. 높을수록 꼼꼼하지만 느립니다.\n- **Tools(도구)**\n  - **Structured outputs** — 답을 표·JSON처럼 **정해진 형식**으로 받습니다(문항 은행 만들기 등).\n  - **Code execution** — AI가 **코드를 직접 실행**해 계산·그래프를 만듭니다.\n  - **Function calling** — 다른 프로그램의 기능을 부르게 합니다(개발용).\n  - **Grounding with Google Search / Maps** — **구글 검색·지도**로 최신 정보를 찾아 근거로 씁니다.\n  - **URL context** — 프롬프트에 넣은 **웹페이지 주소의 내용**을 읽고 답합니다.\n- **Advanced settings** — 이미지·영상 해상도 등 세부 설정.\n- **Get code** — 지금 실험한 프롬프트와 설정을 **코드로 복사**합니다(14·15차시에서 활용).\n\n입력창에는 글뿐 아니라 **이미지·PDF·음성·영상**도 넣을 수 있습니다. 예: 실험 사진을 올리고 관찰 포인트를 묻기.",
      images: [
        { src: "/assets/sessions/05/aistudio-playground.webp", alt: "Google AI Studio Playground 화면. 오른쪽 Run settings에 모델, System instructions, Thinking level, Tools(Structured outputs, Code execution, Function calling, Grounding with Google Search, Grounding with Google Maps, URL context) 항목이 있다", caption: "Playground — 오른쪽 Run settings에서 모델·시스템 지시·도구를 설정" },
      ],
    },
    {
      heading: "Google AI Studio — Build: 말로 앱을 만드는 곳",
      body: "**Build(New app)** 는 **만들고 싶은 앱을 말로 설명하면 Gemini가 코드를 써서 작동하는 웹앱을 만들어 주는** 곳입니다. 이렇게 코드를 직접 쓰지 않고 대화로 프로그램을 만드는 방식을 **바이브 코딩(vibe coding)** 이라고 부릅니다(15차시에서 더 깊이 다룸).\n\n**화면 구성**\n- **입력창(Describe an app…)** — “초등 5학년 분수 덧셈 연습 앱을 만들어 줘. 문제 10개, 틀리면 힌트, 마지막에 점수”처럼 **무엇을, 누가, 어떻게 쓰는지** 구체적으로 적습니다.\n- **＋ 버튼** — 참고할 파일(활동지, 그림 등)을 함께 넣습니다.\n- **모드 선택(Default mode)**, **마이크**(말로 입력), **I'm feeling lucky**(예시 아이디어로 바로 만들어 보기)\n- **아래 예시 버튼** — 게임, 3D 장면, 안드로이드 앱 등 예시 주제로 시작합니다.\n\n만들어지면 **왼쪽에 대화창, 오른쪽에 앱 미리보기**가 나옵니다. “버튼을 더 크게”, “문제를 랜덤 순서로”처럼 **대화로 고쳐 나가고**, 완성된 앱은 **My apps**에 저장되며 공유하거나 코드로 내려받을 수 있습니다.",
      images: [
        { src: "/assets/sessions/05/aistudio-build.webp", alt: "Google AI Studio Build 화면. Build your ideas with Gemini 문구 아래 앱 설명 입력창과 Default mode, 마이크, I'm feeling lucky 버튼, 예시 주제 버튼이 있다", caption: "Build(New app) — 앱을 말로 설명하는 입력창과 예시 주제" },
      ],
    },
    {
      heading: "Playground와 Build, 무엇이 다른가",
      body: "| 구분 | Playground | Build |\n|---|---|---|\n| **목적** | AI의 **답**을 시험한다 | 작동하는 **앱**을 만든다 |\n| **결과물** | 대화 속 글·표·이미지 설명 | 버튼·화면이 있는 **웹앱**(+코드) |\n| **주로 고치는 것** | 프롬프트, 시스템 지시, 모델·도구 설정 | 앱의 기능·디자인(대화로 요청) |\n| **사용 장면** | 좋은 프롬프트 찾기, AI 튜터 성격 설계, 자료 분석 | 수업용 미니 앱, 퀴즈·게임, 업무 도구 |\n| **공유** | 프롬프트 공유, Get code로 코드 복사 | 앱 링크 공유, GitHub 연결·코드 내려받기 |\n| **비유** | AI와 함께 **연습장에서 실험**하기 | AI에게 **물건을 주문해 만들기** |\n\n**순서로 쓰면 좋습니다**: Playground에서 원하는 답이 나오는 프롬프트와 시스템 지시를 먼저 다듬고 → 그 내용을 Build의 앱 설명에 넣으면, 앱 안의 AI도 같은 방식으로 동작합니다.",
    },
    {
      heading: "바이브 코딩 예시 — ‘서울 고교 지도’ 따라 만들기",
      body: "AI Studio의 Build로 실제 수업·업무 도구를 만든 예시입니다. **[서울 고교 지도 만들기 실습 안내 (highmap.labbitory.com)](https://highmap.labbitory.com/)** 에 접속하면, 진로진학상담교사를 위한 연수용 안내를 그대로 따라 하며 직접 만들어 볼 수 있습니다.\n\n- **만드는 것**: 학교알리미의 공시 정보를 지도(OpenStreetMap) 위에 표시하는 **서울 고등학교 지도 웹앱** — 자치구·학교 유형별 검색, 학교 상세 정보, 최대 4개 학교 비교, 즐겨찾기\n- **필요한 것**: 코딩 지식 없이 약 1시간. Google 계정, 학교알리미 API 키, (배포할 경우) GitHub·Netlify 계정\n- **흐름**\n  1. AI Studio에서 **Build**를 연다.\n  2. 안내 페이지의 **프롬프트를 붙여 넣고** 앱을 생성한다.\n  3. 학교알리미 **API 키를 AI Studio의 Secrets(비밀값)** 에 저장한다.\n  4. 코드를 **GitHub에 동기화**하고 **Netlify로 배포**해 누구나 열 수 있는 주소를 만든다.\n\n긴 프롬프트 하나로 어떤 기능을 어떻게 요청했는지 살펴보면, **좋은 앱 설명(요구사항)을 쓰는 법**을 배울 수 있습니다. API 키 같은 비밀값은 프롬프트나 코드에 직접 쓰지 않고 Secrets에 넣는다는 점도 함께 익힙니다.",
    },
    {
      heading: "Google AI Studio — 교육적 활용",
      body: "- **수업용 프롬프트 다듬기** — Playground에서 같은 요청을 여러 방식으로 써 보고, 결과를 비교해 **좋은 프롬프트의 조건**을 찾습니다. 학생에게 줄 ‘프롬프트 예시 카드’를 만들 때 유용합니다.\n- **AI 튜터 설계 연습** — 시스템 지시로 ‘정답을 바로 말하지 않고 힌트부터 주는 튜터’를 설계하고, 직접 학생 역할로 대화해 보며 고칩니다.\n- **수업용 미니 앱 만들기** — Build로 단어 퀴즈, 타이머, 모둠 뽑기, 개념 확인 문제처럼 **수업에 바로 쓰는 작은 웹앱**을 만들어 봅니다.\n- **자료 분석** — 그래프·사진·PDF를 넣고 설명이나 질문 목록을 만들게 합니다.\n\n**주의할 점**\n- 무료 사용분에서는 입력 내용이 서비스 개선에 쓰일 수 있으므로 **학생 이름·성적 같은 개인정보는 넣지 않습니다**.\n- 만든 앱을 학생에게 공개하기 전에 **교사가 직접 끝까지 써 보고** 오류와 내용을 확인합니다.",
    },
    {
      heading: "③ Gemini Notebook(이전 NotebookLM) — 개요",
      body: "**Gemini Notebook**은 2026년 7월까지 **NotebookLM**이라는 이름으로 불리던 Google의 **AI 기반 조사 파트너**입니다. 이름이 바뀌면서 주소도 **[notebook.google.com](https://notebook.google.com/)** 으로 옮겨졌고, 예전 주소로 들어가도 자동으로 연결됩니다. 기존 노트북과 자료는 그대로 유지됩니다. 첫 화면의 **‘Gemini Notebook 사용해 보기’** 를 누르고 Google 계정으로 로그인해 시작합니다.\n\n가장 큰 특징은 **내가 넣은 자료(소스)를 근거로 답한다**는 점입니다. 교과서 PDF, 수업 슬라이드, 웹페이지, YouTube 영상, Google 문서 등을 노트북에 넣으면, AI는 그 자료 안에서 요약하고 답하며 **어느 부분을 근거로 했는지 출처 번호로 보여 줍니다**. 일반 챗봇보다 지어낸 답(환각)을 확인하기 쉽습니다.\n\n- **비용**: 기본 기능은 **무료**이고, 상위 요금제에서는 한도가 늘어납니다.\n- **학생 사용**: Workspace for Education 계정은 **나이와 관계없이** 쓸 수 있고, 18세 미만에게는 더 엄격한 콘텐츠 기준이 적용됩니다. 학교 계정의 자료와 대화는 **AI 학습에 쓰이지 않는다**고 Google이 밝히고 있습니다.",
      images: [
        { src: "/assets/sessions/05/notebook-landing.webp", alt: "Gemini Notebook 첫 화면. AI 기반 조사 파트너, 무엇이든 이해할 수 있습니다라는 문구와 Gemini Notebook 사용해 보기 버튼이 있다", caption: "Gemini Notebook 첫 화면(notebook.google.com)" },
      ],
    },
    {
      heading: "Gemini Notebook — 내 노트북 화면",
      body: "로그인하면 **노트북 목록**이 나옵니다. 노트북 하나가 **한 가지 주제(단원·연수·프로젝트)의 자료 묶음**이라고 생각하면 됩니다.\n\n- **위쪽 탭** — **전체 / 내 노트북 / 둘러보기 / 컬렉션**. ‘둘러보기’에서는 Google이 공개한 예시 노트북을, ‘컬렉션’에서는 묶어 둔 노트북을 봅니다.\n- **노트북 검색**, **격자·목록 보기** 전환, 오른쪽 위 **＋ 새 노트북**\n- **노트북 카드** — 제목, 만든 날짜, **넣어 둔 소스 개수**가 표시됩니다. 카드의 ⋮ 메뉴로 이름 바꾸기·삭제를 합니다.\n\n**정리 팁**: 단원별·학년별로 노트북을 나누고, 제목 앞에 `[중1 과학]`처럼 머리말을 붙이면 찾기 쉽습니다. 동료 교사와 공유할 노트북은 따로 만들어 두는 것이 좋습니다.",
      images: [
        { src: "/assets/sessions/05/notebook-list.webp", alt: "Gemini Notebook의 내 노트북 화면. 전체, 내 노트북, 둘러보기, 컬렉션 탭과 노트북 검색, 새 노트북 버튼, 제목과 날짜와 소스 개수가 적힌 노트북 카드들이 있다", caption: "내 노트북 — 주제별 노트북 카드와 새 노트북 버튼" },
      ],
    },
    {
      heading: "Gemini Notebook — 노트북 화면: 출처 · 대화 · 스튜디오",
      body: "노트북을 열면 화면이 **세 칸**으로 나뉩니다.\n\n**① 왼쪽 ‘출처’ — 자료를 넣는 곳**\n- **＋ 소스 추가** — PDF·문서 파일, Google 문서·슬라이드, 웹사이트 주소, YouTube 링크, 복사한 텍스트를 넣습니다. 파일을 끌어다 놓아도 됩니다.\n- **웹에서 새 소스 검색** — 주제를 입력하면 웹에서 관련 자료를 찾아 소스로 추가합니다. **Fast Research**(빠른 찾기)와 더 깊이 찾는 리서치 방식을 고를 수 있습니다.\n- 넣은 소스마다 체크 상자가 있어 **이번 질문에 쓸 자료만 골라** 쓸 수 있습니다.\n\n**② 가운데 ‘대화’ — 자료에 대해 묻는 곳**\n- 아래 **‘질문하거나 창작하세요’** 창에 질문하면, 넣은 소스를 근거로 답하고 **출처 번호**를 답니다. 번호를 누르면 원문 위치로 이동합니다.\n- 입력창 옆에 지금 쓰는 **소스 개수**가 표시됩니다.\n- 마음에 드는 답은 **메모로 저장**해 둘 수 있습니다.\n\n**③ 오른쪽 ‘스튜디오’ — 학습 자료를 만드는 곳** (아래에서 자세히)",
      images: [
        { src: "/assets/sessions/05/notebook-studio.webp", alt: "Gemini Notebook 노트북 화면. 왼쪽 출처 칸에 소스 추가와 웹 검색(Fast Research), 가운데 질문 입력창, 오른쪽 스튜디오 칸에 AI 오디오 오버뷰, 슬라이드 자료, 동영상 개요, 마인드맵, 보고서, 플래시카드, 퀴즈, 인포그래픽, 데이터 표 버튼이 있다", caption: "노트북 화면 — 왼쪽 출처, 가운데 대화, 오른쪽 스튜디오" },
      ],
    },
    {
      heading: "Gemini Notebook — 스튜디오 기능 자세히 보기",
      body: "**스튜디오**는 넣은 소스를 바탕으로 **다양한 형태의 학습 자료를 한 번의 클릭으로 만드는 곳**입니다. 버튼을 누르면 바로 만들고, 버튼 옆 연필(맞춤 설정)을 누르면 **대상 학년, 길이, 언어, 강조할 내용**을 정해서 만들 수 있습니다. 만든 결과물은 스튜디오 아래에 차곡차곡 **저장**됩니다.\n\n| 스튜디오 항목 | 만드는 것 | 수업 활용 예 |\n|---|---|---|\n| **AI 오디오 오버뷰** | 두 사람이 대화하듯 내용을 풀어 주는 **팟캐스트형 음성 해설**. 한국어 지원, 길이·초점 조절 가능 | 복습용 듣기 자료, 결석생 보충, 등하굣길 학습 |\n| **슬라이드 자료** | 소스 내용을 정리한 **발표 슬라이드** | 수업 도입·정리 슬라이드 초안, 학생 발표 예시 |\n| **동영상 개요** | 그림과 내레이션이 있는 **짧은 해설 영상** | 개념 도입 영상, 플립러닝 사전 학습 |\n| **마인드맵** | 핵심 개념과 관계를 **가지 모양**으로 정리. 가지를 누르면 그 내용으로 질문이 이어짐 | 단원 구조 파악, 개념 연결 수업 |\n| **보고서** *(New)* | 브리핑 문서, **학습 가이드**, 블로그 글 등 형식을 골라 만드는 **글 자료**. 대화하며 다듬는 대화형 보고서도 가능 | 학습지, 단원 요약 노트, 교사용 수업 준비 메모 |\n| **플래시카드** | 앞면 질문·뒷면 답의 **암기 카드** | 용어 정리, 자기 점검 |\n| **퀴즈** | 객관식 문제와 해설이 있는 **퀴즈** | 형성평가, 수업 끝 확인 문제 |\n| **인포그래픽** | 핵심을 한 장 그림으로 정리한 **인포그래픽** | 교실 게시물, 요약 포스터 |\n| **데이터 표** | 소스 속 수치·항목을 정리한 **표** | 자료 비교, 탐구 데이터 정리 |\n\n오른쪽 아래 **‘메모 추가’** 로 교사의 생각이나 수업 아이디어를 직접 적어 둘 수 있습니다.\n\n**주의할 점**: 스튜디오 결과물도 AI가 만든 것이므로 **사실 오류나 빠진 내용이 있을 수 있습니다**. 수업에 쓰기 전에 교과서 원문과 대조하고, 학생 수준에 맞게 고칩니다.",
    },
    {
      heading: "직접 해 보기 — 교과서로 스튜디오 써 보기",
      body: "아래 교과서 PDF를 내려받아 노트북의 소스로 넣고, 스튜디오 기능을 하나씩 써 봅니다.\n\n- **실습 소스**: [[비상교육] 고등 통합과학1 2-1 교과서 (PDF 내려받기)](https://khgms-my.sharepoint.com/:b:/r/personal/sirlma_kh_ms_kr/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fsirlma%5Fkh%5Fms%5Fkr%2FDocuments%2F%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EA%B3%A0%EB%93%B1%5F%ED%86%B5%ED%95%A9%EA%B3%BC%ED%95%991%5F2%2D1%5F%EA%B5%90%EA%B3%BC%EC%84%9C%2Epdf&parent=%2Fpersonal%2Fsirlma%5Fkh%5Fms%5Fkr%2FDocuments&share=cQqgW7XkxzqESaUidEt41jA7EgUCWYxOiGGENPrVpjZQizG4Ig)\n\n**순서**\n1. 위 링크에서 PDF를 **내려받습니다**.\n2. notebook.google.com에서 **＋ 새 노트북**을 만들고, 왼쪽 **＋ 소스 추가**로 내려받은 PDF를 넣습니다.\n3. 가운데 대화창에서 “이 단원의 핵심 개념 5가지를 설명해 줘”라고 묻고, 답의 **출처 번호를 눌러** 교과서 원문과 대조합니다.\n4. 스튜디오에서 **마인드맵**을 만들어 단원 구조를 확인합니다.\n5. **퀴즈**와 **플래시카드**를 만들어 직접 풀어 봅니다.\n6. **AI 오디오 오버뷰**(또는 동영상 개요)를 맞춤 설정으로 ‘고등학교 1학년 대상, 한국어’로 만들어 들어 봅니다.\n7. **슬라이드 자료**를 만들어 보고, 수업에 쓰려면 무엇을 고쳐야 할지 적습니다.\n\n**슬라이드 디자인 참고**: 슬라이드 자료를 만들 때 맞춤 설정에 디자인 요청을 함께 적으면 원하는 느낌에 가깝게 만들 수 있습니다. 아래 템플릿 모음을 참고하세요.\n- [슬라이드 제작 템플릿 모음 (오빠두)](https://oppadu.notion.site/LM-50-32e775de96e3806aa040ec8cdb3ebbd2)\n\n교과서 파일은 **이 수업의 실습용**으로만 쓰고, 다른 곳에 다시 올리거나 배포하지 않습니다.",
    },
    {
      heading: "Gemini Notebook — 교육적 활용",
      body: "**교사**\n- **수업 준비** — 교육과정 문서·교과서·참고 자료를 한 노트북에 모으고, 성취기준과 관련된 내용만 요약하게 합니다.\n- **복습 자료 만들기** — 단원 자료로 플래시카드·퀴즈·오디오 해설을 만들어 Classroom에 올립니다.\n- **연수·업무 자료 정리** — 긴 공문이나 연수 자료를 넣고 핵심과 할 일을 질문합니다.\n\n**학생**\n- **자기주도 복습** — 수업 자료를 넣고 모르는 부분을 묻거나, 퀴즈로 스스로 점검합니다.\n- **탐구·보고서** — 찾은 자료를 소스로 모으고, 출처를 확인하며 생각을 정리합니다.\n- **듣는 학습** — 오디오 오버뷰를 등하굣길에 듣는 복습 자료로 활용합니다.\n\n**주의할 점**\n- 근거를 보여 주더라도 **요약이 원문을 잘못 해석할 수 있으므로** 출처 번호를 눌러 원문과 대조합니다.\n- 저작권이 있는 자료를 넣고 공유할 때는 **학교 내 수업 목적 범위**를 지킵니다.\n- 학생 개인정보가 담긴 문서는 소스로 넣지 않습니다.",
    },

    /* ---------------- 비교와 원칙 ---------------- */
    {
      heading: "세 도구, 언제 무엇을 고를까",
      body: "- **‘이 자료로 수업 자료를 빨리 만들고 싶다’** → **Brisk Teaching**\n  지금 보는 문서·기사·영상에서 바로 퀴즈·활동지·피드백 초안을 만듭니다.\n- **‘AI에게 일을 시키는 방법을 직접 설계하고 싶다, 작은 앱을 만들고 싶다’** → **Google AI Studio**\n  프롬프트와 AI의 역할을 실험하고, 말로 수업용 앱을 만들어 봅니다.\n- **‘이 자료들을 깊이 이해하고, 학생이 스스로 공부하게 하고 싶다’** → **Gemini Notebook**\n  넣은 자료만 근거로 요약·질문·오디오 해설·퀴즈를 만들고 출처를 확인합니다.\n\n세 도구는 함께 쓸 수도 있습니다. 예를 들어 **Gemini Notebook**으로 단원 자료를 정리해 핵심 개념을 뽑고, **Brisk**로 수준별 활동지를 만들고, **AI Studio**로 그 개념을 연습하는 미니 퀴즈 앱을 만드는 식입니다.",
    },
    {
      heading: "AI 결과 검토 5원칙과 데이터 보호",
      body: "어떤 도구를 쓰든, 결과물과 데이터에 대한 책임은 교사에게 있습니다.\n\n**AI가 만든 자료를 검토하는 5원칙**\n1. **성취기준과의 정렬** — 수업 목표와 성취기준에 맞는가\n2. **난이도** — 우리 반 학생 수준에 맞는가\n3. **사실 검증** — 틀린 정보나 지어낸 출처는 없는가(Gemini Notebook은 출처 번호로 원문 대조)\n4. **표현과 편향** — 고정관념이나 부적절한 표현은 없는가\n5. **개인정보** — 학생 정보가 노출되거나 입력되지 않았는가\n\n**도구별로 추가로 지킬 것**\n- **Brisk**: 확장 프로그램을 설치하기 전에 요구 권한과 학교의 승인 여부를 확인합니다.\n- **AI Studio**: 18세 미만 학생 계정으로는 쓸 수 없고, 무료 사용분에는 개인정보를 넣지 않습니다.\n- **Gemini Notebook**: 학교 계정으로 쓰고, 공유 범위(누구에게 열어 줄지)를 확인합니다.",
    },
  ],

  compareTables: [
    {
      caption: "구글 생태계의 교육용 AI 세 가지 한눈에 보기",
      headers: ["구분", "Brisk Teaching", "Google AI Studio", "Gemini Notebook(이전 NotebookLM)"],
      rows: [
        ["역할", "수업 자료·피드백을 만들어 주는 교사용 도우미", "Gemini를 시험하고 앱을 직접 만드는 작업실", "넣은 자료만 근거로 함께 공부하는 학습 파트너"],
        ["형태", "Chrome·Edge 확장 프로그램(+웹)", "웹사이트(aistudio.google.com)", "웹사이트(notebook.google.com)·앱"],
        ["만든 곳", "Brisk(교육 기업)", "Google", "Google"],
        ["대표 기능", "만들기·피드백·글쓰기 점검·수준 조정·Brisk Boost", "프롬프트 실험·시스템 지시·멀티모달·앱 만들기·API 키", "출처 기반 대화·오디오/동영상 오버뷰·마인드맵·퀴즈·플래시카드"],
        ["주 사용자", "교사", "교사(성인). 학교 계정 18세 미만 사용 불가", "교사·학생(학교 계정은 나이 제한 없음)"],
        ["비용", "교사 무료로 시작, 유료·학교 요금제", "무료(사용량 한도 있음)", "기본 무료, 상위 요금제는 한도 확대"],
        ["수업 활용", "수준별 자료, 형성평가 문항, 글쓰기 피드백", "프롬프트 설계, 수업용 미니 앱, AI 튜터 설계", "수업 준비 요약, 복습 자료, 자기주도 학습"],
        ["주의할 점", "AI 피드백은 초안, 교사 목소리로 고치기", "무료분에 개인정보 넣지 않기, 앱은 직접 검증", "출처 번호로 원문 대조, 공유 범위 확인"],
      ],
    },
  ],

  practice: {
    title: "하나의 단원으로 세 도구 써 보기",
    goal: "같은 단원 자료 하나로 Gemini Notebook(이해·정리), Brisk Teaching(수업 자료), Google AI Studio(프롬프트·미니 앱)를 차례로 써 보고, 결과를 5원칙으로 검토해 도구별 쓰임을 정리한다.",
    steps: [
      "수업에 쓸 단원 하나를 정하고, 공개 자료(교과서 PDF 일부, 관련 웹 기사, YouTube 영상 등) 2~3개를 준비한다.",
      "[Gemini Notebook] notebook.google.com에서 새 노트북을 만들고 준비한 자료를 소스로 넣는다. 핵심 내용을 질문하고, 답의 출처 번호를 눌러 원문과 대조한다.",
      "[Gemini Notebook] 스튜디오에서 마인드맵, 퀴즈·플래시카드, 오디오 오버뷰, 슬라이드 자료를 만들어 본다(본문의 통합과학 교과서 소스 실습 참고).",
      "[Brisk Teaching] Brisk 확장 프로그램을 설치하고, 같은 웹 기사나 문서를 열어 수준 조정으로 두 가지 난이도 버전과 퀴즈 또는 활동지 초안을 만든다.",
      "[Brisk Teaching] 가상의 학생 글(실제 학생 글 사용 금지)을 Docs에 쓰고, 루브릭 기준 피드백 초안을 만든 뒤 교사의 목소리로 고친다.",
      "[Google AI Studio] Playground에서 시스템 지시로 ‘힌트부터 주는 튜터’를 설계하고, 학생 역할로 대화해 보며 지시문을 고친다.",
      "[Google AI Studio] Build에서 이 단원의 개념을 연습하는 간단한 퀴즈 앱을 말로 만들어 보고, 직접 끝까지 풀어 보며 오류를 기록한다(여유가 있으면 ‘서울 고교 지도’ 실습 안내를 따라 해 본다).",
      "세 도구의 결과물을 5원칙(정렬·난이도·사실·표현·개인정보)으로 검토하고, 도구별 ‘잘 맞는 일 / 맡기면 안 되는 일’을 정리한다.",
    ],
    checklist: [
      "Gemini Notebook의 답을 출처 번호로 원문과 대조했는가",
      "Brisk로 만든 수준별 자료의 난이도 차이가 실제로 적절한가",
      "AI 피드백 초안을 교사의 목소리로 고쳤는가",
      "AI Studio로 만든 앱을 직접 끝까지 써 보고 오류를 확인했는가",
      "실제 학생 글이나 개인정보를 어떤 도구에도 넣지 않았는가",
    ],
    deliverable: "같은 단원으로 만든 결과물 3종(Gemini Notebook 요약·학습 자료, Brisk 수준별 자료·피드백, AI Studio 튜터 지시문 또는 미니 앱)과, 세 도구의 ‘잘 맞는 일 / 맡기면 안 되는 일’ 정리표.",
  },

  quiz: [
    {
      type: "mcq",
      question: "내가 넣은 자료만을 근거로 답하고, 근거가 된 위치를 출처 번호로 보여 주는 서비스는?",
      choices: ["Brisk Teaching", "Google AI Studio", "Gemini Notebook(이전 NotebookLM)", "Google Classroom"],
      answerIndex: 2,
      explanation: "Gemini Notebook은 소스로 넣은 자료 안에서만 답하고 출처를 표시하므로, 원문과 대조해 확인하기 쉽습니다.",
    },
    {
      type: "mcq",
      question: "학생이 Google Docs에서 글을 쓴 과정을 영상처럼 다시 보여 주는 Brisk Teaching의 기능은?",
      choices: ["수준 조정(Change Level)", "글쓰기 점검(Inspect Writing)", "Brisk Boost", "만들기(Create)"],
      answerIndex: 1,
      explanation: "글쓰기 점검은 작성·수정·붙여넣기 과정을 다시 보여 주어 과정 중심 피드백의 실마리가 됩니다.",
    },
    {
      type: "ox",
      question: "Google Workspace for Education 계정이라면 중학생도 Google AI Studio를 자유롭게 쓸 수 있다.",
      answer: false,
      explanation: "학교(Workspace for Education) 계정 중 만 18세 미만 사용자는 관리자가 설정을 켜 두어도 AI Studio를 쓸 수 없습니다. 초·중·고에서는 교사용 도구로 봅니다.",
    },
    {
      type: "mcq",
      question: "‘정답을 바로 말하지 않고 힌트부터 주는 AI 튜터’의 성격을 미리 정해 두는 Google AI Studio의 기능은?",
      choices: ["API 키 발급", "시스템 지시(System instructions)", "오디오 오버뷰", "글쓰기 점검"],
      answerIndex: 1,
      explanation: "시스템 지시는 AI의 역할·말투·규칙을 대화 전에 정해 두는 기능입니다.",
    },
    {
      type: "mcq",
      question: "세 도구의 역할을 가장 바르게 짝지은 것은?",
      choices: [
        "Brisk — 자료로 공부하는 AI / AI Studio — 만들어 주는 AI / Gemini Notebook — 직접 만드는 AI",
        "Brisk — 만들어 주는 AI / AI Studio — 직접 만드는 AI / Gemini Notebook — 자료로 공부하는 AI",
        "세 도구 모두 Google이 만든 Classroom 전용 기능이다",
        "세 도구 모두 학생 개인정보를 넣어도 안전하다",
      ],
      answerIndex: 1,
      explanation: "Brisk는 수업 자료·피드백 초안을, AI Studio는 프롬프트 실험과 앱 제작을, Gemini Notebook은 출처 기반 학습을 돕습니다.",
    },
    {
      type: "self",
      question: "내 수업의 한 단원을 떠올리고, 세 도구 중 가장 먼저 써 보고 싶은 도구와 그 이유, 그리고 결과에서 꼭 확인할 점 하나를 적어 보세요.",
    },
  ],

  reflection: [
    "AI가 만든 피드백 초안을 학생에게 줄 때, 교사의 목소리를 지키려면 무엇을 바꿔야 할까요?",
    "학생이 Gemini Notebook으로 공부할 때, AI의 요약에만 기대지 않고 원문을 읽게 하려면 어떤 활동을 설계할 수 있을까요?",
  ],

  terms: [
    { term: "브라우저 확장 프로그램", en: "Browser extension", definition: "Chrome·Edge 같은 브라우저에 설치해 기능을 더하는 작은 프로그램." },
    { term: "Brisk Teaching", definition: "브라우저 어디서나 수업 자료·피드백 초안을 만들어 주는 교사용 AI 확장 프로그램." },
    { term: "글쓰기 점검", en: "Inspect Writing", definition: "학생이 Docs에서 글을 쓴 과정을 다시 보여 주는 Brisk 기능." },
    { term: "Brisk Boost", definition: "수업 자료를 바탕으로 학생용 AI 활동을 만들고 진행 상황을 보여 주는 Brisk 기능." },
    { term: "DOK", en: "Depth of Knowledge", definition: "질문을 회상·재생산, 기술·개념, 전략적 사고, 확장적 사고의 깊이로 나누는 틀. Brisk에서 단계별 심층 질문을 만들 때 쓴다." },
    { term: "Glow & Grow", definition: "잘한 점(Glow)과 성장할 점(Grow)으로 나눠 주는 피드백 방식. Brisk는 더 생각해 볼 질문(Wondering)도 함께 제시한다." },
    { term: "Google AI Studio", definition: "Gemini 모델을 직접 시험하고, 말로 설명해 웹앱을 만들고, API 키를 발급받는 Google의 웹 작업실." },
    { term: "시스템 지시", en: "System instructions", definition: "AI의 역할·말투·규칙을 대화 전에 미리 정해 두는 지시문." },
    { term: "API 키", en: "API key", definition: "다른 프로그램이 AI 모델을 불러 쓸 때 사용하는 비밀 열쇠. 외부에 공개하면 안 된다." },
    { term: "Gemini Notebook", en: "이전 NotebookLM", definition: "넣은 자료(소스)만 근거로 요약·질문·학습 자료를 만들고 출처를 보여 주는 Google의 AI 노트북. 2026년 7월 NotebookLM에서 이름이 바뀌었다." },
    { term: "소스 기반 응답", en: "Source grounding", definition: "AI가 일반 지식이 아닌, 사용자가 제공한 자료를 근거로 답하는 방식." },
    { term: "오디오 오버뷰", en: "Audio Overview", definition: "자료 내용을 두 사람이 대화하듯 설명하는 음성 해설을 만들어 주는 Gemini Notebook 기능." },
  ],

  sources: [
    { label: "Brisk Teaching (공식)", url: "https://www.briskteaching.com/", lastVerified: "2026-10-19" },
    { label: "Meet the new Brisk (Brisk 블로그, 2026)", url: "https://www.briskteaching.com/post/meet-the-new-brisk-summer-2026", lastVerified: "2026-10-19" },
    { label: "Google AI Studio", url: "https://aistudio.google.com/", lastVerified: "2026-10-19" },
    { label: "Workspace 계정으로 Google AI Studio 사용하기 (Google)", url: "https://ai.google.dev/gemini-api/docs/workspace", lastVerified: "2026-10-19" },
    { label: "서울 고교 지도 만들기 — AI Studio Build 실습 안내", url: "https://highmap.labbitory.com/", lastVerified: "2026-10-19" },
    { label: "Gemini Notebook (공식)", url: "https://notebook.google.com/", lastVerified: "2026-10-19" },
    {
      label: "Expanded NotebookLM capabilities for Education Plus and Teaching and Learning add-on customers (Google Workspace Updates, 2026.4)",
      url: "https://workspaceupdates.googleblog.com/2026/04/expanded-notebooklm-capabilities-for-Education-Plus-and-Teaching-and-Learning-add-on-customers.html",
      lastVerified: "2026-10-19",
    },
  ],

  cautions: [
    "세 도구의 기능·이름·요금은 자주 바뀝니다. 수업 전에 공식 사이트에서 최신 정보를 확인하세요.",
    "Google AI Studio는 학교(Workspace for Education) 계정의 만 18세 미만 사용자가 쓸 수 없습니다.",
    "실습에서는 실제 학생 글이나 개인정보를 사용하지 말고, 가상의 예시 자료를 사용합니다.",
    "확장 프로그램 설치와 AI 서비스 사용은 학교(기관)의 정보보호 지침을 먼저 확인하세요.",
  ],
};
