/* ==========================================================================
   Supabase 클라이언트. 환경 변수가 없으면 `isSupabaseConfigured === false` 로
   두고, 게시판 화면은 "백엔드 미연결" 안내를 보여 줍니다(앱은 계속 동작).
   ========================================================================== */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * 설정되지 않았을 때도 import 시 크래시가 나지 않도록 안전하게 생성.
 * 실제 호출 전에 항상 `isSupabaseConfigured` 를 확인하세요.
 */
export const supabase: SupabaseClient = createClient(
  url ?? "https://placeholder.supabase.co",
  anonKey ?? "public-anon-placeholder-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

/** Supabase 오류를 사용자용 한국어 메시지로 변환. */
export function toFriendlyError(err: unknown): string {
  if (!err) return "알 수 없는 오류가 발생했습니다.";
  const message =
    typeof err === "string"
      ? err
      : err instanceof Error
        ? err.message
        : (err as { message?: string }).message ?? "요청을 처리하지 못했습니다.";

  if (/Invalid login credentials/i.test(message))
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (/User already registered/i.test(message))
    return "이미 가입된 이메일입니다.";
  if (/duplicate key|already exists|unique/i.test(message))
    return "이미 등록된 항목입니다.";
  if (/row-level security|permission|policy/i.test(message))
    return "권한이 없어 요청을 처리할 수 없습니다.";
  if (/network|fetch|Failed to fetch/i.test(message))
    return "네트워크 오류입니다. 잠시 후 다시 시도해 주세요.";
  return message;
}
