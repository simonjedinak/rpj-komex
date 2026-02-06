import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import ScrollNavbar from "./components/ScrollNavbar";
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
        {/* Sticky scroll navbar - desktop only */}
        <ScrollNavbar />
        <div className="flex flex-col container mx-auto">
          {/* Desktop navbar - hidden on mobile */}
          <Navbar />
          {children}
          <Footer />
        </div>
        {/* Mobile navbar - fixed at bottom */}
        <MobileNavbar />
        <div className="md:hidden bg-chrome2 mobile-bar h-4 w-full fixed z-100 bottom-0 left-0" />
        {/* Add padding at bottom on mobile to account for fixed navbar */}
        <div className="h-15 md:hidden" />
      </body>
    </html>
  );
}
