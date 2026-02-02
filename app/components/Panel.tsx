import { Children, ReactNode } from "react";
import StrokeText from "./StrokeText";

interface PanelProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  titleBar?: boolean;
}

export default function Panel({
  title,
  children,
  className,
  titleBar = true,
}: PanelProps) {
  return (
    <div className={`relative max-w-full shadow-lg ${className}`}>
      {/* Panel (front) */}
      <div className="relative z-10 bg-[#E5E5E5] p-1.5 border-2 border-white">
        {/* Handle (behind) */}
        <div className="absolute -left-px -top-6 h-8 w-100">
          {/* Fill (clipped) */}
          <div className="absolute inset-0 bg-linear-to-r from-[#e5e5e5] via-[#dadada] to-[#c9c7c8] [clip-path:polygon(5%_0%,90%_0%,100%_100%,0_100%,0%_50%)]" />

          {/* Border (not clipped) */}
          <svg
            className="absolute inset-0 h-full w-full overflow-visible pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d={`
      M 5 0
      L 90 0
      L 100 100
      M 0 100
      L 0 50
      L 5 0
    `}
              fill="none"
              stroke="white"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* mid frame */}
        <div className="border-2 border-[#c9c9c9] bg-white">
          {/* inner bevel line */}
          <div>
            {titleBar && (
              <>
                {/* Title bar */}
                <div className="relative px-7 py-5 text-white">
                  <div className="absolute inset-0 bg-linear-to-b from-[#840000] to-[#E31E24] border-2 border-[#999997]" />
                  {/* subtle inner line like in the screenshot */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-[#b00000]/70" />
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-black/15" />

                  <div className="relative flex items-center justify-between">
                    {/* Title */}
                    <StrokeText
                      strokeWidth={6}
                      shadowSize={6}
                      tag="h4"
                      className="text-6xl font-bold "
                    >
                      {title}
                    </StrokeText>
                  </div>
                </div>
              </>
            )}

            {/* Body */}
            <div className="border-t-2 border-[#c9c9c9] flex flex-col text-2xl">
              {Children.map(children, (child, index) => (
                <div
                  key={index}
                  className={`py-6 px-8 ${index % 2 === 1 ? "bg-neutral-200" : ""}`}
                >
                  {child}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
