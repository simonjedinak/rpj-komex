interface StrokeTextProps {
  children: React.ReactNode;
  strokeWidth?: number;
  strokeColor?: string;
  className?: string;
}

export default function StrokeText({
  children,
  strokeWidth = 4,
  strokeColor = "black",
  className = "",
}: StrokeTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Stroke layer (behind) */}
      <span
        className="absolute left-0 top-0"
        style={{
          WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
          color: "transparent",
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      {/* Text layer (on top) */}
      <span className="relative">{children}</span>
    </span>
  );
}
