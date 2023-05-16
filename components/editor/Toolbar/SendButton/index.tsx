import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";
import { SendButtonProps } from "@/@types/Editor";

export default function SendButton({ tabIndex }: SendButtonProps) {
  return (
    <div className="ml-auto">
      <button
        tabIndex={tabIndex}
        data-tooltip-id="send-button"
        data-tooltip-content="送信する"
        type="button"
        className="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <Icon icon="material-symbols:send" width={18} />
      </button>
      <Tooltip id="send-button" />
    </div>
  );
}
