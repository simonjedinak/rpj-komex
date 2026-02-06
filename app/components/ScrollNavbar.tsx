"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ButtonLink } from "./ButtonLink";
import { primaryNavLinks } from "../data/navigation";

const SCROLL_THRESHOLD = 280;

export default function ScrollNavbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 hidden md:block transition-transform duration-400 ${
        isVisible ? "translate-y-0" : "-translate-y-[200%]"
      }`}
    >
      <div className="bg-black container mx-auto shadow-navbar py-1.5">
        <div className="container mx-auto">
          <div className="w-full flex flex-row h-10 gap-1.5 pl-1 lg:pl-5 bg-chrome1 inset-chrome">
            <Link href="/" className="flex items-center gap-0 mr-6 lg:mr-10">
              <img
                src="/logo-small.svg"
                alt="KOMEX Logo"
                className="drop-shadow-lg h-12.5"
              />
              <img
                src="/text-logo.svg"
                alt="KOMEX Text Logo"
                className="lg:h-7.5 h-6"
              />
            </Link>

            <ul className="w-full h-full flex items-center justify-around lg:justify-start lg:gap-10 py-2 pl-4 text-sm tracking-wide lg:text-md xl:text-lg">
              {primaryNavLinks.map((link) => (
                <li key={link.href}>
                  <ButtonLink
                    href={link.href}
                    variant="small"
                    text={link.text}
                    textSize={null}
                    arrow
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
