import {
  ReactNode,
  RefObject,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
} from "react";
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
  tabIndex: number;
  tooltipText: string;
  shortcutText: {
    forMac: string;
    forWin: string;
  };
  formatType: string;
  onClick: (() => boolean) | (() => void);
  iconName: string;
};

export type ImgButtonProps = ImgMenuProps & {
  toggleImgMenu: () => void;
  tabIndex: number;
};

export type SendButtonProps = {
  tabIndex: number;
}

export type ModalFn = () => void;

export type ToolbarProps = {
  children: ReactNode;
  editor: Editor;
  tabIndex: number;
  openLinkModal: () => void;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  imgInputRef: RefObject<HTMLInputElement>;
  showImgMenu: boolean;
  toggleImgMenu: () => void;
  hideImgMenu: () => void;
  openImgModal: ModalFn;
};

export type EditorProps = {
  channelName: string;
  showImgMenu: boolean;
  setShowImgMenu: Dispatch<SetStateAction<boolean>>;
};

export type GetTipTapExtensions = {
  placeholder: string;
  handleUpload: UploadFn;
  handleImgKeyDown: () => void;
  openImgModal: ModalFn;
};

export type LinkModalProps = {
  showLinkModal: boolean;
  linkText: string;
  handleLinkTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  linkUrl: string;
  handleLinkUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  closeLinkModal: ModalFn;
  saveLink: ModalFn;
};

export type LinkBubbleProps = {
  editor: Editor;
  openLinkModal: ModalFn;
  removeLink: ModalFn;
};

export type ImgModalProps = {
  showImgModal: boolean;
  closeImgModal: ModalFn;
  imgUrl: string;
  setImgUrl: Dispatch<SetStateAction<string>>;
  saveImageByUrl: ModalFn;
};

export type ImgMenuProps = {
  getRootProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  imgInputRef: RefObject<HTMLInputElement>;
  showImgMenu: boolean;
  hideImgMenu: () => void;
  openImgModal: ModalFn;
};
