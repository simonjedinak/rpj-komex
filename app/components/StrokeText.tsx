import { useMemo } from "react";

type Breakpoint = "default" | "sm" | "md" | "lg" | "xl" | "2xl";
type ResponsiveValue = number | Partial<Record<Breakpoint, number>>;

interface StrokeTextProps {
  children: React.ReactNode;
  strokeWidth?: ResponsiveValue;
  strokeColor?: string;
  textColor?: string;
  className?: string;
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  shadowSize?: ResponsiveValue;
}

const breakpoints: Record<Exclude<Breakpoint, "default">, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function generateResponsiveCSS(
  id: string,
  strokeWidth: ResponsiveValue,
  shadowSize: ResponsiveValue,
  strokeColor: string,
): string {
  const getStrokeValue = (
    bp: Breakpoint,
    value: ResponsiveValue,
  ): number | undefined => {
    if (typeof value === "number") return bp === "default" ? value : undefined;
    return value[bp];
  };

  const cssRules: string[] = [];

  // Default values
  const defaultStroke = getStrokeValue("default", strokeWidth) ?? 4;
  const defaultShadow = getStrokeValue("default", shadowSize) ?? 2;

  cssRules.push(`
    .stroke-text-${id} {
      --stroke-width: ${defaultStroke}px;
      --shadow-size: ${defaultShadow}px;
      --shadow-y: ${defaultShadow - defaultShadow / 5}px;
    }
  `);

  // Breakpoint-specific values
  const bpKeys = Object.keys(breakpoints) as Exclude<Breakpoint, "default">[];
  for (const bp of bpKeys) {
    const strokeVal = getStrokeValue(bp, strokeWidth);
    const shadowVal = getStrokeValue(bp, shadowSize);

    if (strokeVal !== undefined || shadowVal !== undefined) {
      const props: string[] = [];
      if (strokeVal !== undefined) {
        props.push(`--stroke-width: ${strokeVal}px;`);
      }
      if (shadowVal !== undefined) {
        props.push(`--shadow-size: ${shadowVal}px;`);
        props.push(`--shadow-y: ${shadowVal - shadowVal / 5}px;`);
      }

      cssRules.push(`
        @media (min-width: ${breakpoints[bp]}px) {
          .stroke-text-${id} {
            ${props.join("\n            ")}
          }
        }
      `);
    }
  }

  return cssRules.join("\n");
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

  // Generate a stable ID based on children or a unique key
  const id = useMemo(() => {
    const baseId = typeof children === "string" ? children : "stroke-text";
    return `st-${baseId.replace(/[^a-zA-Z0-9]/g, "")}`;
  }, [children]);

  const cssString = generateResponsiveCSS(
    id,
    strokeWidth,
    shadowSize,
    strokeColor,
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssString }} />
      <span
        className={`stroke-text-${id} relative inline-block text-white ${className}`}
      >
        {/* Stroke layer (behind) */}
        <span
          className="absolute left-0 top-0"
          style={{
            WebkitTextStroke: `var(--stroke-width) ${strokeColor}`,
            textShadow: `var(--shadow-size) var(--shadow-y) 0 ${strokeColor}`,
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
    </>
  );
}
