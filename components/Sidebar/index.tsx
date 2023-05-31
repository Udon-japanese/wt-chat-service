import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { ModalFn } from "@/@types/Modal";
import ChannelModal from "./CreateChannel/ChannelModal";
import useChannels from "@/hooks/useChannels";
import { SidebarProps } from "@/@types/Sidebar";
import { errorToast } from "@/lib/toast";

export default function Sidebar({ currentChannelId }: SidebarProps) {
  // C: Channel
  const [showCModal, setShowCModal] = useState<boolean>(false);
  const [loading, channels] = useChannels();
  
  const { push } = useRouter();

  useEffect(() => {
    if (loading) return;
    const foundChannel = channels.find((c) => c.id === currentChannelId);
    if (!foundChannel && currentChannelId) {
      push("/chat");
      errorToast("チャンネルが見つかりません");
    }
  }, [loading]);

  const openCModal: ModalFn = () => {
    setShowCModal(true);
  };

  return (
    <>
      <div className="hidden flex-none overflow-y-auto bg-gray-900 pb-6 md:block md:w-[30%] lg:w-[25%]">
        <div className="mb-2 mt-3 flex justify-between px-4 text-white">
          <div className="flex-auto">
            <h1 className="mb-2 truncate text-3xl font-semibold leading-tight">
              Slack(仮)
            </h1>
          </div>
        </div>
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between px-4 dark:text-white">
            チャンネル
            <button
              type="button"
              onClick={openCModal}
              data-tooltip-id="create-channel"
              data-tooltip-content="チャンネルを追加"
            >
              <Icon icon="zondicons:add-outline" width={20} />
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div
                className="h-10 w-10 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            channels.map((c, i) => (
              <Link
                key={i}
                href={`/chat/${c.id}`}
                className={`flex cursor-pointer select-none items-center rounded-md px-4 py-1 ${
                  currentChannelId === c.id
                    ? "bg-blue-500 dark:text-white"
                    : "hover:bg-gray-300/10 dark:text-white/75"
                }`}
              >
                <Icon
                  icon="akar-icons:hashtag"
                  className="mr-2 flex-shrink-0"
                  width={15}
                />
                <span className="truncate">{c.name}</span>
              </Link>
            ))
          )}
          <button
            type="button"
            onClick={openCModal}
            className="flex w-full items-center rounded-md px-4 py-1 hover:bg-gray-300/10 dark:text-white"
          >
            <Icon icon="zondicons:add-outline" className="mr-2" width={15} />
            チャンネルを追加する
          </button>
        </div>
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between px-4 text-white">
            <div>ダイレクトメッセージ</div>
            <div></div>
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
      </div>
      <ChannelModal showCModal={showCModal} setShowCModal={setShowCModal} />
    </>
  );
}
