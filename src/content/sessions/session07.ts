import type { Session } from "@/types/content";

const img = (file: string, alt: string, caption: string) => ({ src: `/assets/sessions/07/${file}`, alt, caption });

export const session07: Session = {
  id: "07",
  slug: "teams-for-education-accelerators",
  title: "Teams for Education, Forms와 학습 가속기",
  category: "microsoft",
  summary: "Teams 수업 팀의 메뉴와 게시판을 익히고, Forms 퀴즈로 Teams 과제를 내며, 읽기 진행·리플렉트 등 학습 가속기를 활용한다.",
  duration: 90,
  level: "중급",
  keywords: ["Teams", "게시물", "Forms", "과제", "학습 가속기"],
  theoryRatio: 45,
  practiceRatio: 55,
  published: true,
  lastUpdated: "2026-10-29",
  sourceFiles: ["디지털 교육 교안 7강"],

  overview:
    "6차시에서 본 것처럼 MS365에서는 Teams가 OneDrive·Forms·OneNote·학습 가속기를 하나로 묶는 허브입니다. 이 차시에서는 Teams 수업 팀의 메뉴와 게시판(게시물) 기능을 익히고, Forms로 퀴즈를 만들어 Teams 과제로 내는 흐름을 실습합니다. 마지막으로 Teams 안의 학습 가속기 가운데 읽기 진행(Reading Progress)과 리플렉트(Reflect)를 살펴봅니다.",

  objectives: [
    "Teams 수업 팀의 메뉴(홈페이지·Class Notebook·수업활동·과제·성적·Reflect·Insights)와 채널의 역할을 설명할 수 있다.",
    "게시물 작성·멘션·메시지 예약 등 게시판 기능으로 수업 공지를 운영할 수 있다.",
    "Forms의 ‘새 퀴즈’로 선택형·텍스트 문항을 만들고, 이를 Teams 과제로 할당할 수 있다.",
    "학습 가속기의 종류를 알고, 읽기 진행과 리플렉트를 수업에 활용하는 방법을 설명할 수 있다.",
  ],

  keyQuestion: "공지·과제·평가·학생 데이터가 Teams 한곳에 모이면, 교사의 수업 운영은 무엇이 달라질까?",

  conceptMap: {
    title: "Teams로 이어지는 한 차시의 흐름",
    caption: "게시판으로 안내하고, Forms 퀴즈를 과제로 내고, 학습 가속기 데이터로 학생을 이해한다.",
    nodes: [
      { label: "Teams 수업 팀", description: "메뉴·채널" },
      { label: "게시판", description: "공지·멘션·예약" },
      { label: "Forms 새 퀴즈", description: "문항·배점" },
      { label: "Teams 과제", description: "퀴즈 할당·채점" },
      { label: "학습 가속기", description: "읽기 진행·리플렉트" },
    ],
  },

  theoryBlocks: [
    /* ---------------- 1. Teams 소개 ---------------- */
    {
      heading: "① Microsoft Teams — 접속하기",
      body: "Teams는 **웹 버전(인터넷 브라우저)** 과 **앱 버전(설치형 프로그램)** 을 모두 쓸 수 있습니다.\n\n- **웹 버전 접속**: [office.com](https://office.com/)에 학교 계정으로 로그인 → 왼쪽 **① 앱** → **② Teams**\n- 앱 버전은 같은 화면 오른쪽 위 **앱 설치**에서 내려받을 수 있습니다.\n\n6차시의 OneDrive와 마찬가지로, 학교 MS365 계정(@office.khu.ac.kr) 하나로 Teams·Forms·OneNote를 모두 씁니다.",
      images: [img("teams-access.png", "office.com 앱 화면에서 ① 왼쪽 ‘앱’ 메뉴, ② Teams 앱을 눌러 웹 버전 Teams에 접속하는 순서", "Teams 웹 버전 접속 — office.com → 앱 → Teams")],
    },
    {
      heading: "② 수업 팀의 메뉴와 채널",
      body: "수업용으로 만든 Teams 팀(수업 팀)에는 다음 메뉴가 있습니다.\n\n- **홈페이지**: 팀의 활동을 모두 모아서 보는 메인 페이지\n- **Class Notebook**: OneNote와 Teams가 연동된 수업용 전자 필기장(8차시)\n- **수업활동**: 모듈 단위로 수업 활동을 만들어 지정\n- **과제**: 다양한 형태의 과제 제출·확인·피드백\n- **성적**: 채점된 과제를 확인하는 화면\n- **Reflect**: 학생들의 사회 정서 학습을 위한 학습 가속기\n- **Insights**: 학생들의 모든 활동을 모아 보는 대시보드\n\n아래 **채널**의 기본은 **일반**이며, 일반적인 공지를 게시합니다(채널은 주제·모둠별로 더 만들 수 있음). 채널 위쪽 탭의 **＋** 를 누르면 Excel·Kahoot!·YouTube·Forms·Word·PDF·웹사이트 등 **수업에 필요한 사이트와 앱을 탭으로 추가**해 수업 활동에 포함시킬 수 있습니다.",
      images: [img("teams-menu.png", "Teams 수업 팀의 메뉴(홈페이지, Class Notebook, 수업활동, 과제, 성적, Reflect, Insights)와 기본 채널 ‘일반’, 채널 탭의 ＋로 Excel·Kahoot!·YouTube·Forms·Word·PDF·Website를 추가하는 화면", "수업 팀 메뉴와 채널 탭 추가")],
    },

    /* ---------------- 2. 게시판 기능 ---------------- */
    {
      heading: "③ 게시판 기능 — 게시물 쓰기와 멘션",
      body: "채널의 **게시물** 탭이 수업 게시판입니다. 새 게시물에는 **제목**과 **내용**을 쓰고, 굵게·목록·인용·링크 같은 서식을 넣을 수 있습니다. 왼쪽 아래 **웃는 얼굴 아이콘**으로 이모지·GIF·스티커도 붙일 수 있습니다.\n\n**알림을 보내고 싶을 때 — 멘션(@)**\n- 특정 학생에게: **‘@+대상’** 을 입력한 뒤 내용을 쓰면, 그 학생에게 알림이 갑니다.\n- 팀 전체에게: **‘@+team’**(팀 이름)을 입력한 뒤 내용을 쓰면, 팀 구성원 모두에게 알림이 갑니다.\n\n중요한 공지는 멘션을 함께 써야 학생들이 놓치지 않습니다.",
      images: [img("teams-post.png", "Teams 새 게시물 작성 창 — 게시물 제목·내용 입력, 왼쪽 아래 이모지 아이콘으로 여는 이모지·GIF·스티커 패널, ‘@+대상’ 멘션과 ‘@+team’ 전체 알림 설명", "게시물 작성 — 제목·내용·이모지, @멘션")],
    },
    {
      heading: "④ 게시판 기능 — 메시지 예약·중요 표시·외부 앱",
      body: "게시물 작성 창의 **＋** 를 누르면 더 많은 기능이 나옵니다.\n\n- **메시지 예약**: 정한 시간에 메시지를 보냅니다(예: 수업 시작 5분 전 공지).\n- **전송 옵션 설정**: **중요** 메시지로 표시합니다.\n- **비디오 클립 녹화**: 짧게 설명하는 영상을 녹화해 전달합니다.\n- **다른 채널에 게시**: 같은 공지를 여러 채널에 한 번에 올립니다.\n- **YouTube·Polls·Clipchamp·Forms 등**: 다양한 외부 프로그램과 사이트를 연결해 게시물 안에서 바로 씁니다.",
      images: [img("teams-post-options.png", "게시물 작성 창 ＋ 메뉴 — 파일 첨부, 메시지 예약(특정 시간에 보내기), 전송 옵션 설정(중요 표시), 비디오 클립 녹화, 사용 권한 변경, 다른 채널에 게시, YouTube·Polls·Clipchamp·Forms 등 외부 앱", "게시물 ＋ 메뉴 — 예약·중요·영상·외부 앱")],
    },

    /* ---------------- 3. Forms 소개 ---------------- */
    {
      heading: "⑤ Microsoft Forms — 접속과 ‘새 퀴즈’",
      body: "Forms는 **웹 버전 전용**입니다. [office.com](https://office.com/) → **① 앱** → **Forms** 로 들어갑니다.\n\n처음 화면에는 두 가지 시작 버튼이 있습니다.\n\n- **새 퀴즈**: 기본적으로 퀴즈를 만드는 양식. **채점과 피드백**이 가능하고 **Teams 과제와 연동**됩니다.\n- **새 양식**: 기본적인 설문조사용. 링크로 의견을 간단히 모을 때만 씁니다.\n\n👉 설문이든 퀴즈든 **범용적으로 ‘새 퀴즈’로 만드는 것을 추천**합니다. 점수를 주지 않으면 설문처럼 쓸 수 있고, 나중에 Teams 과제로도 바로 낼 수 있기 때문입니다.",
      images: [
        img("forms-access.png", "office.com 앱 화면에서 ① 앱 메뉴를 누른 뒤 Forms(설문 조사 및 퀴즈를 사용자 지정하고 실시간 결과를 얻으세요)를 선택하는 화면", "Forms 접속 — office.com → 앱 → Forms"),
        img("forms-quiz-vs-form.png", "Forms 시작 화면의 ‘새 퀴즈’와 ‘새 양식’ 버튼 — 새 퀴즈는 채점·피드백·Teams 연동, 새 양식은 간단한 설문용, 범용적으로 새 퀴즈를 추천", "‘새 퀴즈’ vs ‘새 양식’"),
      ],
    },
    {
      heading: "⑥ Forms 문항 만들기 — 선택 항목",
      body: "**빠른 시작 → 선택 항목**으로 객관식 문항을 만듭니다.\n\n- 질문과 옵션을 입력하고, 정답 옵션에 체크합니다.\n- **점수**: 문항의 배점\n- **복수 답변**: 여러 개를 고르게 할지\n- **필수**: 반드시 답해야 하는지\n- **… 더 보기**\n  - **옵션 순서 섞기**: 답지 순서를 학생마다 랜덤하게\n  - **드롭다운**: 옵션 수가 많을 때 목록으로 보여 줌\n  - 부제목, 분기 추가(답에 따라 다른 문항으로 이동)",
      images: [
        img("forms-choice.png", "Forms 빠른 시작의 ‘선택 항목’ 문항 편집 화면 — 질문·옵션 입력, 점수(배점), 복수 답변, 필수 토글과 … 더 보기 메뉴", "선택 항목 — 배점·복수 답변·필수"),
        img("forms-choice-more.png", "선택 항목의 … 더 보기 메뉴 — 옵션 순서 섞기(답변 순서 랜덤), 드롭다운(옵션이 많을 때), 부제목, 분기 추가", "… 더 보기 — 옵션 순서 섞기·드롭다운"),
      ],
      imageLayout: "row",
    },
    {
      heading: "⑦ Forms 문항 만들기 — 텍스트",
      body: "**빠른 시작 → 텍스트**는 단답형·서술형 문항입니다. 길게 서술해야 하면 **긴 답변**을 켭니다. 서술형은 자동 채점이 되지 않으므로, 응답을 보며 교사가 점수와 피드백을 줍니다.\n\n그 밖에 **평가**(별점·숫자 척도)로 만족도나 자기 평가를 받을 수도 있습니다.",
      images: [img("forms-text.png", "Forms 빠른 시작의 ‘텍스트’ 문항 — 질문과 답변 입력란, 길게 서술할 경우 켜는 ‘긴 답변’ 토글", "텍스트 문항 — 긴 답변")],
    },

    /* ---------------- 4. Forms로 Teams 과제 ---------------- */
    {
      heading: "⑧ Forms 양식으로 Teams에서 과제 내기",
      body: "Forms에서 만든 퀴즈를 Teams 수업 팀의 과제로 냅니다.\n\n1. Teams 수업 팀의 **과제** 탭 → **만들기** → **새 퀴즈**를 선택합니다.\n2. **내 퀴즈** 목록에서 Forms로 작성해 둔 양식을 고르고, 마감일·점수를 확인한 뒤 **할당**합니다.\n\n학생이 응답하면 선택형은 **자동 채점**되고, 결과는 Teams의 **성적** 탭에 모입니다. 서술형은 교사가 채점·피드백한 뒤 돌려줍니다. Google Classroom의 ‘퀴즈 과제(Forms)’(4차시)와 같은 흐름입니다.",
      images: [img("teams-assign-quiz.png", "① Teams 과제 탭 > 만들기 > 새 퀴즈 선택, ② 내 퀴즈 목록에서 Forms로 작성된 양식을 선택한 뒤 할당하는 화면", "과제 탭 → 만들기 → 새 퀴즈 → 양식 선택 → 할당")],
    },

    /* ---------------- 5. 학습 가속기 ---------------- */
    {
      heading: "⑨ 학습 가속기(Learning Accelerators) — 학습능력 키우기",
      body: "**학습 가속기**는 Teams·OneNote·PowerPoint 안에 들어 있는 학습 지원 도구 묶음입니다. AI가 학생의 수행을 분석해 개별 피드백을 주고, 그 데이터를 교사에게 보여 줍니다.\n\n- **기초 능력 키우기**\n  - **읽기 | 언어**: 읽기 진행(Reading Progress)·읽기 코치 — 116개 언어, 읽기 유창성·문해력 (Teams)\n  - **수학**: 수학 진행·수학 코치 — 수리력 (OneNote)\n  - **감정 | 웰빙**: 리플렉트 — 정서적 웰빙 (Teams)\n- **미래 역량 키우기**\n  - **검색 | 정보**: 검색 진행·검색 코치 — 정보 리터러시 (Teams)\n  - **발표**: 발표 진행·발표 코치 — 프레젠테이션 (PowerPoint)\n- **데이터 & Insights**: **교육 인사이트(Education Insights)** 가 각 도구의 데이터를 개인·학급·학년·학교 수준에서 자동으로 모아 보여 줍니다.\n\n3차시에서 본 **인공지능 튜터와 학습 데이터**가 실제 도구로 구현된 모습입니다.",
      images: [img("learning-accelerators.png", "Learning Copilot Accelerators | 학습능력 키우기 — 기초 능력(읽기·언어, 수학, 감정·웰빙), 미래 역량(검색·정보, 발표), 데이터&Insights(교육 인사이트) 범주별 도구와 연결 앱", "학습 가속기 한눈에 보기")],
    },

    /* ---------------- 6. 읽기 진행 · 리플렉트 ---------------- */
    {
      heading: "⑩ 읽기 진행(Reading Progress)",
      body: "**읽기 진행**은 학생이 글을 소리 내어 읽는 모습을 녹음·녹화해 제출하면, AI가 읽기 유창성을 분석해 주는 과제입니다.\n\n1. **읽기 과제 생성**: 과제 탭 → 만들기 → **학습 가속화 도구** → **읽기 진행**에서 지문을 넣어 과제를 냅니다.\n2. **AI 기반 결과 분석**: 분당 정확히 읽은 단어 수, 정확도, 잘못 발음·생략·삽입·반복·자기 수정 등을 단어별로 표시합니다.\n3. **개별화된 피드백**: 교사는 분석 화면에서 틀린 단어를 확인하고 학생별로 피드백합니다.\n4. **진행 상황 추적**: 여러 번의 과제 결과가 쌓여 학생의 성장을 추적할 수 있습니다.\n\n영어 등 외국어 읽기, 국어 낭독 연습에 특히 유용합니다.",
      images: [img("reading-progress.png", "읽기 진행 — 과제 부여 위치(만들기 > 학습 가속화 도구 > 읽기 진행)와 분석 화면(분당 정확 단어 41개, 정확도 83%, 잘못 발음·생략·자기 수정 단어 표시)", "읽기 진행 — 과제 부여 위치와 분석 화면")],
    },
    {
      heading: "⑪ 리플렉트(Reflect)",
      body: "**리플렉트**는 학생의 감정 상태를 확인하는 **사회 정서 학습(SEL)** 도구입니다. 교사가 ‘오늘 기분이 어때요?’ 같은 체크인을 보내면, 학생은 감정을 나타내는 캐릭터를 고릅니다.\n\n1. 학생들의 상태를 **색깔과 키워드(감정 단어)** 로 입력합니다.\n2. 학생들의 상태가 **날짜별로 누적**되어 관리됩니다 — 평소와 달라진 학생을 일찍 알아챌 수 있습니다.\n3. 다양한 **사회 정서 학습 프로그램**이 탑재되어 있습니다.\n\n데이터는 학생 지원을 위한 것이며, 평가나 낙인에 쓰지 않도록 주의합니다.",
      images: [img("reflect.webp", "리플렉트 ‘How are you feeling today?’ 화면 — 계단 위 여러 색의 감정 캐릭터들로 학급 학생들의 오늘 기분을 보여 주는 장면", "리플렉트 — 학급의 오늘 감정 상태")],
    },
  ],

  compareTables: [
    {
      caption: "Forms ‘새 퀴즈’ vs ‘새 양식’",
      headers: ["구분", "새 퀴즈", "새 양식"],
      rows: [
        ["용도", "퀴즈·형성평가(설문으로도 사용 가능)", "간단한 설문·의견 수합"],
        ["채점·피드백", "가능(정답·배점·자동 채점)", "없음"],
        ["Teams 과제 연동", "가능(과제 → 새 퀴즈)", "불가"],
        ["추천", "범용적으로 추천", "링크로 의견만 모을 때"],
      ],
    },
    {
      caption: "Google Classroom(4차시) ↔ Teams for Education",
      headers: ["하는 일", "Google Classroom", "Teams for Education"],
      rows: [
        ["공지", "게시판(스트림)", "채널 게시물(@멘션·예약)"],
        ["과제·퀴즈", "수업 과제 → 퀴즈 과제(Google Forms)", "과제 → 새 퀴즈(Microsoft Forms)"],
        ["성적", "성적 탭", "성적 탭"],
        ["학습 데이터", "—", "학습 가속기·Insights"],
      ],
    },
  ],

  practice: {
    title: "Forms 퀴즈를 만들어 Teams 과제로 내기",
    goal: "Teams 게시판으로 공지하고, Forms ‘새 퀴즈’를 만들어 Teams 과제로 할당한 뒤, 학습 가속기를 살펴본다.",
    steps: [
      "office.com → 앱 → Teams로 실습용 수업 팀에 들어가 메뉴와 ‘일반’ 채널을 확인한다.",
      "‘일반’ 채널에 @team 멘션을 넣은 공지를 쓰고, 메시지 예약 기능으로 예약 공지를 하나 더 만든다.",
      "office.com → 앱 → Forms에서 ‘새 퀴즈’로 선택 항목 2문항(배점·옵션 순서 섞기)과 텍스트 1문항(긴 답변)을 만든다.",
      "Teams 과제 탭 → 만들기 → 새 퀴즈에서 방금 만든 퀴즈를 골라 할당한다.",
      "(학생 역할) 퀴즈에 응답하고, (교사 역할) 성적 탭에서 결과를 확인한다.",
      "과제 → 만들기 → 학습 가속화 도구 메뉴에서 읽기 진행 등 학습 가속기 종류를 확인한다.",
    ],
    checklist: [
      "@멘션으로 알림이 가는 공지를 올렸는가",
      "Forms 퀴즈에 정답·배점을 설정했는가",
      "퀴즈가 Teams 과제로 할당되고 성적 탭에 반영되었는가",
      "학습 가속기의 종류와 용도를 설명할 수 있는가",
    ],
    deliverable: "Teams 공지 게시물, Forms 퀴즈 편집 화면, Teams 과제 할당 화면 캡처(개인정보 제외).",
  },

  quiz: [
    {
      type: "mcq",
      question: "Teams 게시물에서 팀 구성원 모두에게 알림이 가도록 하려면?",
      choices: ["제목을 굵게 쓴다", "‘@+team’을 입력하고 내용을 쓴다", "이모지를 붙인다", "파일을 첨부한다"],
      answerIndex: 1,
      explanation: "‘@+team(팀 이름)’ 멘션을 쓰면 팀 전체에 알림이 갑니다. 특정 학생은 ‘@+대상’.",
    },
    {
      type: "mcq",
      question: "Teams 과제로 낼 수 있고 채점·피드백이 가능한 Forms 양식은?",
      choices: ["새 양식", "새 퀴즈", "둘 다 불가", "드롭다운"],
      answerIndex: 1,
      explanation: "‘새 퀴즈’는 채점·피드백이 가능하고 Teams 과제와 연동됩니다.",
    },
    {
      type: "ox",
      question: "Forms는 PC에 설치하는 앱 버전으로만 사용할 수 있다.",
      answer: false,
      explanation: "Forms는 웹 버전 전용입니다(office.com → 앱 → Forms).",
    },
    {
      type: "mcq",
      question: "학생이 소리 내어 읽은 녹음을 AI가 분석해 정확도·잘못 읽은 단어를 보여 주는 학습 가속기는?",
      choices: ["리플렉트", "읽기 진행", "Insights", "Class Notebook"],
      answerIndex: 1,
      explanation: "읽기 진행(Reading Progress)은 읽기 유창성을 분석하고 진행 상황을 추적합니다.",
    },
    {
      type: "self",
      question: "리플렉트 데이터를 학생 ‘지원’에 쓰기 위해 교사가 지켜야 할 원칙을 한 가지 적어 보세요.",
    },
  ],

  reflection: [
    "공지를 게시물·멘션·예약으로 나누어 쓰면 학생의 놓침이 어떻게 줄어들까요?",
    "학습 가속기의 AI 분석 결과를 그대로 믿지 않고 교사가 확인해야 하는 부분은 무엇일까요?",
  ],

  terms: [
    { term: "수업 팀", definition: "Teams에서 수업용으로 만든 팀. 게시판·과제·성적·Class Notebook·학습 가속기가 들어 있다." },
    { term: "채널", en: "Channel", definition: "팀 안의 주제별 공간. 기본 채널은 ‘일반’이며 탭으로 앱·사이트를 추가할 수 있다." },
    { term: "멘션", en: "@mention", definition: "‘@+대상’ 또는 ‘@+team’으로 특정 사람이나 팀 전체에 알림을 보내는 기능." },
    { term: "메시지 예약", definition: "게시물을 정한 시간에 자동으로 보내는 기능." },
    { term: "Microsoft Forms", definition: "설문과 퀴즈를 만드는 웹 전용 도구. ‘새 퀴즈’는 채점·Teams 과제 연동이 가능." },
    { term: "학습 가속기", en: "Learning Accelerators", definition: "읽기·수학·검색·발표·감정 영역의 AI 학습 지원 도구 묶음과 그 데이터를 모으는 교육 인사이트." },
    { term: "읽기 진행", en: "Reading Progress", definition: "소리 내어 읽기 녹음을 AI가 분석해 정확도·오류 단어를 보여 주는 읽기 과제." },
    { term: "리플렉트", en: "Reflect", definition: "학생의 감정 상태를 체크인하고 누적 관리하는 사회 정서 학습 도구." },
    { term: "교육 인사이트", en: "Education Insights", definition: "학습 가속기와 Teams 활동 데이터를 개인·학급 수준으로 보여 주는 대시보드." },
  ],

  sources: [
    { label: "Microsoft Teams for Education (공식)", url: "https://www.microsoft.com/en-us/education/products/teams", lastVerified: "2026-10-29" },
    { label: "Microsoft Forms (office.com)", url: "https://forms.office.com/", lastVerified: "2026-10-29" },
    { label: "Microsoft Education — 학습 가속기 등 학습 도구 (공식)", url: "https://www.microsoft.com/en-us/education", lastVerified: "2026-10-29" },
  ],

  cautions: [
    "Teams·Forms 화면과 메뉴 이름은 업데이트에 따라 조금씩 달라질 수 있습니다.",
    "학습 가속기와 리플렉트 데이터는 학생 지원을 위한 것이며, 평가·비교에 쓰지 않도록 주의합니다.",
  ],
};
