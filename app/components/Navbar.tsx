import Link from "next/link";
import StrokeText from "./StrokeText";
import ChromeDivider from "./ChromeDivider";

export default function Navbar() {
  return (
    <nav className="shadow-md bg-black flex flex-col gap-1.5">
      <div className="w-full h-10 flex gap-1.5 bg-chrome1 inset-chrome">
        <div className="container w-80"></div>
        <div className="w-full h-full flex justify-between items-center py-2 -ml-0.5 pr-20">
          <ChromeDivider />
          <StrokeText
            strokeWidth={2}
            strokeColor="black"
            className="text-lg font-bold text-shadow-small"
          >
            info@komex-auto.sk
          </StrokeText>
          <ChromeDivider />
          <StrokeText
            strokeWidth={2}
            strokeColor="black"
            className="text-lg font-bold text-shadow-small"
          >
            0905 489 092
          </StrokeText>
          <ChromeDivider />
          <StrokeText
            strokeWidth={2}
            strokeColor="black"
            className="text-lg font-bold text-shadow-small"
          >
            6A, Strojnícka 13179, 080 06 Prešov
          </StrokeText>
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
            strokeColor="black"
            className="text-5xl font-bold text-shadow-main"
          >
            Profesionálna starostlivosť
          </StrokeText>
        </div>
      </div>
      <div className="w-full h-10 bg-chrome1 inset-chrome">
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-red-500 transition-colors">
              Domov
            </Link>
          </li>
          <li>
            <Link
              href="/o-nas"
              className="hover:text-red-500 transition-colors"
            >
              O nás
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
