import { User } from "firebase/auth"
import { ReactNode, Dispatch, SetStateAction } from "react";
import { handleSubmit, handleInputChange } from "../Form";

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

export type DeleteIconModalProps = {
  showIconModal: boolean;
  closeIconModal: () => void;
  deleteUserIcon: () => void;
  iconURL: string;
}

export type ProfileSettingProps = {
  gettingGoogleInfo: boolean;
}

export type AuthFormText = {
  head: string;
  subhead: {
    p: string;
    link: {
      content: string;
      href: string;
    }
  }
  googleAuth: string;
  forgotPassword?: {
    p: string;
    link: {
      content: string;
      href: string;
    }
  }
  submitBtn: string;
}

export type AuthFormProps = {
  text: AuthFormText;
  handleSubmit: handleSubmit;
  gettingGoogleInfo: boolean;
  setGettingGoogleInfo: Dispatch<SetStateAction<boolean>>;
  email: string;
  handleEmailChange: handleInputChange;
  password: string;
  handlePasswordChange: handleInputChange;
  submitting: boolean;
}

export type SignUpProps = {
  gettingGoogleInfo: boolean;
  setGettingGoogleInfo: Dispatch<SetStateAction<boolean>>;
  setDoneEPAuth: Dispatch<SetStateAction<boolean>>;
}

export type SignInProps = SignUpProps;