import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Blockquote from "@tiptap/extension-blockquote";
import lowlight from "./CodeBlock/highlightLangs";
import Link from "@tiptap/extension-link";
import { Extensions } from "@tiptap/react";
import { CustomImage } from "./Image";
import { openModal } from "..";
import { GetTipTapExtensions } from "@/@types/Editor";

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
        class: "pl-3 border-l-4 border-gray-300 dark:border-gray-500",
      },
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.chain().focus().toggleBlockquote().run(),
    };
  },
});

export function getTipTapExtensions({
  placeholder,
  handleUpload,
  handleImageKeyDown,
  openImgModal,
}: GetTipTapExtensions): Extensions {
  const extensions: Extensions = [
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
            "border border-gray-700 box-decoration-clone bg-gray-900 rounded-md text-orange-400 text-xs py-[0.07rem] px-1",
        },
      },
      dropcursor: {
        class: "dark:text-white",
        width: 2,
      },
      codeBlock: false,
    }),
    Placeholder.configure({
      placeholder: `#${placeholder} へのメッセージ`,
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    CustomBlockquote,
    CustomLink,
    CustomImage(handleUpload, handleImageKeyDown, openImgModal),
  ];

  return extensions;
}
