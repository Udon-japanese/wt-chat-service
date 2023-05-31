import { Dispatch, SetStateAction } from "react";

export type ChannelModalProps = {
  showCModal: boolean;
  setShowCModal: Dispatch<SetStateAction<boolean>>;
}

export type SidebarProps = {
  currentChannelId: string | undefined;
}