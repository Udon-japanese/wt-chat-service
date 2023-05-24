import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalAuthState, AuthProviderProps } from "@/@types/Auth";

const initialState: GlobalAuthState = {
  user: undefined,
};

const AuthContext = createContext<GlobalAuthState>(initialState);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<GlobalAuthState>(initialState);

  useEffect(() => {
    try {
      const auth = getAuth();
      return onAuthStateChanged(auth, (user) => {
        setUser({
          user,
        });
        console.log(user?.providerData)
      });
    } catch (err) {
      setUser(initialState);
      throw err;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
