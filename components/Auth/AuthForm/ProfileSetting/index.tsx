import { Tooltip } from "react-tooltip";
import { useState, useEffect, useRef } from "react";
import DeleteIconModal from "../DeleteIconModal";
import { ModalFn } from "@/@types/Modal";
import { ProfileSettingProps } from "@/@types/Auth";
import { warningToast } from "@/lib/toast";
import ProfileSettingForm from "./Form";

export default function ProfileSetting({ doneEPAuth }: ProfileSettingProps) {
  const [userIcon, setUserIcon] = useState<File | null>(null);
  const [iconURL, setIconURL] = useState<string>("");
  const [showIconModal, setShowIconModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const deleteUserIcon: () => void = () => {
    closeIconModal();
    setUserIcon(null);
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = "";
    }
    setIconURL("");
  };

  const openIconModal: ModalFn = () => {
    setShowIconModal(true);
  };

  const closeIconModal: ModalFn = () => {
    setShowIconModal(false);
  };

  return (
    <>
      <ProfileSettingForm
        userIcon={userIcon}
        setUserIcon={setUserIcon}
        iconURL={iconURL}
        setIconURL={setIconURL}
        fileInputRef={fileInputRef}
        openIconModal={openIconModal}
      />
      <DeleteIconModal
        showIconModal={showIconModal}
        deleteUserIcon={deleteUserIcon}
        closeIconModal={closeIconModal}
        iconURL={iconURL}
      />
      <Tooltip id="delete-image" />
    </>
  );
}
