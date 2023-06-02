import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";
import { useAuthContext } from "@/components/Auth/AuthProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import { Message } from "@/@types/Message/Message";
import Editor from "@/components/Editor";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import Sidebar from "@/components/Sidebar";
import useChannels from "@/hooks/useChannels";

export default function Home() {
  const [showImgMenu, setShowImgMenu] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>("");
  const [loading, channels] = useChannels();
  const [cs, setCookie, removeCookie] = useCookies(["lastAccess"]);
  const cookies = cs as { [x: string]: string };

  const { user } = useAuthContext();
  const router = useRouter();
  const { push } = router;
  const { channelId: cId } = router.query;
  const channelId = cId as string | undefined;

  useEffect(() => {
    if (!channelId) return;
    const now = new Date();
    const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    setCookie("lastAccess", channelId, { path: "/", expires });
  }, [channelId]);

  useEffect(() => {
    if (loading) return;
    const foundChannel = channels.find((c) => c.id === channelId);
    if (foundChannel) setChannelName(foundChannel.name);
  }, [channelId, loading]);

  const hideImgMenu: () => void = () => {
    if (showImgMenu) {
      setShowImgMenu(false);
    }
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{`チャット${channelName ? ` - ${channelName}` : ""}`}</title>
      </Head>
      {/* component */}
      <div
        onClick={hideImgMenu}
        className="flex h-screen font-sans antialiased"
      >
        {/* Sidebar / channel list */}
        <Sidebar currentChannelId={channelId} />
        {/* Chat content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
          {/* Top bar */}
          {/* <div className="flex flex-none items-center justify-end border-b border-gray-600 bg-gray-800 px-6 py-2">
            <div className="flex items-center">
              {user?.photoURL && <img src={user.photoURL} className="aspect-square h-full w-64 rounded-md object-cover" />}
            </div>
          </div> */}
          <div className="flex flex-none items-center border-b border-gray-600 bg-gray-800 px-6 py-2">
            <div className="flex flex-col">
              <div className="flex items-center">
                <button type="button" className="mr-2 text-white md:hidden">
                  <Icon icon="mdi:hamburger-menu-back" width={24} />
                </button>
                <h3 className="mb-1 font-extrabold text-white">
                  {channelName ? `#${channelName}` : ""}
                </h3>
              </div>
              <div className="truncate text-sm text-white">説明</div>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-gray-800 px-6 py-4">
            {repeatMessage(40)}
          </div>
          <div className="flex-none bg-gray-800 px-4 pb-4">
            <Editor
              channelName={channelName}
              showImgMenu={showImgMenu}
              setShowImgMenu={setShowImgMenu}
            />
          </div>
        </div>
      </div>
      <Tooltip id="create-channel" />
    </>
  );
}

function renderMessage(message: Message, i: number) {
  return (
    <div key={i}>
      <div className="mb-4 flex items-start text-sm">
        <img src={message.userIcon} className="mr-3 h-10 w-10 rounded" />
        <div className="flex-1 overflow-hidden">
          <div>
            <span className="font-bold text-white">{message.user}</span>
            <span className="text-xs text-white"> {message.postedAt}</span>
          </div>
          <p className="leading-normal text-white">{message.messageBody}</p>
        </div>
      </div>
    </div>
  );
}

function repeatMessage(n: number): JSX.Element[] {
  const messages: Message[] = [
    {
      user: "ダミー1",
      userIcon: "/1.png",
      postedAt: "11:46",
      messageBody: "明日はどこへ行きましょうか？",
    },
    {
      user: "ダミー2",
      userIcon: "/2.png",
      postedAt: "11:46",
      messageBody: "水族館はどうですか？",
    },
    {
      user: "ダミー3",
      userIcon: "/3.png",
      postedAt: "11:46",
      messageBody: "いいですね！",
    },
  ];
  const listArray: JSX.Element[] = [];
  for (let i = 0; i < n; i++) {
    const fixedI = i % 3;
    listArray.push(renderMessage(messages[fixedI], i));
  }

  return listArray;
}
