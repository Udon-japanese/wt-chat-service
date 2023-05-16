import { Icon } from "@iconify/react";
import { isMacOS } from "@tiptap/core";
import { Tooltip } from "react-tooltip";
import { ImgUploadButtonProps, ModalFn } from "@/@types/Editor";

export default function ImgUploadButton({
  getInputProps,
  getRootProps,
  imageInputRef,
  open,
  setOpen,
  hideImgButton,
  openImgModal,
}: ImgUploadButtonProps) {

  return (
    <>
      <div onClick={() => setOpen(!open)}>
        {open && (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div
              onClick={hideImgButton}
              className="z-15 absolute -top-[77px] flex flex-col rounded-xl border bg-white p-2 dark:border-gray-600 dark:bg-gray-800"
            >
              <button
                onClick={openImgModal}
                className="mx-1 flex items-center break-keep py-[0.12rem] hover:bg-blue-500 dark:text-white"
              >
                <Icon icon="mdi:link-variant" className="mr-1" width={18} />
                リンクから画像を添付&nbsp;{isMacOS() ? "⌘+M" : "Ctrl+M"}
              </button>
              <div
                onClick={hideImgButton}
                className="mx-1 cursor-pointer break-keep py-[0.12rem] hover:bg-blue-500 dark:text-white"
              >
                <div className="flex items-center" {...getRootProps()}>
                  <Icon icon="ic:outline-image" className="mr-1" width={18} />
                  <input {...getInputProps()} ref={imageInputRef} />
                  コンピューターからアップロード&nbsp;
                  {isMacOS() ? "⌘+U" : "Ctrl+U"}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="ml-1">
          <button
            data-tooltip-id="image-upload"
            data-tooltip-content="画像を添付"
            onClick={() => {
              setOpen(!open);
            }}
            type="button"
            className={`rounded-full bg-gray-300 p-[0.3rem] transition-transform duration-200 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 ${
              open ? "rotate-45 bg-gray-200 dark:bg-gray-500" : ""
            }`}
          >
            <Icon icon="ph:plus" />
          </button>
        </div>
      </div>
      {!open && <Tooltip className="text-center" id="image-upload" />}
    </>
  );
}
