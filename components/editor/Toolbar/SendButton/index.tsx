import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";

export default function SendButton() {
  return (
    <div className="ml-auto">
        <button
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