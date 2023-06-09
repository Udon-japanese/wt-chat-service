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
      <div className="z-15 absolute -top-[96px] flex flex-col rounded-xl border bg-white py-3 dark:border-gray-600 dark:bg-gray-800">
        <ul>
          <li
            onClick={openImgModal}
            className="cursor-pointer py-[0.12rem] hover:bg-blue-500"
          >
            <button className="flex items-center break-keep dark:text-white">
              <Icon icon="mdi:link-variant" className="mr-1" width={18} />
              リンクから画像を添付&nbsp;{isMacOS() ? "⌘+M" : "Ctrl+M"}
            </button>
          </li>
          <li
            onClick={hideImgMenu}
            className="cursor-pointer  hover:bg-blue-500"
          >
            <div
              className="flex py-[0.12rem] items-center break-keep dark:text-white"
              {...getRootProps()}
            >
              <Icon icon="ic:outline-image" className="mr-1" width={18} />
              <input {...getInputProps()} ref={imgInputRef} />
              コンピューターからアップロード&nbsp;
              {isMacOS() ? "⌘+U" : "Ctrl+U"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
