// components/Footer.tsx
import { ButtonLink } from "./ButtonLink";
import StrokeText from "./StrokeText";
import { primaryNavLinks } from "../data/navigation";
import Link from "next/link";

export default function Footer() {
  const leftLinks = primaryNavLinks.slice(0, 3);
  const rightLinks = primaryNavLinks.slice(3);

  return (
    <footer className="mt-auto shadow-footer">
      <div className="h-6 w-full bg-chrome2 inset-chrome" />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/carbon.png')] bg-repeat bg-top-left" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative">
          {/* Navigation Links - Stacked on mobile, side-by-side on desktop */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-24 items-stretch px-6 md:px-24 py-8 md:py-12">
            <nav className="flex flex-col gap-3 md:gap-4 h-full justify-center items-start">
              {leftLinks.map((link) => (
                <ButtonLink
                  key={link.href}
                  href={link.href}
                  text={link.text}
                  arrow
                />
              ))}
            </nav>

            <nav className="flex flex-col gap-3 md:gap-4 justify-center items-start">
              {rightLinks.map((link) => (
                <ButtonLink
                  key={link.href}
                  href={link.href}
                  text={link.text}
                  arrow
                />
              ))}
            </nav>
          </div>

          {/* Bottom "silver" bar - Stacked on mobile */}
          <div className="flex flex-col sm:flex-row bg-black gap-1.5">
            <div className="relative order-2 sm:order-1 z-10 w-full rounded-[3px] bg-chrome2 inset-chrome flex items-center py-7 px-6 lg:px-24">
              <StrokeText
                strokeWidth={{ sm: 2.6, default: 2 }}
                shadowSize={{ sm: 2.5, default: 1.4 }}
                className="text-sm md:text-lg font-bold italic text-white text-center md:text-left"
              >
                © 2026 KOMEX. Všetky práva vyhradené.
              </StrokeText>
            </div>

            <div className="relative overflow-hidden sm:overflow-visible order-1 sm:order-2 z-10 w-full sm:w-80 h-24 md:h-auto pl-2 pb-2 pt-2 sm:pt-0 rounded-[3px] bg-chrome2 inset-chrome flex justify-center items-center md:items-end">
              <Link
                className="flex justify-center items-center md:items-end"
                href="/"
              >
                <img
                  src="/logo.svg"
                  alt="KOMEX logo"
                  className="absolute bottom-0 sm:bottom-2 z-30 w-32 md:w-45 hidden sm:block"
                />
                <img
                  src="/logo-small.svg"
                  alt="KOMEX logo icon"
                  className="h-27 drop-shadow-lg block sm:hidden"
                />
                <img
                  src="/text-logo.svg"
                  alt="KOMEX logo text"
                  className="h-3/5 mt-1.5 drop-shadow-md block sm:hidden"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
