import { ReactNode } from "react";

interface ImageWrapper {
  className?: string;
  children: ReactNode;
}

export default function ImageWrapper({ children, className }: ImageWrapper) {
  return (
    <div
      className={`inset-bevel shadow-md rounded-2xl overflow-hidden ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
