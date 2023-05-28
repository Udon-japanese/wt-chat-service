import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import SignIn from "@/components/Auth/AuthForm/Signin";
import ProfileSetting from "@/components/Auth/AuthForm/ProfileSetting";
import { useAuthContext } from "@/components/Auth/AuthProvider";
import { warningToast } from "@/lib/toast";

export default function Home() {
  const { user } = useAuthContext();
  // EP: email/password
  const [doneEPAuth, setDoneEPAuth] = useState<boolean>(false);
  const [gettingGoogleInfo, setGettingGoogleInfo] = useState<boolean>(false);

  useEffect(() => {
    if (
      (user && !(user.displayName && user.photoURL)) ||
      (doneEPAuth && user && !(user.displayName && user.photoURL))
    ) {
      warningToast("プロフィール設定を完了してください");
    }
  }, [user, doneEPAuth]);

  if (gettingGoogleInfo) {
    return <Loading />;
  }
  if (
    (user && !(user.displayName && user.photoURL)) ||
    (doneEPAuth && user && !(user.displayName && user.photoURL))
  ) {
    return <ProfileSetting doneEPAuth={doneEPAuth} />;
  } else if (!doneEPAuth) {
    return (
      <SignIn
        gettingGoogleInfo={gettingGoogleInfo}
        setGettingGoogleInfo={setGettingGoogleInfo}
        setDoneEPAuth={setDoneEPAuth}
      />
    );
  }
}
