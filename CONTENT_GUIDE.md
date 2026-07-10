# 콘텐츠 편집 가이드 (비개발자용)

이 문서는 **코드를 잘 몰라도** 수업 콘텐츠를 추가·수정할 수 있도록 안내합니다.
대부분의 작업은 `src/data/` 와 `src/content/sessions/` 안의 파일만 수정하면 됩니다.

수정 후에는 저장하고, 개발 서버(`npm run dev`)가 켜져 있으면 화면이 자동으로 갱신됩니다.
배포된 사이트에 반영하려면 `npm run build` 후 다시 배포하세요.

---

## 1. 새 차시 추가

1. `src/content/sessions/` 폴더에서 기존 파일(예: `session04.ts`)을 복사해 `session16.ts` 로 만듭니다.
2. 내용을 새 차시에 맞게 수정합니다. 특히 맨 위 항목:
   - `id`: `"16"` 처럼 두 자리 문자열
   - `slug`: 영어 소문자·하이픈 (예: `"my-new-topic"`) — 주소에 쓰입니다
   - `title`, `summary`, `keywords`, `duration`(분), `level`(입문/중급/심화)
   - `theoryRatio` / `practiceRatio`: 합이 100
3. `src/content/sessions/index.ts` 를 열어, 위쪽 `import` 와 아래 `registry` 배열에 새 차시를 추가합니다.

```ts
import { session16 } from "./session16";
// ...
const registry: Session[] = [ /* ... */, session15, session16 ];
```

이러면 홈·과정 목록·검색·이전/다음 이동에 자동으로 나타납니다.

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

`src/content/sessions/index.ts` 의 `registry` 배열 순서를 바꾸면 됩니다.
(목록은 `id` 기준으로 정렬되므로, 순서를 바꾸려면 `id` 값을 조정하세요.)

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

## 12. 공지·과제 운영 (교수자 화면)

로그인한 **교수자** 계정으로 게시판에 들어가면 작성 버튼이 나타납니다.

- **공지사항**: 새 공지 작성(제목·내용·고정·공개 범위), 상단 고정/해제, 삭제. 최근 3개는 홈에 노출됩니다.
- **과제**: 새 과제 등록(과제명·설명·관련 차시·마감일·제출 방식·지각 허용). 제출 현황 확인, 피드백 저장, 파일 다운로드, CSV 내보내기.

## 13. MS365 계정 등록 관리 (교수자 화면)

- 전체 등록 목록을 검색하고, 이메일 마스킹을 켜고 끌 수 있습니다.
- CSV 로 내보낼 수 있습니다.
- 학생에게는 서로의 이름·이메일이 보이지 않습니다.

## 14. 익명 게시판 관리 (교수자 화면)

- 교수자만 작성자를 확인할 수 있습니다(학생 화면에는 익명 라벨만 표시).
- 답변 등록(교수자 답변 시 자동으로 ‘답변 완료’), 숨기기/해제, 삭제, 상태 변경이 가능합니다.
- 학생은 신고할 수 있습니다.
