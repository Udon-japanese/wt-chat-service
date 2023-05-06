import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { initializeFirebaseApp } from "@/lib/firebase/firebase";
initializeFirebaseApp();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Slack風</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
