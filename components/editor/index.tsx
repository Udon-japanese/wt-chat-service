import { useEditor, EditorContent } from "@tiptap/react";
import { useCallback, useState, useEffect, useRef } from "react";
import Toolbar from "./Toolbar";
import { getTipTapExtensions } from "./extensions";
import LinkModal from "./extensions/Link/LinkModal";
import LinkBubble from "./extensions/Link/LinkBubble";

type TipTapProps = {
  channelName: string;
};

export let openModal: () => void = () => {};
export let handleImageKeyDown: () => void = () => {};

export default function TipTap({ channelName }: TipTapProps) {
  const [content, setContent] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);
  const [textLength, setTextLength] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const imageInputRef = useRef<HTMLInputElement>(null);

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result as string);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  }

  const handleUpload = async (file: File) => {
    const result = await readFileAsDataURL(file);

    return result;
  };

  handleImageKeyDown = () => {
    imageInputRef.current?.click();
  }

  useEffect(() => {
    async function handleImageUpload() {
      if (image && editor) {
        const src = await handleUpload(image);
        console.log({ src });
        editor.chain().focus()?.setImage({ src })?.run();
      }
    }
    handleImageUpload();
  }, [image]);

  const extensions = getTipTapExtensions({
    handleUpload,
    placeholder: channelName,
  });

  const editor = useEditor({
    extensions: extensions,
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

  useEffect(() => {
    if (content === "<p></p>") setContent("");
    console.log(content);
  }, [content, editor, setContent]);

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
      const prevUrl = editor.getAttributes("link").href;
      if (prevUrl) {
        setUrl(prevUrl);
      }
      setShow(true);
    }
  };

  const closeModal: () => void = () => {
    setShow(false);
    setUrl("");
    setText("");
    setTextLength(0);
  };

  const removeLink: () => void = useCallback(() => {
    if (editor) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      closeModal();
    }
  }, [editor, closeModal]);

  const saveLink: () => void = useCallback(() => {
    if (editor) {
      if (url) {
        const { view } = editor;
        const { from, to } = view.state.selection;
        let newUrl: string = "";
        let tmpUrl: string = "";
        // URLがリンクの形式でない場合
        if (!/(https?:\/\/|mailto:|ftp:\/\/)/.test(url)) {
          newUrl = "http://" + url;
        }
        // URLのみでテキストが未入力の場合
        if (!text) {
          tmpUrl = newUrl || url;
        }

        const currentTextLength = tmpUrl.length || text.length;

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
            .insertContent(tmpUrl || text)
            .setTextSelection({ from, to: modifiedTo })
            .focus()
            .extendMarkRange("link")
            .setLink({ href: newUrl || url })
            .run();
          // テキストが事前に選択されていない場合
        } else if (!textLength) {
          const from: number = cursor;
          const to: number = cursor + currentTextLength;
          editor
            .chain()
            .focus()
            .insertContent(tmpUrl || text)
            .setTextSelection({ from, to })
            .focus()
            .extendMarkRange("link")
            .setLink({ href: newUrl || url })
            .run();
          // 事前にテキストを選択していて、テキストの変更がない場合
        } else {
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: newUrl || url })
            .run();
        }
      } else {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      }
    }
    closeModal();
  }, [editor, text, url, textLength, closeModal]);

  if (!editor) return null;

  return (
    <>
      <LinkModal
        show={show}
        text={text}
        setText={setText}
        url={url}
        setUrl={setUrl}
        closeModal={closeModal}
        saveLink={saveLink}
      />
      <div className="sticky w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <Toolbar editor={editor} openModal={openModal} setImage={setImage} imageInputRef={imageInputRef}>
          <div className="editor max-h-[38rem] bg-white text-sm text-gray-800 dark:bg-gray-800 dark:text-white">
            <EditorContent
              editor={editor}
              className="px-3 py-2 dark:text-white"
            />
          </div>
        </Toolbar>
      </div>
      <LinkBubble
        editor={editor}
        openModal={openModal}
        removeLink={removeLink}
      />
    </>
  );
}
