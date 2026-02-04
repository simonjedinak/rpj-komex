"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { text: "O nás", href: "/o-nas" },
  { text: "O nás", href: "/o-nas" },
  { text: "Niecoo", href: "/details" },
  { text: "Niecoo", href: "/details" },
  { text: "O nás", href: "/o-nas" },
  { text: "O nás", href: "/o-nas" },
];

// Height of the bottom section (logo + 2 button rows) in pixels
const BOTTOM_SECTION_HEIGHT = 90;

export default function MobileNavbar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <nav
      className="fixed left-0 right-0 z-50 md:hidden transition-[bottom] duration-300 ease-in-out"
      style={{
        bottom: isExpanded ? "0px" : `-${BOTTOM_SECTION_HEIGHT}px`,
      }}
    >
      <div className="navbar-clip-wrapper">
        <div className="bg-[#ABABAB] navbar-clip pt-40 relative">
          <div
            aria-hidden="true"
            className="h-full navbar-bg-stripe overflow-hidden absolute w-4/9 -translate-x-1/2 left-1/2 pointer-events-none"
          >
            <div className="w-full h-[150%] relative bottom-5 bg-[#434343]"></div>
          </div>
          {/* 3-column flexbox layout */}
          <div className="flex gap-5 px-2 py-2 relative z-10">
            {/* Left column */}

            <div className="flex-1 flex flex-col gap-1">
              <NavButton
                href={navLinks[0].href}
                text={navLinks[0].text}
                className="rounded-tr-3xl"
              />
              <NavButton href={navLinks[2].href} text={navLinks[2].text} />
              <NavButton
                href={navLinks[4].href}
                text={navLinks[4].text}
                className="rounded-br-3xl"
              />
            </div>

            {/* Center column */}
            <div className="flex-1 flex flex-col gap-1">
              {/* Red arrow toggle button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-10 relative"
                aria-label={isExpanded ? "Collapse navbar" : "Expand navbar"}
              >
                <div className="absolute inset-0 bg-linear-to-b from-[#ff4444] to-[#aa0000] flex items-center justify-center rounded-md rounded-b-4xl arrow-nav-button">
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
              <div className="flex-1 flex items-center justify-center">
                <Link
                  href="/"
                  className="rounded-full mobile-nav-logo flex items-center justify-center py-3.5 px-8 "
                >
                  <img
                    src="/icon.svg"
                    alt="KOMEX Logo"
                    className="h-16 w-auto max-w-full"
                  />
                </Link>
              </div>
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col gap-1">
              <NavButton
                href={navLinks[1].href}
                text={navLinks[1].text}
                className="rounded-tl-3xl"
              />
              <NavButton href={navLinks[3].href} text={navLinks[3].text} />
              <NavButton
                href={navLinks[5].href}
                text={navLinks[5].text}
                className="rounded-bl-3xl"
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
}: {
  href: string;
  text: string;
  className?: string;
}) {
  const base =
    "relative h-11 flex items-center rounded-[2px] justify-center mobile-button-link bg-black";
  return (
    <Link href={href} className={`${base} ${className ?? ""}`.trim()}>
      <p className="relative z-10 text-sm font-bold px-1">{text}</p>
    </Link>
  );
}
