import { useState } from "react";
import { errorToast } from "@/lib/toast/error";
import { useDropzone } from "react-dropzone";
import { ToolbarProps } from "@/@types/Editor";
import { Tooltip } from "react-tooltip";
import TopToolbarContainer from "./ToolbarContainer/Top";
import BottomToolbarContainer from "./ToolbarContainer/Bottom";
import FormatButtonContainer from "./FormatButton/Container";
import FormatButton from "./FormatButton";
import SendButton from "./SendButton";
import ImgButton from "./ImgButton";

export default function Toolbar({
  children,
  editor,
  tabIndex,
  openLinkModal,
  setImage,
  imgInputRef,
  showImgMenu,
  toggleImgMenu,
  hideImgMenu,
  openImgModal,
}: ToolbarProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onDropImage = async (files: File[]) => {
    const [image] = files;

    try {
      setIsSubmitting(true);
      if (!image) {
        throw new Error("画像ファイルのみアップロードできます");
      }

      if (image.size >= 5000000) {
        throw new Error("5MB以下のサイズの画像をアップロードしてください");
      } else {
        setImage(image);
      }

      setIsSubmitting(false);
    } catch (error: any) {
      errorToast(error.message);
      setIsSubmitting(false);
    }
  };

  const { getInputProps, getRootProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".jpg", ".png", ".jpeg", ".webp", ".gif"],
    },
    disabled: isSubmitting,
    onDrop: onDropImage,
  });

  return (
    <>
      <TopToolbarContainer>
        <FormatButtonContainer isFirst>
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="太文字"
            shortcutText={{ forMac: "(⌘+B)", forWin: "(Ctrl+B)" }}
            formatType="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            iconName="material-symbols:format-bold"
          />
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="斜体"
            shortcutText={{ forMac: "(⌘+I)", forWin: "(Ctrl+I)" }}
            formatType="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            iconName="material-symbols:format-italic"
          />
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="取り消し線"
            shortcutText={{ forMac: "(⌘+Shift+X)", forWin: "(Ctrl+Shift+X)" }}
            formatType="strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            iconName="material-symbols:format-strikethrough"
          />
        </FormatButtonContainer>
        <FormatButtonContainer>
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="リンク"
            shortcutText={{ forMac: "(⌘+K)", forWin: "(Ctrl+K)" }}
            formatType="link"
            onClick={openLinkModal}
            iconName="mdi:link-variant"
          />
        </FormatButtonContainer>
        <FormatButtonContainer>
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="順序付きリスト"
            shortcutText={{ forMac: "(⌘+Shift+7)", forWin: "(Ctrl+Shift+7)" }}
            formatType="orderedList"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            iconName="ri:list-ordered-2"
          />
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="箇条書き"
            shortcutText={{ forMac: "(⌘+Shift+8)", forWin: "(Ctrl+Shift+8)" }}
            formatType="bulletList"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            iconName="material-symbols:format-list-bulleted"
          />
        </FormatButtonContainer>
        <FormatButtonContainer>
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="引用タグ"
            shortcutText={{ forMac: "(⌘+Shift+9)", forWin: "(Ctrl+Shift+9)" }}
            formatType="blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            iconName="pajamas:quote"
          />
        </FormatButtonContainer>
        <FormatButtonContainer isLast>
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="コード"
            shortcutText={{ forMac: "(⌘+E)", forWin: "(Ctrl+E)" }}
            formatType="code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            iconName="ph:code-bold"
          />
          <FormatButton
            editor={editor}
            tabIndex={tabIndex}
            tooltipText="コードブロック"
            shortcutText={{ forMac: "(⌘+Option+C)", forWin: "(Ctrl+Alt+C)" }}
            formatType="codeBlock"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            iconName="ph:code-block-bold"
          />
        </FormatButtonContainer>
      </TopToolbarContainer>
      {children}
      <BottomToolbarContainer>
        <ImgButton
          tabIndex={tabIndex}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          imgInputRef={imgInputRef}
          showImgMenu={showImgMenu}
          toggleImgMenu={toggleImgMenu}
          hideImgMenu={hideImgMenu}
          openImgModal={openImgModal}
        />
        <SendButton tabIndex={tabIndex} />
      </BottomToolbarContainer>
      <Tooltip className="text-center" id="format-button" />
    </>
  );
}
