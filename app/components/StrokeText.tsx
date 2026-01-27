interface StrokeTextProps {
  children: React.ReactNode;
  strokeWidth?: number;
  strokeColor?: string;
  textColor?: string;
  className?: string;
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  shadowSize?: number;
}

export default function StrokeText({
  children,
  strokeWidth = 4,
  strokeColor = "black",
  textColor = "white",
  className = "",
  tag = "span",
  shadowSize = 2,
}: StrokeTextProps) {
  const Tag = tag;
  return (
    <span className={`relative inline-block text-white ${className}`}>
      {/* Stroke layer (behind) */}
      <span
        className="absolute left-0 top-0"
        style={{
          WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
          textShadow: `${shadowSize}px ${
            shadowSize - shadowSize / 5
          }px 0 ${strokeColor}`,
          color: "transparent",
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      {/* Text layer (on top) */}
      <Tag className="relative" style={{ color: textColor }}>
        {children}
      </Tag>
    </span>
  );
}
