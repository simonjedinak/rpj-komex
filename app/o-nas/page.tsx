import StrokeText from "../components/StrokeText";
import ImageWrapper from "../components/ImageWrapper";

export default function AboutPage() {
  return (
    <main className="flex-1 bg-white p-20 text-white">
      <section className="bg-gray-400 inset-shadow-xl flex flex-col gap-y-8 p-8">
        <div className="p-5 gap-20 pl-16 container flex flex-row from-[#2A2D30] to-[#0D0F15] bg-linear-to-b rounded-3xl border-black border-3">
          <div className="w-1/2 flex flex-col gap-y-16 text-xl pt-3">
            <StrokeText
              key="about-title-1"
              tag="h2"
              strokeWidth={8}
              shadowSize={7}
              textColor="#ff2627"
              className="text-[5rem] font-bold text-shadow-small italic"
            >
              O nás
            </StrokeText>
            <div className="space-y-16">
              <p>
                Autoservis KOMEX vznikol ako rodinná dielňa v Prešove na
                Strojníckej ulici, kde dodnes sídli a dlhodobo poskytuje servis
                osobným aj úžitkovým vozidlám.
              </p>
              <p>
                Postupne sa z menšieho pracoviska stal plnohodnotný servis so
                zameraním na mechanické opravy, diagnostiku, pneuservis a údržbu
                klimatizácií.
              </p>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <ImageWrapper>
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="O nas 1"
              />
            </ImageWrapper>
            <div className="flex flex-row gap-x-4">
              <ImageWrapper>
                <img
                  src="/images/o-nas/IMG_20251221_232348_556 1.png"
                  alt="O nas 1"
                />
              </ImageWrapper>
              <ImageWrapper>
                <img
                  src="/images/o-nas/IMG_20251221_232348_556 1.png"
                  alt="O nas 1"
                />
              </ImageWrapper>
            </div>
          </div>
        </div>
        <div className="container overflow-hidden flex flex-row bg-linear-to-b from-[#2A2D30] to-[#0D0F15] rounded-3xl border-black border-[3px]">
          {/* Left Side - About Section */}
          <div className="w-2/3 flex flex-col border-r-2 border-gray-400 relative min-h-144">
            {/* Top: image area occupying ~50% height with title anchored at bottom */}
            <div className="w-full h-1/2 relative overflow-hidden">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Workshop background"
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1b1e22] to-transparent" />

              <div className="absolute bottom-6 pl-16 z-20">
                <StrokeText
                  key="about-title-1"
                  tag="h2"
                  strokeWidth={8}
                  shadowSize={7}
                  textColor="#ff2627"
                  className="text-5xl font-bold italic leading-none"
                >
                  Servis a repasovanie autochladičov na jednom mieste
                </StrokeText>
              </div>
            </div>

            {/* Bottom: textual content */}
            <div className="relative z-10 flex flex-col flex-1">
              <div className="px-16 pt-16 text-white text-xl leading-relaxed space-y-16">
                <p>
                  Dôležitou súčasťou KOMEXu je aj špecializácia na opravy a
                  repasovanie autochladičov, ktorá dopĺňa klasické servisné
                  práce.
                </p>
                <p>
                  Vďaka tomu vie dielňa vyriešiť bežné opravy aj špecifické
                  problémy s chladením motora na jednom mieste.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="w-1/3 flex flex-col gap-4 p-4">
            <ImageWrapper className="flex-1">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Autoservis KOMEX workshop 1"
                className="w-full h-full object-cover rounded-2xl"
              />
            </ImageWrapper>

            <ImageWrapper className="flex-1">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Autoservis KOMEX workshop 2"
                className="w-full h-full object-cover rounded-2xl"
              />
            </ImageWrapper>

            <ImageWrapper className="flex-1">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Autoservis KOMEX workshop 3"
                className="w-full h-full object-cover rounded-2xl"
              />
            </ImageWrapper>
          </div>
        </div>
      </section>
    </main>
  );
}

/*  "/images/o-nas/IMG_20251221_232348_556 1.png",
  "/images/o-nas/IMG_20251221_232350_319 1.png",
  "/images/o-nas/IMG_20251221_232351_217 1.png",
  "/images/o-nas/IMG_20251221_232352_681 1.png",
  "/images/o-nas/IMG_20251221_232354_399 1.png",
  "/images/o-nas/IMG_20251221_232356_106 1.png",
  "/images/o-nas/IMG_20251221_232357_750 1.png",
  "/images/o-nas/IMG_20251221_232359_182 1.png",
  */
