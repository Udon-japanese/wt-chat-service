import { getApp, getApps, initializeApp, FirebaseOptions } from "firebase/app";
import {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} from "@/constant/env";

const firebaseConfig: FirebaseOptions = {
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const initializeFirebaseApp = () =>
  !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const firebaseAuthError = (e: any, method: "signup" | "signin/popup" | "signin" | "") => {
  switch (e.code) {
    case "auth/cancelled-popup-request":
    case "auth/popup-closed-by-user":
      return null;
    case "auth/email-already-in-use":
      if (method.indexOf("signup") !== -1) {
        return "このメールアドレスは既に使用されています";
      } else {
        return "メールアドレスまたはパスワードが違います";
      }
    case "auth/invalid-email":
      return "メールアドレスの形式が正しくありません";
    case "auth/user-disabled":
      return "サービスの利用が停止されています";
    case "auth/user-not-found":
      return "メールアドレスまたはパスワードが違います";
    case "auth/user-mismatch":
      if (method === "signin/popup") {
        return "認証されているユーザーと異なるアカウントが選択されました";
      } else {
        return "メールアドレスまたはパスワードが違います";
      }
    case "auth/weak-password":
      return "パスワードは6文字以上にしてください";
    case "auth/wrong-password":
      return "メールアドレスまたはパスワードが違います";
    case "auth/popup-blocked":
      return "認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください";
    case "auth/operation-not-supported-in-this-environment":
    case "auth/auth-domain-config-required":
    case "auth/operation-not-allowed":
    case "auth/unauthorized-domain":
      return "現在この認証方法はご利用頂けません";
    case "auth/requires-recent-login":
      return "認証の有効期限が切れています";
    default:
      if (method.indexOf("signin") !== -1) {
        return "認証に失敗しました。しばらく時間をおいて再度お試しください";
      } else {
        return "エラーが発生しました。しばらく時間をおいてお試しください";
      }
  }
};
