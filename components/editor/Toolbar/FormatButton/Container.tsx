import { FormatButtonContainerProps } from "@/@types/Editor";

export default function FormatButtonContainer({
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
