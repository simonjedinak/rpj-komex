import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileNavbar from "./components/MoibleNavbar";

export const metadata: Metadata = {
  title: "KOMEX - Autoservis",
  description: "KOMEX - Váš spoľahlivý partner pre autoservis a opravy",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={`antialiased flex flex-col min-h-screen bg-[#1e1e1e]`}>
        <div className="flex flex-col container mx-auto">
          {/* Desktop navbar - hidden on mobile */}
          <Navbar />
          {children}
          <Footer />
        </div>
        {/* Mobile navbar - fixed at bottom */}
        <MobileNavbar />
        {/* Add padding at bottom on mobile to account for fixed navbar */}
        <div className="h-32 md:hidden" />
      </body>
    </html>
  );
}
