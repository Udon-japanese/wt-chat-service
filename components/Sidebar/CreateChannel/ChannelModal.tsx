import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDatabase, ref, set } from "firebase/database";
import dayjs from "dayjs";
import Modal from "@/components/Modal";
import { ModalFn } from "@/@types/Modal";
import { ChannelModalProps } from "@/@types/Sidebar";
import { Icon } from "@iconify/react";
import { handleInputChange } from "@/@types/Form";
import { Channel } from "@/@types/Channel";
import { useAuthContext } from "@/components/Auth/AuthProvider";
import { errorToast } from "@/lib/toast";
import { FirebaseError } from "firebase/app";

export default function ChannelModal({
  showCModal,
  setShowCModal,
}: ChannelModalProps) {
  const [channelName, setChannelName] = useState<string>("");
  const [exceedsLimit, setExceedsLimit] = useState<boolean>(false);
  const [hasUserTyped, setHasUserTyped] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (channelName.length > 80) {
      setExceedsLimit(true);
    } else {
      setExceedsLimit(false);
    }

    if (!channelName.length) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [channelName]);

  const closeCModal: ModalFn = () => {
    setHasUserTyped(false);
    setEmpty(false);
    setExceedsLimit(false);
    setChannelName("");
    setShowCModal(false);
  };
  const handleChannelNameChange: handleInputChange = (e) => {
    if (!hasUserTyped) setHasUserTyped(true);
    setChannelName(e.target.value);
  };

  const createChannel: () => void = async () => {
    setLoading(true);
    if (!user) {
      push("/signin");
      errorToast("サインインしてください");
      return;
    }
    try {
      const db = getDatabase();
      const createdAt = dayjs().format();
      const id = crypto.randomUUID();
      const uid = user.uid;
      const channelData: Channel = {
        name: channelName,
        id,
        createdBy: uid,
        createdAt,
        members: uid,
      };
      await set(ref(db, `channels/${id}`), channelData);
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err);
      }
    }
    setLoading(false);
    closeCModal();
  };

  return (
    <Modal show={showCModal} closeModal={closeCModal}>
      <div className="flex max-h-full flex-col overflow-hidden rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="my-1 truncate text-2xl font-bold text-gray-800 dark:text-white">
            チャンネルを作成する
          </h3>
          <button
            onClick={closeCModal}
            className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-transparent p-2 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <Icon icon="material-symbols:close" width={25} />
          </button>
        </div>
        <div className="p-4">
          <div className="relative mb-2">
            <Icon
              icon="akar-icons:hashtag"
              className="absolute left-3 top-4 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              id="channel-name"
              value={channelName}
              onChange={handleChannelNameChange}
              className={`peer block w-full appearance-none rounded-md border bg-transparent pb-2.5 pl-9 pr-16 pt-4 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:text-white ${
                exceedsLimit || (empty && hasUserTyped)
                  ? "border-red-600 dark:border-red-500"
                  : "border-gray-300 focus:border-blue-600 dark:border-gray-500 dark:focus:border-blue-500"
              }`}
              placeholder=" "
              autoComplete="off"
              autoFocus
            />
            <label
              htmlFor="channel-name"
              className={`absolute left-8 top-2 z-10 origin-[0] -translate-x-6 -translate-y-4 scale-75 transform select-none bg-white px-2 text-sm duration-[160ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-x-6 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-800 ${
                exceedsLimit || (empty && hasUserTyped)
                  ? "text-red-600 dark:text-red-500"
                  : "text-gray-500 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              }`}
            >
              チャンネル名
            </label>
            <p
              className={`absolute right-3 top-3 ${
                exceedsLimit
                  ? "text-red-600 dark:text-red-500"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {80 - channelName.length}
            </p>
          </div>
          {exceedsLimit && (
            <p className="mt-2 flex flex-row text-sm text-red-600 dark:text-red-500">
              <Icon icon="carbon:warning" className="mr-1" width={18} />
              チャンネル名は80文字以下で入力してください
            </p>
          )}
          {empty && hasUserTyped && (
            <p className="mt-2 flex flex-row text-sm text-red-600 dark:text-red-500">
              <Icon
                icon="carbon:warning"
                className="mr-1 flex-shrink-0"
                width={18}
              />
              チャンネル名を設定してください。名前は後から変更できます
            </p>
          )}
        </div>
        <div className="flex items-center justify-end gap-x-2 px-4 py-3">
          <button
            type="button"
            onClick={closeCModal}
            className="inline-flex items-center justify-center gap-2 truncate rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
          >
            キャンセル
          </button>
          <button
            disabled={exceedsLimit || empty ? true : false}
            className={`inline-flex items-center justify-center gap-2 truncate rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${
              exceedsLimit || empty
                ? "cursor-not-allowed bg-green-900"
                : "cursor-pointer bg-green-700 hover:enabled:bg-green-800 dark:bg-green-600 dark:hover:enabled:bg-green-700"
            }`}
            type="button"
            onClick={createChannel}
          >
            {loading ? (
              <div
                className="h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "保存"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
