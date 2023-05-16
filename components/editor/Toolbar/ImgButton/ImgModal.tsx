import Modal from "@/components/Modal";
import { Icon } from "@iconify/react";
import { ImgModalProps } from "@/@types/Editor";

export default function ImgModal({
  showImgModal,
  closeImgModal,
  imgUrl,
  setImgUrl,
  saveImageByUrl,
}: ImgModalProps) {
  return (
    <Modal show={showImgModal} closeModal={closeImgModal}>
        <div className="flex max-h-full flex-col overflow-hidden rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 className="my-1 truncate text-2xl font-bold text-gray-800 dark:text-white">
              リンクから画像を添付
            </h3>
            <button
              onClick={closeImgModal}
              className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-transparent p-2 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Icon icon="material-symbols:close" width={25} />
            </button>
          </div>
          <div className="overflow-y-auto p-4">
            <div className="relative mb-4">
              <input
                type="url"
                id="url"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                placeholder=" "
                autoComplete="off"
                autoFocus
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <label
                htmlFor="url"
                className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform select-none text-gray-500 duration-[160ms] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                リンク
              </label>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-2 px-4 py-3">
            <button
              type="button"
              onClick={closeImgModal}
              className="inline-flex items-center justify-center gap-2 truncate rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
            >
              キャンセル
            </button>
            <button
              disabled={imgUrl ? false : true}
              className={`inline-flex items-center justify-center gap-2 truncate rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:enabled:bg-green-800 dark:bg-green-600 dark:hover:enabled:bg-green-700 ${
                imgUrl ? "" : "cursor-not-allowed !bg-green-900"
              }`}
              type="button"
              onClick={saveImageByUrl}
            >
              添付する
            </button>
          </div>
        </div>
      </Modal>
  );
}