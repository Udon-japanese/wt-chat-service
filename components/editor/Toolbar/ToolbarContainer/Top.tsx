import { ToolbarContainerProps } from "@/@types/Editor";

export default function TopToolbarContainer({ children }: ToolbarContainerProps) {
  return (
    <div className="flex items-center justify-between border-b px-1 py-1 dark:border-gray-600">
      <div className="flex flex-wrap items-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
        {children}
      </div>
    </div>
  );
}