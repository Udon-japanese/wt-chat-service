import type { AuthText } from "@/@types/Auth/Text/Auth/AuthText";
import Authenticate from "@/components/Form/Authenticate";
const text: AuthText = {
  head: "ログイン",
  subhead: {
    p: "アカウントがありませんか？",
    link:{
      text: "こちらでサインアップ",
      href: "/signup"
    },
  },
  googleText: "ログイン",
  authBtnText: "ログイン"
};

export default function Home() {
  return (
    <Authenticate {...text}/>
  );
}
