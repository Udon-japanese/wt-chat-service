import {
  useEditor,
  EditorContent,
  Extensions,
  Editor as EditorType,
} from "@tiptap/react";
import { useState, useEffect, useRef, MouseEvent } from "react";
import Toolbar from "./Toolbar";
import { getTipTapExtensions } from "./extensions";
import LinkModal from "./Toolbar/LinkButton/LinkModal";
import ImgModal from "./Toolbar/ImgButton/ImgModal";
import { ModalFn } from "@/@types/Modal";
import LinkBubble from "./Toolbar/LinkButton/LinkBubble";
import { EditorProps } from "@/@types/Editor";
import { errorToast } from "@/lib/toast";
import { handleInputChange } from "@/@types/Form";

export let openLinkModal: ModalFn = () => {};

export default function Editor({
  channelName,
  showImgMenu,
  setShowImgMenu,
}: EditorProps) {
  const [content, setContent] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);
  const [textLength, setTextLength] = useState<number>(0);
  const [linkText, setLinkText] = useState<string>("");
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [showImgModal, setShowImgModal] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  const tabIndexWhenModalOpen: 0 | -1 = showLinkModal || showImgModal ? -1 : 0;

  const openImgModal = () => {
    hideImgMenu();
    setShowImgModal(true);
  };

  const closeImgModal: ModalFn = () => {
    if (!editor) return;
    setShowImgModal(false);
    setImgUrl("");
    editor.commands.focus();
  };

  const toggleImgMenu: () => void = () => {
    setShowImgMenu((showImgMenu) => !showImgMenu);
  };
  const hideImgMenu: () => void = () => {
    setShowImgMenu(false);
  };

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise(function (resolve, reject) {
      let fr: FileReader = new FileReader();

      fr.onload = function () {
        resolve(fr.result as string);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  }

  const handleUpload = async (file: File): Promise<string> => {
    const result: string = await readFileAsDataURL(file);
    return result;
  };

  const handleImgKeyDown: () => void = () => {
    imgInputRef.current?.click();
  };

  useEffect(() => {
    async function handleImageUpload() {
      if (image && editor) {
        const src: string = await handleUpload(image);
        editor.chain().focus().setImage({ src }).run();
      }
    }
    handleImageUpload();
  }, [image]);

  //Modal表示時のエディタへのtabフォーカス禁止
  useEffect(() => {
    const editorDiv = document.querySelector(".ProseMirror");
    editorDiv?.setAttribute("tabindex", tabIndexWhenModalOpen.toString());
  }, [showLinkModal, showImgModal])

  const extensions: Extensions = getTipTapExtensions({
    handleUpload,
    placeholder: channelName,
    handleImgKeyDown,
    openImgModal,
  });

  const editor: EditorType | null = useEditor({
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

  const saveImageByUrl: ModalFn = () => {
    if (!editor) return;

    if (
      imgUrl &&
      /^(https?:\/\/)(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?(\/?[^\s\/?#]+\.(jpg|jpeg|png|webp|gif|bmp|tiff|svg))(\?[^\s]+)?$/i.test(
        imgUrl
      )
    ) {
      editor.chain().focus().setImage({ src: imgUrl }).run();
      closeImgModal();
    } else {
      closeImgModal();
      errorToast("有効な画像URLを入力してください");
    }
  };

  const handleLinkTextChange: handleInputChange = (e) => {
    setLinkText(e.target.value);
  };

  const handleLinkUrlChange: handleInputChange = (e) => {
    setLinkUrl(e.target.value);
  };

  openLinkModal = () => {
    if (!editor) return;

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
    setLinkText(text);
    setTextLength(to - from);
    const prevUrl: string = editor.getAttributes("link").href;
    if (prevUrl) {
      setLinkUrl(prevUrl);
    }
    setShowLinkModal(true);
  };

  const closeLinkModal: ModalFn = () => {
    if (!editor) return;
    setShowLinkModal(false);
    setLinkUrl("");
    setLinkText("");
    setTextLength(0);
    editor.commands.focus();
  };

  const removeLink: ModalFn = () => {
    if (!editor) return;

    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeLinkModal();
  };

  const saveLink: ModalFn = () => {
    if (!editor) return;

    if (linkUrl) {
      const { view } = editor;
      const { from, to } = view.state.selection;
      const isLink: RegExp = /(https?:\/\/|mailto:|ftp:\/\/)/;

      let newUrl: string = "";
      let newText: string = "";
      if (!isLink.test(linkUrl) && linkText) {
        newUrl = "http://" + linkUrl;
      } else if (!isLink.test(linkUrl) && !linkText) {
        newUrl = "http://" + linkUrl;
        newText = newUrl;
      } else if (isLink.test(linkUrl) && !linkText) {
        newText = linkUrl;
      }

      const currentTextLength = newText.length || linkText.length;

      let modifiedTo: number = 0;
      if (textLength && currentTextLength) {
        const diff = Math.abs(textLength - currentTextLength);
        modifiedTo = textLength > currentTextLength ? to - diff : to + diff;
      }

      // 事前にテキストを選択していて、テキストに変更があった場合
      if (modifiedTo) {
        editor
          .chain()
          .focus()
          .insertContent(newText || linkText)
          .setTextSelection({ from, to: modifiedTo })
          .extendMarkRange("link")
          .setLink({ href: newUrl || linkUrl })
          .run();
        // テキストが事前に選択されていない場合
      } else if (!textLength) {
        const from: number = cursor;
        const to: number = cursor + currentTextLength;
        editor
          .chain()
          .focus()
          .insertContent(newText || linkText)
          .setTextSelection({ from, to })
          .extendMarkRange("link")
          .setLink({ href: newUrl || linkUrl })
          .run();
        // 事前にテキストを選択していて、テキストの変更がない場合
      } else {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: newUrl || linkUrl })
          .run();
      }
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeLinkModal();
  };

  if (!editor) return null;

  return (
    <>
      <LinkModal
        showLinkModal={showLinkModal}
        linkText={linkText}
        handleLinkTextChange={handleLinkTextChange}
        linkUrl={linkUrl}
        handleLinkUrlChange={handleLinkUrlChange}
        closeLinkModal={closeLinkModal}
        saveLink={saveLink}
      />
      <ImgModal
        showImgModal={showImgModal}
        closeImgModal={closeImgModal}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
        saveImageByUrl={saveImageByUrl}
      />
      <div className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <Toolbar
          editor={editor}
          tabIndex={tabIndexWhenModalOpen}
          openLinkModal={openLinkModal}
          setImage={setImage}
          imgInputRef={imgInputRef}
          showImgMenu={showImgMenu}
          toggleImgMenu={toggleImgMenu}
          hideImgMenu={hideImgMenu}
          openImgModal={openImgModal}
        >
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
        openLinkModal={openLinkModal}
        removeLink={removeLink}
      />
    </>
  );
}
