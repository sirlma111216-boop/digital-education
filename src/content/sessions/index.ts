/* ==========================================================================
   Session registry. 목록·라우팅은 경량 메타데이터(meta.ts)만 동기적으로 쓴다.
   차시 본문(Session)은 loadSession(id) 로 차시별 청크를 동적 import 한다.

   새 차시 추가: sessionNN.ts 를 만들고 meta.ts 배열에 메타데이터를 추가한다.
   (본문은 import.meta.glob 이 자동으로 잡는다.)
   ========================================================================== */

import type { CategoryId, Session, SessionMeta } from "@/types/content";
import { sessionMetas } from "./meta";

/** Published metas in order — used by lists, routing, schedule, prev/next. */
export const allSessions: SessionMeta[] = sessionMetas
  .filter((s) => s.published)
  .sort((a, b) => a.id.localeCompare(b.id));

const byId = new Map(allSessions.map((s) => [s.id, s]));
const bySlug = new Map(allSessions.map((s) => [s.slug, s]));

export function getSessionById(id: string): SessionMeta | undefined {
  return byId.get(id);
}
export function getSessionBySlug(slug: string): SessionMeta | undefined {
  return bySlug.get(slug);
}

/** Route param is `NN-slug` (e.g. "01-digital-education-foundations"). */
export function getSessionMetaByRouteParam(param: string): SessionMeta | undefined {
  const id = param.slice(0, 2);
  return byId.get(id) ?? bySlug.get(param.replace(/^\d+-/, ""));
}
export function sessionRouteParam(s: SessionMeta): string {
  return `${s.id}-${s.slug}`;
}

export function getPrevNext(id: string): { prev?: SessionMeta; next?: SessionMeta } {
  const idx = allSessions.findIndex((s) => s.id === id);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? allSessions[idx - 1] : undefined,
    next: idx < allSessions.length - 1 ? allSessions[idx + 1] : undefined,
  };
}

export function sessionsByCategory(category: CategoryId): SessionMeta[] {
  return allSessions.filter((s) => s.category === category);
}

/* --- 차시 본문 동적 로드 (차시별 청크) --- */
const loaders = import.meta.glob("./session[0-9][0-9].ts");

/** 차시 본문(Session)을 필요할 때 로드. 없으면 undefined. */
export async function loadSession(id: string): Promise<Session | undefined> {
  const loader = loaders[`./session${id}.ts`];
  if (!loader) return undefined;
  const mod = (await loader()) as Record<string, Session>;
  return mod[`session${id}`];
}

/* ------------------------------------------------------------------ */
/* Dev-only integrity checks: meta 중복 + 본문과 메타 불일치 + 실습 규칙   */
/* ------------------------------------------------------------------ */
if (import.meta.env.DEV) {
  const seenId = new Set<string>();
  const seenSlug = new Set<string>();
  for (const s of sessionMetas) {
    if (seenId.has(s.id)) console.warn(`[content] 중복 ID: ${s.id}`);
    if (seenSlug.has(s.slug)) console.warn(`[content] 중복 slug: ${s.slug}`);
    seenId.add(s.id);
    seenSlug.add(s.slug);
  }
  // 본문을 로드해 메타 일치·실습 규칙 검사 (비동기, 개발 편의용)
  void Promise.all(
    allSessions.map(async (m) => {
      const full = await loadSession(m.id);
      if (!full) {
        console.warn(`[content] 본문 없음: ${m.id}`);
        return;
      }
      if (full.slug !== m.slug || full.title !== m.title)
        console.warn(`[content] 메타 불일치: ${m.id} (meta.ts 와 session${m.id}.ts 를 맞추세요)`);
      const week = Number(m.id);
      const isTheory = week >= 1 && week <= 3;
      if (isTheory && full.practice) console.warn(`[content] 1~3차시에는 실습이 없어야 합니다: ${m.id}`);
      if (!isTheory && !full.practice) console.warn(`[content] 4~15차시에는 실습이 있어야 합니다: ${m.id}`);
    }),
  );
}
