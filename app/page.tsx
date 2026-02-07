import Display from "./components/Display";
import FisheyeCarousel from "./components/FisheyeCarousel";
import Panel from "./components/Panel";
import StrokeText from "./components/StrokeText";
import SvgBar from "./components/SvgBar";
import AboutGallery from "./components/AboutGallery";

export default function Home() {
  return (
    <main className="flex-1 text-black bg-white">
      <section className="relative from-gray-900 to-gray-800 text-white overflow-hidden">
        <SvgBar className="rotate-180 top-0" />
        <FisheyeCarousel
          imageUrls={[
            "/images/car2.avif",
            "/images/car2.avif",
            "/images/car2.avif",
            "/images/car2.avif",
          ]}
          autoplayInterval={4000}
          animationDuration={1200}
        />
        <SvgBar className="bottom-0" />
      </section>
      <div className="h-4 md:h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome"></div>

      <section className="flex flex-col items-center">
        <StrokeText
          strokeWidth={{ default: 3, md: 5, lg: 7.8 }}
          tag="h2"
          shadowSize={{ default: 3, md: 5, lg: 7 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-bold translate-y-8 sm:translate-y-10 md:translate-y-13 px-4"
        >
          Naše služby
        </StrokeText>
        <div className="pt-16 sm:pt-20 bg-chrome2 bg-size-[100%_30%] bg-no-repeat w-full">
          <Display className="w-full" />
        </div>
        <div className="h-4 md:h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome" />
        <div className="w-full h-24 md:h-32 bg-[#2d1a0e] flex flex-row justify-center items-center gap-6 md:gap-10">
          <div className="h-12 md:h-16 aspect-square rounded-full knob" />
          <div className="h-16 md:h-22 aspect-square rounded-full knob" />
        </div>
        <div className="h-4 md:h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome" />
      </section>

      {/* Updated: Container with max-width to match gallery panels */}
      <section className="py-8 sm:py-12 md:py-16 bg-neutral-300">
        <div className="w-full max-w-[calc(2*40rem+3rem)] mx-auto px-0 sm:px-8 md:px-12 lg:px-8 flex flex-col items-center gap-8 md:gap-10">
          <Panel title="O nás" className="w-full">
            <p>
              Nezávislý autoservis zameraný na kompletnú starostlivosť o osobné a
              úžitkové vozidlá všetkých bežných značiek.
            </p>
            <p>
              Staviame na dlhoročných skúsenostiach, poctivej práci a
              individuálnom prístupe ku každému zákazníkovi.
            </p>
            <p>
              Pri práci používame overené náhradné diely a moderné vybavenie,
              vďaka ktorému dokážeme rýchlo nájsť a odstrániť poruchu.
            </p>
          </Panel>
          <AboutGallery />
        </div>
      </section>
    </main>
  );
}
