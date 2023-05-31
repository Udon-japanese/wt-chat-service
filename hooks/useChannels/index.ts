import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
import { Channel } from "@/@types/Channel";

export default function useChannels(): [boolean, Channel[]] {
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "channels");

    // Set up listener for new channels
    const unsubscribeAdded = onChildAdded(dbRef, (snapshot) => {
        const channel = snapshot.val();
        setChannels((prev) => [...prev, channel]);
        if (loading) setLoading(false);
    });

    // Set up listener for updated channels
    const unsubscribeChanged = onChildChanged(dbRef, (snapshot) => {
      const updatedChannel = snapshot.val();
      setChannels((prev) =>
        prev.map((channel) =>
          channel.id === updatedChannel.id ? updatedChannel : channel
        )
      );
    });

    // Set up listener for removed channels
    const unsubscribeRemoved = onChildRemoved(dbRef, (snapshot) => {
      const removedChannelId = snapshot.key;
      setChannels((prev) =>
        prev.filter((channel) => channel.id !== removedChannelId)
      );
    });

    // Clean up listeners
    return () => {
      unsubscribeAdded();
      unsubscribeChanged();
      unsubscribeRemoved();
    };
  }, []);

  return [loading, channels];
}
