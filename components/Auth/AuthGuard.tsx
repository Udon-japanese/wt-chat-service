import { useAuthContext } from "./AuthProvider";
import { useRouter } from "next/router";
import { AuthGuardProps } from "@/@types/Auth";
import Loading from "../Loading";

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuthContext();
  const { push } = useRouter();

  if (typeof user === "undefined") {
    return <Loading />;
  }

  if (user === null) {
    push("/signin");
    return null;
  }

  return <>{children}</>;
}
