import FisheyeCarousel from "../components/FisheyeCarousel";

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Section 1 - O nás */}
      <section className="w-full"></section>
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-red-500 italic">
                  O nás
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Autoservis KOMEX vznikol ako rodinná dielňa v Prešove na
                  Strojníckej ulici, kde dodnes sídli a dlhodobo poskytuje
                  servis osobným aj úžitkovým vozidlám.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Postupne sa z menšieho pracoviska stal plnohodnotný servis so
                  zameraním na mechanické opravy, diagnostiku, pneuservis a
                  údržbu klimatizácií.
                </p>
              </div>
            </div>

            {/* Right Column - Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <img
                  src="/images/budova-komex.jpg"
                  alt="Autoservis KOMEX - exteriér budovy"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <img
                  src="/images/budova-bočný-pohľad.jpg"
                  alt="Bočný pohľad na budovu"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Servis a repasovanie autochladičov */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Images */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <img
                  src="/images/mobilny-servis-dodavka.jpg"
                  alt="Mobilný servis - dodávka"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <img
                  src="/images/servisna-hala-vnutro.jpg"
                  alt="Vnútro servisnej haly"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="col-span-2">
                <img
                  src="/images/servisne-vozidla.jpg"
                  alt="Servisné vozidlá"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="col-span-2">
                <img
                  src="/images/diagnostika-vozidla.jpg"
                  alt="Diagnostika vozidla"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-red-500 italic">
                  Servis a repasovanie autochladičov na jednom mieste
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Dôležitou súčasťou služieb KOMEX-u je aj špecializácia na
                  opravy a repasovanie autochladičov, ktorá sústreďuje klasické
                  servisné úkony aj širšiu údržbu chladiaceho systému na jedno
                  miesto.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Vďaka tomu vie dielňa vyriešiť bežné opravy aj špecifické
                  problémy s chladením motora na jednom mieste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Rodinný servis dvoch generácií */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-red-500 italic">
                  Rodinný servis dvoch generácií
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Rodinný charakter realizuje aj úzky prístup k zákazníkom - či
                  už ide o zakladateľa (otca) generála a ďalšiu mladú generáciu,
                  všetci si uchovávame klasický servisný na Strojníckej ulici.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Autoservis KOMEX dnes funguje ako spolupráca dvoch generácií -
                  samotný servis vozidiel vedie Marcel Komka, zatiaľ čo na
                  opravy a repasovanie autochladičov sa špecializuje jeho otec
                  Dušan Komka.
                </p>
                <div className="mt-8">
                  <a
                    href="/kontakt"
                    className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Objednajte sa u nás
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <img
                  src="/images/budova-detail-vchod.jpg"
                  alt="Detail vchodu do autoservisu"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <img
                  src="/images/budova-exterier-detail.jpg"
                  alt="Detail exteriéru budovy"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Prečo si vybrať Komex
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-3xl text-red-500">🤝</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Osobný prístup</h3>
                  <p className="text-gray-600">
                    Otvorená komunikácia – vždy vysvetlíme, čo je potrebné
                    urobiť a prečo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl text-red-500">⚡</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Rýchle termíny</h3>
                  <p className="text-gray-600">
                    Snaha skrátiť čas odstávky vozidla na minimum a flexibilné
                    objednávanie.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl text-red-500">💰</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Korektné ceny</h3>
                  <p className="text-gray-600">
                    Férové ceny a možnosť vopred sa dohodnúť na rozpočte opravy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-3xl text-red-500">⭐</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Kvalitná práca</h3>
                  <p className="text-gray-600">
                    Dlhoročné skúsenosti a spokojní zákazníci sú zárukou našej
                    kvality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Kontakt a objednávky</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Objednať sa môžete telefonicky alebo e-mailom; radi vám nájdeme
              termín, ktorý vám bude vyhovovať.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Autoservis Komex nájdete na{" "}
              <strong>Strojníckej ulici v Prešove</strong>, s jednoduchým
              prístupom a možnosťou parkovania priamo pri dielni.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
