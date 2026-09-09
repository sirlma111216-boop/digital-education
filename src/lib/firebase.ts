/* ==========================================================================
   Firebase 클라이언트. 환경 변수가 없으면 `isFirebaseConfigured === false` 로
   두고, 게시판·로그인 화면은 "백엔드 미연결" 안내를 보여 줍니다(앱은 계속 동작).
   Storage 는 사용하지 않습니다(과제 파일 업로드 제거).
   ========================================================================== */

import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

// 설정이 없어도 import 시 크래시가 나지 않도록 안전한 기본값으로 초기화.
// 실제 호출 전에 항상 `isFirebaseConfigured` 를 확인하세요.
const app: FirebaseApp = initializeApp({
  apiKey: config.apiKey ?? "placeholder-api-key",
  authDomain: config.authDomain ?? "placeholder.firebaseapp.com",
  projectId: config.projectId ?? "placeholder-project",
  messagingSenderId: config.messagingSenderId ?? "0",
  appId: config.appId ?? "1:0:web:placeholder",
});

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

/** Firebase 오류를 사용자용 한국어 메시지로 변환. */
export function toFriendlyError(err: unknown): string {
  if (!err) return "알 수 없는 오류가 발생했습니다.";
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code?: unknown }).code ?? "")
      : "";
  const message =
    typeof err === "string"
      ? err
      : err instanceof Error
        ? err.message
        : (err as { message?: string }).message ?? "요청을 처리하지 못했습니다.";

  const key = code || message;
  if (/auth\/popup-closed-by-user|auth\/cancelled-popup-request/i.test(key))
    return "로그인 창이 닫혔습니다. 다시 시도해 주세요.";
  if (/auth\/popup-blocked/i.test(key))
    return "팝업이 차단되었습니다. 페이지 이동 방식으로 다시 시도합니다.";
  if (/auth\/network-request-failed|network/i.test(key))
    return "네트워크 오류입니다. 잠시 후 다시 시도해 주세요.";
  if (/auth\/unauthorized-domain/i.test(key))
    return "허용되지 않은 도메인입니다. 관리자에게 문의해 주세요.";
  if (/permission-denied|insufficient permissions/i.test(key))
    return "권한이 없어 요청을 처리할 수 없습니다.";
  if (/already-exists|duplicate/i.test(key))
    return "이미 등록된 항목입니다.";
  if (/unavailable|deadline-exceeded/i.test(key))
    return "서버가 잠시 불안정합니다. 잠시 후 다시 시도해 주세요.";
  return message;
}
