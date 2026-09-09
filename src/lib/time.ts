/* Firestore Timestamp/숫자 → ms, 그리고 한국어 날짜 포맷 */

export function toMillis(v: unknown): number | null {
  if (!v) return null;
  if (typeof v === "number") return v;
  if (typeof v === "object" && v !== null && "toMillis" in v) {
    try {
      return (v as { toMillis: () => number }).toMillis();
    } catch {
      return null;
    }
  }
  return null;
}

export function fmtDateTime(ms: number | null): string {
  if (!ms) return "";
  return new Date(ms).toLocaleString("ko-KR");
}

export function fmtDate(ms: number | null): string {
  if (!ms) return "";
  return new Date(ms).toLocaleDateString("ko-KR");
}
