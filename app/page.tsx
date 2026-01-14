import FisheyeCarousel from "./components/FisheyeCarousel";
import SvgBar from "./components/SvgBar";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative from-gray-900 to-gray-800 text-white overflow-hidden">
        <SvgBar className="rotate-180 top-0" />
        <FisheyeCarousel />
        <SvgBar className="bottom-0" />
      </section>
      <div className="h-6 w-full bg-chrome1"></div>

      <section id="sluzby" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Naše služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-red-500">
                Servis a údržba
              </h3>
              <p className="text-gray-600">
                Pravidelný servis a údržba vozidiel všetkých značiek. Výmena
                olejov, filtrov a technické kontroly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-red-500">
                Diagnostika
              </h3>
              <p className="text-gray-600">
                Profesionálna diagnostika pomocou najmodernejších zariadení.
                Identifikácia a riešenie problémov.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-red-500">
                Opravy
              </h3>
              <p className="text-gray-600">
                Kompletné opravy motorov, prevodoviek, brzd a ďalších
                komponentov vozidla.
              </p>
            </div>
          </div>
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
