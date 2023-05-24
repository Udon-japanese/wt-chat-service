import Head from "next/head";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import { handleInputChange, handleSubmit } from "@/@types/Form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  getAdditionalUserInfo,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { errorToast, successToast } from "@/lib/toast/error";
import { firebaseAuthError } from "@/lib/firebase/firebase";
import Loading from "@/components/Loading";

export default function Home() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [icon, setIcon] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [gettingGoogleInfo, setGettingGoogleInfo] = useState<boolean>(false);
  // EP: email/password
  const [doneEPAuth, setDoneEPAuth] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const toggleShowPassword: () => void = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleEmailChange: handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange: handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDisplayNameChange: handleInputChange = (e) => {
    setDisplayName(e.target.value);
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

  const handleGoogleAuth: () => void = async () => {
    try {
      const auth = getAuth();
      signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errMessage = firebaseAuthError(err, "signup");
        if (errMessage) errorToast(errMessage);
      }
    }
  };

  useEffect(() => {
    setGettingGoogleInfo(true);
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        if (!result) return;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        let message = "サインアップが完了しました";
        if (!isNewUser) message = "サインインしました";
        successToast(message);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setGettingGoogleInfo(false);
      });
  }, []);

  if (gettingGoogleInfo) {
    return <Loading />;
  }

  if (!doneEPAuth) {
    return (
      <>
        <Head>
          <title>サインアップ</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 flex flex-col items-center justify-center">
            <div className="w-full rounded-lg border border-gray-400 bg-white p-10 dark:border-gray-500 dark:bg-gray-700 md:w-1/2 lg:w-[40%]">
              <p className="truncate text-center text-2xl font-extrabold leading-6 text-gray-800 dark:text-gray-300">
                サインアップ
              </p>
              <div className="text-sm font-medium leading-none">
                <div className="mt-7 flex items-center justify-center">
                  <span className="mr-1 truncate text-gray-500 dark:text-gray-300">
                    アカウントをお持ちですか？
                  </span>
                  <Link
                    className="cursor-pointer truncate rounded px-1 py-1.5 text-blue-600 no-underline hover:bg-blue-400 hover:bg-opacity-10 dark:text-blue-500"
                    href="/signin"
                  >
                    サインインはこちら
                  </Link>
                </div>
              </div>
              <button
                onClick={handleGoogleAuth}
                aria-label="Continue with google"
                type="button"
                className="mb-4 mt-7 flex w-full items-center rounded-lg border border-gray-300 bg-transparent px-4 py-3.5 enabled:hover:bg-gray-300 dark:border-gray-500 enabled:dark:hover:bg-gray-800"
              >
                <Icon icon="flat-color-icons:google" width={21}></Icon>
                <p className="mr-3 flex-1 truncate text-center text-base font-medium text-gray-700 dark:text-gray-300">
                  Google でサインアップ
                </p>
              </button>
              <div className="flex w-full items-center justify-between py-5">
                <div className="h-0.5 w-full bg-gray-400"></div>
                <p className="break-keep px-2.5 text-base font-medium leading-4 text-gray-300">
                  あるいは
                </p>
                <div className="h-0.5 w-full bg-gray-400"></div>
              </div>
              <div className="relative mt-4">
                <input
                  ref={emailInputRef}
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  aria-label="enter email address"
                  id="email"
                  className="border peer block w-full appearance-none rounded-md border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-500 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-[160ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-700 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  メールアドレス
                </label>
              </div>
              <div className="relative mt-6 flex items-center justify-center">
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  type={showPassword ? "text" : "password"}
                  aria-label="enter Password"
                  id="password"
                  className="border peer block w-full appearance-none rounded-md border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-500 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  htmlFor="password"
                  className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-[160ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-700 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  パスワード
                </label>
                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="hover:text-white dark:text-gray-300"
                  >
                    <Icon
                      icon={showPassword ? "bi:eye-slash-fill" : "bi:eye-fill"}
                      width={20}
                    ></Icon>
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitting ? true : false}
                  className={`mb-2 mr-2 flex w-full items-center justify-center truncate rounded-lg px-5 py-2.5 text-sm font-medium text-white enabled:hover:bg-blue-400 enabled:dark:hover:bg-blue-700 ${
                    submitting
                      ? "cursor-not-allowed bg-blue-800"
                      : "bg-blue-700 dark:bg-blue-600"
                  }`}
                >
                  {submitting ? (
                    <div
                      className="h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "サインアップ"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>サインアップ - プロフィール設定</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 flex flex-col items-center justify-center">
            <div className="w-full rounded-lg border border-gray-400 bg-white p-10 dark:border-gray-500 dark:bg-gray-700 md:w-1/2 lg:w-[40%]">
              <p className="truncate text-center text-2xl font-extrabold leading-6 text-gray-800 dark:text-gray-300 mb-7">
                プロフィール設定
              </p>
              <div className="relative">
                <input
                  value={displayName}
                  onChange={handleDisplayNameChange}
                  type="text"
                  aria-label="enter display name"
                  id="display-name"
                  className="border peer block w-full appearance-none rounded-md border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-500 dark:text-white dark:focus:border-blue-500"
                  placeholder=" "
                  autoComplete="off"
                />
                <label
                  htmlFor="display-name"
                  className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-[160ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-700 dark:text-gray-400 peer-focus:dark:text-blue-500"
                >
                  表示名
                </label>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={submitting ? true : false}
                  className={`mb-2 mr-2 flex w-full items-center justify-center truncate rounded-lg px-5 py-2.5 text-sm font-medium text-white enabled:hover:bg-blue-400 enabled:dark:hover:bg-blue-700 ${
                    submitting
                      ? "cursor-not-allowed bg-blue-800"
                      : "bg-blue-700 dark:bg-blue-600"
                  }`}
                >
                  {submitting ? (
                    <div
                      className="h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "保存する"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}
