import { BubbleMenu } from "@tiptap/react";
import { LinkBubbleProps } from "@/@types/Editor";

export default function LinkBubble({
  editor,
  openLinkModal,
  removeLink,
}: LinkBubbleProps) {
  return (
    <BubbleMenu
      className="flex items-center"
      editor={editor}
      tippyOptions={{ duration: 150 }}
      shouldShow={({ editor, from, to }) => {
        // 2文字以上でテキストを選択していない(カーソルがある)または一文字の場合表示
        return (from === to || to - from === 1) && editor.isActive("link");
      }}
    >
      <div className="flex flex-col rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between px-4 pb-2 pt-3">
          <h3 className="font-bold text-gray-800 dark:text-white">
            リンクを編集
          </h3>
        </div>
        <div className="overflow-y-auto px-4 pb-2">
          <p className="text-gray-800 dark:text-gray-400">
            <a
              className="link"
              href={editor.getAttributes("link").href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {editor.getAttributes("link").href}
            </a>
          </p>
        </div>
        <div className="flex items-center justify-end gap-x-2 px-4 py-2">
          <button
            onClick={openLinkModal}
            type="button"
            className="inline-flex items-center justify-center gap-2 truncate rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
          >
            編集
          </button>
          <button
            onClick={removeLink}
            type="button"
            className="inline-flex items-center justify-center gap-2 truncate rounded-md border border-transparent bg-red-700 px-2 py-1 text-sm font-medium text-white hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700"
          >
            削除する
          </button>
        </div>
      </div>
    </BubbleMenu>
  );
}
