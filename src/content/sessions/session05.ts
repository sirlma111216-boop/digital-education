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
      body: "**Brisk Teaching**은 Chrome·Edge 브라우저에 설치하는 **교사용 AI 확장 프로그램**입니다. 설치하면 화면 한쪽에 Brisk 버튼이 생기고, 지금 열어 둔 **Google Docs·Slides, PDF, YouTube 영상, 웹 기사** 위에서 바로 수업 자료를 만들거나 학생 글에 피드백을 줄 수 있습니다. Microsoft Word 같은 환경에서도 쓸 수 있고, 웹사이트에서 바로 쓰는 버전도 있습니다.\n\n- **비용**: 교사 개인은 **무료로 시작**할 수 있고, 기능이 더 많은 유료 요금제와 학교·교육청 단위 요금제가 있습니다.\n- **2026년 새 버전**: 원하는 것을 **대화하듯 말하면** 알맞은 도구를 찾아 주고, 몇 가지를 되물은 뒤 자료를 만들며, 결과도 대화로 고칠 수 있게 바뀌었습니다(기존 화면은 2026년 12월 31일까지 전환해 쓸 수 있음).\n- **교육용 설계**: 학교 도입을 위한 개인정보 보호 자료를 제공합니다.\n\n4차시의 Gemini in Classroom이 **Classroom 안의 AI**라면, Brisk는 **브라우저 어디서나 따라다니는 교사용 AI**입니다.",
    },
    {
      heading: "Brisk Teaching — 주요 기능",
      body: "1. **만들기(Create)** — 퀴즈, 수업 계획, 발표 슬라이드, 루브릭, 활동지 등 **30여 가지 자료**를 지금 보는 페이지를 바탕으로 만듭니다. 학년과 목표를 알려 주면 그에 맞춰 만듭니다.\n2. **피드백(Give Feedback)** — 학생 글(Docs)에 ‘잘한 점과 더 자랄 점’, 루브릭 기준 피드백 등 여러 방식의 **피드백 초안**을 답니다. 여러 학생에게 한꺼번에 줄 수 있고, 반 전체의 강점·보완점도 요약해 줍니다.\n3. **글쓰기 점검(Inspect Writing)** — 학생이 Docs에서 글을 쓴 과정을 **영상처럼 다시 보여 주어**, 언제 얼마나 고쳤는지, 한꺼번에 붙여넣은 흔적이 있는지 확인할 수 있습니다.\n4. **수준 조정·번역(Change Level)** — 같은 글을 **더 쉽게 또는 더 어렵게** 바꾸고, 여러 언어로 번역해 수준별·다문화 학생용 자료를 만듭니다.\n5. **Brisk Boost(학생용 활동)** — 수업 자료로 어휘 학습, 이해 확인, AI 튜터 대화 같은 **학생용 AI 활동**을 만들고, 교사는 학생별 진행 상황을 봅니다.",
    },
    {
      heading: "Brisk Teaching — 교육적 활용",
      body: "4차시에서 만든 Classroom 수업 흐름에 Brisk를 얹으면 다음과 같습니다.\n\n1. **준비** — 수업에 쓸 기사(웹페이지)를 열고 **수준 조정**으로 두 가지 난이도 버전을 만든다.\n2. **자료 만들기** — 같은 기사로 **퀴즈**와 **활동지** 초안을 만든다 → 교사가 검토·수정한다.\n3. **배포** — Classroom에 활동지(학생별 사본)와 퀴즈를 과제로 낸다.\n4. **수행** — 학생은 **Brisk Boost** 활동으로 어휘·이해를 점검하며 글을 쓴다.\n5. **피드백** — 학생 글에 **루브릭 기준 피드백 초안**을 만들고, 교사가 다듬어 돌려준다.\n6. **과정 확인** — 필요하면 **글쓰기 점검**으로 작성 과정을 보고, 학생과 대화하는 실마리로 쓴다.\n\n**잘 맞는 일**: 수준별 읽기 자료, 형성평가 문항 초안, 반복되는 피드백 초안.\n**주의할 점**: AI 피드백은 초안일 뿐입니다. 교사의 목소리로 고쳐서 주고, 글쓰기 점검은 ‘감시’가 아닌 ‘성장 지원’의 도구로 학생과 미리 약속하고 씁니다.",
    },

    /* ---------------- 2. Google AI Studio ---------------- */
    {
      heading: "② Google AI Studio — 개요",
      body: "**Google AI Studio**(aistudio.google.com)는 Google의 최신 **Gemini 모델을 직접 시험해 보는 웹 작업실**입니다. 원래는 개발자를 위한 도구지만, 화면이 간단하고 웹 브라우저에서 바로 쓸 수 있어 교사도 충분히 활용할 수 있습니다.\n\n- **채팅으로 시험하기**: 모델을 고르고 프롬프트를 넣어 결과를 비교합니다. 같은 질문을 여러 모델·설정으로 돌려 보며 **어떤 프롬프트가 좋은지** 실험할 수 있습니다.\n- **말로 앱 만들기(Build)**: “초등 5학년 분수 덧셈 연습 앱을 만들어 줘”처럼 설명하면 **작동하는 웹앱 초안과 미리보기**를 만들어 줍니다. 15차시의 바이브 코딩으로 이어지는 입구입니다.\n- **API 키 발급**: 다른 앱에서 Gemini를 부를 때 쓰는 키를 이곳에서 만듭니다.\n- **비용**: AI Studio 화면 자체는 **무료**로 쓸 수 있고, 무료 사용량에는 한도가 있습니다.\n\n**꼭 알아 둘 점**: Google Workspace for Education 계정 중 **만 18세 미만 사용자는 AI Studio를 쓸 수 없습니다**(관리자가 켜 두어도 마찬가지). 따라서 초·중·고에서는 **교사가 쓰는 도구**로, 대학에서는 학생도 함께 쓰는 실습 도구로 보는 것이 맞습니다.",
    },
    {
      heading: "Google AI Studio — 주요 기능",
      body: "1. **프롬프트 실험(Chat)** — 모델 선택, 응답의 창의성 정도(온도) 같은 설정을 바꿔 가며 결과를 비교합니다.\n2. **시스템 지시(System instructions)** — “너는 중학교 과학 교사의 조교다. 답은 3문장 이내, 학생 눈높이로”처럼 **AI의 역할과 말투를 미리 정해** 둡니다. 수업용 챗봇의 성격을 설계하는 연습이 됩니다.\n3. **멀티모달 입력** — 글뿐 아니라 **이미지·PDF·음성·영상**을 넣고 질문할 수 있습니다. 예: 실험 사진을 올리고 관찰 포인트를 묻기.\n4. **앱 만들기(Build)** — 말로 설명하면 웹앱 코드와 미리보기를 만들고, 대화로 고쳐 나갑니다. 만든 앱은 공유하거나 코드로 내려받을 수 있습니다.\n5. **코드 가져오기·API 키** — 실험한 프롬프트를 코드로 옮기고, API 키로 다른 서비스에 연결합니다(14·15차시에서 다시 다룸).",
    },
    {
      heading: "Google AI Studio — 교육적 활용",
      body: "- **수업용 프롬프트 다듬기** — 같은 요청을 여러 방식으로 써 보고, 결과를 비교해 **좋은 프롬프트의 조건**을 찾습니다. 학생에게 줄 ‘프롬프트 예시 카드’를 만들 때 유용합니다.\n- **수업용 미니 앱 만들기** — 단어 퀴즈, 타이머, 모둠 뽑기, 개념 확인 문제처럼 **수업에 바로 쓰는 작은 웹앱**을 말로 만들어 봅니다.\n- **AI 튜터 설계 연습** — 시스템 지시로 ‘정답을 바로 말하지 않고 힌트부터 주는 튜터’를 설계하고, 직접 학생 역할로 대화해 보며 고칩니다.\n- **멀티모달 자료 분석** — 그래프·사진·손글씨 자료를 넣고 설명이나 질문 목록을 만들게 합니다.\n\n**주의할 점**\n- 무료 사용분에서는 입력 내용이 서비스 개선에 쓰일 수 있으므로 **학생 이름·성적 같은 개인정보는 넣지 않습니다**.\n- 만든 앱을 학생에게 공개하기 전에 **교사가 직접 끝까지 써 보고** 오류와 내용을 확인합니다.",
    },

    /* ---------------- 3. Gemini Notebook ---------------- */
    {
      heading: "③ Gemini Notebook(이전 NotebookLM) — 개요",
      body: "**Gemini Notebook**은 2026년 7월까지 **NotebookLM**이라는 이름으로 불리던 서비스입니다. 이름이 바뀌면서 주소도 **notebook.google.com**으로 옮겨졌고, 예전 주소로 들어가도 자동으로 연결됩니다. 기존 노트북과 자료는 그대로 유지됩니다.\n\n가장 큰 특징은 **내가 넣은 자료(소스)만을 근거로 답한다**는 점입니다. 교과서 PDF, 수업 슬라이드, 웹페이지, YouTube 영상, Google 문서 등을 노트북에 넣으면, AI는 그 자료 안에서 요약하고 답하며 **어느 부분을 근거로 했는지 출처 번호로 보여 줍니다**. 일반 챗봇보다 지어낸 답(환각)을 확인하기 쉽습니다.\n\n- **비용**: 기본 기능은 **무료**입니다. 상위 요금제에서는 한도가 늘어납니다.\n- **학생 사용**: Workspace for Education 계정은 **나이와 관계없이** 쓸 수 있고, 18세 미만에게는 더 엄격한 콘텐츠 기준이 적용됩니다. 학교 계정의 자료와 대화는 **AI 학습에 쓰이지 않는다**고 Google이 밝히고 있습니다.",
    },
    {
      heading: "Gemini Notebook — 주요 기능",
      body: "1. **소스 기반 대화** — 넣은 자료에 대해 질문하면, 답과 함께 **근거가 된 문장 위치(출처 번호)** 를 보여 줍니다.\n2. **오디오 오버뷰(Audio Overview)** — 자료 내용을 두 사람이 대화하듯 설명하는 **팟캐스트형 음성 해설**을 만듭니다. 한국어로도 만들 수 있습니다.\n3. **동영상 오버뷰(Video Overview)** — 자료를 그림과 함께 설명하는 **짧은 해설 영상**을 만듭니다.\n4. **마인드맵** — 자료의 핵심 개념과 관계를 **마인드맵**으로 정리하고, 가지를 누르면 해당 내용을 더 물어볼 수 있습니다.\n5. **학습 자료 만들기** — **학습 가이드, 플래시카드, 퀴즈, 보고서, 슬라이드, 인포그래픽** 등을 자료에서 바로 만듭니다.\n6. **딥 리서치·자료 찾기** — 주제를 주면 웹에서 관련 자료를 찾아 노트북에 소스로 추가합니다.\n7. **공유** — 노트북을 동료 교사나 학생과 공유해 같은 자료로 함께 질문하고 공부할 수 있습니다.",
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
      "[Gemini Notebook] 같은 자료로 마인드맵과 오디오 오버뷰(또는 퀴즈·플래시카드) 하나를 만들어 본다.",
      "[Brisk Teaching] Brisk 확장 프로그램을 설치하고, 같은 웹 기사나 문서를 열어 수준 조정으로 두 가지 난이도 버전과 퀴즈 또는 활동지 초안을 만든다.",
      "[Brisk Teaching] 가상의 학생 글(실제 학생 글 사용 금지)을 Docs에 쓰고, 루브릭 기준 피드백 초안을 만든 뒤 교사의 목소리로 고친다.",
      "[Google AI Studio] aistudio.google.com에서 시스템 지시로 ‘힌트부터 주는 튜터’를 설계하고, 학생 역할로 대화해 보며 지시문을 고친다.",
      "[Google AI Studio] Build에서 이 단원의 개념을 연습하는 간단한 퀴즈 앱을 말로 만들어 보고, 직접 끝까지 풀어 보며 오류를 기록한다.",
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
