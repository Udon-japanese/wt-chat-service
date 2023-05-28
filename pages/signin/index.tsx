import { useState } from "react";
import Loading from "@/components/Loading";
import SignIn from "@/components/Auth/AuthForm/Signin";
import ProfileSetting from "@/components/Auth/AuthForm/ProfileSetting";
import { useAuthContext } from "@/components/Auth/AuthProvider";

export default function Home() {
  const { user } = useAuthContext();
  // EP: email/password
  const [doneEPAuth, setDoneEPAuth] = useState<boolean>(false);
  const [gettingGoogleInfo, setGettingGoogleInfo] = useState<boolean>(false);

  if (gettingGoogleInfo) {
    return <Loading />;
  }

  if (!doneEPAuth) {
    return (
      <SignIn
        gettingGoogleInfo={gettingGoogleInfo}
        setGettingGoogleInfo={setGettingGoogleInfo}
        setDoneEPAuth={setDoneEPAuth}
      />
    );
  } else if (user && !(user.displayName && user.photoURL)) {
    return <ProfileSetting gettingGoogleInfo={gettingGoogleInfo} />;
  }
}
