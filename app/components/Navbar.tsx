import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-500">
            KOMEX
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">
                Domov
              </Link>
            </li>
            <li>
              <Link href="/o-nas" className="hover:text-red-500 transition-colors">
                O nás
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
