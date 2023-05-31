import { ReactNode, useEffect } from "react";

type ModalProps = {
  show: boolean;
  closeModal: () => void;
  children: ReactNode;
};

export default function Modal({ show, closeModal, children }: ModalProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
  }, []);

  if (show) {
    return (
      <div
        onClick={closeModal}
        className="fixed left-0 top-0 z-[50] flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/30"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:mx-auto sm:max-w-xl"
        >
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
