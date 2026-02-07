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
        <div className="scale-y-[0.3] sm:scale-y-50 md:scale-y-75 lg:scale-y-100 origin-top">
          <SvgBar className="rotate-180 top-0" />
        </div>
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
        <div className="scale-y-[0.3] sm:scale-y-50 md:scale-y-75 lg:scale-y-100 origin-bottom">
          <SvgBar className="bottom-0" />
        </div>
      </section>
      <div className="h-3 sm:h-4 md:h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome"></div>

      <section className="flex flex-col items-center">
        <div className="w-full flex justify-center">
          <StrokeText
            strokeWidth={7.8}
            tag="h2"
            shadowSize={7}
            className="text-[4rem] font-bold translate-y-13 scale-50 sm:scale-75 md:scale-90 lg:scale-100 origin-center"
          >
            Naše služby
          </StrokeText>
        </div>
        <div className="pt-12 sm:pt-16 md:pt-20 bg-chrome2 bg-size-[100%_30%] bg-no-repeat w-full">
          <Display className="w-full" />
        </div>
        <div className="h-3 sm:h-4 md:h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome" />
        <div className="w-full h-20 sm:h-24 md:h-32 bg-[#2d1a0e] flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-10">
          <div className="h-10 sm:h-12 md:h-16 aspect-square rounded-full knob" />
          <div className="h-14 sm:h-16 md:h-22 aspect-square rounded-full knob" />
        </div>
        <div className="h-3 sm:h-4 md:h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome" />
      </section>

      <section className="py-8 sm:py-12 md:py-16 bg-neutral-300">
        <div className="w-full max-w-[calc(2*40rem+3rem)] mx-auto px-0 sm:px-6 md:px-8 lg:px-28 flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
          <Panel title="O nás" className="w-full sm:max-w-[50rem]">
            <p>
              Autoservis Komex na Strojníckej ulici v Prešove ponúka komplexné služby pre osobné aj úžitkové vozidlá všetkých značiek.
            </p>
            <p>
              Náš tím skúsených mechnikov sa stará o vaše vozidlo s osobným prístupom, ktorý vytvára dlhodobé vzťahy s klientmi založené na dôvere a spokojnosti.
            </p>
            <p>
              Disponujeme moderným vybavením vrátane zdvihakov, diagnostických prístrojov, pneuservisu a klimatizačných staníc pre precíznu a rýchlu opravu.
            </p>
          </Panel>
          <AboutGallery />
        </div>
      </section>
    </main>
  );
}
