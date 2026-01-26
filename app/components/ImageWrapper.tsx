import { ReactNode } from "react";

interface ImageWrapper {
  children: ReactNode;
}

export function ImageOnas({ children }: ImageWrapper) {
  return (
    <div className="inset-bevel rounded-2xl overflow-hidden">{children}</div>
  );
}
