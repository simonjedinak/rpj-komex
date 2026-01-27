import StrokeText from "../components/StrokeText";
import ImageWrapper from "../components/ImageWrapper";

export default function AboutPage() {
  return (
    <main className="flex-1 bg-white p-20 text-white">
      <section className="bg-gray-400 inset-shadow-xl flex flex-col gap-y-8 p-8">
        <div className="p-5 gap-20 pl-16 container flex flex-row from-[#2A2D30] to-[#0D0F15] bg-linear-to-b rounded-3xl border-black border-3">
          <div className="w-1/2 flex flex-col gap-y-6 text-xl pt-3">
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
        <div className="container overflow-hidden flex flex-row bg-gradient-to-b from-[#2A2D30] to-[#0D0F15] rounded-3xl border-black border-[3px]">
          {/* Left Side - About Section */}
          <div className="w-1/2 flex flex-col border-r-2 border-black relative">
            <div className="w-full h-full absolute top-0 left-0">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Workshop background"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="pt-12 pl-16">
                <StrokeText
                  key="about-title-1"
                  tag="h2"
                  strokeWidth={8}
                  shadowSize={7}
                  textColor="#ff2627"
                  className="text-[5rem] font-bold italic leading-none"
                >
                  O nás
                </StrokeText>
              </div>

              <div className="px-16 pb-16 mt-auto text-white text-lg leading-relaxed space-y-4">
                <p>
                  Autoservis KOMEX vznikol ako rodinná dielňa v Prešove na
                  Strojníckej ulici, kde dodnes sídli a dlhodobo poskytuje
                  servis osobným aj úžitkovým vozidlám.
                </p>
                <p>
                  Postupne sa z menšieho pracoviska stal plnohodnotný servis so
                  zameraním na mechanické opravy, diagnostiku, pneuservis a
                  údržbu klimatizácií.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="w-1/2 flex flex-col gap-4 p-4">
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
