# 디지털 교육 · 15차시 웹 포털

교육대학원 및 학부 ‘디지털 교육’ 수업을 위한 **콘텐츠 중심 학습 포털**입니다.
15차시 학습, 전체 일정, 교수 소개·연락, 그리고 Supabase 기반의 수업 게시판(공지·과제·MS365 계정 등록·익명 질문)을 포함합니다.

> 교육이 먼저이고, 기술은 배움을 더 깊고 공평하게 만드는 수단입니다.

---

## 기술 스택

- **Vite + React + TypeScript**
- **React Router** (SPA 라우팅)
- **react-markdown + remark-gfm + rehype-sanitize** (안전한 본문 렌더링)
- **Supabase** (Auth · Database · Storage, 행 수준 보안)
- 디자인은 **CSS 변수(디자인 토큰)** 로 분리 — `src/styles/tokens.css`

---

## 빠른 시작

```bash
npm install
cp .env.example .env.local   # 값 채우기 (아래 참고)
npm run dev                  # 개발 서버
npm run build                # 프로덕션 빌드 (tsc + vite)
npm run preview              # 빌드 결과 미리보기
```

Supabase 키가 없어도 앱은 실행됩니다. 이 경우 게시판/로그인은 “백엔드 미연결” 안내가 표시되고,
15차시 학습·진행률·북마크·성찰 메모(로컬 저장) 기능은 그대로 동작합니다.

---

## 환경 변수

`.env.local` 에 설정합니다 (`.env.example` 참고, 실제 값은 커밋 금지).

| 변수 | 설명 |
|---|---|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon(public) 키 |
| `VITE_INSTRUCTOR_HINT_EMAILS` | (선택) 교수자 안내용 이메일 목록. 권한과는 무관 |

> `service_role` 키와 학생 개인정보, API 키는 **절대로** 프런트엔드/저장소에 넣지 마세요.

---

## Supabase 연결

1. [supabase.com](https://supabase.com) 에서 프로젝트를 만들고 URL·anon 키를 `.env.local` 에 넣습니다.
2. **SQL Editor** 에서 순서대로 실행합니다.
   1. `supabase/schema.sql` — 테이블·enum·트리거·뷰·Storage 버킷
   2. `supabase/rls-policies.sql` — 행 수준 보안 + Storage 정책
3. (선택) `supabase/seed.sql` — 개발용 샘플 공지/과제 (교수자 지정 후 실행)

### 교수자 권한 부여

교수자 권한은 회원가입 화면에서 선택할 수 없습니다(UI가 아니라 DB 정책으로 차단).
가입 후, 해당 사용자의 `auth uid` 를 확인해 다음 SQL 을 실행합니다.

```sql
update public.profiles set role = 'instructor' where id = '<교수자 auth uid>';
```

`auth uid` 는 Supabase 대시보드 → Authentication → Users 에서 확인할 수 있습니다.

### Storage 버킷

- `assignments` (비공개): 과제 파일 제출. 학생은 `<본인uid>/...` 폴더에만 업로드·조회, 교수자는 전체 조회
- `attachments` (공개 읽기): 공지/과제 첨부. 업로드는 교수자만

두 버킷과 정책은 `schema.sql` / `rls-policies.sql` 실행 시 자동 생성됩니다.

---

## 프로젝트 구조

```
content 는 코드가 아니라 데이터입니다. 차시/도구/용어는 아래 파일만 수정하면 됩니다.

src/
  data/                 # 설정·일정·교수·도구·용어 (courseConfig, courseSchedule, ...)
  content/sessions/     # 15개 차시 콘텐츠 (session01.ts ~ session15.ts) + index.ts
  types/                # content / board 타입
  styles/               # tokens.css(디자인 토큰) · global.css · components.css · pages.css
  components/
    common/             # BrandMark, Markdown
    layout/             # Header, Footer, Layout
    course/             # SessionCard
    content/            # 재사용 콘텐츠 블록(개념지도·퀴즈·실습·용어 등)
  features/board/       # 공지·과제·MS365·익명 게시판 + 상태 컴포넌트
  hooks/                # useAuth, useProgress
  lib/                  # supabase 클라이언트, 진행상태(localStorage)
  pages/                # 각 화면
supabase/               # schema.sql, rls-policies.sql, seed.sql
public/assets/          # 이미지 에셋 자리 (instructor/, sessions/NN/)
```

---

## 콘텐츠 추가 (요약 — 자세한 내용은 CONTENT_GUIDE.md)

- **새 차시**: `src/content/sessions/sessionNN.ts` 를 만들고 `index.ts` 의 배열에 추가하면 목록·라우팅·일정 링크·이전/다음에 자동 반영됩니다.
- **도구 카드**: `src/data/tools.ts` 배열에 항목 추가
- **용어**: `src/data/glossary.ts` 배열에 항목 추가
- **일정 날짜·수업 방식**: `src/data/courseSchedule.ts` 만 수정 (날짜 미정은 `date: null`)
- **교수 소개·연락처**: `src/data/instructor.ts`, `src/data/courseConfig.ts`

개발 모드에서는 중복 ID/slug, 필수 필드 누락, “1~3차시 실습 금지 / 4~15차시 실습 필수” 규칙을
콘솔 경고로 검사합니다.

## 이미지 추가

- 교수 사진: `public/assets/instructor/profile.jpg` (없으면 이니셜 아바타 표시)
- 차시 이미지: `public/assets/sessions/NN/` 에 넣고 콘텐츠에서 경로 참조
- 외부 이미지 **핫링크 금지**. 개념도는 CSS/SVG 컴포넌트(`ConceptMap`)로 재구성했습니다.

---

## 디자인 교체 (style.md 반영 위치)

색상·타이포·간격·라운드는 모두 `src/styles/tokens.css` 의 CSS 변수로 분리되어 있습니다.
추후 별도 `style.md` 를 반영할 때는 이 파일의 값만 바꾸면 전체 UI에 적용됩니다.
현재 값은 Anthropic 계열의 warm-editorial 시스템(크림 캔버스 + 코랄 + 다크 네이비)을 따릅니다.

---

## 배포

정적 SPA 이므로 Vercel / Netlify / Cloudflare Pages 등에 배포할 수 있습니다.

- 빌드 명령: `npm run build`, 출력 디렉터리: `dist`
- SPA 폴백: 모든 경로를 `index.html` 로 rewrite 하도록 설정하세요.
- 환경 변수(`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)를 배포 플랫폼에 등록합니다.

---

## 게시판 데이터 백업 · 학기 종료 후 정리

- **백업**: Supabase 대시보드 → Database → Backups, 또는 `pg_dump` 로 내보내기.
  과제 제출/ MS365 등록은 CSV 내보내기 버튼(교수자 화면)으로도 저장할 수 있습니다.
- **학기 종료 후 정리**(개인정보 최소 보관): 필요한 데이터를 백업한 뒤 삭제합니다.

```sql
-- MS365 계정 등록 삭제
delete from public.ms365_registrations;
-- 과제 제출 삭제 (Storage 파일은 별도 정리)
delete from public.assignment_submissions;
-- 익명 게시판 정리(필요 시)
delete from public.anonymous_comments;
delete from public.anonymous_posts;
```

Storage 의 `assignments` 버킷 파일은 대시보드 Storage 에서 함께 삭제하세요.

---

## 주요 설계 결정

- 콘텐츠를 컴포넌트에 하드코딩하지 않고 **타입 안전한 콘텐츠 모듈**로 분리(빌드 안정성 + 확장성).
- 권한은 UI 숨김이 아니라 **RLS 정책**으로 강제. 교수자 권한은 DB 작업으로만 부여.
- 익명 게시판은 `author_id` 를 저장하되, 학생에게는 **author_id 없는 공개 뷰**로만 노출.
- MS365 등록/과제 제출은 본인·교수자만 접근(다른 학생 노출 없음).
- 1~3차시는 이론 중심(실습 없음), 4~15차시는 실습 포함 — 규칙을 dev 검증으로 강제.

## 알려진 가정

- Copernicus/StyreneB 는 라이선스 폰트로 로드하지 않고 대체 스택(serif→Georgia 계열, sans→시스템 humanist)을 사용합니다.
- 서비스명·모델명·가격·라이선스는 빠르게 변합니다. 도구/차시의 `lastVerified`·공식 링크를 우선 확인하세요.
