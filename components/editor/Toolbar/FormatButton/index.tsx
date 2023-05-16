import { FormatButtonProps } from "@/@types/Editor";
import { isMacOS } from "@tiptap/core";
import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";

export default function FormatButton({
  editor,
  tooltipText,
  shortcutText,
  formatType,
  onClick,
  iconName,
  open,
}: FormatButtonProps) {
  return (
    <>
      <button
        data-tooltip-id="format-button"
        data-tooltip-html={`${tooltipText}<br />${
          isMacOS() ? shortcutText.forMac : shortcutText.forWin
        }`}
        className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
          editor.isActive(formatType)
            ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
            : ""
        }`}
        onClick={onClick}
      >
        <Icon icon={iconName} width={18} />
      </button>
    {!open && <Tooltip className="text-center" id="format-button" />}
    </>
  );
}
