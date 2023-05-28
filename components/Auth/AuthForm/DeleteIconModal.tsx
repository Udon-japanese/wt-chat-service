import Modal from "../../Modal";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { DeleteIconModalProps } from "@/@types/Auth";

export default function DeleteIconModal({
  showIconModal,
  closeIconModal,
  iconURL,
  deleteUserIcon,
}: DeleteIconModalProps) {
  return (
    <Modal show={showIconModal} closeModal={closeIconModal}>
      <div className="flex max-h-full flex-col overflow-hidden rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="my-1 truncate text-2xl font-bold text-gray-800 dark:text-white">
            プロフィール画像を削除
          </h3>
          <button
            onClick={closeIconModal}
            className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-transparent p-2 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <Icon icon="material-symbols:close" width={25} />
          </button>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center px-6 sm:px-28">
          <Image
            className="aspect-square h-full w-48 rounded-md object-cover"
            src={iconURL}
            alt="user-icon"
            width={1000}
            height={1000}
          />
          <p className="mt-6 font-medium text-gray-800 dark:text-white">
            本当に写真を削除しますか？代わりに、デフォルトのアイコン画像が使われます。
          </p>
        </div>
        <div className="flex items-center justify-end gap-x-2 px-4 py-3">
          <button
            type="button"
            onClick={closeIconModal}
            className="inline-flex items-center justify-center gap-2 truncate rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
          >
            キャンセル
          </button>
          <button
            tabIndex={-1}
            className={`inline-flex items-center justify-center gap-2 truncate rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:enabled:bg-red-800 dark:bg-red-600 dark:hover:enabled:bg-red-700`}
            type="button"
            onClick={deleteUserIcon}
          >
            アイコンを削除
          </button>
        </div>
      </div>
    </Modal>
  );
}
