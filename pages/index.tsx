import Link from "next/link";

export default function Home() {
  return (
    <div className="my-6 text-center hover:text-blue-400 hover:underline dark:text-white">
      <Link href="/chat">ここからチャットしよう</Link>
    </div>
  );
}
