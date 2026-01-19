export default function AboutPage() {
  return (
      <main className="flex-1 bg-neutral-200 py-10">
        <section className="mx-auto w-[min(980px,92vw)]">
          {/* BIG DARK CHROME FRAME (brushed metal) */}
          <div
              className="rounded-[34px] p-[28px] shadow-2xl"
              style={{
                // darker brushed-metal look
                background:
                    "linear-gradient(90deg, #7b7f86 0%, #b8bcc2 10%, #7a7e85 22%, #c7cbd1 36%, #7a7e85 52%, #b7bbc1 66%, #6b7077 82%, #c7cbd1 92%, #6a6f76 100%)",
                boxShadow:
                    "inset 0 16px 34px rgba(0,0,0,.65), inset 0 -14px 26px rgba(255,255,255,.10), 0 24px 60px rgba(0,0,0,.35)",
              }}
          >
            {/* inner dark edge */}
            <div
                className="rounded-[26px] p-[12px]"
                style={{
                  background:
                      "linear-gradient(180deg, #0a0f15 0%, #141a22 55%, #070a0f 100%)",
                  boxShadow:
                      "inset 0 2px 0 rgba(255,255,255,.08), inset 0 -10px 30px rgba(0,0,0,.8)",
                }}
            >
              {/* CARD */}
              <div className="rounded-[20px] bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden relative">
                {/* subtle inner glow like in design */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-x-0 top-0 h-12 bg-white/12 blur-md" />
                  <div className="absolute inset-0 ring-1 ring-white/5" />
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.65)]" />
                </div>

                {/* Header strip */}
                <div className="px-8 pt-8 relative">
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-8 px-8 py-8 relative">
                  {/* LEFT */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-5xl font-extrabold italic text-red-500 tracking-tight">
                        O nás
                      </h2>
                      <div className="mt-4 space-y-4 text-zinc-200 leading-relaxed">
                        <p>
                          Autoservis KOMEX vznikol ako rodinná dielňa v Prešove na
                          Strojníckej ulici, kde dodnes sídli a dlhodobo poskytuje
                          servis osobným aj úžitkovým vozidlám.
                        </p>
                        <p className="text-zinc-300">
                          Postupne sa z menšieho pracoviska stal plnohodnotný
                          servis so zameraním na mechanické opravy, diagnostiku,
                          pneuservis a údržbu klimatizácií.
                        </p>
                      </div>
                    </div>

                    <div className="h-px w-full bg-zinc-700/70" />

                    <div>
                      <h3 className="text-3xl font-extrabold italic text-red-500">
                        Servis a repasovanie
                        <span className="block text-2xl text-red-500/90">
                        autochladičov na jednom mieste
                      </span>
                      </h3>
                      <div className="mt-4 space-y-4 text-zinc-200 leading-relaxed">
                        <p>
                          Dôležitou súčasťou služieb KOMEX-u je aj špecializácia
                          na opravy a repasovanie autochladičov, ktorá sústreďuje
                          klasické servisné úkony aj širšiu údržbu chladiaceho
                          systému na jedno miesto.
                        </p>
                        <p className="text-zinc-300">
                          Vďaka tomu vie dielňa vyriešiť bežné opravy aj špecifické
                          problémy s chladením motora na jednom mieste.
                        </p>
                      </div>
                    </div>

                    <div className="h-px w-full bg-zinc-700/70" />

                    <div>
                      <h3 className="text-4xl font-extrabold italic text-red-500">
                        Rodinný servis
                        <span className="block text-3xl text-red-500/90">
                        dvoch generácií
                      </span>
                      </h3>

                      <div className="mt-4 space-y-4 text-zinc-200 leading-relaxed">
                        <p>
                          Rodinný charakter podniku sa odráža aj v prístupe k
                          zákazníkom a dlhodobej dôvere.
                        </p>
                        <p className="text-zinc-300">
                          Autoservis KOMEX dnes funguje ako spolupráca dvoch
                          generácií — servis vozidiel vedie Marcel Komka, opravy a
                          repasovanie autochladičov zabezpečuje Dušan Komka.
                        </p>
                      </div>

                      <div className="mt-6">
                        <a
                            href="/kontakt"
                            className="inline-flex items-center justify-center rounded-md bg-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900 shadow hover:bg-white transition"
                        >
                          Objednajte sa u nás
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: photo grid (tiles) */}
                  <aside className="lg:pl-2">
                    <div className="grid grid-cols-2 gap-3 auto-rows-[92px]">
                      <div className="col-span-2 row-span-2 rounded-md overflow-hidden ring-1 ring-zinc-700/70">
                        <img
                            src="/images/o-nas/IMG_20251221_232359_182 1.png"
                            alt="KOMEX - detail"
                            className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="rounded-md overflow-hidden ring-1 ring-zinc-700/70">
                        <img
                            src="/images/o-nas/IMG_20251221_232357_750 1.png"
                            alt="KOMEX - budova"
                            className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="rounded-md overflow-hidden ring-1 ring-zinc-700/70">
                        <img
                            src="/images/o-nas/IMG_20251221_232351_217 1.png"
                            alt="KOMEX - hala"
                            className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="col-span-2 row-span-2 rounded-md overflow-hidden ring-1 ring-zinc-700/70">
                        <img
                            src="/images/o-nas/IMG_20251221_232356_106 1.png"
                            alt="KOMEX - servis"
                            className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="col-span-2 row-span-2 rounded-md overflow-hidden ring-1 ring-zinc-700/70">
                        <img
                            src="/images/o-nas/IMG_20251221_232352_681 1.png"
                            alt="KOMEX - diagnostika"
                            className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="col-span-2 row-span-2 rounded-md overflow-hidden ring-1 ring-zinc-700/70">
                        <img
                            src="/images/o-nas/IMG_20251221_232351_217 1.png"
                            alt="KOMEX - detail vnútra"
                            className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
                  </aside>
                </div>

                {/* Footer */}
                <div className="px-8 pb-10 relative">
                  <div className="rounded-xl bg-zinc-950/40 ring-1 ring-zinc-700/60 p-6">
                    <div className="text-center">
                      <div className="text-5xl font-extrabold italic text-red-500 leading-tight">
                        Rodinný servis
                        <br />
                        dvoch generácií
                      </div>
                      <div className="mt-4 text-zinc-300">
                        Strojnícka ulica, Prešov • Servis osobných aj úžitkových
                        vozidiel
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-6 relative">
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
