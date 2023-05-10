import { Icon } from "@iconify/react";

import { ReactNode } from "react";

type ModalProps = {
  show: boolean;
  closeModal: () => void;
  children: ReactNode;
  ModalTitle: string;
};

export default function Modal({
  show,
  closeModal,
  children,
  ModalTitle,
}: ModalProps) {
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
          <div className="flex max-h-full flex-col overflow-hidden rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="my-1 truncate text-2xl font-bold text-gray-800 dark:text-white">
                {ModalTitle}
              </h3>
              <button
                onClick={closeModal}
                className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-transparent p-2 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <Icon icon="material-symbols:close" width={25} />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
