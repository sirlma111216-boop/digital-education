import type { Session } from "@/types/content";

export const session04: Session = {
  id: "04",
  slug: "google-workspace-classroom",
  title: "Google Workspace for Education과 Google Classroom",
  category: "google",
  summary: "Chromebook·Classroom·Workspace 앱·Gemini가 하나의 학교 계정으로 연동되는 구조를 이해하고, Classroom으로 과제를 내고 채점하는 흐름을 실습한다.",
  duration: 90,
  level: "입문",
  keywords: ["Google Workspace for Education", "Chromebook", "Google Classroom", "Gemini", "GEG"],
  theoryRatio: 55,
  practiceRatio: 45,
  published: true,
  lastUpdated: "2026-10-08",
  sourceFiles: ["디지털 교육 교안 4강", "Google for Education 공식 사이트(edu.google.com/intl/ALL_kr)"],

  overview:
    "Google for Education은 네 개의 축으로 이루어져 있습니다. 어디서나 학습하는 기기 Chromebook, 수업을 운영하는 Classroom, 함께 쓰는 Workspace 앱(Docs·Forms·Gmail·Drive 등), 그리고 AI인 Gemini입니다. 핵심은 이 네 요소가 하나의 학교 계정으로 연동되어 하나의 수업 흐름을 이룬다는 점입니다. 이 차시의 앞부분에서는 공식 사이트의 설명을 바탕으로 네 축과 교사를 위한 Google의 지원(무료 교육·인증·GEG)을 살펴보고, 뒷부분에서는 Classroom에서 수업을 만들고 과제를 내고 채점하는 흐름을 직접 실습합니다.",

  objectives: [
    "Google for Education의 네 축(Chromebook·Classroom·Workspace 앱·Gemini)과 그 연동 구조를 설명할 수 있다.",
    "Workspace for Education의 에디션과 개인정보 보호 원칙, 교사를 위한 Google의 지원(무료 교육·인증·GEG)을 설명할 수 있다.",
    "Classroom에서 수업을 만들고 학생을 초대하며, 과제·퀴즈 과제·질문·자료를 목적에 맞게 구분해 낼 수 있다.",
    "Docs 과제와 Forms 퀴즈 과제를 채점하고 성적 탭에서 결과를 확인하는 흐름을 설명할 수 있다.",
  ],

  keyQuestion:
    "Chromebook·Classroom·Workspace 앱·Gemini가 하나의 학교 계정으로 연동될 때, 수업은 어떻게 ‘하나의 흐름’이 될까?",

  conceptMap: {
    title: "Google for Education의 네 축",
    caption: "네 요소가 따로 노는 것이 아니라, 하나의 학교 계정으로 연동되어 수업 전체를 하나의 흐름으로 만든다.",
    nodes: [
      { label: "Chromebook", description: "어디서나 학습하는 기기" },
      { label: "Classroom", description: "과제·수업을 운영하는 LMS" },
      { label: "Workspace 앱", description: "Docs·Forms·Gmail·Drive 등" },
      { label: "Gemini", description: "교사·학생을 돕는 AI" },
    ],
  },

  theoryBlocks: [
    /* ================= Part 1. Google Workspace for Education (10~15분) ================= */
    {
      heading: "Google for Education 한눈에 보기",
      body: "Google for Education 공식 사이트는 첫 화면에서 **‘교육자와 학습자의 역량 강화’** 를 내세웁니다. 연구에 근거한 도구를 제공해, 교사가 학생과의 연결을 바탕으로 의미 있는 학습 경험을 만들도록 돕겠다는 것입니다.\n\n그리고 이를 위한 제품을 **네 가지**로 소개합니다.\n\n- **Google Workspace for Education**으로 공동작업\n- **Chromebook**으로 어디서나 학습\n- **클래스룸**으로 흥미로운 학습 환경 조성\n- **Gemini**로 교육 환경 혁신",
      images: [
        {
          src: "/assets/sessions/04/gfe-home.jpg",
          alt: "Google for Education 첫 화면 — Gmail·Calendar·Drive·Docs·Meet·Classroom·Chrome 아이콘과 ‘교육자와 학습자의 역량 강화’ 문구",
          caption: "Google for Education 첫 화면 (edu.google.com/intl/ALL_kr)",
        },
      ],
    },
    {
      heading: "핵심 축 — 네 요소의 연동",
      variant: "highlight",
      body: "**Chromebook** + **Classroom** + **Workspace 앱** + **Gemini**\n\n하나의 학교 계정으로 연동될 때 하나의 수업 흐름이 된다",
    },
    {
      heading: "① Workspace for Education — 함께 쓰는 앱 묶음",
      body: "Workspace for Education은 **실시간 수정, 간편한 파일 공유, 커뮤니케이션 도구**로 학생·교사·직원의 공동작업을 돕는 학교용 앱 묶음입니다. 무료 에디션(Education Fundamentals)에만 해도 다음이 들어 있습니다.\n\n- **수업·공동작업 앱**: 클래스룸, Docs, Sheets, Slides, Forms, Gmail, Drive, Meet, Sites, Chat, Calendar, Vids\n- **AI**: Gemini for Education, Gemini Notebook, 클래스룸의 Gemini\n- **관리**: Google 관리 콘솔의 보안·관리 도구, 기관 전체가 나눠 쓰는 100TB 클라우드 저장 공간\n\n이 모든 파일은 **Drive**에 모입니다. Drive는 저장을 넘어 **공유·권한·공동 편집**의 허브이므로, 학기 초에 폴더 구조와 공유 범위(보기·댓글·편집, 학교 내부·특정 사용자)를 정해 두면 이후 모든 협업이 정돈됩니다. 그림 속 장면처럼 여러 사람이 함께 편집하는 Slides 안에서 바로 Gemini로 이미지를 만들 수 있을 만큼, 앱들은 서로 그리고 AI와 연결되어 있습니다.",
      imageLayout: "side",
      images: [
        {
          src: "/assets/sessions/04/gfe-slides-gemini.jpg",
          alt: "Google Slides에서 여러 사람이 함께 편집하며, 오른쪽 Gemini 패널에 ‘화려한 색깔의 앵무새를 사실적인 이미지로 만들어 줘’라고 요청해 이미지를 생성하는 화면 예시",
          caption: "Slides 공동작업 + Gemini 이미지 생성 (Google for Education 사이트 예시 화면)",
        },
      ],
    },
    {
      heading: "학교 계정·에디션·개인정보 보호",
      body: "- **학교(기관) 계정**: 개인 Gmail 계정과 달리 학교 관리자가 앱 사용·외부 공유·연령별 정책을 관리합니다. 수업에서는 반드시 학교 계정 기준으로 기능을 확인합니다.\n- **에디션**: 요건을 갖춘 학교는 **Education Fundamentals를 무료**로 쓰고, 필요에 따라 고급 보안·분석과 프리미엄 수업 기능(Docs·Sheets·Slides·Vids·Forms 안의 Gemini 등)을 더한 **Education Plus**, 또는 Standard·Teaching and Learning 같은 유료 버전과 부가기능을 선택합니다(아래 에디션 표 참고).\n- **개인정보 보호**: Google은 Gmail·Calendar·클래스룸 같은 핵심 서비스에 **광고를 게재하지 않고**, 사용자가 자기 데이터를 소유·관리하며, FERPA·COPPA·GDPR 등 규정 준수를 지원한다고 밝히고 있습니다.",
    },
    {
      heading: "② Chromebook — 어디서나 학습하는 기기",
      body: "Chromebook은 **빠르고 안전하며 관리가 간편한** 학교용 기기입니다. 3차시에서 본 **1인 1디바이스**와 **MDM**이 Google 생태계에서 구현되는 모습입니다.\n\n- **학교에 맞춘 설계**: 하루 종일 가는 배터리, 학생 사용 환경을 견디는 내구성, 읽기 모드·텍스트 음성 변환 같은 접근성 도구 기본 제공\n- **보안과 관리**: 자동 업데이트와 바이러스 보호, 클라우드 기반 **Google 관리 콘솔**의 수많은 정책으로 학교 전체 기기를 한꺼번에 배포·관리(Chrome Education 업그레이드)\n- **교사용 Chromebook Plus**: 더 높은 성능과 생성형 AI 기능을 갖춘 기기\n- **수업 도구**: Education Plus가 적용된 관리형 Chromebook에서는 교사가 수업 중 학생 화면을 실시간으로 관리하는 기능도 쓸 수 있습니다.\n\n공식 사이트에는 PC보다 관리·통제가 쉽고, 교사가 ‘지식 전달자’에서 ‘조력자’로 바뀌었다는 **국내 교사들의 도입 후기**도 소개되어 있습니다.",
      images: [
        {
          src: "/assets/sessions/04/gfe-chromebook.jpg",
          alt: "‘Chromebook으로 교육 및 학습’ 페이지 — Chromebook, Chromebook Plus, Chromebox OPS, 데스크톱, 키오스크 기기 유형",
          caption: "학교용 Chromebook 알아보기 (Google for Education)",
        },
      ],
    },
    {
      heading: "③ Classroom — 수업을 운영하는 곳",
      body: "Google 클래스룸은 **Workspace for Education에 포함된 LMS**(3차시)입니다. 공식 사이트는 클래스룸을 ‘교육과 학습이 하나가 되는 곳’으로 소개하며, 과제 관리·인터랙티브 도구·공동작업을 쉽게 만들어 교사가 **맞춤설정·관리·측정이 가능한 학습 경험**을 만들 수 있다고 설명합니다.\n\n클래스룸은 네 축을 실제로 엮어 주는 **연결 고리**입니다. 학생은 Chromebook으로 클래스룸에 들어오고, 과제는 Docs·Forms로 수행하며, 교사는 클래스룸 안의 Gemini로 자료와 평가 초안을 만듭니다. 구체적인 사용법은 이 차시 뒷부분의 실습에서 다룹니다.",
      images: [
        {
          src: "/assets/sessions/04/gfe-classroom.jpg",
          alt: "Google Classroom 소개 페이지 — ‘교육과 학습이 하나가 되는 곳’",
          caption: "Google Classroom 소개 (Google for Education)",
        },
      ],
    },
    {
      heading: "④ Gemini — 교육 환경을 바꾸는 AI",
      body: "Google은 Workspace for Education에 다음 AI 도구를 **무료로** 포함하고 있다고 안내합니다(학교 관리자가 사용을 허용해야 함).\n\n- **Gemini for Education**: 수업 계획, 개인에 맞춘 학습 지원, 일상 업무를 돕는 교육용 AI 어시스턴트\n- **Gemini Notebook**: 교사가 올린 자료(PDF·웹사이트·YouTube·Docs 등)**만을 근거로** 요약·수업 계획·학습 가이드·퀴즈를 만들고 출처를 함께 보여 주는 AI\n- **클래스룸의 Gemini**: 클래스룸 안에서 쓰는 교사용 AI 도구 모음\n- **Workspace Studio**: 반복 업무를 맡기는 AI 에이전트를 만드는 공간\n\nGoogle은 교육용 계정의 데이터를 **사람이 검토하거나 AI 모델 학습에 쓰지 않고**, 만 18세 미만 학생에게는 추가 보호 기능을 적용한다고 밝히고 있습니다. 생성형 AI의 원리와 본격적인 활용은 13~14차시에서 다룹니다.",
      imageLayout: "side",
      images: [
        {
          src: "/assets/sessions/04/gfe-gemini.jpg",
          alt: "Gemini for Education 화면 예시 — 생물 교과 계획서 PDF를 올리고 ‘이 계획서로 수업을 만들어 줘’라고 요청하는 장면",
          caption: "Gemini for Education 예시 화면 (Google for Education)",
        },
      ],
    },
    {
      heading: "네 축이 연동되면 — 수업 한 장면",
      body: "네 요소가 **하나의 학교 계정**으로 이어질 때 수업은 이렇게 흐릅니다.\n\n1. **Chromebook** — 학생이 학교 계정으로 로그인하면 자기 클래스룸·Drive·앱이 그대로 열립니다.\n2. **Classroom** — 오늘의 과제와 자료를 확인합니다.\n3. **Workspace 앱** — 학생은 **Docs**(학생별 사본)에 글을 쓰고 **Forms** 퀴즈에 답하며, 결과는 **Drive**에 쌓이고 안내는 **Gmail·Calendar**로 전달됩니다.\n4. **Gemini** — 교사는 클래스룸의 Gemini로 퀴즈·루브릭 초안을 만들고, Gemini Notebook으로 수업 자료 기반 학습 가이드를 만듭니다.\n\n→ 다시 **Classroom**에서 채점·피드백·성적으로 돌아옵니다. 도구를 하나씩 따로 배우기보다, 이 **연동의 흐름**을 기억하는 것이 핵심입니다.",
    },
    {
      heading: "교사를 위한 Google의 지원 — 무료 교육과 인증",
      body: "Google for Education **학습 센터**는 교사가 도구를 익히고 역량을 인정받을 수 있도록 다음을 제공합니다.\n\n- **무료 온라인 과정**: ‘Google Workspace for Education Fundamentals 기초’(약 2.3시간), ‘K-12 교육에서 Google AI 시작하기’(약 2시간), ‘교육 및 학습을 위한 프리미엄 기능’ 등 역할(교사·IT 관리자·학생)별 과정과, 새로 나온 AI 리터러시 과정 **‘Google AI 교육자 시리즈’**\n- **공인 인증**: **Google 공인 교육 전문가 1급·2급**(Google 도구를 수업에 활용하는 능력), **Gemini 인증 교육자**(AI를 활용한 맞춤 수업 설계 능력) — 유효 기간 3년, 이력서·포트폴리오에 쓸 수 있는 배지 제공(응시 조건은 등록 시 확인)\n- **챔피언 프로그램**: 공인 혁신가·공인 트레이너·공인 코치·공인 GEG 리더 중 하나가 되면 **Google for Education 챔피언** 커뮤니티에 합류합니다.\n\n교사가 혼자 익히지 않도록 **배움 → 인증 → 공동체**로 이어지는 경로를 마련해 둔 것이 Google 교사 지원의 특징입니다.",
      images: [
        {
          src: "/assets/sessions/04/gfe-learning-center.jpg",
          alt: "Google for Education 학습 센터 — ‘Google for Education 기술 역량을 쌓으세요’",
          caption: "Google for Education 학습 센터",
        },
      ],
    },
    {
      heading: "GEG — Google Educator Group",
      body: "**GEG(Google Educator Group)** 는 지역이나 관심 분야가 같은 교육자들이 **온라인과 오프라인에서 모여** 기술로 학생의 학습 효과를 높이는 방법을 공유하고, 협업하며, 서로 돕는 교사 커뮤니티입니다.\n\n- **누구나 가입**: 일선 교사, 교장, 학교 관리자 누구나 참여할 수 있습니다(시작 전 GEG 윤리 강령 확인).\n- **풀뿌리 운영**: 각 그룹은 자원봉사 교육자(GEG 리더)가 이끌며 지역에 맞게 독립적으로 운영됩니다.\n- **무료 이벤트**: 온라인·오프라인 GEG 행사는 모두 무료입니다.\n- **가입 방법**: Google for Education 커뮤니티 플랫폼에서 프로필을 만들고 ‘Google Educator Group’을 선택하거나, 공식 GEG 지도에서 가까운 그룹을 찾습니다.\n- **국내 GEG**: 공식 지도에는 GEG South Korea를 비롯해 부천·대구·대전·세종·성남·평택·남양주·경북 등 지역 그룹이 올라 있습니다.\n\n예비 교사에게 GEG는 **혼자가 아니라 동료와 함께 배우는** 디지털 교육의 출발점이 될 수 있습니다.",
      images: [
        {
          src: "/assets/sessions/04/gfe-geg.jpg",
          alt: "‘커뮤니티에서 GEG와 연결되세요’ 페이지 — 교육자들이 노트북을 보며 함께 이야기하는 사진",
          caption: "GEG(Google Educator Group) 소개 (Google for Education)",
        },
      ],
    },

    /* ================= Part 2. Google Classroom 실습 ================= */
    {
      heading: "Classroom 실습 ① 수업 만들기",
      body: "1. 학교 계정으로 **classroom.google.com** 에 로그인합니다.\n2. 오른쪽 위 **＋** → **수업 만들기**를 누릅니다.\n3. **수업 이름**(필수)과 부제(반), 과목, 강의실을 입력하고 **만들기**를 누릅니다.\n4. 수업이 만들어지면 **게시판** 상단 배너에 **수업 코드**가 보입니다. 코드를 크게 띄우거나 초대 링크를 복사할 수 있습니다.\n5. **사용자** 탭에서 같은 교과·학년 선생님을 **공동 교사**로 초대할 수 있습니다.\n\n💡 수업을 만들자마자 **수업 과제** 탭에서 단원·주차별 **주제**를 먼저 만들어 두면, 이후 자료와 과제가 흩어지지 않습니다.",
    },
    {
      heading: "Classroom 실습 ② 학생은 수업 코드로 들어오기",
      body: "학생이 수업에 들어오는 방법은 세 가지입니다.\n\n- **수업 코드**: 학생이 classroom.google.com → **＋** → **수업 참여하기**에서 교사가 알려 준 영문·숫자 코드를 입력합니다. 교실에서는 코드를 화면에 크게 띄워 주는 방식이 가장 빠릅니다.\n- **초대 링크**: 교사가 복사한 링크를 공지·메시지로 보내면 학생이 눌러 바로 참여합니다.\n- **이메일 초대**: **사용자** 탭에서 학생 이메일로 초대합니다.\n\n⚠️ 학생이 **학교 계정**으로 로그인했는지 꼭 확인합니다. 개인 Gmail로 들어오면 학교 정책이 적용되지 않거나 참여가 막힐 수 있습니다.",
    },
    {
      heading: "Classroom 실습 ③ 메뉴 둘러보기 — 게시판·수업 과제·사용자·성적",
      body: "수업에 들어가면 위쪽에 네 개의 탭이 있습니다.\n\n- **게시판**: 수업의 소식이 모이는 곳입니다. 공지를 올리고, 새로 올라온 과제·자료가 시간순으로 보이며, 다가오는 마감이 표시됩니다.\n- **수업 과제**: 과제·퀴즈 과제·질문·자료를 **주제별로 정리**해 올리는 곳입니다. 실제 수업 운영은 대부분 여기서 이뤄집니다.\n- **사용자**: 교사와 학생 명단을 관리하고, 공동 교사·학생을 초대합니다(학교 설정에 따라 보호자 요약 메일도 관리).\n- **성적**: 학생별·과제별 점수를 표로 보는 곳입니다.\n\n학교 설정에 따라 클래스룸 안에서 **Gemini** 도구도 함께 보입니다.",
    },
    {
      heading: "Classroom 실습 ④ 과제·퀴즈 과제·질문·자료의 차이",
      body: "**수업 과제** 탭 → **＋ 만들기**를 누르면 여러 종류의 게시물을 만들 수 있습니다. 목적에 따라 골라 씁니다(아래 게시물 유형 표 참고).\n\n- **과제** — 학생이 무언가를 **만들어 제출**하는 활동. 파일을 붙여 나눠 주고, 점수·마감일·루브릭을 정합니다.\n- **퀴즈 과제** — **Google Forms 퀴즈**가 자동으로 붙는 과제. 정답과 배점을 정하면 **자동 채점**됩니다.\n- **질문** — 한 문항짜리 **단답형·객관식** 질문. 출구 카드처럼 짧게 이해를 확인할 때 씁니다.\n- **자료** — 제출이 필요 없는 **읽을거리·볼거리**(수업 슬라이드, 참고 영상, 안내문).\n\n그 밖에 이전 수업의 게시물을 가져오는 **게시물 재사용**, 게시물을 묶는 **주제**가 있습니다.",
    },
    {
      heading: "Classroom 실습 ⑤ 과제 만들기 화면의 옵션",
      body: "**수업 과제 → ＋ 만들기 → 과제**를 누르면 과제 만들기 화면이 열립니다. 왼쪽에서 **내용과 첨부**를, 오른쪽에서 **설정**을 정합니다.\n\n**왼쪽 — 과제 내용과 첨부**\n- **제목**(필수)과 **안내**: 학생이 무엇을, 어떻게, 언제까지 할지 분명히 씁니다.\n- **첨부 버튼**(화면 아래)\n  - **Drive**: 내 Drive에 있는 파일(활동지·자료)을 붙입니다. 붙이면 **파일 공유 옵션**을 고릅니다(실습 ⑦).\n  - **YouTube**: 영상을 검색하거나 주소로 붙입니다.\n  - **만들기**: 새 파일을 바로 만들어 붙입니다 — **Docs · Slides · Sheets · Drawings · 설문지(= Google Forms) · Google Vids**\n  - **업로드**: 컴퓨터에 있는 파일(PDF, 한글 파일 등)을 올립니다.\n  - **링크**: 웹사이트 주소를 붙입니다.\n\n**오른쪽 — 과제 설정**\n- **대상**: 과제를 낼 수업(여러 수업에 한꺼번에 가능)과 학생(전체 또는 일부 학생 — 수준별 과제에 활용)\n- **점수**: 기본 100점. 점수 없이 내는 과제는 ‘채점 안 함(Ungraded)’으로 바꿉니다.\n- **기한**: 마감 날짜·시간. 정하지 않으면 기한 없는 과제가 됩니다.\n- **주제**: 단원·주차별 주제에 넣어 정리합니다.\n- **루브릭**: 평가 기준표를 새로 만들거나 이전 루브릭을 다시 씁니다.\n- **원본성 보고서**: 학생 글과 웹 자료의 유사한 부분을 확인합니다(에디션에 따라 사용 횟수 제한).\n\n**게시 방식** — 오른쪽 위 **할당** 버튼 옆 메뉴에서 **바로 할당 / 예약(정한 시간에 게시) / 임시보관**을 고릅니다. 수업 전날 미리 만들어 **예약**해 두면 수업 시작에 맞춰 과제가 올라갑니다.",
    },
    {
      heading: "Classroom 실습 ⑥ 과제는 Docs로, 퀴즈 과제는 Forms로",
      body: "**과제 — 주로 Docs로**\n1. **과제**를 만들고 제목·안내를 씁니다.\n2. **추가 → Google Drive**에서 활동지(Docs)를 붙이고, **파일 공유 옵션**에서 **‘학생별로 사본 제공’** 을 선택합니다. → 학생마다 자기 문서가 자동으로 만들어집니다(세 옵션의 차이는 바로 다음 실습 ⑦ 참고).\n3. 점수·마감일·주제(+ 필요하면 루브릭)를 정하고 **할당**합니다.\n4. 학생이 작성하는 동안 교사는 각 문서를 열어 진행 상황을 보고 **댓글**로 중간 피드백을 줍니다. 학생은 다 쓰면 **제출(영어 화면에서는 Turn in)** 합니다(실습 ⑧).\n\n**퀴즈 과제 — 주로 Forms로**\n1. **퀴즈 과제**를 만들면 빈 **Forms 퀴즈**가 함께 생깁니다.\n2. 퀴즈를 열어 문항·정답·배점을 정하고, **성적 가져오기**를 켭니다. 관리형 Chromebook에서는 다른 탭을 막는 **잠금 모드**도 쓸 수 있습니다.\n3. 학생이 응답하면 Forms가 **자동 채점**하고, 교사는 오답이 많은 문항을 확인해 다음 수업에 반영합니다.\n\n**한 차시의 흐름 예시**: 게시판 공지 → **자료**(수업 슬라이드) → **과제**(Docs 활동지) → **퀴즈 과제**(Forms 형성평가) → **질문**(출구 카드)",
    },
    {
      heading: "Classroom 실습 ⑦ 파일 공유 옵션 — 보기·수정·사본의 차이",
      body: "과제에 Drive 파일(Docs 등)을 붙이면 **파일 공유 옵션**에서 학생에게 파일을 어떻게 나눠 줄지 고릅니다. 선택지는 세 가지입니다.\n\n**① 학생에게 파일 보기 권한 제공**\n- 모든 학생이 **원본 파일 하나를 읽기만** 합니다. 학생은 고칠 수 없습니다.\n- 과제 안내문, 읽기 자료, 예시 글, 채점 기준표처럼 **참고만 하면 되는 파일**에 씁니다.\n\n**② 학생에게 파일 수정 권한 제공**\n- 모든 학생이 **원본 파일 하나를 함께 편집**합니다.\n- 학급 브레인스토밍, 모둠 공동 문서처럼 **함께 채워 가는 활동**에 맞습니다.\n- 다만 누가 무엇을 썼는지 섞이고, 다른 학생의 내용을 실수로 지울 수도 있으며(버전 기록으로 복구 가능), **학생별로 채점하기 어렵습니다**.\n\n**③ 학생별로 사본 제공** ← 개인 과제는 보통 이 옵션\n- Classroom이 **학생 수만큼 사본을 자동으로 만들어** 각자에게 나눠 줍니다. 사본 이름에는 학생 이름이 붙습니다.\n- 각 사본은 **그 학생과 교사만** 편집할 수 있어서, 학생마다 **자기 문서에서 따로 작업**합니다.\n- 교사는 수업 중에도 학생 사본을 열어 **진행 상황을 실시간으로 보고 댓글**을 달 수 있고, **원본은 그대로 남아** 다음 학기에 다시 쓸 수 있습니다.\n- 학생이 **제출하면 문서가 잠기고**(학생은 수정 불가), 교사가 **돌려주면** 다시 고칠 수 있습니다.\n\n그래서 활동지·보고서·글쓰기처럼 **학생마다 결과물을 내고 개별로 채점·피드백하는 과제**는 거의 언제나 **‘학생별로 사본 제공’** 을 선택합니다(아래 파일 공유 옵션 비교표 참고).\n\n⚠️ ‘학생별로 사본 제공’은 **과제를 게시하기 전에만** 고를 수 있습니다. 게시한 뒤에는 바꿀 수 없으니 할당 전에 꼭 확인하세요.",
      imageLayout: "side",
      images: [
        {
          src: "/assets/sessions/04/classroom-file-share-options.png",
          alt: "Classroom 과제의 파일 공유 옵션 목록 — 학생에게 파일 보기 권한 제공, 학생에게 파일 수정 권한 제공, 학생별로 사본 제공",
          caption: "과제에 파일을 붙일 때 나오는 ‘파일 공유 옵션’",
        },
      ],
    },
    {
      heading: "Classroom 실습 ⑧ 학생은 이렇게 제출해요 — 제출 = Turn in",
      body: "학생이 과제를 열면 오른쪽 **내 과제** 상자에 교사가 나눠 준 파일(학생별 사본)이 보입니다.\n\n1. 파일을 열어 과제를 합니다. Classroom에서 연 Docs 오른쪽 위에도 **제출** 버튼이 함께 보입니다.\n2. 다 하면 **제출**을 누릅니다. 파일 없이 하는 과제는 **완료로 표시**를 누릅니다.\n3. 제출한 뒤 고쳐야 하면 **제출 취소**를 누르고, 고친 다음 다시 제출합니다.\n\n⚠️ **화면이 영어로 보일 때 꼭 알려 주세요**\n\nGoogle 계정 언어가 영어로 되어 있는 학생은 버튼이 모두 영어로 보입니다. 이때 **제출 버튼은 ‘Submit’이 아니라 ‘Turn in’** 입니다. 학생들이 버튼을 못 찾아 제출을 놓치는 일이 가장 흔하므로, 첫 과제 때 화면을 보여 주며 짚어 주는 것이 좋습니다.\n\n- 제출 → **Turn in** · 완료로 표시 → **Mark as done** · 제출 취소 → **Unsubmit**\n- (교사 쪽) 할당 → **Assign** · 돌려주기 → **Return**\n\n언어는 Google 계정 설정에서 한국어로 바꿀 수 있습니다. 영어 화면용 메뉴·버튼 대조표는 아래 ‘한·영 대조표’를 참고하세요.",
    },
    {
      heading: "Classroom 실습 ⑨ 채점하고 성적 보기",
      body: "**과제(Docs) 채점**\n1. **수업 과제** 탭에서 과제를 눌러 **학생 과제물** 화면으로 갑니다. 제출·미제출 학생이 한눈에 보입니다.\n2. 학생 이름을 누르면 학생 문서 옆에 **채점 도구**가 열립니다. 문서에 댓글을 달고, 점수를 입력하거나 **루브릭**으로 채점합니다.\n3. **돌려주기**를 누르면 학생이 점수와 피드백을 확인하고, 고쳐서 다시 제출할 수 있습니다.\n\n**퀴즈 과제(Forms) 채점**\n- Forms가 자동 채점한 점수를 **성적 가져오기**로 클래스룸에 불러온 뒤 돌려줍니다. 서술형 문항은 Forms에서 직접 채점합니다.\n\n**성적 탭에서 보기**\n- **성적** 탭에서는 학생(행) × 과제(열)의 표로 모든 점수와 제출 상태(미제출·지각 등)를 한눈에 봅니다.\n- 수업 설정에서 **성적 카테고리**와 **전체 성적 계산 방식**을 정하면, 학생별 전체 성적도 자동으로 계산됩니다.\n\n과제 하나가 **배포 → 수행 → 제출 → 채점·피드백 → 돌려주기 → 성적**으로 이어지는 흐름을 직접 따라가 보는 것이 이번 실습의 목표입니다.",
    },
    {
      heading: "덧붙여 — 클래스룸의 Gemini",
      body: "클래스룸에는 교사를 돕는 **Gemini** 도구가 들어 있습니다. Google에 따르면 교육용 에디션(Fundamentals·Standard·Plus)에서 추가 비용 없이 제공되며, 2026년 4월부터 클래스룸이 지원하는 언어 전반으로 확대되었습니다(관리자 설정과 사용자 연령 기준에 따라 다름).\n\n- 수업 계획 개요, 퀴즈·이해 확인 문항, 설명 글 작성\n- 흔한 오개념 정리, 번역, 파일을 루브릭으로 바꾸기\n\nGoogle도 ‘AI는 실수할 수 있으니 결과를 검토하고 수업 맥락에 맞게 다듬으라’고 안내합니다. 다음 5차시에서는 클래스룸 밖, **브라우저 화면 어디서나** 작동하는 AI 도구(Brisk Teaching·Aside)로 시야를 넓힙니다.",
    },
  ],

  compareTables: [
    {
      caption: "네 축의 역할과 연동",
      headers: ["축", "역할", "다른 축과의 연동"],
      rows: [
        ["Chromebook", "어디서나 학습하는 기기, 관리 콘솔로 학교 단위 관리", "학교 계정 로그인 → 클래스룸·앱이 그대로 열림, 퀴즈 잠금 모드"],
        ["Classroom", "과제 배포·제출·채점·성적(LMS)", "Docs·Forms를 과제로 엮고 결과를 성적으로 모음"],
        ["Workspace 앱", "Docs·Sheets·Slides·Forms·Gmail·Drive·Meet 등 공동작업", "과제 수행·응답 수집, Drive에 저장, Gmail·Calendar로 안내"],
        ["Gemini", "수업 계획·자료·평가 초안, 내 자료 기반 학습 가이드", "클래스룸·Docs 등 각 앱 안에서 바로 사용"],
      ],
    },
    {
      caption: "Workspace for Education 에디션 한눈에 보기",
      headers: ["에디션", "비용", "핵심 특징"],
      rows: [
        ["Education Fundamentals", "무료(요건 충족 기관)", "클래스룸·Docs·Forms·Gmail·Drive·Meet 등, Gemini for Education·Gemini Notebook, 관리 콘솔, 100TB 공용 저장 공간"],
        ["Education Standard", "유료", "Fundamentals + 고급 보안·기기 관리·분석"],
        ["Teaching and Learning", "유료(부가기능)", "Fundamentals·Standard에 더하는 프리미엄 수업 기능"],
        ["Education Plus", "유료", "고급 보안·분석 + 프리미엄 수업 기능 + Docs·Sheets·Slides·Vids·Forms의 Gemini 등"],
      ],
    },
    {
      caption: "과제 파일 공유 옵션 비교",
      headers: ["옵션", "학생이 받는 것", "알맞은 활동", "채점·피드백"],
      rows: [
        ["학생에게 파일 보기 권한 제공", "원본 하나를 읽기 전용으로", "안내문·읽기 자료·예시 글·채점 기준표", "해당 없음(참고 자료)"],
        ["학생에게 파일 수정 권한 제공", "원본 하나를 모두가 함께 편집", "학급 브레인스토밍·모둠 공동 문서", "학생별 채점 어려움"],
        ["학생별로 사본 제공 (보통 이 옵션)", "학생마다 자기 사본", "활동지·보고서·글쓰기 등 개인 과제", "학생별 채점·댓글·돌려주기"],
      ],
    },
    {
      caption: "Classroom 게시물 유형",
      headers: ["유형", "용도", "주로 쓰는 앱·예시"],
      rows: [
        ["과제", "학생이 만들어 제출하는 활동", "Docs 활동지(학생별 사본), 루브릭 채점"],
        ["퀴즈 과제", "Forms 퀴즈가 붙은 과제", "Forms 형성평가, 자동 채점·성적 가져오기"],
        ["질문", "한 문항 단답형·객관식", "출구 카드(오늘 배운 한 문장)"],
        ["자료", "제출 없이 읽거나 볼 자료", "수업 Slides, 참고 영상, 안내문"],
        ["게시물 재사용", "이전 수업 게시물 가져오기", "지난 학기 과제 다시 쓰기"],
      ],
    },
    {
      caption: "영어 화면일 때 — Classroom 메뉴·버튼 한·영 대조표",
      headers: ["한국어 화면", "영어 화면", "누가·언제"],
      rows: [
        ["게시판 · 수업 과제 · 사용자 · 성적", "Stream · Classwork · People · Grades", "수업 상단 탭"],
        ["수업 참여하기", "Join class", "학생이 수업 코드로 참여할 때"],
        ["만들기 → 과제 / 퀴즈 과제 / 질문 / 자료", "Create → Assignment / Quiz assignment / Question / Material", "교사가 게시물을 만들 때"],
        ["학생별로 사본 제공", "Make a copy for each student", "교사가 과제 파일을 붙일 때"],
        ["할당", "Assign", "교사가 과제를 게시할 때"],
        ["제출", "Turn in", "학생이 과제를 낼 때 ← 가장 많이 헷갈림"],
        ["완료로 표시", "Mark as done", "학생이 파일 없는 과제를 마칠 때"],
        ["제출 취소", "Unsubmit", "학생이 제출 후 다시 고칠 때"],
        ["돌려주기", "Return", "교사가 채점 후 돌려줄 때"],
        ["성적 가져오기", "Grade importing", "교사가 Forms 퀴즈 점수를 불러올 때"],
      ],
    },
  ],

  practice: {
    title: "Classroom으로 한 차시 수업 운영해 보기",
    goal: "Classroom에서 수업을 만들고 동료를 학생으로 초대한 뒤, Docs 과제와 Forms 퀴즈 과제를 내고 채점해 성적 탭에서 확인하는 흐름을 직접 경험한다.",
    steps: [
      "학교 계정으로 classroom.google.com에 로그인해 실습용 수업을 만든다.",
      "옆 사람과 짝을 지어, 서로의 수업에 수업 코드로 학생으로 참여한다.",
      "수업 과제 탭에 주제를 2개 만들고, 수업 Slides를 ‘자료’로 올린다.",
      "Docs 활동지를 붙인 ‘과제’를 ‘학생별로 사본 제공’ + 점수 + 마감일로 할당한다.",
      "‘퀴즈 과제’를 만들어 Forms 퀴즈 3문항(정답·배점)을 작성하고 성적 가져오기를 켠다.",
      "‘질문’으로 출구 카드 한 문항을 올린다.",
      "학생 역할로 과제·퀴즈를 제출(영어 화면: Turn in)한 뒤, 교사 역할로 채점·댓글·돌려주기를 하고 성적 탭을 확인한다.",
      "(선택) 클래스룸의 Gemini로 퀴즈나 루브릭 초안을 만들어 보고, 고친 점을 기록한다.",
    ],
    checklist: [
      "학생이 학교 계정·수업 코드로 정상 참여했는가",
      "과제·퀴즈 과제·질문·자료를 목적에 맞게 구분해 올렸는가",
      "Docs 과제가 학생별 사본으로 배포되었는가",
      "Forms 퀴즈가 자동 채점되고 성적 가져오기가 되었는가",
      "돌려주기 후 성적 탭에 점수가 반영되었는가",
    ],
    deliverable: "수업 과제 탭·학생 과제물·성적 탭 화면 캡처와, 한 차시 흐름(자료→과제→퀴즈 과제→질문) 설계 메모(개인정보 제외).",
  },

  quiz: [
    {
      type: "mcq",
      question: "Google for Education의 네 축에 해당하지 않는 것은?",
      choices: ["Chromebook", "Classroom", "Workspace 앱", "MS Teams"],
      answerIndex: 3,
      explanation: "네 축은 Chromebook·Classroom·Workspace 앱(Docs·Forms·Gmail 등)·Gemini입니다. Teams는 Microsoft 365의 도구입니다(6~10차시).",
    },
    {
      type: "mcq",
      question: "학생이 제출할 필요 없이 수업 슬라이드나 참고 영상을 나눠 줄 때 알맞은 Classroom 게시물은?",
      choices: ["과제", "퀴즈 과제", "질문", "자료"],
      answerIndex: 3,
      explanation: "제출이 필요 없는 읽을거리·볼거리는 ‘자료’로 올립니다.",
    },
    {
      type: "mcq",
      question: "Docs 과제에서 학생마다 자기 파일을 자동으로 만들어 주려면 어떤 옵션을 선택해야 할까?",
      choices: ["학생에게 파일 보기 권한 제공", "학생에게 파일 수정 권한 제공", "학생별로 사본 제공", "자료로 게시"],
      answerIndex: 2,
      explanation: "‘학생별로 사본 제공’을 선택하면 학생마다 개별 문서가 만들어져 교사가 진행 과정을 볼 수 있습니다. 개인 과제는 보통 이 옵션을 씁니다.",
    },
    {
      type: "mcq",
      question: "학급 전체가 하나의 문서에 아이디어를 함께 적는 브레인스토밍 활동에 알맞은 파일 공유 옵션은?",
      choices: ["학생에게 파일 보기 권한 제공", "학생에게 파일 수정 권한 제공", "학생별로 사본 제공", "아무 옵션이나 같다"],
      answerIndex: 1,
      explanation: "모두가 원본 하나를 함께 편집해야 하므로 ‘수정 권한 제공’이 맞습니다. 다만 학생별 채점은 어렵습니다.",
    },
    {
      type: "ox",
      question: "Classroom 화면이 영어로 보일 때, 학생이 과제를 제출하는 버튼의 이름은 ‘Turn in’이다.",
      answer: true,
      explanation: "영어 화면에서 제출은 ‘Submit’이 아니라 ‘Turn in’입니다. 파일 없는 과제는 ‘Mark as done’, 제출 취소는 ‘Unsubmit’입니다.",
    },
    {
      type: "ox",
      question: "퀴즈 과제의 Forms 점수는 ‘성적 가져오기’로 클래스룸 성적에 불러올 수 있다.",
      answer: true,
      explanation: "성적 가져오기를 켜면 Forms가 자동 채점한 점수를 클래스룸으로 가져와 돌려줄 수 있습니다.",
    },
    {
      type: "ox",
      question: "GEG(Google Educator Group)는 Google 공인 인증을 받은 교사만 가입할 수 있다.",
      answer: false,
      explanation: "GEG는 교사·교장·학교 관리자 누구나 무료로 참여할 수 있는 개방형 커뮤니티입니다.",
    },
    {
      type: "self",
      question: "내가 가르칠 단원 하나로 ‘자료 → 과제(Docs) → 퀴즈 과제(Forms) → 질문’ 한 차시 흐름을 설계해 보세요.",
    },
  ],

  reflection: [
    "네 축 가운데 우리 학교(또는 내가 경험한 학교)에서 가장 약한 축은 무엇이고, 그 때문에 수업 흐름이 어디서 끊기나요?",
    "무료 교육·인증·GEG 중 예비 교사로서 지금 바로 시작해 볼 수 있는 것은 무엇인가요?",
  ],

  terms: [
    { term: "Google Workspace for Education", definition: "학교용 Google 공동작업 앱 묶음과 관리 환경." },
    { term: "Chromebook", definition: "ChromeOS로 작동하는 빠르고 관리하기 쉬운 학교용 기기. 관리 콘솔로 학교 단위 관리." },
    { term: "에디션", en: "Edition", definition: "Fundamentals(무료)·Standard·Teaching and Learning·Plus 등 학교가 선택하는 기능 등급." },
    { term: "Gemini Notebook", definition: "사용자가 올린 자료만을 근거로 요약·수업 계획·퀴즈 등을 만들고 출처를 보여 주는 Google의 교육용 AI." },
    { term: "Classroom", definition: "과제 배포·제출·채점·성적을 관리하는 Google의 LMS." },
    { term: "수업 코드", definition: "학생이 Classroom 수업에 참여할 때 입력하는 영문·숫자 코드." },
    { term: "파일 공유 옵션", definition: "과제에 붙인 파일을 학생에게 나눠 주는 방식. 보기 권한 / 수정 권한 / 학생별로 사본 제공 중 선택." },
    { term: "학생별로 사본 제공", definition: "과제 파일을 학생마다 개별 사본으로 만들어 나눠 주는 옵션. 개인 과제의 기본이며 게시 전에만 선택 가능." },
    { term: "퀴즈 과제", definition: "Google Forms 퀴즈가 붙어 자동 채점되는 Classroom 과제." },
    { term: "성적 가져오기", definition: "Forms 퀴즈의 점수를 Classroom 성적으로 불러오는 기능." },
    { term: "GEG", en: "Google Educator Group", definition: "지역·관심사가 같은 교육자들이 모여 기술 활용을 함께 배우는 무료 교사 커뮤니티." },
    { term: "Google 공인 교육 전문가", en: "Google Certified Educator", definition: "Google 도구를 수업에 활용하는 능력을 인증하는 1급·2급 자격(유효 3년)." },
  ],

  sources: [
    { label: "Google for Education (한국어 공식 사이트)", url: "https://edu.google.com/intl/ALL_kr/", lastVerified: "2026-10-08" },
    { label: "Google Workspace for Education 버전 소개", url: "https://edu.google.com/intl/ALL_kr/workspace-for-education/editions/overview/", lastVerified: "2026-10-08" },
    { label: "학교용 Chromebook 알아보기", url: "https://edu.google.com/intl/ALL_kr/chromebooks/overview/", lastVerified: "2026-10-08" },
    { label: "Google 클래스룸 소개", url: "https://edu.google.com/intl/ALL_kr/workspace-for-education/products/classroom/", lastVerified: "2026-10-08" },
    { label: "Gemini for Education", url: "https://edu.google.com/intl/ALL_kr/ai/gemini-for-education/", lastVerified: "2026-10-08" },
    { label: "Gemini Notebook", url: "https://edu.google.com/intl/ALL_kr/ai-gemini-notebook/", lastVerified: "2026-10-08" },
    { label: "Google for Education 학습 센터(무료 과정·인증)", url: "https://edu.google.com/intl/ALL_kr/learning-center/", lastVerified: "2026-10-08" },
    { label: "GEG(Google Educator Group) — 커뮤니티에서 GEG와 연결되세요", url: "https://edu.google.com/intl/ALL_kr/for-educators/communities/geg/", lastVerified: "2026-10-08" },
    { label: "Google 클래스룸 고객센터", url: "https://support.google.com/edu/classroom/", lastVerified: "2026-10-08" },
    {
      label: "Gemini in Google Classroom is now available in all Classroom-supported languages (Google Workspace Updates, 2026.4)",
      url: "https://workspaceupdates.googleblog.com/2026/04/gemini-in-google-classroom-is-now-available-in-all-Classroom-supported-languages.html",
      lastVerified: "2026-10-08",
    },
  ],

  cautions: [
    "본문 그림은 Google for Education 공식 사이트 화면을 수업 설명용으로 캡처한 것입니다(2026-10-08 기준). 제품 화면과 기능은 바뀔 수 있습니다.",
    "학교 에디션과 관리자 설정에 따라 일부 기능(Gemini, 잠금 모드, 수업 도구 등)이 보이지 않을 수 있습니다.",
  ],
};
