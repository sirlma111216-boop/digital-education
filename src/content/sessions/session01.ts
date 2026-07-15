import type { Session } from "@/types/content";

export const session01: Session = {
  id: "01",
  slug: "digital-education-foundations",
  title: "디지털 교육의 출발점: 교육이 먼저, 기술은 수단",
  category: "theory",
  summary: "교육과 기술의 관계, 디지털 교육의 정의, ISTE와 UDL을 이해한다.",
  duration: 90,
  level: "입문",
  keywords: ["디지털 교육", "에듀테크", "Alignment", "ISTE", "UDL"],
  theoryRatio: 100,
  practiceRatio: 0,
  published: true,
  lastUpdated: "2026-07-10",
  sourceFiles: ["디지털 교육 교안 1강"],

  overview:
    "디지털 교육은 새로운 도구를 빠르게 익히는 수업이 아닙니다. 학습 목표·활동·평가·도구가 같은 방향을 향하도록 정렬(Alignment)하고, 기술을 교육 문제를 해결하는 수단으로 삼는 관점에서 출발합니다. 이 차시에서는 디지털 교육의 정의와 배경, ISTE·UDL이라는 두 나침반을 살펴봅니다.",

  objectives: [
    "디지털 교육을 ‘도구 사용’이 아니라 ‘교육 문제 해결’의 관점에서 정의할 수 있다.",
    "목표–활동–평가–도구의 정렬(Alignment) 원리를 자기 수업 사례로 설명할 수 있다.",
    "ISTE의 초점과 UDL 3원리를 구분해 설명할 수 있다.",
    "에듀테크를 선택할 때 살펴야 할 검토 기준을 나열할 수 있다.",
  ],

  keyQuestion:
    "‘디지털 도구를 많이 쓰는 수업’과 ‘디지털 교육’은 어떻게 다를까? 무엇이 그 차이를 만드는가?",

  conceptMap: {
    title: "교육이 먼저, 기술은 수단",
    caption: "목표에서 출발해 활동·평가·도구가 한 방향으로 정렬될 때 기술은 배움을 지원한다.",
    nodes: [
      { label: "교육 목표", description: "무엇을 왜 배우는가" },
      { label: "활동", description: "목표에 이르는 학습 경험" },
      { label: "평가", description: "목표 도달을 확인하는 근거" },
      { label: "도구(기술)", description: "활동·평가를 더 낫게 만드는 수단" },
    ],
  },

  theoryBlocks: [
    {
      heading: "에듀테크가 강조하는 관점",
      body: "‘Edu + Tech’라는 표현에서 핵심은 **교육(Edu)이 앞선다**는 점입니다. 기술은 교육을 대체하는 것이 아니라 지원하고, 기존에는 어렵던 교육 문제를 해결하는 수단입니다. 그래서 좋은 질문은 ‘이 도구로 무엇을 할 수 있나?’가 아니라 ‘어떤 교육 문제를, 왜, 이 도구로 해결하려는가?’입니다.",
    },
    {
      heading: "디지털 교육의 두 층위",
      body: "- **디지털 소양 교육**: 디지털 도구·정보·데이터를 이해하고 책임 있게 활용하는 능력 자체를 기르는 것\n- **디지털 교과 교육**: 각 교과의 학습을 디지털 기술로 더 깊고 공평하게 만드는 것\n\n두 층위는 분리되지 않고 서로를 지탱합니다.",
    },
    {
      heading: "왜 지금 디지털 교육인가",
      body: "디지털 교육이 필요해진 배경에는 몇 가지 흐름이 겹쳐 있습니다.\n\n- 디지털 기술의 급속한 발전\n- 코로나19 이후 확산된 원격·혼합 수업 경험\n- AI와 데이터 기술의 혁신\n- ‘평균 학습자’를 가정하던 대량 교육 시스템의 한계\n\n특히 마지막 지점이 중요합니다. 모든 학생을 평균으로 가정하는 수업은 실제로는 누구에게도 정확히 맞지 않습니다.",
    },
    {
      heading: "Alignment: 정렬이라는 핵심 원리",
      body: "정렬은 **목표 → 활동 → 평가 → 도구**가 한 방향을 향하도록 맞추는 것입니다. 화려한 도구를 써도 평가가 목표와 어긋나면 학습은 흩어집니다. 반대로 소박한 도구라도 네 요소가 정렬되면 배움은 단단해집니다.",
    },
    {
      heading: "ISTE와 EdTech Index: 좋은 에듀테크를 고르는 기준",
      body: "**ISTE(International Society for Technology in Education)**는 교육에서의 기술 활용에 관한 국제 표준을 제시하는 비영리 단체입니다. 핵심 관점은 ‘도구를 썼는가’가 아니라 **학습 경험의 질**입니다. 영향성·지속 가능성·형평성이 판단의 축이 됩니다.\n\n이 관점을 실제 도구 선택에 쓸 수 있게 만든 것이 ISTE의 **EdTech Index(edtechindex.org)**입니다. 이 사이트의 목적과 역할은 다음과 같습니다.\n\n- **목적**: 교사가 마케팅 문구와 모호한 제품 설명에 시간을 낭비하지 않고, **신뢰할 수 있는 제3자 인증·정보**로 에듀테크를 빠르게 찾도록 돕습니다.\n- **역할**: 여러 도구를 같은 기준으로 검색·비교할 수 있는 **무료 데이터베이스**입니다. 특히 아래 다섯 기준(SEIUI)의 검증(Validations) 결과를 제공합니다.\n\n- **Safe** 안전한가 · **Evidence-Based** 근거가 있는가 · **Inclusive** 포용적인가 · **Usable** 쓰기 쉬운가 · **Interoperable** 다른 시스템과 연결되는가",
    },
    {
      heading: "EdTech Index에서 에듀테크 검색하고 특징 살펴보기",
      body: "EdTech Index로 원하는 도구를 찾는 흐름은 간단합니다.\n\n1. 검색창에 도구 이름이나 키워드를 입력합니다(예: `canva`).\n2. 결과 상단의 필터로 좁힙니다 — **AUDIENCE**(대상), **VALIDATIONS**(검증), **CATEGORY**(분류), **DISCIPLINE**(교과), **PRICE**(가격), **ALL FILTERS**.\n3. 결과 카드에서 도구의 목적·제공사를 확인하고, 관심 있는 카드를 눌러 상세 페이지로 들어갑니다.\n4. 상세 페이지에서 소개, 갱신일, 그리고 **Validations** 배지를 확인합니다.\n\n마케팅 설명이 아니라 **제3자 검증 배지**를 기준으로 비교하는 것이 핵심입니다.",
      images: [
        {
          src: "/assets/sessions/01/ISTE01.png",
          alt: "EdTech Index 첫 화면에서 검색창에 canva를 입력한 모습과 결과 카드, 상단 필터 툴바",
          caption: "① 검색창에 도구 이름을 입력하고, 상단 필터(대상·검증·분류·교과·가격)로 결과를 좁힙니다.",
        },
        {
          src: "/assets/sessions/01/ISTE02.png",
          alt: "검색 결과 그리드에서 Canva for Education 카드가 강조된 모습",
          caption: "② 결과 카드에서 목적과 제공사를 확인하고, 살펴볼 도구(Canva for Education)를 선택합니다.",
        },
        {
          src: "/assets/sessions/01/ISTE03.png",
          alt: "Canva for Education 상세 페이지. 소개 이미지와 오른쪽의 Validations 패널",
          caption: "③ 상세 페이지에서 소개·갱신일과 함께 Validations(검증) 결과를 확인합니다.",
        },
      ],
    },
    {
      heading: "Validations 다섯 항목으로 좋은/부족한 에듀테크 구분하기",
      body: "상세 페이지의 **Validations** 패널은 다섯 항목의 충족 여부(체크)를 보여 줍니다. 각 항목의 의미는 다음과 같습니다.\n\n- **Safe(안전)**: 학생 데이터·개인정보를 보호하고 안전하게 사용할 수 있는가\n- **Evidence-Based(근거 기반)**: 학습 효과에 대한 연구·근거가 있는가\n- **Inclusive(포용)**: 접근성을 갖추고 다양한 학습자를 포용하는가\n- **Usable(사용성)**: 교사와 학생이 쉽게 쓸 수 있는가\n- **Interoperable(상호운용)**: LMS 등 다른 시스템과 표준으로 연결되는가\n\n**구분하는 법**: 다섯 항목을 **대부분 충족**하면 근거·안전·접근성 면에서 신뢰도가 높은 도구입니다. 반대로 일부 항목이 **비어 있으면**(미충족) 그 측면이 약할 수 있다는 신호입니다.\n\n예를 들어 위 Canva for Education은 **Safe·Evidence-Based·Inclusive·Usable은 충족**하지만 **Interoperable은 미충족**입니다. 즉 수업 자료 제작에는 강하지만, 다른 시스템과의 자동 연동은 약할 수 있다는 뜻입니다. 그러나 체크 개수만으로 순위를 매기기보다, **내 수업 맥락에서 어떤 항목이 중요한지**를 기준으로 판단하는 것이 좋습니다. (검증 결과는 갱신될 수 있으므로 사이트의 갱신일을 함께 확인하세요.)",
    },
    {
      heading: "UDL 3.0: 모두를 위한 설계",
      body: "**UDL(보편적 학습 설계)**은 학습자의 차이를 예외가 아니라 기본값으로 보고, 처음부터 다양한 길을 설계합니다.\n\n- **참여(Engagement)**: 왜 배우는가 — 흥미·동기·자기조절\n- **표상(Representation)**: 무엇을 배우는가 — 정보를 여러 방식으로 제시\n- **행동과 표현(Action & Expression)**: 어떻게 표현하는가 — 다양한 수행·표현 경로\n\n여기에 접근·지원·실행 기능과 학습자의 **주도성**이 더해집니다. 접근성, 개인정보, 디지털 윤리는 이 모든 설계의 전제입니다.",
    },
  ],

  compareTables: [
    {
      caption: "‘도구 중심 수업’과 ‘디지털 교육’ 비교",
      headers: ["구분", "도구 중심 수업", "디지털 교육"],
      rows: [
        ["출발점", "도구/기능", "교육 목표와 문제"],
        ["성공 기준", "도구를 얼마나 썼는가", "학습 경험의 질이 나아졌는가"],
        ["평가", "도구 사용 자체", "목표 도달과 성장"],
        ["학습자 차이", "평균 가정", "차이를 전제로 설계(UDL)"],
      ],
    },
  ],

  quiz: [
    {
      type: "mcq",
      question: "다음 중 디지털 교육의 출발점으로 가장 적절한 것은?",
      choices: [
        "가능한 한 많은 최신 도구를 도입하는 것",
        "해결하려는 교육 목표와 문제를 먼저 정의하는 것",
        "학생이 좋아하는 앱을 우선 사용하는 것",
        "평가를 마지막에 도구에 맞춰 정하는 것",
      ],
      answerIndex: 1,
      explanation: "교육이 먼저이고 기술은 수단입니다. 목표·문제 정의가 출발점입니다.",
    },
    {
      type: "ox",
      question: "ISTE는 도구를 얼마나 많이 사용했는지를 핵심 기준으로 삼는다.",
      answer: false,
      explanation: "ISTE는 도구 사용량이 아니라 학습 경험의 질(영향성·지속가능성·형평성)에 초점을 둡니다.",
    },
    {
      type: "self",
      question: "UDL의 세 원리(참여·표상·행동과 표현)를 자신의 수업 한 장면에 하나씩 대응시켜 설명해 보세요.",
    },
  ],

  reflection: [
    "최근 사용한 디지털 도구 하나를 떠올려, 그것이 어떤 교육 목표와 정렬되어 있었는지 적어 보세요.",
    "내 수업에서 ‘평균 학습자’를 가정해 놓친 학생은 없었는지 UDL 관점에서 돌아보세요.",
  ],

  terms: [
    { term: "Alignment", en: "정렬", definition: "목표–활동–평가–도구를 한 방향으로 맞추는 설계 원리." },
    { term: "ISTE", definition: "학습 경험의 질(영향성·지속가능성·형평성)에 초점을 둔 교육기술 표준 단체." },
    { term: "UDL", en: "보편적 학습 설계", definition: "참여·표상·행동과 표현의 다양한 길을 처음부터 설계에 반영하는 틀." },
    { term: "Digital Literacy", en: "디지털 소양", definition: "디지털 도구·정보를 목적에 맞게 이해·활용·비판·생산하는 능력." },
    { term: "EdTech", en: "에듀테크", definition: "교육을 지원하고 교육 문제를 해결하기 위한 기술과 그 활용." },
  ],

  sources: [
    { label: "ISTE Standards (공식)", url: "https://iste.org/standards", lastVerified: "2026-07-10" },
    { label: "EdTech Index (ISTE)", url: "https://edtechindex.org/", note: "에듀테크 검색·검증. 검증 결과는 변경 가능", lastVerified: "2026-07-15" },
    { label: "CAST — Universal Design for Learning Guidelines", url: "https://udlguidelines.cast.org/", lastVerified: "2026-07-10" },
  ],

  cautions: [
    "이 차시는 이론 이해와 개념 점검 중심입니다. 별도의 실습 활동이나 제출 과제가 없습니다.",
  ],
};
