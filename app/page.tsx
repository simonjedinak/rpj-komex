import Display from "./components/Display";
import FisheyeCarousel from "./components/FisheyeCarousel";
import StrokeText from "./components/StrokeText";
import SvgBar from "./components/SvgBar";

export default function Home() {
  return (
    <main className="flex-1 text-black bg-white">
      <section className="relative from-gray-900 to-gray-800 text-white overflow-hidden">
        <SvgBar className="rotate-180 top-0" />
        <FisheyeCarousel />
        <SvgBar className="bottom-0" />
      </section>
      <div className="h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome "></div>

      <section className="flex flex-col items-center">
        <StrokeText
          strokeWidth={7.8}
          tag="h2"
          shadowSize={7}
          className="text-[4rem] font-bold translate-y-13"
        >
          Naše služby
        </StrokeText>
        <div className="pt-20 bg-chrome2 bg-size-[100%_30%] bg-no-repeat w-full">
          <Display className="w-full" />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prečo si vybrať KOMEX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="p-6">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-semibold text-xl mb-2">Skúsení mechanici</h3>
              <p className="text-gray-600">
                Tím odborníkov s dlhoročnými praxou
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-xl mb-2">Rýchle služby</h3>
              <p className="text-gray-600">
                Efektívne a včasné dokončenie prác
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold text-xl mb-2">Férové ceny</h3>
              <p className="text-gray-600">
                Transparentné cenníky bez skrytých poplatkov
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-semibold text-xl mb-2">Kvalita</h3>
              <p className="text-gray-600">
                Používame len kvalitné náhradné diely
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
