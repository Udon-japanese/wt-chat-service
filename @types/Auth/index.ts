import { User } from "firebase/auth"
import { ReactNode } from "react";

// undefined: 初期値, null: 未認証, User: 認証済
export type GlobalAuthState = {
  user: User | null | undefined;
}

export type AuthProviderProps = {
  children: ReactNode;
}

export type AuthGuardProps = {
  children: ReactNode;
}