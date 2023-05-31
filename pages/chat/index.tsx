import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import useChannels from "@/hooks/useChannels";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  onChildAdded,
  limitToFirst,
} from "firebase/database";
import Loading from "@/components/Loading";

export default function Home() {
  const [loading, channels] = useChannels();
  const [cs, setCookie, removeCookie] = useCookies(["lastAccess"]);
  const cookies = cs as { [x: string]: string };
  const { push } = useRouter();

  useEffect(() => {
    if (loading) return;
    const lastAccess = cookies.lastAccess;
    const foundChannel = channels.find((c) => c.id === lastAccess);
    if (lastAccess && foundChannel) {
      push(`/chat/${lastAccess}`);
    } else {
      removeCookie("lastAccess");
      const db = getDatabase();
      const oldestChannel = query(
        ref(db, "channels"),
        orderByChild("createdAt"),
        limitToFirst(1)
      );
      onChildAdded(oldestChannel, (snapshot) => {
        const c = snapshot.val();
        push(`/chat/${c.id}`);
      });
    }
  }, [loading]);

  return <Loading />;
}
