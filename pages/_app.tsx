import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer } from "react-toastify";
import { initializeFirebaseApp } from "@/lib/firebase/firebase";
import AuthProvider from "@/components/Auth/AuthProvider";
import { CookiesProvider } from "react-cookie";

initializeFirebaseApp();
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ToastContainer />
      <CookiesProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}
