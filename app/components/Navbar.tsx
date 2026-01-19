import Link from "next/link";
import StrokeText from "./StrokeText";
import ChromeDivider from "./ChromeDivider";
import { ButtonLink } from "./ButtonLink";

const navTopTexts: string[] = [
  "",
  "info@komex-auto.sk",
  "",
  "0905 489 092",
  "",
  "6A, Strojnícka 13179, 080 06 Prešov",
];

const navLinks: string[] = ["Domov", "O nás", "Servis", "Kontakt"];

export default function Navbar() {
  return (
    <nav className="shadow-navbar bg-black flex flex-col gap-1.5 py-1.5 relative z-50">
      <div className="w-full h-10 flex gap-1.5 bg-chrome1 inset-chrome">
        <div className="container w-80"></div>
        <div className="w-full h-full flex justify-between items-center py-2 -ml-0.5 pr-20">
          {navTopTexts.map((text: string, index: number) =>
            text === "" ? (
              <ChromeDivider key={`divider-${index}`} />
            ) : (
              <StrokeText
                key={`text-${index}`}
                strokeWidth={2}
                className="text font-bold text-shadow-small"
              >
                {text}
              </StrokeText>
            )
          )}
        </div>
      </div>
      <div className="flex flex-row gap-1.5">
        <div className="w-80 bg-chrome2 inset-chrome relative flex justify-center items-center rounded-xs">
          <Link href="/" className="absolute w-45 mr-1">
            <img src="/logo.svg" alt="KOMEX Logo" />
          </Link>
        </div>

        <div className="flex justify-between items-center bg-chrome2 inset-chrome w-full px-10 py-6 rounded-xs">
          <StrokeText
            strokeWidth={6}
            tag="h1"
            className="text-5xl font-bold text-shadow-main"
          >
            Profesionálna starostlivosť
          </StrokeText>
        </div>
      </div>
      <div className="w-full flex flex-row h-10 gap-1.5 bg-chrome1 inset-chrome">
        <div className="container w-80"></div>
        <ul className="w-full h-full flex items-center gap-10 py-2 -ml-0.5">
          {navLinks.map((link: string, index: number) => (
            <li key={`nav-link-${index}`}>
              <ButtonLink
                href={link === "Domov" ? "/" : `/${link.toLowerCase()}`}
                variant="small"
                text={link}
                arrow={true}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
