import { useAuthContext } from "./AuthProvider";
import { useRouter } from "next/router";
import { AuthGuardProps } from "@/@types/Auth";
import Loading from "../Loading";
import { errorToast } from "@/lib/toast";

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuthContext();
  const { push } = useRouter();

  if (typeof user === "undefined") {
    return <Loading />;
  }

  if (user === null) {
    push("/signin");
    errorToast("サインインしてください");
    return null;
  }

  if (user && !user.photoURL && !user.displayName) {
    push("/signin");
    return null;
  }

  return <>{children}</>;
}
