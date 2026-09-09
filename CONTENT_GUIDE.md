# 콘텐츠 편집 가이드 (비개발자용)

이 문서는 **코드를 잘 몰라도** 수업 콘텐츠를 추가·수정할 수 있도록 안내합니다.
대부분의 작업은 `src/data/` 와 `src/content/sessions/` 안의 파일만 수정하면 됩니다.

수정 후에는 저장하고, 개발 서버(`npm run dev`)가 켜져 있으면 화면이 자동으로 갱신됩니다.
배포된 사이트에 반영하려면 `npm run build` 후 다시 배포하세요.

---

## 1. 새 차시 추가

1. `src/content/sessions/` 폴더에서 기존 파일(예: `session04.ts`)을 복사해 `session16.ts` 로 만듭니다.
   (안의 `export const session04` 도 `session16` 으로 바꿉니다.)
2. 내용을 새 차시에 맞게 수정합니다. 특히 맨 위 항목:
   - `id`: `"16"` 처럼 두 자리 문자열
   - `slug`: 영어 소문자·하이픈 (예: `"my-new-topic"`) — 주소에 쓰입니다
   - `title`, `summary`, `keywords`, `duration`(분), `level`(입문/중급/심화)
   - `theoryRatio` / `practiceRatio`: 합이 100
3. **`src/content/sessions/meta.ts`** 의 `sessionMetas` 배열에 같은 메타데이터(id·slug·title·category·summary·duration·level·keywords·theoryRatio·practiceRatio·published·lastUpdated)를 한 줄 추가합니다.

```ts
{ id: "16", slug: "my-new-topic", title: "...", category: "genai", summary: "...", duration: 90, level: "심화", keywords: ["..."], theoryRatio: 40, practiceRatio: 60, published: true, lastUpdated: "2026-09-09" },
```

이러면 홈·과정 목록·검색·이전/다음 이동에 자동으로 나타납니다. 본문(session16.ts)은 필요할 때
동적으로 로드되고, `meta.ts` 는 목록·라우팅에 쓰입니다. **두 곳의 id·slug·title 은 반드시 일치**해야 하며,
개발 모드에서 불일치 시 콘솔 경고가 표시됩니다.

> **실습 규칙**: 1~3차시에는 `practice` 를 넣지 마세요. 4차시 이상에는 반드시 `practice` 를 넣습니다.
> 규칙을 어기면 개발 모드 콘솔에 경고가 표시됩니다.

---

## 2. 차시 제목·내용 변경

`src/content/sessions/sessionNN.ts` 를 열어 해당 값을 바꿉니다.

- `title`, `summary`, `overview` — 제목/요약/개요
- `objectives` — 학습 목표(2~4개)
- `keyQuestion` — 핵심 질문 1개
- `theoryBlocks` — 본문 학습(각 항목은 `heading` + `body`). `body` 는 **마크다운**을 지원합니다(굵게 `**...**`, 목록 `-`, 표 등).
- `compareTables` — 비교표
- `quiz` — 이해 점검 문항 (아래 3-1 참고)
- `terms` — 핵심 용어(5개 이상 권장)
- `sources` — 참고 자료

## 3. 차시 순서 변경

목록은 `id` 기준으로 정렬됩니다. 순서를 바꾸려면 `meta.ts`(와 해당 `sessionNN.ts`)의 `id` 값을 조정하세요.

### 3-1. 퀴즈 문항 형식

```ts
// 객관식
{ type: "mcq", question: "...", choices: ["A","B","C"], answerIndex: 1, explanation: "..." }
// OX
{ type: "ox", question: "...", answer: true, explanation: "..." }
// 자기 점검(정답 없음)
{ type: "self", question: "..." }
```

## 4. 실습 활동 추가/수정 (4~15차시)

```ts
practice: {
  title: "실습 제목",
  goal: "실습 목표",
  steps: ["단계1", "단계2", "..."],
  checklist: ["점검1", "점검2"],   // 선택. 학생 화면에서 체크됩니다
  deliverable: "제출물 설명",       // 선택
}
```

---

## 5. 도구 카드 추가

`src/data/tools.ts` 의 `tools` 배열에 항목을 추가합니다. 필드:

- `name`, `platform`(Google/Microsoft/독립형/생성형 AI), `purposes`(목적 배열)
- `audience`(교사/학생/공동), `level`, `timing`, `pricing`
- `summary`, `strengths`, `limits`, `recommendedFor`, `notRecommendedFor`, `licenseNote`
- `officialUrl`, `lastVerified`(YYYY-MM-DD), `changeable`(변경 가능 여부)

> 가격·기능·라이선스는 자주 바뀝니다. 단정하지 말고 `lastVerified` 와 공식 링크를 함께 유지하세요.

## 6. 용어 추가

`src/data/glossary.ts` 의 `glossary` 배열에 추가합니다.

```ts
{ term: "표제(영문/약어)", ko: "한국어 표현", category: "AI", definition: "쉬운 풀이" }
```

`category` 는 `소양 / 설계 / 플랫폼 / 학습방식 / 데이터 / AI` 중 하나입니다.

## 7. 이미지·동영상 추가

- 파일을 `public/assets/sessions/NN/` 에 넣습니다.
- 콘텐츠에서 `/assets/sessions/NN/파일명` 경로로 참조합니다.
- 외부 사이트 이미지를 그대로 링크(핫링크)하지 마세요. 저작권·안정성 문제가 생깁니다.
- 아직 이미지가 없으면 화면에는 “이미지 에셋 자리” 플레이스홀더가 표시됩니다.

## 8. 외부 링크 수정

- 교수 외부 소개 페이지·이메일: `src/data/instructor.ts`, `src/data/courseConfig.ts`
- 차시 참고 자료: 각 `sessionNN.ts` 의 `sources`

## 9. 차시 비공개 처리

해당 차시 파일에서 `published: false` 로 바꾸면 목록·검색·라우팅에서 숨겨집니다.

## 10. 전체 일정(날짜·수업 방식) 수정

`src/data/courseSchedule.ts` 만 수정합니다.

```ts
{ week: 1, sessionId: "01", title: "...", date: "2026-09-01", mode: "대면", status: "예정" }
```

- 날짜가 미정이면 `date: null` — 화면에 “일정 추후 안내”로 표시됩니다.
- `mode`: 대면 / 온라인 / 혼합 / 추후 안내
- `status`: 예정 / 진행 중 / 완료

## 11. 교수 소개·연락처 수정

- `src/data/instructor.ts`: 이름·역할·소개 문단·관심 분야·외부 링크
- `src/data/courseConfig.ts`: 과정명·핵심 문구·연락 이메일·메일 제목 템플릿

---

## 12. 교수자 화면 (`/teacher`)

교수자로 로그인하면 헤더에 "교수자" 메뉴가 나타납니다. 한 화면에서 아래를 처리합니다.
과제 기능·익명 게시판·파일 업로드는 이번 개편에서 제거되었습니다(과제 안내가 필요하면 공지로 올립니다).

- **강의 공개 범위**: 차시별 공개/비공개 스위치, "1강만 공개로 되돌리기", "전체 공개".
- **공지 관리**: 새 공지 작성(제목·내용·고정·공개 범위), 상단 고정/해제, 삭제. 최근 3개는 홈에 노출.
- **MS365 등록 현황**: 검색·이메일 마스킹·미등록자 목록·CSV 내보내기. 학생끼리는 서로의 정보가 안 보입니다.
- **Q&A 관리**: 답변 등록(답변 시 자동 ‘답변완료’), 숨기기/해제, 삭제, **비밀글 열람**.
- **수강생 관리**: 표시명·이메일·학번·역할·가입일 목록 + **차단 토글**(지메일로 가입한 비수강생 차단), CSV.

## 13. Q&A (학생 화면)

- 질문은 **실명(표시명)**으로 올라가며, 작성자는 본인 글을 수정·삭제할 수 있습니다.
- **비밀글**로 올리면 작성자와 교수자만 볼 수 있습니다(다른 학생에게는 아예 조회되지 않음).
- 교수자가 답변을 달면 상태가 자동으로 ‘답변완료’가 됩니다.
