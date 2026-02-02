import Link from "next/link";
import type { ComponentProps } from "react";
import StrokeText from "./StrokeText";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "small" | "big";
  text?: string;
  arrow?: boolean;
};

export function ButtonLink({
  variant = "small",
  text,
  arrow = false,
  className,
  ...props
}: ButtonLinkProps) {
  const base = "inline-flex items-center justify-center h-7";
  const styles =
    variant === "small"
      ? "bg-button-small rounded-lg pr-2.5 pl-2 py-2"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300";

  return (
    <Link
      {...props}
      className={[base, styles, className].filter(Boolean).join(" ")}
    >
      <StrokeText
        strokeWidth={2}
        shadowSize={2}
        className="text-lg font-bold flex items-center gap-1"
      >
        {arrow && (
          <span className="inline-block transform mr-2 -translate-y-0.2">
            ▸
          </span>
        )}
        {text}
      </StrokeText>
    </Link>
  );
}
