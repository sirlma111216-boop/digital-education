/* ==========================================================================
   Session registry. To add a new session: create sessionNN.ts and add it to
   the `allSessions` array below. Everything else (routing, lists, schedule
   links, prev/next) picks it up automatically.

   Dev-time validation runs on import: missing fields, duplicate id/slug, and
   the "1~3차시 must NOT have practice / 4~15차시 MUST have practice" rule.
   ========================================================================== */

import type { CategoryId, Session } from "@/types/content";
import { session01 } from "./session01";
import { session02 } from "./session02";
import { session03 } from "./session03";
import { session04 } from "./session04";
import { session05 } from "./session05";
import { session06 } from "./session06";
import { session07 } from "./session07";
import { session08 } from "./session08";
import { session09 } from "./session09";
import { session10 } from "./session10";
import { session11 } from "./session11";
import { session12 } from "./session12";
import { session13 } from "./session13";
import { session14 } from "./session14";
import { session15 } from "./session15";

const registry: Session[] = [
  session01,
  session02,
  session03,
  session04,
  session05,
  session06,
  session07,
  session08,
  session09,
  session10,
  session11,
  session12,
  session13,
  session14,
  session15,
];

/** Published sessions in order, used by the whole app. */
export const allSessions: Session[] = registry
  .filter((s) => s.published)
  .sort((a, b) => a.id.localeCompare(b.id));

/** Lookup helpers. */
const byId = new Map(allSessions.map((s) => [s.id, s]));
const bySlug = new Map(allSessions.map((s) => [s.slug, s]));

export function getSessionById(id: string): Session | undefined {
  return byId.get(id);
}
export function getSessionBySlug(slug: string): Session | undefined {
  return bySlug.get(slug);
}

/** Route param is `NN-slug` (e.g. "01-digital-education-foundations"). */
export function getSessionByRouteParam(param: string): Session | undefined {
  const id = param.slice(0, 2);
  return byId.get(id) ?? bySlug.get(param.replace(/^\d+-/, ""));
}
export function sessionRouteParam(s: Session): string {
  return `${s.id}-${s.slug}`;
}

export function getPrevNext(id: string): {
  prev?: Session;
  next?: Session;
} {
  const idx = allSessions.findIndex((s) => s.id === id);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? allSessions[idx - 1] : undefined,
    next: idx < allSessions.length - 1 ? allSessions[idx + 1] : undefined,
  };
}

export function sessionsByCategory(category: CategoryId): Session[] {
  return allSessions.filter((s) => s.category === category);
}

/* ------------------------------------------------------------------ */
/* Dev-only integrity checks — surfaced as console warnings in `dev`.  */
/* ------------------------------------------------------------------ */
if (import.meta.env.DEV) {
  const seenId = new Set<string>();
  const seenSlug = new Set<string>();
  for (const s of registry) {
    if (seenId.has(s.id)) console.warn(`[content] 중복 ID: ${s.id}`);
    if (seenSlug.has(s.slug)) console.warn(`[content] 중복 slug: ${s.slug}`);
    seenId.add(s.id);
    seenSlug.add(s.slug);

    const requiredFilled =
      s.title && s.summary && s.objectives.length >= 2 && s.terms.length >= 5;
    if (!requiredFilled)
      console.warn(`[content] 필수 필드 누락 가능: ${s.id} ${s.title}`);

    const week = Number(s.id);
    const isTheory = week >= 1 && week <= 3;
    if (isTheory && s.practice)
      console.warn(`[content] 1~3차시에는 실습이 없어야 합니다: ${s.id}`);
    if (!isTheory && !s.practice)
      console.warn(`[content] 4~15차시에는 실습이 있어야 합니다: ${s.id}`);
  }
}
