import type { AuthText } from "@/@types/Text/AuthText";
import Authenticate from "@/components/Form/Authenticate";
import Head from "next/head";

const text: AuthText = {
  head: "ログイン",
  subhead: {
    p: "アカウントがありませんか？",
    link: {
      text: "こちらでサインアップ",
      href: "/signup",
    },
  },
  googleText: "ログイン",
  authBtnText: "ログイン",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <Authenticate {...text} />
    </>
  );
}
