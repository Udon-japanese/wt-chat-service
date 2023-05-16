import { Icon } from "@iconify/react";
import Head from "next/head";
import { Message } from "@/@types/Text/Message";
import Editor from "@/components/editor";
import { useState } from "react";

export default function Home() {
  const [showImgMenu, setShowImgMenu] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>チャット - #general</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      {/* component */}
      <div
        onClick={() => {
          if (showImgMenu) {
            setShowImgMenu(false);
          }
        }}
        className="flex h-screen font-sans antialiased"
      >
        {/* Sidebar / channel list */}
        <div className="hidden flex-none overflow-auto bg-gray-900 pb-6 md:block md:w-[30%] lg:w-[25%]">
          <div className="mb-2 mt-3 flex justify-between px-4 text-white">
            <div className="flex-auto">
              <h1 className="mb-2 truncate text-3xl font-semibold leading-tight">
                Slack(仮)
              </h1>
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between px-4 text-white">
              <div className="opacity-75">チャンネル</div>
              <div>
                <svg
                  className="h-4 w-4 fill-current opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                </svg>
              </div>
            </div>
            <div className="bg-teal-dark px-4 py-1 text-white"># general</div>
          </div>
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between px-4 text-white">
              <div className="opacity-75">ダイレクトメッセージ</div>
              <div>
                <svg
                  className="h-4 w-4 fill-current opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                </svg>
              </div>
            </div>
            <div className="mb-3 flex items-center px-4">
              <span className="mr-2 block h-2 w-2 rounded-full bg-green-500" />
              <span className="text-white opacity-75">
                ダミー1 <span className="text-sm text-gray-400">(自分)</span>
              </span>
            </div>
            <div className="mb-3 flex items-center px-4">
              <span className="mr-2 block h-2 w-2 rounded-full bg-green-500" />
              <span className="text-white opacity-75">ダミー2</span>
            </div>
            <div className="mb-6 flex items-center px-4 opacity-50">
              <span className="mr-2 h-2 w-2 rounded-full border border-white" />
              <span className="text-white">ダミー3</span>
            </div>
          </div>
          <div></div>
        </div>
        {/* Chat content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white">
          {/* Top bar */}
          <div className="flex flex-none items-center border-b border-gray-900 bg-gray-800 px-6 py-2">
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="mr-2 text-white md:hidden">
                  <Icon icon="mdi:hamburger-menu-back" width={24} />
                </div>
                <h3 className="mb-1 font-extrabold text-white">#general</h3>
              </div>
              <div className="truncate text-sm text-white">全体チャンネル</div>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-gray-800 px-6 py-4">
            {repeatMessage(3)}
          </div>
          <div className="flex-none bg-gray-800 px-4 pb-4">
            <Editor
              channelName="general"
              showImgMenu={showImgMenu}
              setShowImgMenu={setShowImgMenu}
            />
          </div>
        </div>
      </div>
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
    const fixedI = ((i - 1) % 3) + 1;
    listArray.push(renderMessage(messages[fixedI], fixedI));
  }

  return listArray;
}
