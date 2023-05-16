import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";
import { ImgButtonProps } from "@/@types/Editor";
import ImgMenu from "./imgMenu";

export default function ImgButton({
  getInputProps,
  getRootProps,
  imgInputRef,
  showImgMenu,
  toggleImgMenu,
  hideImgMenu,
  openImgModal,
  tabIndex,
}: ImgButtonProps) {
  return (
    <>
      <ImgMenu
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        imgInputRef={imgInputRef}
        hideImgMenu={hideImgMenu}
        openImgModal={openImgModal}
        showImgMenu={showImgMenu}
      />
      <div className="ml-1">
        <button
          tabIndex={tabIndex}
          data-tooltip-id="image-upload"
          data-tooltip-content="画像を添付"
          onClick={toggleImgMenu}
          type="button"
          className={`rounded-full p-[0.3rem] transition-transform duration-200 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-500 ${
            showImgMenu
              ? "rotate-45 bg-gray-200 dark:bg-gray-500"
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        >
          <Icon icon="ph:plus" />
        </button>
      </div>
      {!showImgMenu && <Tooltip className="text-center" id="image-upload" />}
    </>
  );
}
