import Link from "next/link";
import AuthGuard from "@/components/Auth/AuthGuard";
import { signOut, getAuth } from "firebase/auth";
import { useAuthContext } from "@/components/Auth/AuthProvider";
import { FirebaseError } from "firebase/app";

export default function Home() {
  const { user } = useAuthContext();

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err);
      }
    }
  };

  return (
    <AuthGuard>
      <div className="my-6 text-center hover:text-blue-400 hover:underline dark:text-white">
        <Link href="/chat">ここからチャットしよう</Link>
      </div>
      {user ? (
        <button
          onClick={handleSignOut}
          className="mb-2 ml-3 rounded-lg bg-purple-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          サインアウト
        </button>
      ) : (
        <p>サインアウト中</p>
      )}
    </AuthGuard>
  );
}
