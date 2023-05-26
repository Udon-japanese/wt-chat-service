import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <form>
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <div className="w-full rounded-lg border border-gray-400 bg-white p-10 dark:border-gray-500 dark:bg-gray-700 md:w-1/2 lg:w-[40%]">
          <p className="mb-6 truncate text-center text-2xl font-extrabold leading-6 text-gray-800 dark:text-gray-300">
            プロフィール設定
          </p>
          <div className="flex flex-row items-center justify-center mb-4 font-medium text-sm leading-none">
            <Icon icon="mingcute:user-4-fill" width={100} />
            <div className="flex flex-col items-center justify-center ml-3">
              <p className="text-gray-800 dark:text-gray-300 mb-4">1MB以下の画像ファイルのみアップロードできます</p>
              <label className="cursor-pointer flex items-center justify-center truncate rounded-lg bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700" htmlFor="user-icon">
                <input className="hidden" type="file" name="user-icon" id="user-icon" />
                <Icon icon="material-symbols:upload" width={18} className="mr-1" />
                アイコンを変更
              </label>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              aria-label="enter display name"
              id="display-name"
              className="peer block w-full appearance-none rounded-md border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-500 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              autoComplete="off"
            />
            <label
              htmlFor="display-name"
              className="absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-[160ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-700 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              表示名
            </label>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className={`mb-2 mr-2 flex w-full items-center justify-center truncate rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white enabled:hover:bg-blue-400 dark:bg-blue-600 enabled:dark:hover:bg-blue-700`}
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
