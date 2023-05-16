import { useState } from "react";
import { errorToast } from "@/lib/toast/error";
import { useDropzone } from "react-dropzone";
import { ToolbarProps } from "@/@types/Editor";
import TopToolbarContainer from "./ToolbarContainer/Top";
import BottomToolbarContainer from "./ToolbarContainer/Bottom";
import FormatButtonContainer from "./FormatButton/Container";
import FormatButton from "./FormatButton";
import SendButton from "./SendButton";
import ImgUploadButton from "./ImgUploadButton";

export default function Toolbar({
  children,
  editor,
  openModal,
  setImage,
  imageInputRef,
  imgButtonOpen,
  setImgButtonOpen,
  hideImgButton,
  openImgModal,
}: ToolbarProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onDropImage = async (files: File[]) => {
    const [image] = files;

    try {
      setIsSubmitting(true);

      if (image) {
        if (image.size >= 5000000) {
          throw new Error("5MB以下のサイズの画像をアップロードしてください");
        } else {
          setImage(image);
        }
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
            tooltipText="太文字"
            shortcutText={{ forMac: "(⌘+B)", forWin: "(Ctrl+B)" }}
            formatType="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            iconName="material-symbols:format-bold"
            open={imgButtonOpen}
          />
          <FormatButton
            editor={editor}
            tooltipText="斜体"
            shortcutText={{ forMac: "(⌘+I)", forWin: "(Ctrl+I)" }}
            formatType="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            iconName="material-symbols:format-italic"
            open={imgButtonOpen}
          />
          <FormatButton
            editor={editor}
            tooltipText="取り消し線"
            shortcutText={{ forMac: "(⌘+Shift+X)", forWin: "(Ctrl+Shift+X)" }}
            formatType="strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            iconName="material-symbols:format-strikethrough"
            open={imgButtonOpen}
          />
        </FormatButtonContainer>
        <FormatButtonContainer>
          <FormatButton
            editor={editor}
            tooltipText="リンク"
            shortcutText={{ forMac: "(⌘+K)", forWin: "(Ctrl+K)" }}
            formatType="link"
            onClick={openModal}
            iconName="mdi:link-variant"
            open={imgButtonOpen}
          />
        </FormatButtonContainer>
        <FormatButtonContainer>
          <FormatButton
            editor={editor}
            tooltipText="順序付きリスト"
            shortcutText={{ forMac: "(⌘+Shift+7)", forWin: "(Ctrl+Shift+7)" }}
            formatType="orderedList"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            iconName="ri:list-ordered-2"
            open={imgButtonOpen}
          />
          <FormatButton
            editor={editor}
            tooltipText="箇条書き"
            shortcutText={{ forMac: "(⌘+Shift+8)", forWin: "(Ctrl+Shift+8)" }}
            formatType="bulletList"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            iconName="material-symbols:format-list-bulleted"
            open={imgButtonOpen}
          />
        </FormatButtonContainer>
        <FormatButtonContainer>
          <FormatButton
            editor={editor}
            tooltipText="引用タグ"
            shortcutText={{ forMac: "(⌘+Shift+9)", forWin: "(Ctrl+Shift+9)" }}
            formatType="blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            iconName="pajamas:quote"
            open={imgButtonOpen}
          />
        </FormatButtonContainer>
        <FormatButtonContainer isLast>
          <FormatButton
            editor={editor}
            tooltipText="コード"
            shortcutText={{ forMac: "(⌘+E)", forWin: "(Ctrl+E)" }}
            formatType="code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            iconName="ph:code-bold"
            open={imgButtonOpen}
          />
          <FormatButton
            editor={editor}
            tooltipText="コードブロック"
            shortcutText={{ forMac: "(⌘+Option+C)", forWin: "(Ctrl+Alt+C)" }}
            formatType="codeBlock"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            iconName="ph:code-block-bold"
            open={imgButtonOpen}
          />
        </FormatButtonContainer>
      </TopToolbarContainer>
      {children}
      <BottomToolbarContainer>
        <ImgUploadButton
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          imageInputRef={imageInputRef}
          open={imgButtonOpen}
          setOpen={setImgButtonOpen}
          hideImgButton={hideImgButton}
          openImgModal={openImgModal}
        />
        <SendButton />
      </BottomToolbarContainer>
    </>
  );
}
