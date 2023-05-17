import type { AuthText } from "@/@types/Text/AuthText";
import Authenticate from "@/components/AuthForm";
import Head from "next/head";

const text: AuthText = {
  head: "サインアップ",
  subhead: {
    p: "既にアカウントをお持ちですか？",
    link: {
      text: "こちらでログイン",
      href: "/login",
    },
  },
  googleText: "サインアップ",
  authBtnText: "サインアップ",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>サインアップ</title>
      </Head>
      <Authenticate {...text} />
    </>
  );
}
