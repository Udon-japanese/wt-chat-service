import { isMacOS } from "@tiptap/core";
import { Icon } from "@iconify/react";
import { ImgMenuProps } from "@/@types/Editor";

export default function ImgMenu({
  showImgMenu,
  hideImgMenu,
  openImgModal,
  getRootProps,
  getInputProps,
  imgInputRef,
}: ImgMenuProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative ${showImgMenu ? "block" : "hidden"}`}
    >
      <div
        className="z-15 absolute -top-[90px] flex flex-col rounded-xl border bg-white py-2 dark:border-gray-600 dark:bg-gray-800"
      >
        <button
          onClick={openImgModal}
          className="mx-1 flex items-center break-keep py-[0.12rem] hover:bg-blue-500 dark:text-white"
        >
          <Icon icon="mdi:link-variant" className="mr-1" width={18} />
          リンクから画像を添付&nbsp;{isMacOS() ? "⌘+M" : "Ctrl+M"}
        </button>
        <div
          onClick={hideImgMenu}
          className="mx-1 cursor-pointer break-keep py-[0.12rem] hover:bg-blue-500 dark:text-white"
        >
          <div className="flex items-center" {...getRootProps()}>
            <Icon icon="ic:outline-image" className="mr-1" width={18} />
            <input {...getInputProps()} ref={imgInputRef} />
            コンピューターからアップロード&nbsp;
            {isMacOS() ? "⌘+U" : "Ctrl+U"}
          </div>
        </div>
      </div>
    </div>
  );
}
