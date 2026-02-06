import Link from "next/link";
import StrokeText from "./StrokeText";
import ChromeDivider from "./ChromeDivider";
import { ButtonLink } from "./ButtonLink";
import { primaryNavLinks } from "../data/navigation";

type NavTextItem = string | { text: string; href: string };

const navTopTexts: NavTextItem[] = [
  "", // divider
  { text: "komex.autos@gmail.com", href: "/kontakt" },
  "",
  "0905 489 092",
  "",
  {
    text: "6A, Strojnícka 13179, 080 06 Prešov",
    href: "https://www.google.com/maps?hl=en&gl=sk&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x473eed541c4adaf5:0xcd04b9c6de01d2fc",
  },
];

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Navbar() {
  return (
    <nav className="shadow-navbar bg-black flex flex-col gap-1.5 py-1.5 relative z-50">
      {/* TOP BAR */}
      <div className="w-full h-10 flex gap-1.5 bg-chrome1 inset-chrome">
        <div className="container w-80 hidden lg:block" />

        <div className="w-full h-full flex justify-around lg:justify-between items-center py-2 lg:-ml-0.5 lg:pr-20">
          {navTopTexts.map((item: NavTextItem, index: number) => {
            const isDivider = item === "";
            const text = typeof item === "string" ? item : item.text;
            const href = typeof item === "object" ? item.href : null;

            if (isDivider)
              return (
                <ChromeDivider
                  className={index === 0 ? "hidden lg:flex" : ""}
                  key={`divider-${index}`}
                />
              );

            const Content = (
              <StrokeText
                strokeWidth={2.6}
                shadowSize={2.5}
                className="md:text-base sm:text-sm text-[10px] font-bold italic"
              >
                {text}
              </StrokeText>
            );

            if (!href) return <span key={`text-${index}`}>{Content}</span>;

            if (isExternalHref(href)) {
              return (
                <a key={`link-${index}`} href={href}>
                  {Content}
                </a>
              );
            }

            return (
              <Link key={`link-${index}`} href={href}>
                {Content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* MIDDLE BAR (logo + title) */}
      <div className="flex flex-row gap-1.5">
        <div className="w-80 bg-chrome2 inset-chrome relative flex justify-center items-center rounded-xs">
          <Link href="/" className="absolute w-45 mr-1">
            <img src="/logo.svg" alt="KOMEX Logo" />
          </Link>
        </div>

        <div className="flex justify-between items-center bg-chrome2 inset-chrome w-full px-10 py-6 rounded-xs">
          <StrokeText
            strokeWidth={6}
            shadowSize={5}
            tag="h1"
            className="text-5xl font-bold "
          >
            Profesionálna starostlivosť
          </StrokeText>
        </div>
      </div>

      {/* BOTTOM BAR (buttons like footer) */}
      <div className="w-full md:flex flex-row h-10 gap-1.5 bg-chrome1 inset-chrome hidden ">
        <div className="container w-80 lg:block hidden" />

        <ul className="w-full h-full flex items-center lg:justify-start justify-around lg:gap-10 py-2 -ml-0.5 text-sm tracking-wide lg:text-md xl:text-lg">
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
    </nav>
  );
}
