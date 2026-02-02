// app/o-nas/page.tsx (alebo kde máš AboutPage)
"use client";

import { useState } from "react";
import StrokeText from "../components/StrokeText";
import ImageWrapper from "../components/ImageWrapper";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const galleryImages = [
  "/images/o-nas/IMG_20251221_232348_556 1.png",
  "/images/o-nas/IMG_20251221_232350_319 1.png",
  "/images/o-nas/IMG_20251221_232351_217 1.png",
  "/images/o-nas/IMG_20251221_232352_681 1.png",
  "/images/o-nas/IMG_20251221_232354_399 1.png",
  "/images/o-nas/IMG_20251221_232356_106 1.png",
  "/images/o-nas/IMG_20251221_232357_750 1.png",
  "/images/o-nas/IMG_20251221_232359_182 1.png",
];

export default function AboutPage() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleImageClick = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <main className="flex-1 bg-white px-4 md:px-10 lg:px-20 py-4 md:py-8 text-white">
        <section className="bg-metal inset-shadow-xl flex flex-col gap-y-4 md:gap-y-8 p-4 md:p-8 relative">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <div className="fixed left-0 right-0 top-2/5 h-30 blur-xl rotate-15 bg-linear-to-r from-white/50 via-white/70 to-white/50 shadow-[0_0_100px_10px_rgba(255,255,255,0.6)]" />
          </div>

          {/* BLOK 1 */}
          <div className="shadow-xl shadow-black/50 p-4 md:p-5 gap-6 md:gap-20 pl-4 md:pl-16 container flex flex-col lg:flex-row from-[#2a2b2c] to-[#0c0d0f] bg-linear-to-b rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
            <div className="w-full lg:w-3/5 flex flex-col text-base md:text-xl pt-5">
              <StrokeText
                key="about-title-1"
                tag="h2"
                strokeWidth={8}
                shadowSize={7}
                textColor="#ff2627"
                className="text-3xl md:text-5xl lg:text-[5rem] font-bold italic mb-4 md:mb-10"
              >
                O nás
              </StrokeText>
              <div className="space-y-4 md:space-y-8">
                <p>
                  Autoservis KOMEX vznikol ako rodinná dielňa v Prešove na Strojníckej ulici,
                  kde dodnes sídli a dlhodobo poskytuje servis osobným aj úžitkovým vozidlám.
                </p>
                <p>
                  Postupne sa z menšieho pracoviska stal plnohodnotný servis so zameraním na
                  mechanické opravy, diagnostiku, pneuservis a údržbu klimatizácií.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-2/5 flex flex-col gap-y-4">
              {/* klikateľné */}
              <button
                type="button"
                onClick={() => handleImageClick(0)}
                className="text-left cursor-pointer transition-transform hover:scale-[1.02]"
                aria-label="Otvoriť obrázok 1"
              >
                <ImageWrapper>
                  <img src={galleryImages[0]} alt="O nas 1" />
                </ImageWrapper>
              </button>

              <div className="flex flex-row gap-x-4">
                <button
                  type="button"
                  onClick={() => handleImageClick(1)}
                  className="text-left w-full cursor-pointer transition-transform hover:scale-[1.02]"
                  aria-label="Otvoriť obrázok 2"
                >
                  <ImageWrapper>
                    <img src={galleryImages[1]} alt="O nas 2" />
                  </ImageWrapper>
                </button>

                <button
                  type="button"
                  onClick={() => handleImageClick(2)}
                  className="text-left w-full cursor-pointer transition-transform hover:scale-[1.02]"
                  aria-label="Otvoriť obrázok 3"
                >
                  <ImageWrapper>
                    <img src={galleryImages[2]} alt="O nas 3" />
                  </ImageWrapper>
                </button>
              </div>
            </div>
          </div>

          {/* BLOK 2 */}
          <div className="shadow-xl shadow-black/50 container overflow-hidden flex flex-col lg:flex-row bg-linear-to-b from-[#2a2b2c] to-[#0c0d0f] rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
            <div className="w-full lg:w-3/5 flex flex-col lg:border-r-2 border-gray-400 relative min-h-80 lg:min-h-144">
              <div className="w-full h-48 md:h-1/2 relative overflow-hidden">
                {/* NEKLIKATEĽNÝ: ten čo má gradient overlay */}
                <img
                  src="/images/o-nas/IMG_20251221_232348_556 1.png"
                  alt="Workshop background"
                  className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1b1d] via-[#1a1b1d]/60 to-transparent" />

                <div className="absolute bottom-4 md:bottom-6 px-4 md:pl-16">
                  <StrokeText
                    key="about-title-2"
                    tag="h2"
                    strokeWidth={6}
                    shadowSize={5}
                    textColor="#ff2627"
                    className="text-2xl md:text-4xl lg:text-5xl font-bold italic leading-none"
                  >
                    Servis a repasovanie autochladičov na jednom mieste
                  </StrokeText>
                </div>
              </div>

              <div className="relative flex flex-col flex-1">
                <div className="px-4 md:px-16 pt-4 md:pt-8 pb-4 space-y-4 md:space-y-8 text-white text-base md:text-xl leading-relaxed">
                  <p>
                    Dôležitou súčasťou KOMEXu je aj špecializácia na opravy a repasovanie
                    autochladičov, ktorá dopĺňa klasické servisné práce.
                  </p>
                  <p>
                    Vďaka tomu vie dielňa vyriešiť bežné opravy aj špecifické problémy s chladením
                    motora na jednom mieste.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            </div>

            {/* pravý stĺpec (klikateľné) */}
            <div className="w-full lg:w-2/5 flex flex-col gap-4 p-4">
              <button
                type="button"
                onClick={() => handleImageClick(3)}
                className="text-left cursor-pointer transition-transform hover:scale-[1.02]"
                aria-label="Otvoriť workshop obrázok 1"
              >
                <ImageWrapper className="flex-1">
                  <img
                    src={galleryImages[3]}
                    alt="Autoservis KOMEX workshop 1"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </ImageWrapper>
              </button>

              <button
                type="button"
                onClick={() => handleImageClick(4)}
                className="text-left cursor-pointer transition-transform hover:scale-[1.02]"
                aria-label="Otvoriť workshop obrázok 2"
              >
                <ImageWrapper className="flex-1">
                  <img
                    src={galleryImages[4]}
                    alt="Autoservis KOMEX workshop 2"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </ImageWrapper>
              </button>

              <button
                type="button"
                onClick={() => handleImageClick(5)}
                className="text-left cursor-pointer transition-transform hover:scale-[1.02]"
                aria-label="Otvoriť workshop obrázok 3"
              >
                <ImageWrapper className="flex-1">
                  <img
                    src={galleryImages[5]}
                    alt="Autoservis KOMEX workshop 3"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </ImageWrapper>
              </button>
            </div>
          </div>

          {/* BLOK 3 */}
          <div className="shadow-xl shadow-black/50 p-4 md:p-5 gap-6 md:gap-20 pl-4 md:pl-16 container flex flex-col lg:flex-row from-[#242425] to-[#0c0d0f] bg-linear-to-b rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
            <div className="w-full lg:w-3/5 flex flex-col space-y-4 md:space-y-7 text-base md:text-xl pt-4 md:pt-8">
              <StrokeText
                key="about-title-3"
                tag="h2"
                strokeWidth={6}
                shadowSize={5}
                textColor="#ff2627"
                className="text-2xl md:text-4xl lg:text-5xl font-bold italic leading-none"
              >
                Rodinný servis dvoch generácií
              </StrokeText>
              <div className="space-y-4 md:space-y-8">
                <p>
                  Rodinný charakter podniku a osobný prístup k zákazníkom sú základom dobrej
                  povesti a stálej klientely servisu na Strojníckej ulici.
                </p>
                <p>
                  Autoservis KOMEX dnes funguje ako spolupráca dvoch generácií - samotný servis
                  vozidiel vedie Marcel Komka, zatiaľ čo na opravy a repasovanie autochladičov sa
                  špecializuje jeho otec Dušan Komka
                </p>
              </div>
            </div>

            <div className="w-full lg:w-2/5 flex flex-col gap-y-4">
              <button
                type="button"
                onClick={() => handleImageClick(6)}
                className="text-left cursor-pointer transition-transform hover:scale-[1.02]"
                aria-label="Otvoriť rodinný servis obrázok 1"
              >
                <ImageWrapper>
                  <img src={galleryImages[6]} alt="Rodinný servis 1" />
                </ImageWrapper>
              </button>

              <div className="flex flex-row gap-x-4">
                <button
                  type="button"
                  onClick={() => handleImageClick(7)}
                  className="text-left w-full cursor-pointer transition-transform hover:scale-[1.02]"
                  aria-label="Otvoriť rodinný servis obrázok 2"
                >
                  <ImageWrapper>
                    <img src={galleryImages[7]} alt="Rodinný servis 2" />
                  </ImageWrapper>
                </button>

                <button
                  type="button"
                  onClick={() => handleImageClick(0)}
                  className="text-left w-full cursor-pointer transition-transform hover:scale-[1.02]"
                  aria-label="Otvoriť rodinný servis obrázok 3"
                >
                  <ImageWrapper>
                    <img src={galleryImages[0]} alt="Rodinný servis 3" />
                  </ImageWrapper>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={galleryImages.map((src) => ({ src }))}
      />
    </>
  );
}
