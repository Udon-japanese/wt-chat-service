import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  getAdditionalUserInfo,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { firebaseAuthError } from "@/lib/firebase/firebase";
import { errorToast, successToast } from "@/lib/toast/error";
import { AuthFormProps } from "@/@types/Auth";

export default function AuthForm({
  text,
  handleSubmit,
  gettingGoogleInfo,
  setGettingGoogleInfo,
  email,
  handleEmailChange,
  password,
  handlePasswordChange,
  submitting,
}: AuthFormProps) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { push } = useRouter();
  const {head, subhead, googleAuth, forgotPassword, submitBtn} = text;
  const {p: subP, link: subLink} = subhead;

  useEffect(() => {
    emailInputRef.current?.focus();
  }, [gettingGoogleInfo]);

  useEffect(() => {
    setGettingGoogleInfo(true);
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        if (!result) return;
        const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
        let message = "サインアップが完了しました";
        if (!isNewUser) message = "サインインしました";
        successToast(message);
        push("/");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setGettingGoogleInfo(false);
      });
  }, []);

  const toggleShowPassword: () => void = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleGoogleAuth: () => void = async () => {
    try {
      const auth = getAuth();
      signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errMessage = firebaseAuthError(err, "signup");
        if (errMessage) errorToast(errMessage);
        push("/signup");
      }
    }
  };

  return (
    <>
      <Head>
        <title>{head}</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="w-full rounded-lg border border-gray-400 bg-white p-10 dark:border-gray-500 dark:bg-gray-700 md:w-1/2 lg:w-[40%]">
            <p className="truncate text-center text-2xl font-extrabold leading-6 text-gray-800 dark:text-gray-300">
              {head}
            </p>
            <div className="text-sm font-medium leading-none mt-2">
              <div className="flex items-center justify-center">
                <span className="mr-1 truncate text-gray-500 dark:text-gray-300">
                  {subP}
                </span>
                <Link
                  className="cursor-pointer truncate rounded px-1 py-1.5 text-blue-600 no-underline hover:bg-blue-400 hover:bg-opacity-10 dark:text-blue-500"
                  href={subLink.href}
                >
                  {subLink.content}
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
                {googleAuth}
              </p>
            </button>
            <div className="flex w-full items-center justify-between py-5">
              <div className="h-0.5 w-full bg-gray-400" />
              <p className="break-keep px-2.5 text-base font-medium leading-4 text-gray-300">
                あるいは
              </p>
              <div className="h-0.5 w-full bg-gray-400" />
            </div>
            <div className="relative mt-4">
              <input
                ref={emailInputRef}
                value={email}
                onChange={handleEmailChange}
                type="email"
                aria-label="enter email address"
                id="email"
                className="peer block w-full appearance-none rounded-md border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-500 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-[160ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-700 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                メールアドレス
              </label>
            </div>
            <div className="relative mt-4 flex items-center justify-center">
              <input
                value={password}
                onChange={handlePasswordChange}
                type={showPassword ? "text" : "password"}
                aria-label="enter Password"
                id="password"
                className="peer block w-full appearance-none rounded-md border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-500 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-[160ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-700 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                パスワード
              </label>
              <div className="absolute right-0 mr-3 mt-2 cursor-pointer">
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
            {forgotPassword && <div className="mt-2 text-xs font-medium leading-none">
              <div className="flex items-center justify-center">
                <p className="mr-1 truncate text-gray-500 dark:text-gray-300">
                  {forgotPassword.p}
                </p>
                <Link
                  className="cursor-pointer truncate rounded px-1 py-1.5 text-blue-600 no-underline hover:bg-blue-400 hover:bg-opacity-10 dark:text-blue-500"
                  href={forgotPassword.link.href}
                >
                  {forgotPassword.link.content}
                </Link>
              </div>
            </div>}
            <div className="mt-8">
              <button
                type="submit"
                disabled={submitting ? true : false}
                className={`flex w-full items-center justify-center truncate rounded-lg px-5 py-2.5 text-sm font-medium text-white enabled:hover:bg-blue-400 enabled:dark:hover:bg-blue-700 ${
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
                  submitBtn
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
