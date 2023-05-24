import Head from "next/head";

export default function Loading() {
  return (
    <>
      <Head>
        <title>読み込み中...</title>
      </Head>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className="h-16 w-16 animate-spin rounded-full border-[3px] border-current border-t-transparent dark:text-white"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}
