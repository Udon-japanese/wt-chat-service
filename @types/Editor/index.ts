import { ReactNode, RefObject, Dispatch, SetStateAction } from "react";
import { Editor } from "@tiptap/react";
import { DropzoneInputProps } from "react-dropzone";
import { UploadFn } from "@/components/editor/extensions/Image/uploadImage";

export type ToolbarContainerProps = {
  children: ReactNode;
};

export type FormatButtonContainerProps = {
  children: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
};

export type FormatButtonProps = {
  editor: Editor;
  tooltipText: string;
  shortcutText: {
    forMac: string;
    forWin: string;
  };
  formatType: string;
  onClick: (() => boolean) | (() => void);
  iconName: string;
  open: boolean;
};

export type ImgUploadButtonProps = {
  getRootProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  imageInputRef: RefObject<HTMLInputElement>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hideImgButton: () => void;
  openImgModal: ModalFn;
};

export type ModalFn = () => void;

export type ToolbarProps = {
  children: ReactNode;
  editor: Editor;
  openModal: () => void;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  imageInputRef: RefObject<HTMLInputElement>;
  imgButtonOpen: boolean;
  setImgButtonOpen: Dispatch<SetStateAction<boolean>>;
  hideImgButton: () => void;
  openImgModal: ModalFn;
};

export type EditorProps = {
  channelName: string;
};

export type GetTipTapExtensions = {
  placeholder: string;
  handleUpload: UploadFn;
  handleImageKeyDown: () => void;
  openImgModal: ModalFn;
};

export type LinkModalProps = {
  show: boolean;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  closeModal: ModalFn;
  saveLink: ModalFn;
};

export type LinkBubbleProps = {
  editor: Editor;
  openModal: ModalFn;
  removeLink: ModalFn;
};

export type ImgModalProps = {
  showImgModal: boolean;
  closeModal: ModalFn;
  imgUrl: string;
  setImgUrl: Dispatch<SetStateAction<string>>;
  saveImage: ModalFn;
};
