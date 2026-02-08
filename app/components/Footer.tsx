// components/Footer.tsx
import { ButtonLink } from "./ButtonLink";
import StrokeText from "./StrokeText";
import { primaryNavLinks } from "../data/navigation";

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
          <div className="flex flex-col md:flex-row gap-6 md:gap-24 items-stretch px-6 md:px-24 py-8 md:py-12">
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
          <div className="flex flex-col md:flex-row bg-black gap-1.5">
            <div className="relative z-10 w-full rounded-[3px] bg-chrome2 inset-chrome py-4 md:py-7 px-6 md:px-24">
              <StrokeText
                strokeWidth={2.6}
                shadowSize={2.5}
                className="text-sm md:text-lg font-bold italic text-white text-center md:text-left"
              >
                © 2026 KOMEX. Všetky práva vyhradené.
              </StrokeText>
            </div>

            <div className="relative z-10 w-full md:w-80 h-24 md:h-auto pl-1 pb-2 rounded-[3px] bg-chrome2 inset-chrome flex justify-center items-center md:items-end">
              <img
                src="/logo.svg"
                alt="KOMEX logo"
                className="absolute z-30 w-32 md:w-45"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
