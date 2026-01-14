// components/Footer.tsx

import { ButtonLink } from "./ButtonLink";
import StrokeText from "./StrokeText";

export default function Footer() {
    return (
        <footer className="mt-auto text-white">
            <div className="relative overflow-hidden">
                {/* Carbon background (public/images/carbon.png -> /images/carbon.png) */}
                <div
                    className="
            absolute inset-0
            bg-[url('/images/carbon.png')]
            bg-repeat bg-left-top
          "
                />
                <div className="absolute inset-0 bg-black/70" />

                <div className="relative">
                    {/* Top area */}
                    <div className="container mx-auto px-4 pt-8 pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-[240px_300px_1fr] gap-10 items-start">
                            {/* Left buttons (stacked) */}
                            <nav className="flex flex-col gap-4">
                                <ButtonLink href="/" text="Domov" arrow variant="small" />
                                <ButtonLink href="/o-nas" text="O nás" arrow variant="small" />
                                <ButtonLink href="/nieco" text="Niečo" arrow variant="small" />
                            </nav>

                            {/* Middle buttons (stacked) */}
                            <nav className="flex flex-col gap-4">
                                <ButtonLink
                                    href="/faq"
                                    text="Často kladené otázky"
                                    arrow
                                    variant="small"
                                />
                                <ButtonLink href="/o-nas" text="O nás" arrow variant="small" />
                                <ButtonLink href="/nieco" text="Niečo" arrow variant="small" />
                            </nav>

                            {/* Logo (bigger + overlaps silver bar) */}
                            <div className="relative flex md:justify-end">
                                <img
                                    src="/logo.svg"
                                    alt="KOMEX logo"
                                    className="
                    relative z-30
                    w-36 h-36 md:w-44 md:h-44
                    translate-y-8 md:translate-y-14
                  "
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom “silver” bar */}
                    <div
                        className="
              relative z-10
              w-full
              rounded-[2px]
              [background:linear-gradient(180deg,#3A3A3A_-29.23%,#A4A4A4_-5.96%,#606060_11.48%,#CECECE_34.34%,#8F8F8F_50.25%,#464646_72.22%,#696969_94.18%)]
              shadow-[inset_0px_3.30363px_4.95545px_rgba(255,255,255,0.6)]
            "
                    >
                        <div className="container mx-auto px-4 py-6">
                            <div className="flex items-center gap-6">
                                {/* Same color as button text (white) */}
                                <StrokeText
                                    strokeWidth={2}
                                    className="text-lg font-bold text-shadow-small text-white"
                                >
                                    © 2026 KOMEX. Všetky práva vyhradené.
                                </StrokeText>

                                <div className="h-6 w-px bg-black/30" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
