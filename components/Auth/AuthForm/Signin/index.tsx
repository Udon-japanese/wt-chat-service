import AuthForm from "..";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebaseAuthError } from "@/lib/firebase/firebase";
import { successToast, errorToast } from "@/lib/toast";
import { handleInputChange, handleSubmit } from "@/@types/Form";
import { SignInProps, AuthFormText } from "@/@types/Auth";

export default function SignIn({
  gettingGoogleInfo,
  setGettingGoogleInfo,
  setDoneEPAuth,
}: SignInProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const { push } = useRouter();

  const authFormText: AuthFormText = {
    head: "サインイン",
    subhead: {
      p: "アカウントがありませんか？",
      link: {
        content: "サインアップはこちら",
        href: "/signup",
      },
    },
    googleAuth: "Google でサインイン",
    forgotPassword: {
      p: "パスワードを忘れましたか？",
      link: {
        content: "再設定はこちら",
        href: "/reset-password",
      },
    },
    submitBtn: "サインイン",
  };

  const handleEmailChange: handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange: handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit: handleSubmit = async (e) => {
    setDoneEPAuth(false);
    setSubmitting(true);
    e.preventDefault();
    submitBtnRef.current?.blur();
    try {
      const doubleByteRegex: RegExp = /[^\x00-\x7F]/g;
      if (doubleByteRegex.test(email) || doubleByteRegex.test(password)) {
        throw new Error(
          "メールアドレスまたはパスワードに全角文字を含めることはできません"
        );
      }

      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user.displayName && user.photoURL) {
        push("/");
        successToast("サインインしました");
      }
      setEmail("");
      setPassword("");
      setDoneEPAuth(true);
    } catch (err: any) {
      let errMessage: string | null = "";
      if (err instanceof FirebaseError) {
        errMessage = firebaseAuthError(err, "signup");
      } else {
        errMessage = err.message;
      }
      if (errMessage) errorToast(errMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      text={authFormText}
      handleSubmit={handleSubmit}
      gettingGoogleInfo={gettingGoogleInfo}
      setGettingGoogleInfo={setGettingGoogleInfo}
      email={email}
      handleEmailChange={handleEmailChange}
      password={password}
      handlePasswordChange={handlePasswordChange}
      submitting={submitting}
      submitBtnRef={submitBtnRef}
    />
  );
}
