import { useState } from "react";
import Loading from "@/components/Loading";
import SignUp from "@/components/Auth/AuthForm/Signup";
import ProfileSetting from "@/components/Auth/AuthForm/ProfileSetting";

export default function Home() {
  // EP: email/password
  const [doneEPAuth, setDoneEPAuth] = useState<boolean>(false);
  const [gettingGoogleInfo, setGettingGoogleInfo] = useState<boolean>(false);

  if (gettingGoogleInfo) {
    return <Loading />;
  }

  if (!doneEPAuth) {
    return (
      <SignUp
        gettingGoogleInfo={gettingGoogleInfo}
        setGettingGoogleInfo={setGettingGoogleInfo}
        setDoneEPAuth={setDoneEPAuth}
      />
    );
  } else {
    return <ProfileSetting doneEPAuth={doneEPAuth} />;
  }
}
