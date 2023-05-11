import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { useCallback, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Blockquote from "@tiptap/extension-blockquote";
import lowlight from "./highlightLangs/index";
import Toolbar from "./Toolbar";
import Link from "@tiptap/extension-link";
import Modal from "@/components/Modal";
import ReactDOM from "react-dom";

type TipTapProps = {
  channelName: string;
};

let openModal: () => void = () => {};

const CustomLink = Link.extend({
  inclusive: false,
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,
      HTMLAttributes: {
        class:
          "text-blue-600 hover:text-blue-500 visited:text-purple-500 hover:visited:text-purple-400 underline",
      },
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-k": () => {
        openModal();
        return true;
      },
    };
  },
});
const CustomBlockquote = Blockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "pl-4 border-l-4 border-gray-300 dark:border-gray-500",
      },
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.chain().focus().toggleBlockquote().run(),
    };
  },
});

export default function TipTap({ channelName }: TipTapProps) {
  const [content, setContent] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);
  const [textLength, setTextLength] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [showBubble, setShowBubble] = useState<boolean>(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: false,
        bulletList: {
          HTMLAttributes: {
            class: "list-disc",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              "border border-gray-700 box-decoration-clone bg-gray-900 rounded-md text-orange-400 text-sm py-1 px-2",
          },
        },
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: `#${channelName} へのメッセージ`,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      CustomBlockquote,
      CustomLink,
    ],
    content: "",
    autofocus: true,
    onTransaction({ editor }) {
      const { state } = editor;
      setCursor(state.selection.anchor);
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  openModal = () => {
    if (editor) {
      let { from, to } = editor.view.state.selection;

      // リンク付きのテキストの上にカーソルがあり、かつテキストが選択されていない場合の処理
      if (from === to && editor.isActive("link")) {
        editor.commands.setTextSelection({ from: from - 1, to: to - 1 });
        editor.commands.extendMarkRange("link");
        const selection = editor.view.state.selection;
        from = selection.from;
        to = selection.to;
      }

      const text = editor.state.doc.textBetween(from, to, "");
      setText(text);
      setTextLength(to - from);
      setUrl(editor.getAttributes("link").href);
      setShow(true);
    }
  };

  const closeModal = () => {
    setShow(false);
    setUrl("");
    setText("");
    setTextLength(0);
  };

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      closeModal();
    }
  }, [editor, closeModal]);

  const saveLink = useCallback(() => {
    if (editor) {
      if (url) {
        const { view } = editor;
        const { from, to } = view.state.selection;
        const currentTextLength = text.length;

        let modifiedTo: number = 0;
        if (textLength && currentTextLength) {
          if (textLength > currentTextLength) {
            const diff = textLength - currentTextLength;
            modifiedTo = to - diff;
          } else if (textLength < currentTextLength) {
            const diff = currentTextLength - textLength;
            modifiedTo = to + diff;
          }
        }
        // 事前にテキストを選択していて、テキストに変更があった場合
        if (modifiedTo) {
          editor
            .chain()
            .focus()
            .insertContent(text)
            .setTextSelection({ from, to: modifiedTo })
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
          // テキストが事前に選択されていない場合
        } else if (!textLength) {
          const from: number = cursor;
          const to: number = cursor + currentTextLength;
          editor
            .chain()
            .focus()
            .insertContent(text)
            .setTextSelection({ from, to })
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
          // 事前にテキストを選択していて、テキストの変更がない場合
        } else {
          editor
            .chain()
            .focus()
            .insertContent(text)
            .setTextSelection({ from, to })
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        }
      } else {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      }
    }
    closeModal();
  }, [editor, url, textLength, closeModal]);

  if (!editor) return null;

  return (
    <>
      {ReactDOM.createPortal(
        // TODO Bubbleメニューを最前面に、一文字の場合もBubbleが表示されるよう変更
        <BubbleMenu
          className="z-49 flex items-center gap-2"
          editor={editor}
          tippyOptions={{ duration: 150 }}
          shouldShow={({ editor, from, to }) => {
            if (from === to || (to - from) === 0) {
              setShowBubble(true);
            } else {
              setShowBubble(false);
            }
            return (from === to || (to - from) === 0) && editor.isActive("link") && showBubble;
          }}
        >
            <div className="flex flex-col rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between px-4 py-2">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  リンクを編集
                </h3>
                <button type="button" onClick={() => setShowBubble(false)} className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-transparent p-2 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                  <Icon icon="material-symbols:close" width={18} />
                </button>
              </div>
              <div className="overflow-y-auto px-4 pb-2">
                <p className="text-gray-800 dark:text-gray-400">
                  <a className="link" href={editor.getAttributes("link").href}>
                    {editor.getAttributes("link").href}
                  </a>
                </p>
              </div>
              <div className="flex items-center justify-end gap-x-2 px-4 py-2">
                <button
                  onClick={openModal}
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
        </BubbleMenu>,
        document.body
      )}
      <Modal show={show} ModalTitle="リンクを追加する" closeModal={closeModal}>
        <div className="overflow-y-auto p-4">
          <div className="relative mb-4">
            <input
              type="text"
              id="text"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              autoComplete="off"
              autoFocus={text ? false : true}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <label
              htmlFor="text"
              className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform select-none text-gray-500 duration-[160ms] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              テキスト
            </label>
          </div>
          <div className="relative mb-4">
            <input
              type="url"
              id="url"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              autoComplete="off"
              autoFocus={text ? true : false}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <label
              htmlFor="url"
              className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform select-none text-gray-500 duration-[160ms] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              リンク
            </label>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-2 px-4 py-3">
          <button
            type="button"
            onClick={closeModal}
            className="inline-flex items-center justify-center gap-2 truncate rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
          >
            キャンセル
          </button>
          <button
            disabled={url ? false : true}
            className={`inline-flex items-center justify-center gap-2 truncate rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:enabled:bg-green-800 dark:bg-green-600 dark:hover:enabled:bg-green-700 ${
              url ? "" : "cursor-not-allowed"
            }`}
            type="button"
            onClick={saveLink}
          >
            保存する
          </button>
        </div>
      </Modal>
      <div className="sticky w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <Toolbar editor={editor} show={show} openModal={openModal}>
          <div className="relative max-h-[38rem] overflow-auto bg-white text-sm text-gray-800 dark:bg-gray-800 dark:text-white">
            <EditorContent
              editor={editor}
              className="px-3 py-2 dark:text-white"
            />
          </div>
        </Toolbar>
      </div>
    </>
  );
}
