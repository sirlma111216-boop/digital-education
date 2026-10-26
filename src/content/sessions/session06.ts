import type { Session } from "@/types/content";

export const session06: Session = {
  id: "06",
  slug: "microsoft-365-education-onedrive",
  title: "Microsoft 365 Education과 OneDrive",
  category: "microsoft",
  summary: "MS365 Education을 Teams를 허브로 연결되는 학교 플랫폼으로 이해하고, 클라우드 저장소 OneDrive의 화면·공유·파일 요청·앱 동기화를 익힌다.",
  duration: 90,
  level: "입문",
  keywords: ["Microsoft 365 Education", "A1 A3 A5", "Teams", "OneDrive", "파일 요청"],
  theoryRatio: 50,
  practiceRatio: 50,
  published: true,
  lastUpdated: "2026-10-26",
  sourceFiles: ["디지털 교육 교안 6강"],

  overview:
    "Microsoft 365 Education은 Word·Excel·PowerPoint 같은 오피스 프로그램의 묶음이 아니라, 하나의 학교 계정과 클라우드로 수업·협업·평가·관리가 연결되는 학교 플랫폼입니다. 이 차시의 앞부분에서는 MS365의 앱 구성과 교육용 라이선스(A1·A3·A5), 그리고 Teams를 허브로 OneDrive·Forms·OneNote·학습 가속기가 연결되는 생태계를 살펴봅니다. 뒷부분에서는 그 출발점인 클라우드 저장소 OneDrive의 화면 구성, 링크 공유, 파일 요청, PC 앱 동기화를 직접 실습합니다.",

  objectives: [
    "MS365 Education을 ‘오피스 앱 묶음’이 아닌, Teams를 허브로 연결되는 학교 플랫폼으로 설명할 수 있다.",
    "교육용 라이선스 A1·A3·A5의 차이와 A3에 포함된 주요 기능 범주를 설명할 수 있다.",
    "OneDrive에서 파일을 공유할 때 링크 범위·권한을 상황에 맞게 설정하고, 파일 요청으로 학생 파일을 모을 수 있다.",
    "OneDrive 앱의 폴더 백업·파일 상태(온라인 전용·이 디바이스에서·항상 사용 가능)·공간 확보를 이해하고 안전하게 설정할 수 있다.",
  ],

  keyQuestion:
    "파일을 ‘내 컴퓨터’가 아니라 ‘학교 클라우드’에 둘 때, 수업과 업무는 무엇이 달라지고 교사는 무엇을 조심해야 할까?",

  conceptMap: {
    title: "MS365 생태계 — Teams를 허브로",
    caption: "흩어진 업무가 Teams를 중심으로 연결되고, 그 모든 파일의 출발점은 OneDrive다.",
    nodes: [
      { label: "OneDrive", description: "클라우드 저장소" },
      { label: "Teams", description: "중심 플랫폼(LMS)" },
      { label: "Forms", description: "평가·피드백 수합" },
      { label: "OneNote", description: "디지털 바인더" },
      { label: "학습 가속기", description: "데이터 기반 학생 인사이트" },
    ],
  },

  theoryBlocks: [
    /* ================= Part 1. Microsoft 365 Education ================= */
    {
      heading: "Microsoft 365 — 하나의 계정으로 연결되는 앱들",
      body: "**Microsoft 365**에는 우리가 잘 아는 Word·Excel·PowerPoint뿐 아니라 Outlook(메일)·OneNote(노트)·Access(데이터베이스), 그리고 OneDrive(클라우드 저장소)·SharePoint(팀 사이트·공동 저장소)·Exchange(메일 서버)·Teams(소통·협업 허브) 등이 들어 있습니다. 최근에는 AI 도우미 **Copilot**이 이 앱들 안에 함께 들어오고 있습니다.\n\n핵심은 이 앱들이 **하나의 학교 계정과 클라우드**로 연결된다는 점입니다. 같은 파일을 웹·PC 앱·모바일 어디서나 열고, 여러 사람이 동시에 편집하며, 모든 내용이 자동으로 저장됩니다.\n\n> 그림 속 일부 앱은 바뀌었습니다. **Skype**는 2025년 5월 서비스가 종료되어 그 역할을 Teams가 이어받았고, **Yammer**(Y)는 **Viva Engage**로 이름이 바뀌었습니다.",
      images: [
        {
          src: "/assets/sessions/06/ms365-apps.webp",
          alt: "Microsoft 365 로고를 중심으로 Word, Excel, PowerPoint, OneNote, Access, Outlook, OneDrive, Exchange, SharePoint, Skype, Teams, Yammer 아이콘과 Copilot M365 로고가 배치된 그림",
          caption: "Microsoft 365를 이루는 앱들",
        },
      ],
    },
    {
      heading: "교육용 Microsoft 365 — A1·A3·A5",
      body: "학교는 **교육용 라이선스**에 따라 쓸 수 있는 기능이 달라집니다(아래 A1·A3·A5 비교표 참고).\n\n- **A1**: 요건을 갖춘 학교에 **무료**. 웹·모바일 오피스 앱, Teams, OneDrive, Forms 등 기본 도구\n- **A3**: A1 + **PC용(데스크톱) 오피스 앱**, 확장된 관리·보안·분석 기능\n- **A5**: A3 + 최고 수준의 보안·규정 준수·분석\n\n그림은 **A3**에 포함된 기능을 범주별로 정리한 표입니다.\n\n- **학습 및 지침**: Minecraft 교육, Microsoft 화이트보드, **학습 능력 키우기**(읽기·검색·수학·스피커 과정과 도우미 — 8차시의 학습 가속기), 리플렉트(감정 체크인)\n- **접근성 및 포괄성**: 몰입형 리더, 내레이터, 번역기, 음성 입력, Live 캡션 — 모든 학생이 함께 배우도록 돕는 도구\n- **자동화·AI 및 분석**: Power Apps·Power Automate, 교육 인사이트(학습 데이터 분석), 교직원용 Copilot(데이터 보호 적용)\n- **생산성 및 협업**: 오피스 온라인·데스크톱 앱, Teams for Education, OneNote Class Notebook, Forms, Loop, SharePoint, OneDrive 등\n- **보안·ID·규정 준수**: 다단계 인증(MFA), Microsoft Defender, 데이터 보호·감사 기능\n- **단순한 관리**: School Data Sync(학생 명단 자동 연동), **Intune for Education**(학교 기기 관리 — 3차시의 MDM), Windows Autopilot\n\n빨간 테두리로 표시된 항목(데스크톱 앱, Minecraft 교육, Loop, Copilot, Intune for Education 등)은 특히 눈여겨볼 기능입니다.\n\n> 이 표는 정리된 시점이 조금 지나 일부 이름이 바뀌었습니다: Yammer → **Viva Engage**, Azure Active Directory → **Microsoft Entra ID**, Power Virtual Agents → **Copilot Studio**. 라이선스 구성은 자주 바뀌므로 학교에서 쓸 때는 공식 문서와 학교 관리자에게 확인하세요.",
      images: [
        {
          src: "/assets/sessions/06/ms365-a3-features.webp",
          alt: "교육용 Microsoft 365 A3 기능표 — 학습 및 지침, 접근성 및 포괄성, 자동화·AI 및 분석, 생산성 및 협업, 통합된 커뮤니케이션, 보안·ID 및 규정 준수, 단순한 관리 범주별 기능 목록",
          caption: "교육용 Microsoft 365 A3에 포함된 기능 (클릭하면 크게 볼 수 있습니다)",
        },
      ],
    },
    {
      heading: "MS365 플랫폼의 세 축 — OneDrive → Teams → OneNote",
      body: "수업과 업무에서 MS365를 쓸 때 가장 중요한 세 앱은 다음과 같이 이어집니다.\n\n1. **OneDrive — 클라우드 기반 스토리지**: 파일을 저장하고 백업합니다. OneDrive에 있는 파일을 Word·PowerPoint 등 다른 오피스 도구로 열어 **공유하고 협업**합니다. (이번 차시)\n2. **Microsoft Teams — MS 교육 플랫폼의 LMS**: 흩어진 오피스 도구들을 **연결**합니다. 온라인 교무실, 온라인 학습(수업 팀), 별도의 커뮤니티를 만들 수 있습니다. (8차시)\n3. **OneNote — 다목적 노트 도구**: **업무를 플랫폼화**합니다. 수업 활동과 각종 업무를 디지털로 보관하고 필기합니다. (9차시)\n\n저장(OneDrive)에서 연결(Teams)로, 연결에서 기록·보관(OneNote)으로 확장되는 흐름입니다.",
      images: [
        {
          src: "/assets/sessions/06/ms365-platform-flow.webp",
          alt: "MS365 플랫폼 — OneDrive(클라우드 기반 스토리지) → Microsoft Teams(MS 교육플랫폼의 LMS) → OneNote(다목적 노트툴)로 이어지는 흐름도",
          caption: "MS365 플랫폼: OneDrive → Teams → OneNote",
        },
      ],
    },
    {
      heading: "MS365 생태계 — 파편화된 업무를 하나로 연결하는 허브, Teams",
      body: "학교 업무는 자료 보관, 평가, 기록, 학생 관리처럼 여러 갈래로 흩어지기 쉽습니다. MS365에서는 **Teams가 중심 플랫폼**이 되어 이 업무들을 하나로 묶습니다.\n\n- ① **OneDrive** — 클라우드 기반 스토리지\n- ② **Forms** — 평가 및 피드백 수합\n- ③ **OneNote** — 모든 업무의 디지털 바인더\n- ④ **Learning Accelerators(학습 가속기)** — 데이터 기반 학생 인사이트\n\n4차시에서 Google은 **Classroom**이 Drive·Docs·Forms·Gemini를 엮는 연결 고리였다면, MS365에서는 **Teams**가 그 역할을 합니다. 두 생태계의 대응 관계는 아래 대응표에 정리했습니다.",
      images: [
        {
          src: "/assets/sessions/06/ms365-teams-hub.jpg",
          alt: "MS365 생태계 — 가운데 Teams(중심 플랫폼, 소통 및 협업)를 중심으로 OneDrive(클라우드 스토리지), Forms(평가 및 피드백 수합), OneNote(디지털 바인더), Learning Accelerators(데이터 기반 학생 인사이트)가 양방향 화살표로 연결된 그림",
          caption: "MS365 생태계: 파편화된 업무를 하나로 연결하는 허브",
        },
      ],
    },

    /* ================= Part 2. OneDrive 실습 ================= */
    {
      heading: "OneDrive — 학교 계정의 개인 클라우드 저장소",
      body: "**OneDrive**는 학교 계정에 딸린 **개인 클라우드 저장소**입니다. 웹(office.com → OneDrive)이나 PC 앱으로 들어갈 수 있습니다.\n\n- **어디서나 같은 파일**: 학교 PC, 집 노트북, 휴대폰에서 같은 파일을 엽니다. USB를 들고 다닐 필요가 없습니다.\n- **자동 저장과 버전 기록**: 저장 버튼을 누르지 않아도 저장되고, 예전 버전으로 되돌릴 수 있으며, 지운 파일은 휴지통에서 복구할 수 있습니다.\n- **공유와 공동 편집**: 파일을 보내는 대신 **링크로 공유**하고, 여러 사람이 동시에 편집합니다.\n\n단, OneDrive는 **나 개인의 공간**입니다. 학년·교과·팀이 함께 쓰는 자료는 Teams·SharePoint의 공동 저장소에 두는 것이 원칙입니다(7차시).",
    },
    {
      heading: "OneDrive 실습 ① 화면 구성",
      body: "- **검색(위쪽 가운데)**: 내 OneDrive 안의 파일을 이름·내용으로 찾습니다.\n- **＋ 만들기 또는 업로드(왼쪽 위)**: 새 폴더·문서를 만들거나 PC의 파일을 올립니다.\n- **왼쪽 메뉴**\n  - **홈**: 최근에 연 파일\n  - **내 파일**: 나만의 **개인 스토리지** — 내가 올리고 만든 파일이 모두 여기에 있습니다.\n  - **공유됨 · 즐겨찾기 · 휴지통**\n  - **다음으로 파일 찾아보기**: 사람·모임·미디어별로 파일 찾기\n  - **빠른 액세스**: 내가 속한 Teams 팀·SharePoint 사이트(예: ‘3학년 4반 과학’ 수업 팀의 파일)로 바로 가기\n- **공유 열**: 각 파일·폴더가 **비공개**인지 **공유** 상태인지 한눈에 보여 줍니다. 학생 개인정보가 담긴 파일이 실수로 공유되어 있지 않은지 이 열로 수시로 점검합니다.",
      images: [
        {
          src: "/assets/sessions/06/onedrive-screen.png",
          alt: "OneDrive 웹 화면 — 위쪽 검색창(내 원드라이브 내의 파일을 검색), 왼쪽 ‘내 파일’ 메뉴(개인 스토리지), 파일 목록의 ‘공유’ 열(파일의 공개 혹은 비공개 유무)이 빨간 상자로 표시됨",
          caption: "OneDrive 화면 구성 — 검색 · 내 파일 · 공유 상태",
        },
      ],
    },
    {
      heading: "OneDrive 실습 ② 파일 공유 — 링크 범위 정하기",
      body: "OneDrive에서는 파일을 첨부해 보내지 않고 **링크로 공유**합니다. 이때 **누가 볼 수 있는지(범위)** 와 **무엇을 할 수 있는지(권한)** 를 반드시 정합니다.\n\n1. 파일에 마우스를 올리면 나타나는 **공유** 아이콘을 누릅니다.\n2. **링크 복사** 옆의 **설정(톱니바퀴)** 을 누릅니다.\n3. **공유할 범위**를 고릅니다.\n   - **누구나**: 링크만 있으면 로그인 없이 누구나 열 수 있음\n   - **(우리 학교) 소속 사용자**: 학교 계정으로 로그인한 사람만\n   - **기존 액세스 권한이 있는 사용자만**: 이미 권한이 있는 사람에게 링크만 다시 보낼 때\n   - **선택한 사용자**: 지정한 사람만\n   - **설정 더 보기**: **편집 가능 / 보기 가능**, **만료 날짜**, **암호** 설정\n4. **적용**을 누릅니다.\n5. **링크 복사**를 눌러 Teams·메신저·Classroom 등에 붙여 넣어 활용합니다.\n\n⚠️ ‘누구나’ + ‘편집 가능’은 가장 열린 설정입니다. 학생 개인정보가 담긴 파일은 **선택한 사용자**로, 안내 자료는 **소속 사용자 + 보기 가능**으로 나누어 쓰는 습관을 들이세요. 학교 설정에 따라 ‘누구나’ 옵션이 막혀 있을 수 있습니다.",
      images: [
        {
          src: "/assets/sessions/06/onedrive-share.png",
          alt: "OneDrive 파일 공유 순서 — ① 공유 아이콘 클릭 ② 링크 복사 옆 설정 클릭 ③ 링크 설정에서 공유 범위(누구나, 학교 소속 사용자, 기존 액세스 권한이 있는 사용자만, 선택한 사용자) 선택 ④ 적용 ⑤ 링크 복사",
          caption: "OneDrive 파일 공유 ①~⑤",
        },
      ],
    },
    {
      heading: "OneDrive 실습 ③ 파일 요청 — 학생 파일을 한 폴더로 모으기",
      body: "**파일 요청**은 학생들이 내 OneDrive의 특정 폴더에 **파일을 올리기만** 할 수 있게 하는 기능입니다. 과제 파일이나 수행평가 결과물을 한곳에 모을 때 편리합니다.\n\n1. **＋ 만들기 또는 업로드 → 폴더**로 새 폴더를 만듭니다.\n2. 폴더 이름을 정합니다(예: ‘1차 수행평가 제출’).\n3. 만든 폴더를 선택하고 위쪽 메뉴에서 **파일 요청**을 누릅니다.\n4. 받는 사람에게 보일 **요청 내용**을 적습니다.\n5. **링크 복사**로 수합 링크를 만들어 학생에게 알려 줍니다(이메일로 보낼 수도 있음).\n\n💡 **활용 팁**\n- 학생은 링크를 열고 **이름을 입력한 뒤** 파일을 올리며, 올린 파일 이름 앞에 그 이름이 붙습니다. 그래서 요청 내용에 **‘앞 칸에는 학번, 두 번째 칸에는 이름을 입력하세요’** 처럼 안내하면, 파일이 **학번순으로 정리**되어 모입니다.\n- 학생은 **올리기만 할 수 있고** 폴더 안의 다른 학생 파일은 볼 수 없어, 개인정보가 보호됩니다.\n- 로그인 없이 링크만으로 올릴 수 있어 학부모·외부 제출에도 쓸 수 있습니다. 단, 학교 설정에 따라 파일 요청 메뉴가 보이지 않을 수 있습니다.",
      images: [
        {
          src: "/assets/sessions/06/onedrive-file-request.png",
          alt: "OneDrive 파일 요청 순서 — ① 폴더 만들기 ② 폴더 이름 지정 ③ 만들어진 폴더를 지정하고 파일 요청 ④ 업로드할 파일과 관련된 요청사항 입력(앞 칸에는 학번, 두 번째 칸에는 이름) ⑤ 수합할 링크 생성",
          caption: "OneDrive 파일 요청 ①~⑤",
        },
      ],
    },
    {
      heading: "OneDrive 실습 ④ 앱 버전 설치 — 폴더 백업은 꼭 끄기",
      body: "OneDrive를 PC 앱으로 연결하면 파일 탐색기에서 일반 폴더처럼 쓸 수 있습니다.\n\n1. 작업 표시줄 오른쪽 아래의 **구름 모양 아이콘**을 누릅니다.\n2. **톱니바퀴(설정)** → **설정 → 계정 추가** → 학교 계정으로 로그인합니다.\n3. ⚠️ **가장 중요!** 설치 도중 나오는 **‘이 PC에서 폴더 백업’** 의 **문서·사진·바탕 화면** 항목을 **모두 끕니다(비활성화)**.\n\n왜 꺼야 할까요? 폴더 백업을 켜 두면 PC의 문서·사진·바탕 화면 폴더 **전체가 학교 OneDrive로 옮겨져 동기화**됩니다. 개인 파일이 학교 계정에 섞여 올라가고, 용량을 차지하며, 전근·퇴직 등으로 학교 계정이 정리될 때 바탕 화면 파일까지 함께 곤란해질 수 있습니다. 필요한 파일만 직접 OneDrive 폴더에 넣어 쓰는 것이 안전합니다.\n\n**파일의 세 가지 상태 — 요청 시 파일**\n- **온라인 전용**(구름 아이콘): 클라우드에는 있지만 내 PC에는 없음. PC 공간을 차지하지 않고, 열 때 내려받습니다(인터넷 필요).\n- **이 디바이스에서 사용 가능**(초록 테두리 체크): 한 번 열어 PC로 내려받은 파일. 오프라인에서도 열고 편집할 수 있습니다.\n- **항상 사용 가능**(초록 원 체크): 클라우드와 내 PC 모두에 항상 보관. 마우스 오른쪽 단추로 지정합니다.",
      images: [
        {
          src: "/assets/sessions/06/onedrive-app-install.png",
          alt: "OneDrive 앱 설치 — ① 작업 표시줄 구름 아이콘 클릭 ② 설정 – 계정 추가 – 로그인 ③ ‘이 PC에서 폴더 백업’의 문서·사진·바탕 화면은 모두 비활성화(가장 중요함), 오른쪽에 파일 상태 세 가지(온라인 전용, 이 디바이스에서, 항상 사용 가능) 설명 화면",
          caption: "OneDrive 앱 설치 — 폴더 백업은 모두 비활성화",
        },
      ],
    },
    {
      heading: "OneDrive 실습 ⑤ 앱 버전 활용 — 상태 표시와 공간 확보",
      body: "설치가 끝나면 파일 탐색기 왼쪽에 **‘OneDrive – 학교 이름’** 이 생깁니다. 이 안의 파일은 평소 폴더처럼 열고 저장하면 **자동으로 클라우드와 동기화**됩니다.\n\n- 오른쪽 **상태** 열에 파일마다 상태가 표시됩니다 — 구름(온라인 전용), 초록 체크(PC에 있음), 파란 순환 화살표(동기화 중).\n- 파일·폴더에서 **마우스 오른쪽 단추**를 누르면\n  - **항상 이 장치에 유지**: 클라우드와 PC 모두에 항상 보관(오프라인 수업 대비)\n  - **공간 확보**: **클라우드의 파일은 그대로 남기고**, 내 PC에 내려받아 둔 사본만 지웁니다. 파일이 ‘온라인 전용’으로 바뀔 뿐 **사라지는 것이 아닙니다**.\n\n노트북 용량이 부족할 때는 오래된 자료 폴더에 **공간 확보**를 하면, 파일 목록은 그대로 보이면서 PC 공간만 비울 수 있습니다.",
      images: [
        {
          src: "/assets/sessions/06/onedrive-app-status.png",
          alt: "파일 탐색기의 OneDrive 폴더 — 오른쪽 상태 열에 파일별 상태 아이콘(초록 체크, 구름, 동기화 중) 표시, 마우스 우클릭 메뉴의 ‘항상 이 장치에 유지’와 ‘공간 확보’, 공간 확보 시 클라우드 파일은 남고 내 PC의 파일만 삭제된다는 설명",
          caption: "OneDrive 앱 활용 — 상태 표시와 ‘공간 확보’",
        },
      ],
    },
  ],

  compareTables: [
    {
      caption: "Google Workspace(4차시) ↔ Microsoft 365 Education 대응표",
      headers: ["역할", "Google Workspace for Education", "Microsoft 365 Education"],
      rows: [
        ["LMS·연결 허브", "Classroom", "Teams for Education"],
        ["개인 클라우드 저장소", "Drive(내 드라이브)", "OneDrive"],
        ["팀 공동 저장소", "공유 드라이브", "SharePoint(Teams 파일)"],
        ["문서·표·발표", "Docs·Sheets·Slides", "Word·Excel·PowerPoint"],
        ["설문·퀴즈", "Google Forms(설문지)", "Microsoft Forms"],
        ["노트·포트폴리오", "Docs·Keep 등", "OneNote Class Notebook"],
        ["화상 수업", "Meet", "Teams 모임"],
        ["AI 도우미", "Gemini", "Copilot"],
        ["기기 관리", "Chromebook + 관리 콘솔", "Windows + Intune for Education"],
      ],
    },
    {
      caption: "교육용 라이선스 A1 · A3 · A5",
      headers: ["라이선스", "비용", "핵심 특징"],
      rows: [
        ["A1", "무료(요건 충족 학교)", "웹·모바일 오피스 앱, Teams, OneDrive, Forms 등 기본 도구"],
        ["A3", "유료", "A1 + PC용 오피스 앱, 관리·보안·분석 확장, Minecraft 교육 등"],
        ["A5", "유료", "A3 + 최고 수준의 보안·규정 준수·분석"],
      ],
    },
    {
      caption: "OneDrive 공유 링크 범위",
      headers: ["범위", "누가 열 수 있나", "알맞은 경우"],
      rows: [
        ["누구나", "링크를 가진 모든 사람(로그인 없음)", "학교 밖에 공개해도 되는 안내 자료"],
        ["우리 학교 소속 사용자", "학교 계정으로 로그인한 사람", "교내 공지·수업 자료"],
        ["기존 액세스 권한이 있는 사용자만", "이미 권한이 있는 사람", "권한은 그대로 두고 링크만 다시 알려 줄 때"],
        ["선택한 사용자", "지정한 사람만", "학생 개인정보·평가 자료 등 민감한 파일"],
      ],
    },
    {
      caption: "OneDrive 앱의 파일 상태",
      headers: ["상태", "표시", "PC 공간", "오프라인 사용"],
      rows: [
        ["온라인 전용", "구름", "차지하지 않음", "불가(열 때 내려받음)"],
        ["이 디바이스에서 사용 가능", "초록 테두리 체크", "차지함", "가능(‘공간 확보’로 다시 온라인 전용)"],
        ["항상 사용 가능", "초록 원 체크", "차지함", "가능(항상 유지)"],
      ],
    },
  ],

  practice: {
    title: "OneDrive로 자료 공유하고 과제 파일 모으기",
    goal: "학교 계정 OneDrive에서 링크 공유 범위를 직접 설정하고, 파일 요청으로 파일을 모으며, PC 앱의 동기화·공간 확보를 안전하게 써 본다.",
    steps: [
      "학교 계정으로 office.com에 로그인해 OneDrive를 열고, 화면 구성(검색·내 파일·공유 열)을 확인한다.",
      "‘6차시 실습’ 폴더를 만들고 수업 자료 파일 하나를 올린다.",
      "그 파일을 ‘우리 학교 소속 사용자 + 보기 가능 + 만료 날짜’로 공유하고 링크를 짝에게 보낸다.",
      "‘실습 제출’ 폴더에 파일 요청을 만들고, 요청 내용에 ‘앞 칸에는 학번, 두 번째 칸에는 이름’을 적은 뒤 짝에게 파일을 받아 본다.",
      "(PC) OneDrive 앱을 연결하되, 폴더 백업(문서·사진·바탕 화면)은 모두 끈다.",
      "파일 탐색기에서 상태 열을 확인하고, 폴더 하나에 ‘공간 확보’와 ‘항상 이 장치에 유지’를 각각 해 본다.",
    ],
    checklist: [
      "공유 링크의 범위와 권한(보기/편집)을 의도대로 설정했는가",
      "학생 개인정보가 담긴 파일이 ‘누구나’로 공유되어 있지 않은가",
      "파일 요청으로 받은 파일 이름에 학번·이름이 붙어 정리되었는가",
      "OneDrive 앱 설치 시 폴더 백업을 껐는가",
      "‘공간 확보’ 후에도 클라우드에 파일이 남아 있음을 확인했는가",
    ],
    deliverable: "공유 링크 설정 화면과 파일 요청 폴더(받은 파일 목록) 캡처, 파일 상태 3가지를 내 말로 정리한 메모(개인정보 제외).",
  },

  quiz: [
    {
      type: "mcq",
      question: "Google Workspace에서 Classroom이 하던 ‘연결 허브(LMS)’ 역할을 MS365에서 맡는 앱은?",
      choices: ["OneDrive", "Teams", "Excel", "Outlook"],
      answerIndex: 1,
      explanation: "MS365에서는 Teams가 OneDrive·Forms·OneNote·학습 가속기를 하나로 연결하는 중심 플랫폼입니다.",
    },
    {
      type: "mcq",
      question: "학생 성적이 담긴 파일을 동료 교사 두 명과만 나누려 할 때 알맞은 공유 범위는?",
      choices: ["누구나", "우리 학교 소속 사용자", "선택한 사용자", "아무 범위나 같다"],
      answerIndex: 2,
      explanation: "민감한 파일은 지정한 사람만 열 수 있는 ‘선택한 사용자’로 공유합니다.",
    },
    {
      type: "ox",
      question: "파일 요청 링크로 파일을 올린 학생은 같은 폴더에 있는 다른 학생의 파일도 볼 수 있다.",
      answer: false,
      explanation: "파일 요청은 올리기만 가능하고 폴더 내용은 볼 수 없어 개인정보가 보호됩니다.",
    },
    {
      type: "ox",
      question: "OneDrive 앱에서 ‘공간 확보’를 누르면 클라우드에 있는 파일도 함께 삭제된다.",
      answer: false,
      explanation: "공간 확보는 내 PC에 내려받은 사본만 지우고 온라인 전용으로 바꿉니다. 클라우드의 파일은 그대로 남습니다.",
    },
    {
      type: "mcq",
      question: "OneDrive 앱을 설치할 때 꼭 꺼 두어야 하는 설정은?",
      choices: ["자동 저장", "이 PC에서 폴더 백업(문서·사진·바탕 화면)", "파일 탐색기 표시", "로그인"],
      answerIndex: 1,
      explanation: "폴더 백업을 켜면 PC의 문서·사진·바탕 화면 전체가 학교 OneDrive로 옮겨져, 개인 파일이 섞이고 계정 정리 때 곤란해질 수 있습니다.",
    },
    {
      type: "self",
      question: "내가 지금 USB나 메일 첨부로 주고받는 자료 하나를 골라, OneDrive 링크 공유(범위·권한)로 바꾼다면 어떻게 설정할지 적어 보세요.",
    },
  ],

  reflection: [
    "파일을 ‘보내는’ 대신 ‘링크로 공유’하면 협업 방식이 어떻게 달라질까요? 무엇을 더 조심해야 할까요?",
    "Google Workspace와 MS365 중 우리 학교 환경에 더 맞는 쪽은 어디이고, 그 이유는 무엇인가요?",
  ],

  terms: [
    { term: "Microsoft 365 Education", definition: "하나의 학교 계정과 클라우드로 수업·협업·평가·관리가 연결되는 Microsoft의 학교 플랫폼." },
    { term: "A1/A3/A5", definition: "교육용 Microsoft 365 라이선스 등급. A1은 무료 웹 중심, A3는 PC 앱·관리 확장, A5는 고급 보안·분석." },
    { term: "Teams for Education", definition: "MS365 교육 플랫폼의 LMS이자 업무를 연결하는 중심 허브(8차시)." },
    { term: "OneDrive", definition: "학교 계정에 딸린 개인 클라우드 저장소. 저장·백업·링크 공유·공동 편집의 출발점." },
    { term: "SharePoint", definition: "팀·조직이 함께 쓰는 공동 저장소이자 사이트. Teams의 파일이 저장되는 곳(7차시)." },
    { term: "파일 요청", en: "File request", definition: "링크를 받은 사람이 지정 폴더에 파일을 올리기만 할 수 있게 하는 OneDrive 기능." },
    { term: "폴더 백업", definition: "PC의 문서·사진·바탕 화면 폴더를 OneDrive로 옮겨 동기화하는 기능. 학교 계정에서는 꺼 두는 것이 안전." },
    { term: "요청 시 파일", en: "Files On-Demand", definition: "파일을 온라인 전용·이 디바이스에서·항상 사용 가능 상태로 나누어 PC 공간을 아끼는 OneDrive 앱 기능." },
    { term: "공간 확보", definition: "클라우드 파일은 남기고 PC에 내려받은 사본만 지워 온라인 전용으로 바꾸는 기능." },
    { term: "학습 가속기", en: "Learning Accelerators", definition: "읽기·검색·수학·발표 과정 등 학생 역량 데이터를 제공하는 Teams 기반 학습 도구 묶음(8차시)." },
    { term: "Intune for Education", definition: "학교 기기를 원격으로 설정·관리하는 Microsoft의 MDM 서비스." },
  ],

  sources: [
    { label: "Microsoft Education (공식)", url: "https://www.microsoft.com/en-us/education", lastVerified: "2026-10-26" },
    { label: "OneDrive 도움말 (Microsoft 지원)", url: "https://support.microsoft.com/onedrive", lastVerified: "2026-10-26" },
    { label: "microsofta3.com (교사용 참고)", url: "https://microsofta3.com/", note: "라이선스·기능은 공식 문서로 최종 확인", lastVerified: "2026-07-10" },
  ],

  cautions: [
    "라이선스 구성과 기능 이름은 자주 바뀝니다. 학교에서 쓰기 전에 Microsoft 공식 문서와 학교 관리자에게 확인하세요.",
    "OneDrive 화면과 메뉴(파일 요청, ‘누구나’ 공유 등)는 학교의 관리자 설정에 따라 다르게 보이거나 막혀 있을 수 있습니다.",
    "학생 개인정보가 담긴 파일은 공유 범위를 최소화하고, 실습에서는 가상의 예시 파일을 사용합니다.",
  ],
};
