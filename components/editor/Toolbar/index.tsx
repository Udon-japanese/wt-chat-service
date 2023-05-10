import { ReactNode } from "react";
import { Editor, isMacOS } from "@tiptap/react";
import { Icon } from "@iconify/react";

type ToolbarProps = {
  children: ReactNode;
  editor: Editor;
  openModal: () => void;
};

export default function Toolbar({ children, editor, openModal }: ToolbarProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b px-1 py-1 dark:border-gray-600">
        <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
          <div className="flex items-center space-x-1 sm:pr-1">
            <span className="group relative">
              <span className="tooltip">
                太文字
                <br />
                {isMacOS() ? "(⌘+B)" : "(Ctrl+B)"}
              </span>
              <button
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("bold")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Icon icon="material-symbols:format-bold" width={18}></Icon>
              </button>
            </span>
            <span className="group relative">
              <span className="tooltip">
                斜体
                <br />
                {isMacOS() ? "(⌘+I)" : "(Ctrl+I)"}
              </span>
              <button
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("italic")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Icon icon="material-symbols:format-italic" width={18}></Icon>
              </button>
            </span>
            <span className="group relative">
              <span className="tooltip">
                取り消し線
                <br />
                {isMacOS() ? "(⌘+Shift+X)" : "(Ctrl+Shift+X)"}
              </span>
              <button
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("strike")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Icon
                  icon="material-symbols:format-strikethrough"
                  width={18}
                ></Icon>
              </button>
            </span>
          </div>
          <div className="flex flex-wrap items-center space-x-1 sm:pl-1 sm:pr-1">
            <span className="group relative">
              <span className="tooltip">
                リンク
                <br />
                {isMacOS() ? "(⌘+K)" : "(Ctrl+K)"}
              </span>
              <button
                onClick={openModal}
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("link")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
              >
                <Icon icon="mdi:link-variant" width={18}></Icon>
              </button>
            </span>
          </div>
          <div className="flex flex-wrap items-center space-x-1 sm:pl-1 sm:pr-1">
            <span className="group relative">
              <span className="tooltip">
                順序付きリスト
                <br />
                {isMacOS() ? "(⌘+Shift+7)" : "(Ctrl+Shift+7)"}
              </span>
              <button
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("orderedList")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <Icon icon="ri:list-ordered-2" width={18}></Icon>
              </button>
            </span>
            <span className="group relative">
              <span className="tooltip">
                箇条書き
                <br />
                {isMacOS() ? "(⌘+Shift+8)" : "(Ctrl+Shift+8)"}
              </span>
              <button
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("bulletList")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <Icon
                  icon="material-symbols:format-list-bulleted"
                  width={18}
                ></Icon>
              </button>
            </span>
          </div>
          <div className="flex flex-wrap items-center space-x-1 sm:pl-1 sm:pr-1">
            <span className="group relative">
              <span className="tooltip">
                引用タグ
                <br />
                {isMacOS() ? "(⌘+Shift+9)" : "(Ctrl+Shift+9)"}
              </span>
              <button
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("blockquote")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Icon icon="pajamas:quote" width={18}></Icon>
              </button>
            </span>
          </div>
          <div className="flex flex-wrap items-center space-x-1 sm:pl-1">
            <span className="group relative">
              <span className="tooltip">
                コード
                <br />
                {isMacOS() ? "(⌘+E)" : "(Ctrl+E)"}
              </span>
              <button
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("codeBlock")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <Icon icon="ph:code-bold" width={18}></Icon>
              </button>
            </span>
            <span className="group relative">
              <span className="tooltip">
                コードブロック
                <br />
                {isMacOS() ? "(⌘+Option+C)" : "(Ctrl+Alt+C)"}
              </span>
              <button
                className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
                  editor.isActive("codeBlock")
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                    : ""
                }`}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <Icon icon="ph:code-block-bold" width={18}></Icon>
              </button>
            </span>
          </div>
        </div>
      </div>
      {children}
      <div className="flex items-center justify-between border-t px-1 py-1 dark:border-gray-600">
        <div className="ml-auto">
          <span className="group relative">
            <span className="tooltip !top-[-44px]">送信する</span>
            <button
              type="button"
              className="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Icon icon="material-symbols:send" width={18} />
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
