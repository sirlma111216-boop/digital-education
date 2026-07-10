/* ==========================================================================
   용어 사전. 검색·필터가 가능하도록 category 를 부여합니다.
   전문 용어는 한국어와 영어를 함께 표기하고, 쉬운 말로 풀이합니다.
   ========================================================================== */

export type GlossaryCategory =
  | "소양"
  | "설계"
  | "플랫폼"
  | "학습방식"
  | "데이터"
  | "AI";

export interface GlossaryTerm {
  term: string; // 영문/약어 표제
  ko?: string; // 한국어 표현
  category: GlossaryCategory;
  definition: string;
}

export const glossary: GlossaryTerm[] = [
  { term: "Digital Literacy", ko: "디지털 소양", category: "소양", definition: "디지털 도구와 정보를 목적에 맞게 이해·활용·비판·생산하는 능력." },
  { term: "Data Literacy", ko: "데이터 소양", category: "소양", definition: "데이터를 읽고 해석하며 근거로 삼아 판단·소통하는 능력." },
  { term: "Alignment", ko: "정렬", category: "설계", definition: "학습 목표–활동–평가–도구가 같은 방향을 향하도록 맞추는 수업 설계 원리." },
  { term: "UDL", ko: "보편적 학습 설계", category: "설계", definition: "Universal Design for Learning. 참여·표상·행동과 표현의 다양한 방법을 처음부터 설계에 반영해 모든 학습자를 지원." },
  { term: "ISTE", category: "설계", definition: "International Society for Technology in Education. 도구 사용 자체가 아니라 학습 경험의 질(영향성·지속가능성·형평성)에 초점을 둔 교육기술 표준 단체." },
  { term: "TPACK", category: "설계", definition: "내용(CK)·교수법(PK)·기술(TK) 지식이 교차하는 교사 전문성 틀. 좋은 디지털 수업은 세 지식의 결합에서 나온다." },
  { term: "LMS", ko: "학습관리시스템", category: "플랫폼", definition: "Learning Management System. 수업 자료·과제·평가·소통을 관리하는 시스템(예: Classroom, Teams)." },
  { term: "CMS", ko: "콘텐츠관리시스템", category: "플랫폼", definition: "Content Management System. 학습 콘텐츠를 제작·저장·재사용하도록 관리하는 시스템." },
  { term: "SIS", ko: "학생정보시스템", category: "플랫폼", definition: "Student Information System. 학적·출결·성적 등 학생 정보를 관리하는 시스템." },
  { term: "MDM", ko: "기기관리", category: "플랫폼", definition: "Mobile Device Management. 학교의 다수 기기를 원격으로 설정·배포·보안 관리하는 체계(예: Intune)." },
  { term: "ITS", ko: "지능형 튜터링 시스템", category: "AI", definition: "Intelligent Tutoring System. 학습 데이터를 분석해 개별 학습자에게 적응적 피드백을 제공하는 시스템." },
  { term: "DTS", category: "AI", definition: "Digital Textbook System 등 디지털 교과서/학습 시스템을 가리키는 표현. 맥락에 따라 정의가 달라질 수 있으니 확인 필요." },
  { term: "AI Courseware", ko: "AI 코스웨어", category: "AI", definition: "AI가 학습 경로·문항·피드백을 조정하는 학습 콘텐츠/플랫폼." },
  { term: "Adaptive Learning", ko: "적응형 학습", category: "학습방식", definition: "학습자의 반응에 따라 난이도·경로를 실시간 조정하는 학습." },
  { term: "Personalized Learning", ko: "개인 맞춤형 학습", category: "학습방식", definition: "학습자의 수준·속도·관심에 맞춰 목표·활동·지원을 조정하는 학습. 도구 하나가 아니라 데이터·분석·교사 조율의 시스템." },
  { term: "Blended Learning", ko: "혼합 학습", category: "학습방식", definition: "대면 수업과 온라인 학습을 결합한 방식." },
  { term: "Hybrid Learning", ko: "하이브리드 학습", category: "학습방식", definition: "대면과 원격 참여가 동시에 이루어지는 방식." },
  { term: "Synchronous Learning", ko: "동기식 학습", category: "학습방식", definition: "같은 시간에 함께 실시간으로 진행하는 학습." },
  { term: "Asynchronous Learning", ko: "비동기식 학습", category: "학습방식", definition: "학습자가 각자 시간에 자기 속도로 진행하는 학습." },
  { term: "Microlearning", ko: "마이크로러닝", category: "학습방식", definition: "짧은 단위의 콘텐츠로 핵심을 학습하는 방식." },
  { term: "PBL", ko: "문제 기반 학습", category: "학습방식", definition: "Problem-Based Learning. 실제 문제를 해결하며 지식을 구성하는 학습." },
  { term: "PjBL", ko: "프로젝트 기반 학습", category: "학습방식", definition: "Project-Based Learning. 산출물을 만드는 프로젝트를 통해 학습하는 방식." },
  { term: "BYOD", category: "플랫폼", definition: "Bring Your Own Device. 학생이 개인 기기를 수업에 활용하는 정책." },
  { term: "OER", ko: "공개 교육 자원", category: "데이터", definition: "Open Educational Resources. 자유롭게 사용·수정·공유할 수 있는 교육 자료." },
  { term: "Data Governance", ko: "데이터 거버넌스", category: "데이터", definition: "학교 데이터의 수집·보관·접근·삭제를 규정하는 관리 체계." },
  { term: "Dashboard", ko: "대시보드", category: "데이터", definition: "학습·운영 데이터를 한눈에 보여 주는 시각화 화면." },
  { term: "DX", ko: "디지털 전환", category: "데이터", definition: "Digital Transformation. 디지털 기술로 업무·수업의 방식 자체를 재설계하는 변화." },
  { term: "UI", ko: "사용자 인터페이스", category: "설계", definition: "User Interface. 사용자가 마주하는 화면·조작 요소." },
  { term: "UX", ko: "사용자 경험", category: "설계", definition: "User Experience. 사용자가 제품·서비스를 사용하며 느끼는 전체 경험." },
  { term: "LLM", ko: "대규모 언어 모델", category: "AI", definition: "Large Language Model. 방대한 텍스트로 학습해 다음 토큰을 확률적으로 예측하며 언어를 생성하는 모델." },
  { term: "Transformer", ko: "트랜스포머", category: "AI", definition: "Self-Attention으로 긴 맥락을 처리하는 신경망 구조. 현대 생성형 AI의 기반." },
  { term: "Agent", ko: "에이전트", category: "AI", definition: "목표를 위해 스스로 도구를 사용하고 여러 단계를 수행하는 AI. 챗봇 다음 단계의 개념." },
  { term: "Vibe Coding", ko: "바이브 코딩", category: "AI", definition: "자연어로 의도를 전달해 AI와 함께 소프트웨어를 만드는 방식. 문제 정의·검증·수정·배포가 함께 필요하다." },
];

export const glossaryCategories: GlossaryCategory[] = [
  "소양",
  "설계",
  "플랫폼",
  "학습방식",
  "데이터",
  "AI",
];
