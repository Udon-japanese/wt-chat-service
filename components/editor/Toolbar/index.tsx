import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { Editor, isMacOS } from "@tiptap/react";
import { Icon } from "@iconify/react";
import { toast, Slide } from "react-toastify";
import { useDropzone, DropzoneInputProps } from "react-dropzone";
import { RefObject } from "react";

type ToolbarProps = {
  children: ReactNode;
  editor: Editor;
  openModal: () => void;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  imageInputRef: RefObject<HTMLInputElement>;
};

type ToolbarContainerProps = {
  children: ReactNode;
};

type FormatButtonContainerProps = {
  children: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
};

type FormatButtonProps = {
  editor?: Editor;
  tooltipText: string;
  shortcutText: {
    forMac: string;
    forWin: string;
  };
  formatType?: string;
  onClick?: (() => boolean) | (() => void);
  iconName: string;
  disabledIconName?: string;
  type?: string;
  getRootProps?: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  getInputProps?: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  imageInputRef?: RefObject<HTMLInputElement>;
  isSubmitting?: boolean;
};

function TopToolbarContainer({ children }: ToolbarContainerProps) {
  return (
    <div className="flex items-center justify-between border-b px-1 py-1 dark:border-gray-600">
      <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
        {children}
      </div>
    </div>
  );
}

function BottomToolbarContainer({ children }: ToolbarContainerProps) {
  return (
    <div className="flex items-center justify-between border-t px-1 py-1 dark:border-gray-600">
      {children}
    </div>
  );
}

function FormatButtonContainer({
  children,
  isFirst,
  isLast,
}: FormatButtonContainerProps) {
  return (
    <div
      className={`flex items-center space-x-1 ${
        isFirst ? "" : "flex-wrap sm:pl-1"
      } ${isLast ? "" : "sm:pr-1"}`}
    >
      {children}
    </div>
  );
}

function FormatButton({
  editor,
  tooltipText,
  shortcutText,
  formatType,
  onClick,
  iconName,
  disabledIconName,
  type,
  getInputProps,
  getRootProps,
  imageInputRef,
  isSubmitting,
}: FormatButtonProps) {
  if (type === "image") {
    return (
      <>
        {getInputProps && getRootProps && disabledIconName && (
          <span className="group relative">
            <span className="tooltip">
              {tooltipText}
              <br />
              {isMacOS() ? shortcutText.forMac : shortcutText.forWin}
            </span>
            <div
              className="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              {...getRootProps()}
            >
              <input {...getInputProps()} ref={imageInputRef} />
              <Icon
                icon={isSubmitting ? disabledIconName : iconName}
                width={18}
              />
            </div>
          </span>
        )}
      </>
    );
  }
  return (
    <>
      {editor && formatType && (
        <span className="group relative">
          <span className="tooltip">
            {tooltipText}
            <br />
            {isMacOS() ? shortcutText.forMac : shortcutText.forWin}
          </span>
          <button
            className={`cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white ${
              editor.isActive(formatType)
                ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white"
                : ""
            }`}
            onClick={onClick}
          >
            <Icon icon={iconName} width={18} />
          </button>
        </span>
      )}
    </>
  );
}

function SendButton() {
  return (
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
  );
}

export default function Toolbar({
  children,
  editor,
  openModal,
  setImage,
  imageInputRef,
}: ToolbarProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onDropImage = async (files: File[]) => {
    const [image] = files;

    try {
      setIsSubmitting(true);

      if (image) {
        console.log({ image });
        if (image.size >= 5000000) {
          throw new Error("5MB以下のサイズの画像をアップロードしてください");
        } else {
          setImage(image);
        }
      }

      setIsSubmitting(false);
    } catch (error: any) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
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
          />
          <FormatButton
            editor={editor}
            tooltipText="斜体"
            shortcutText={{ forMac: "(⌘+I)", forWin: "(Ctrl+I)" }}
            formatType="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            iconName="material-symbols:format-italic"
          />
          <FormatButton
            editor={editor}
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
            tooltipText="リンク"
            shortcutText={{ forMac: "(⌘+K)", forWin: "(Ctrl+K)" }}
            formatType="link"
            onClick={openModal}
            iconName="mdi:link-variant"
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
          />
          <FormatButton
            editor={editor}
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
            tooltipText="コード"
            shortcutText={{ forMac: "(⌘+E)", forWin: "(Ctrl+E)" }}
            formatType="code"
            onClick={() => editor.chain().focus().toggleCode().run()}
            iconName="ph:code-bold"
          />
          <FormatButton
            editor={editor}
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
        <FormatButton
          type="image"
          tooltipText="画像"
          shortcutText={{ forMac: "(⌘+U)", forWin: "(Ctrl+U)" }}
          iconName="ic:outline-image"
          disabledIconName="ic:outline-image-not-supported"
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isSubmitting={isSubmitting}
          imageInputRef={imageInputRef}
        />
        <SendButton />
      </BottomToolbarContainer>
    </>
  );
}
