# 디지털 교육 · 15차시 웹 포털

경희대 「디지털 교육」 강의용 **콘텐츠 중심 학습 포털**입니다.
15차시 학습, 전체 일정, 교수 소개·연락, 그리고 **Firebase 기반**의 수업 게시판(공지 · MS365 계정 등록 · Q&A)과 교수자 화면을 포함합니다.

> 교육이 먼저이고, 기술은 배움을 더 깊고 공평하게 만드는 수단입니다.

---

## 기술 스택

- **Vite + React 18 + TypeScript**, React Router v6
- **react-markdown**(+ remark-gfm, rehype-sanitize)로 안전한 본문 렌더링
- **Firebase** — Authentication(구글 로그인) · Firestore(데이터베이스). **Storage는 사용하지 않습니다.**
- **Cloudflare Pages** 배포(`wrangler.jsonc`)
- 디자인은 CSS 변수(디자인 토큰) — `src/styles/tokens.css`

---

## 빠른 시작

```bash
npm install
cp .env.example .env.local   # Firebase 설정값 채우기 (아래 참고)
npm run dev                  # 개발 서버
npm run build                # 프로덕션 빌드 (tsc + vite)
npm run preview              # 빌드 결과 미리보기
```

환경 변수(`.env.local`)가 없어도 앱은 실행됩니다. 이 경우 `isFirebaseConfigured === false`가 되어
게시판·로그인만 "백엔드 미연결" 안내가 뜨고, 15차시 학습·북마크(로컬 저장)는 그대로 동작합니다.

---

## 환경 변수

`.env.local`에 Firebase 웹 앱 설정값을 넣습니다(`.env.example` 참고, 실제 값은 커밋 금지).
값은 Firebase 콘솔 → 프로젝트 설정 → 내 앱(웹)의 `firebaseConfig`에서 가져옵니다.

| 변수 | 설명 |
|---|---|
| `VITE_FIREBASE_API_KEY` | 웹 API 키(비밀 아님, 공개 식별자) |
| `VITE_FIREBASE_AUTH_DOMAIN` | `<project>.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | 프로젝트 ID |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | 발신자 ID |
| `VITE_FIREBASE_APP_ID` | 앱 ID |

> Firebase 웹 apiKey는 비밀이 아니라 공개 식별자입니다. 실제 보호는 **Firestore 보안 규칙(`firestore.rules`)**과
> **승인된 도메인** 설정이 담당합니다. 학생 이름·이메일·학번은 Firestore에만 두고 로그·외부 API로 보내지 않습니다.
> Storage(파일 저장소)는 쓰지 않으므로 `STORAGE_BUCKET`은 필요 없습니다.

---

## Firebase 설정 (최초 1회)

1. [Firebase 콘솔](https://console.firebase.google.com/)에서 프로젝트를 선택/생성하고 **웹 앱**을 등록해 `firebaseConfig`를 `.env.local`에 넣습니다.
2. **Authentication → Sign-in method → Google**을 **사용 설정**합니다.
3. **Authentication → Settings → 승인된 도메인(Authorized domains)**에 다음을 추가합니다. (빼먹으면 배포 후 로그인 실패)
   - `localhost`
   - Cloudflare Pages 배포 주소(예: `digital-education.pages.dev`)와 커스텀 도메인
4. **Firestore Database**를 **프로덕션 모드**로 생성합니다(지역 선택).
5. 보안 규칙과 색인을 배포합니다. Firebase CLI 사용 시:
   ```bash
   npm i -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules,firestore:indexes
   ```
   (또는 콘솔의 규칙 편집기에 `firestore.rules` 내용을 붙여넣고, `firestore.indexes.json`의 복합 색인을 수동 생성)

### 교수자 지정 방법

가입 화면에는 교수자 선택지가 없습니다. 모든 신규 가입은 `role: 'student'`로 만들어집니다(보안 규칙이 강제).
교수자로 올리려면 **Firebase 콘솔 → Firestore → `profiles/{uid}` 문서의 `role`을 `instructor`로** 직접 바꿉니다.
해당 사용자의 `uid`는 Authentication → Users에서 확인합니다.

---

## Firestore 구조

```
profiles/{uid}                    role('student'|'instructor'), displayName, email,
                                  studentNumber, blocked(bool), createdAt
courseSettings/sessionVisibility  { visibility: {"01":true,...}, updatedAt, updatedBy }
notices/{noticeId}                title, body, isPinned, visibility, publishAt, authorId, createdAt, updatedAt
ms365Registrations/{uid}          studentNumber, studentName, ms365Email, note, consentedAt, updatedAt
qna/{questionId}                  authorId, authorName, title, body, isPrivate, isHidden,
                                  status('pending'|'answered'), answerCount, createdAt, updatedAt
qna/{questionId}/answers/{id}     authorId, authorName, isInstructor, body, createdAt
```

- 필드 이름은 camelCase, 시간은 Firestore `Timestamp`로 저장하고 화면에서 변환합니다.
- 보안 규칙 요지(`firestore.rules`):
  - `profiles`: 본인만 읽기·수정, **`role`·`blocked`는 본인이 못 바꿈**, 교수자는 전체. `blocked==true`면 읽기·쓰기 거부.
  - `courseSettings`: 읽기 누구나, 쓰기 교수자만.
  - `notices`: 읽기 로그인 사용자, 쓰기 교수자만.
  - `ms365Registrations`: 본인 + 교수자만.
  - `qna`: **비밀글은 작성자·교수자만** 읽기(목록에서 가리는 게 아니라 규칙으로 차단). 답변 작성은 교수자만.

---

## 인증 / 로그인 (구글)

- 학생·교수 모두 **구글 계정으로 로그인**합니다(이메일+비밀번호·MS365 로그인은 쓰지 않음).
- **최초 로그인 온보딩**: 첫 로그인 시 표시명(실명)과 학번을 입력해야 게시판을 쓸 수 있습니다(`/onboarding`). 이후 `/account`에서 수정.
- 도메인 제한은 걸지 않습니다. 지메일이 있으면 누구나 가입 가능하므로, 교수자 화면의 **수강생 목록에서 차단(block)**으로 통제합니다.
- 팝업이 막히는 환경에서는 자동으로 리다이렉트 로그인으로 대체됩니다.

### 게시판 "MS365 계정 등록" 탭
로그인이 구글로 바뀌어도 이 탭은 유지됩니다. 6~10차시(MS365) 수업을 위해 학생의 학교 MS365 계정
(`@office.khu.ac.kr`)을 수집하는 비공개 폼입니다. 입력값이 해당 도메인으로 끝나는지 검사해 **안내만** 하고 막지는 않습니다.

---

## 차시 공개 범위 (1강만 공개 → 교수자가 확장)

- 학생·비로그인에게는 **1차시만** 열려 있고, 잠긴 차시는 **잠금 카드**(제목·번호·자물쇠, "아직 공개되지 않았습니다")로 보입니다. 잠긴 차시 URL로 직접 들어오면 `/course`로 보냅니다.
- 교수자는 항상 15개가 다 보이며 잠긴 차시에 "비공개" 배지가 붙습니다.
- 교수자 화면(`/teacher`)의 **강의 공개 범위**에서 차시별 스위치, "1강만 공개로 되돌리기", "전체 공개"로 조절합니다.
- 설정 문서가 없거나 읽기에 실패하면 **"01만 공개"**로 안전하게 처리합니다.

### 콘텐츠 보호 수준 (정직하게)
차시 본문은 `React`/Vite 동적 import로 **차시별 청크(session01~15.js)**로 분리되어, 잠긴 차시 본문이 메인 번들에
실리지 않습니다. 다만 청크 URL을 직접 요청하면 열람이 가능합니다(완전 차단 아님). 수업 운영(미리보기 방지)에는
충분하며, 완전 차단이 필요하면 차시 본문을 Firestore로 옮기는 별도 작업이 필요합니다.
※ `src/content/sessions/meta.ts`는 목록·라우팅용 경량 메타데이터입니다. 새 차시를 추가하면 이 파일도 함께 갱신하세요.

---

## 교수자 화면 (`/teacher`)

교수자로 로그인하면 헤더에 "교수자" 메뉴가 나타납니다. 화면 가드(`RequireInstructor`)는 편의일 뿐이고 실제 차단은 보안 규칙이 합니다.
- 강의 공개 범위 조절
- 공지 작성·수정·삭제·고정
- MS365 등록 현황 + 미등록자 목록 + CSV 내려받기(한글 엑셀용 UTF-8 BOM)
- Q&A 관리(답변·숨김·삭제·비밀글 열람)
- 수강생 목록(표시명·이메일·학번·역할·가입일) + **차단 토글**

---

## 프로젝트 구조

```
src/
  data/                 # 설정·일정·교수·도구·용어
  content/sessions/     # meta.ts(경량 메타) + session01~15.ts(본문) + index.ts(레지스트리·동적 로드)
  types/                # content / board 타입
  styles/               # tokens.css · global.css · components.css · pages.css
  components/
    common/ layout/ course/ content/ auth/(RequireInstructor)
  features/board/       # api.ts(Firestore 계층) + BoardNotices/BoardMs365/BoardQna + states
  hooks/                # useAuth(구글) · useProgress · useSessionVisibility
  lib/                  # firebase.ts · time.ts · progress.ts(localStorage)
  pages/                # 각 화면 + OnboardingPage + TeacherPage
firestore.rules         # Firestore 보안 규칙
firestore.indexes.json  # 복합 색인(Q&A)
public/assets/          # 이미지 에셋
```

---

## 콘텐츠 추가 (요약 — 자세한 내용은 CONTENT_GUIDE.md)

- **새 차시**: `src/content/sessions/sessionNN.ts` 작성 + `meta.ts`에 메타데이터 추가(둘 다 필요). 목록·라우팅·일정·이전/다음에 자동 반영.
- **도구 카드**: `src/data/tools.ts` 배열에 추가(`pricing`·`officialUrl`·`lastVerified`·`changeable` 유지).
- **용어**: `src/data/glossary.ts`.
- **일정 날짜·수업 방식**: `src/data/courseSchedule.ts`(날짜 미정은 `date: null`).

---

## 배포 (Cloudflare Pages)

- 빌드 명령 `npm run build`, 출력 `dist`(`wrangler.jsonc`의 `assets.directory`). SPA 폴백은 `not_found_handling: "single-page-application"`.
- Cloudflare Pages 환경 변수에 `VITE_FIREBASE_*`를 등록합니다.
- 배포 주소를 **Firebase 승인된 도메인**에 추가해야 로그인이 됩니다(위 참고).
- 배포는 계속 Cloudflare를 사용합니다(Firebase Hosting으로 옮기지 않음).

---

## 학기 종료 후 데이터 정리

필요한 데이터를 CSV로 내려받아 보관한 뒤(교수자 화면의 CSV 버튼), Firebase 콘솔 또는 Admin SDK 스크립트로 삭제합니다.
- `ms365Registrations`, `qna`(및 하위 `answers`) 컬렉션 삭제
- 필요 시 `notices` 정리, `courseSettings/sessionVisibility` 초기화
- `profiles`는 다음 학기 재사용하거나 삭제
- 파일 업로드가 없으므로 Storage 정리는 필요 없습니다.

---

## 주요 설계 결정

- 데이터·로그인은 **Firebase 전용**(Supabase 코드는 전부 제거). Storage 미사용으로 무료(Spark) 요금제로 충분.
- 권한은 UI 숨김이 아니라 **Firestore 보안 규칙**으로 강제. 교수자 지정은 콘솔 작업으로만.
- 로그인은 **구글 계정 단일**. 학번·표시명은 온보딩에서 수집.
- 게시판은 **공지 · MS365 등록 · Q&A** 3탭. 과제·익명·신고 기능은 제거.
- 콘텐츠는 컴포넌트에 하드코딩하지 않고 차시별 파일로 분리(+ 차시별 청크 분할).

## 알려진 가정 / 한계
- Copernicus/StyreneB 라이선스 폰트는 로드하지 않고 대체 스택 사용.
- 차시별 청크 분할은 미리보기 방지 수준이며 완전 차단은 아닙니다(위 ‘콘텐츠 보호 수준’).
- 비밀글은 규칙상 다른 학생에게 아예 조회되지 않습니다(목록에 "비밀글" 자리표시로 노출하지 않음 — 존재 자체를 숨김).
