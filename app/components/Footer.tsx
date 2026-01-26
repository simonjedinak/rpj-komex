// components/Footer.tsx
import { ButtonLink } from "./ButtonLink";
import StrokeText from "./StrokeText";

export default function Footer() {
  return (
    <footer className="mt-auto shadow-footer">
      <div className="h-6 w-full bg-chrome2 inset-chrome" />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/carbon.png')] bg-repeat bg-top-left" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative">
          <div className="flex flex-col md:flex-row gap-24 items-stretch px-24 py-12">
            <nav className="flex flex-col gap-4 h-full justify-center items-start">
              <ButtonLink href="/" text="Domov" arrow />
              <ButtonLink href="/o-nas" text="O nás" arrow />
              <ButtonLink href="/details" text="Details" arrow />
            </nav>

            <nav className="flex flex-col gap-4 justify-center items-start ">
              <ButtonLink href="/faq" text="Často kladené otázky" arrow />
              <ButtonLink href="/kontakt" text="Kontakt" arrow />

              {/* ZMENENÉ: "Niečo" -> "Kalendár" */}
              <ButtonLink href="/kalendar" text="Kalendár" arrow />
            </nav>
          </div>

          {/* Bottom “silver” bar */}
          <div className="flex bg-black gap-1.5">
            <div className="relative z-10 w-full rounded-[3px] bg-chrome2 inset-chrome py-7 px-24">
              <StrokeText
                strokeWidth={2}
                className="text-lg font-bold text-shadow-small text-white"
              >
                © 2026 KOMEX. Všetky práva vyhradené.
              </StrokeText>
            </div>

            <div className="relative z-10 w-80 pl-1 pb-2 rounded-[3px] bg-chrome2 inset-chrome flex justify-center items-end">
              <img
                src="/logo.svg"
                alt="KOMEX logo"
                className="absolute z-30 w-45"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
