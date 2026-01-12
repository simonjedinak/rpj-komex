import Link from "next/link";
import StrokeText from "./StrokeText";

export default function Navbar() {
  return (
    <nav className="shadow-md bg-black flex flex-col gap-1.5">
      <div className="w-full h-10 bg-chrome1 inset-chrome"></div>
      <div className="flex flex-row gap-1.5">
        <div className="w-80 bg-chrome2 inset-chrome"></div>
        <div className="flex justify-between items-center bg-chrome2 inset-chrome w-full">
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
