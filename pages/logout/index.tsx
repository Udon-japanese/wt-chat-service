import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  return (
    <input
              type="url"
              id="url"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              autoComplete="off"
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
  );
}
