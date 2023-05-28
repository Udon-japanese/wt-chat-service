import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { handleInputChange, handleSubmit } from "@/@types/Form";
import {
  getAuth,
  sendPasswordResetEmail,
  ActionCodeSettings,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { errorToast, successToast } from "@/lib/toast";
import { firebaseAuthError } from "@/lib/firebase/firebase";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const { push } = useRouter();

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const handleEmailChange: handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit: handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const doubleByteRegex: RegExp = /[^\x00-\x7F]/g;
      if (doubleByteRegex.test(email)) {
        throw new Error("メールアドレスに全角文字を含めることはできません");
      }

      const auth = getAuth();
      const actionCodeSettings: ActionCodeSettings = {
        url: "http://localhost:3000/signin",
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setEmail("");
      successToast("パスワード再設定用メールを送信しました。ご確認ください");
      push("/signin");
    } catch (err: any) {
      let errMessage: string | null = null;
      if (err instanceof FirebaseError) {
        errMessage = firebaseAuthError(err, "");
      } else {
        errMessage = err.message;
      }
      if (errMessage) {
        errorToast(errMessage);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>パスワードをリセット</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="w-full rounded-lg border border-gray-400 bg-white p-10 dark:border-gray-500 dark:bg-gray-700 md:w-1/2 lg:w-[40%]">
            <p className="truncate text-center text-2xl font-extrabold leading-6 text-gray-800 dark:text-gray-300">
              パスワードをリセット
            </p>
            <div className="mb-4 mt-2 text-sm font-medium leading-none">
              <div className="flex items-center justify-center truncate">
                <span className="mr-1 text-gray-500 dark:text-gray-300">
                  既にアカウントをお持ちですか？
                </span>
                <Link
                  className="cursor-pointer rounded px-1 py-1.5 text-blue-600 no-underline hover:bg-blue-400 hover:bg-opacity-10 dark:text-blue-500"
                  href="/signin"
                >
                  サインインはこちら
                </Link>
              </div>
            </div>
            <div className="relative">
              <input
                ref={emailInputRef}
                value={email}
                onChange={handleEmailChange}
                type="email"
                aria-label="enter email address"
                id="email"
                className="peer block w-full appearance-none rounded-md border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-500 dark:text-white dark:focus:border-blue-500"
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
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading ? true : false}
                className={`mb-2 mr-2 flex w-full items-center justify-center truncate rounded-lg px-5 py-2.5 text-sm font-medium text-white enabled:hover:bg-blue-400 enabled:dark:hover:bg-blue-700 ${
                  loading
                    ? "cursor-not-allowed bg-blue-800"
                    : "bg-blue-700 dark:bg-blue-600"
                }`}
              >
                {loading ? (
                  <div
                    className="h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "送信"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
