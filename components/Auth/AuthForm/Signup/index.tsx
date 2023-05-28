import AuthForm from "..";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebaseAuthError } from "@/lib/firebase/firebase";
import { successToast, errorToast } from "@/lib/toast/error";
import { handleInputChange, handleSubmit } from "@/@types/Form";
import { SignUpProps, AuthFormText } from "@/@types/Auth";

export default function SignUp({
  gettingGoogleInfo,
  setGettingGoogleInfo,
  setDoneEPAuth,
}: SignUpProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const authFormText: AuthFormText = {
    head: "サインアップ",
    subhead: {
      p: "アカウントをお持ちですか？",
      link: {
        content: "サインインはこちら",
        href: "/signin",
      },
    },
    googleAuth: "Google でサインアップ",
    submitBtn: "サインアップ",
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
    try {
      const doubleByteRegex: RegExp = /[^\x00-\x7F]/g;
      if (doubleByteRegex.test(email) || doubleByteRegex.test(password)) {
        throw new Error(
          "メールアドレスまたはパスワードに全角文字を含めることはできません"
        );
      }

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      setEmail("");
      setPassword("");
      successToast("確認メールを送信しました。ご確認ください");
      setDoneEPAuth(true);
    } catch (err: any) {
      let errMessage: string | null = "";
      if (err instanceof FirebaseError) {
        errMessage = firebaseAuthError(err, "signup");
      } else {
        errMessage = err.message;
      }
      if (errMessage) errorToast(errMessage);
      console.error(err);
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
    />
  );
}
