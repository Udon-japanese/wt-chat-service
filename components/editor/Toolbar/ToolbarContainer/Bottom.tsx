import { ToolbarContainerProps } from "@/@types/Editor";

export default function BottomToolbarContainer({ children }: ToolbarContainerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between border-t px-1 py-1 dark:border-gray-600">
      {children}
    </div>
  );
}