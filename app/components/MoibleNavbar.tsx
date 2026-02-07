"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { primaryNavLinks } from "../data/navigation";

// Height of the bottom section (logo + 2 button rows) in pixels
const BOTTOM_SECTION_HEIGHT = 104;

// Trapezoid geometry
const TRAPEZOID_INSET = 40; // px from each side
const TRAPEZOID_HEIGHT = 160; // 10rem = 160px

function NavbarShape({ width, height }: { width: number; height: number }) {
  if (width <= 0 || height <= 0) return null;

  const w = width;
  const h = height;

  // Main fill shape: trapezoid top + rectangle bottom
  const shapePath = `M0,0 L${TRAPEZOID_INSET},${TRAPEZOID_HEIGHT} L${w - TRAPEZOID_INSET},${TRAPEZOID_HEIGHT} L${w},0 L${w},${h} L0,${h} Z`;
  // Top edges only (for border stroke)
  const borderPath = `M0,0 L${TRAPEZOID_INSET},${TRAPEZOID_HEIGHT} L${w - TRAPEZOID_INSET},${TRAPEZOID_HEIGHT} L${w},0`;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      viewBox={`0 0 ${w} ${h}`}
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="mobile-navbar-shadow"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          {/* Outer drop shadow */}
          <feGaussianBlur
            in="SourceAlpha"
            stdDeviation="10"
            result="outerBlur"
          />
          <feOffset in="outerBlur" dx="0" dy="-2" result="outerOffset" />
          <feFlood
            floodColor="#000000"
            floodOpacity="0.8"
            result="outerColor"
          />
          <feComposite
            in="outerColor"
            in2="outerOffset"
            operator="in"
            result="outerShadow"
          />

          {/* Inset shadow from top (white highlight for chrome effect) */}
          <feComponentTransfer in="SourceAlpha" result="invertedAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feOffset in="invertedAlpha" dx="0" dy="5" result="insetOffset" />
          <feGaussianBlur
            in="insetOffset"
            stdDeviation="5"
            result="insetBlur"
          />
          <feComposite
            in="insetBlur"
            in2="SourceAlpha"
            operator="in"
            result="insetMask"
          />
          <feFlood
            floodColor="#ffffff"
            floodOpacity="0.5"
            result="insetColor"
          />
          <feComposite
            in="insetColor"
            in2="insetMask"
            operator="in"
            result="insetShadow"
          />

          {/* Merge: outer shadow → fill → inset highlight */}
          <feMerge>
            <feMergeNode in="outerShadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="insetShadow" />
          </feMerge>
        </filter>
      </defs>

      {/* Main shape with fill and shadows */}
      <path d={shapePath} fill="#ABABAB" filter="url(#mobile-navbar-shadow)" />

      {/* Border stroke on top angled edges only */}
      <path
        d={borderPath}
        fill="none"
        stroke="rgb(196,196,196)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MobileNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Collapse navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsExpanded(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track container dimensions for SVG shape
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      setDimensions({ width: el.offsetWidth, height: el.offsetHeight });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Collapse navbar on link click
  const handleLinkClick = () => {
    setIsExpanded(false);
  };

  return (
    <nav
      className="fixed left-0 pb-4 right-0 z-50 md:hidden transition-[bottom] duration-300 ease-out"
      style={{
        bottom: isExpanded ? "0px" : `-${BOTTOM_SECTION_HEIGHT}px`,
      }}
    >
      <div ref={containerRef} className="relative">
        {/* SVG background shape with drop shadow + inset shadow */}
        <NavbarShape width={dimensions.width} height={dimensions.height} />

        {/* Content clipped to trapezoid shape */}
        <div
          className="relative pt-40"
          style={{
            clipPath: `polygon(0 0, ${TRAPEZOID_INSET}px ${TRAPEZOID_HEIGHT}px, calc(100% - ${TRAPEZOID_INSET}px) ${TRAPEZOID_HEIGHT}px, 100% 0, 100% 100%, 0 100%)`,
          }}
        >
          {/* bg stripe */}
          <div
            aria-hidden="true"
            className="h-200 w-4/9 navbar-bg-stripe overflow-hidden absolute -translate-x-1/2 left-1/2 pointer-events-none"
          >
            <div className="w-full h-[150%] relative bottom-5 bg-[#434343]"></div>
          </div>
          {/* 3-column flexbox layout */}
          <div className="flex gap-5 px-2 py-2 relative z-10">
            {/* Left column */}
            <div className="flex-1 flex flex-col gap-1.25">
              <NavButton
                href={primaryNavLinks[0].href}
                text={primaryNavLinks[0].text}
                className="rounded-tr-3xl relative z-10"
                onClick={handleLinkClick}
              />
              <NavButton
                href={primaryNavLinks[2].href}
                text={primaryNavLinks[2].text}
                className="mid-one relative z-0"
                onClick={handleLinkClick}
              />
              <NavButton
                href={primaryNavLinks[4].href}
                text={primaryNavLinks[4].text}
                className="rounded-br-3xl relative z-10"
                onClick={handleLinkClick}
              />
            </div>

            {/* Center column */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Red arrow toggle button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-10 relative"
                aria-label={isExpanded ? "Collapse navbar" : "Expand navbar"}
              >
                <div
                  className={`${isExpanded ? "rounded-b-4xl" : "rounded-t-4xl"} duration-600 select-none ease-out rounded-md absolute inset-0 bg-linear-to-b from-[#ff0000] to-[#9d0000] flex items-center justify-center arrow-nav-button`}
                >
                  <svg
                    className={`w-8 h-8 text-white transition-transform duration-300 ${
                      isExpanded ? "rotate-90" : "-rotate-90"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>

              {/* Logo */}
              <div className="flex-1 flex items-center justify-center select-none">
                <Link
                  href="/"
                  className=" rounded-full mobile-nav-logo px-8 flex flex-col items-center justify-center pt-1.75 pb-1  gap-0.5 "
                  onClick={handleLinkClick}
                >
                  <img
                    src="/icon.svg"
                    alt="KOMEX Logo"
                    className="h-15 w-auto max-w-full opacity-85"
                  />

                  <img
                    src="/text-logo.svg"
                    alt="komex"
                    className="h-5 ml-1 w-auto max-w-full"
                  />
                </Link>
              </div>
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col gap-1.25">
              <NavButton
                href={primaryNavLinks[1].href}
                text={primaryNavLinks[1].text}
                className="rounded-tl-3xl relative z-10"
                onClick={handleLinkClick}
              />
              <NavButton
                href={primaryNavLinks[3].href}
                text={primaryNavLinks[3].text}
                className="mid-one relative z-0 "
                onClick={handleLinkClick}
              />
              <NavButton
                href={primaryNavLinks[5].href}
                text={primaryNavLinks[5].text}
                className="rounded-bl-3xl relative z-10"
                onClick={handleLinkClick}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavButton({
  href,
  text,
  className,
  onClick,
}: {
  href: string;
  text: string;
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "relative h-11 flex items-center rounded-[3px] justify-center mobile-button-link";
  return (
    <Link
      href={href}
      className={`${base} ${className ?? ""}`.trim()}
      onClick={onClick}
    >
      <p className="relative z-10 text-sm font-bold px-1">{text}</p>
    </Link>
  );
}
