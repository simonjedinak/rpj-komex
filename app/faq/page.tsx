// app/faq/page.tsx
import StrokeText from "../components/StrokeText";
import { ButtonLink } from "../components/ButtonLink";

const FAQ = [
  {
    section: "Objednanie a termíny",
    items: [
      {
        q: "Musím sa objednať vopred?",
        a: "Odporúčame objednanie vopred, aby sme vám vedeli rezervovať termín. V urgentných prípadoch skúste zavolať a dohodneme najbližšiu možnosť.",
      },
      {
        q: "Ako dlho trvá bežná prehliadka?",
        a: "Závisí od rozsahu. Jednoduchá kontrola vie byť rýchla, pri väčšom rozsahu vám povieme čas po obhliadke vozidla.",
      },
      {
        q: "Čo mám napísať do formulára, aby ste vedeli rýchlo pomôcť?",
        a: "Značku/model, rok výroby, stručný popis problému, kedy sa prejavuje a či svietia kontrolky.",
      },
      {
        q: "Viete mi dať približnú cenu ešte pred návštevou?",
        a: "Približný odhad vieme dať podľa popisu, ale presnú cenu potvrdíme po obhliadke/diagnostike.",
      },
      {
        q: "Dá sa servis riešiť aj na počkanie?",
        a: "Pri drobných úkonoch niekedy áno, závisí od vyťaženia. Odporúčame zavolať vopred.",
      },
    ],
  },
  {
    section: "Prehliadky a príprava na STK",
    items: [
      {
        q: "Viete mi spraviť prípravu na STK?",
        a: "Áno. Skontrolujeme bežné veci, ktoré často rozhodujú o úspechu na STK, a navrhneme opravy, ak treba.",
      },
      {
        q: "Čo najčastejšie spôsobí problém na STK?",
        a: "Často sú to veci ako nevhodné/poškodené pneumatiky, puklice (odporúča sa demontovať), alebo prasklina na čelnom skle v zornom poli vodiča.",
      },
      {
        q: "Vadí prasknuté čelné sklo pri STK?",
        a: "Praskliny na čelnom skle môžu byť dôvodom neúspechu, hlavne ak sú v zornom poli vodiča alebo sú väčšie. Ak si nie ste istý, príďte na obhliadku.",
      },
      {
        q: "Čo si mám priniesť na prípravu na STK?",
        a: "Stačí prísť s vozidlom. Ak máte puklice, odporúča sa ich dať dole; pri špecifických požiadavkách vás budeme informovať.",
      },
      {
        q: "Viete skontrolovať brzdy, podvozok a svetlá pred STK?",
        a: "Áno, toto je bežná súčasť prípravy. Ak nájdeme problém, navrhneme riešenie a dohodneme postup.",
      },
    ],
  },
  {
    section: "Pneuservis (prezúvanie)",
    items: [
      {
        q: "Robíte prezúvanie pneumatík aj s vyvážením?",
        a: "Áno, prezúvanie vieme spraviť vrátane vyváženia podľa potreby.",
      },
      {
        q: "Môžem priniesť vlastné pneumatiky?",
        a: "Áno. Ak viete, napíšte do poznámky rozmer (napr. 205/55 R16) a či ide o plechové alebo hliníkové disky.",
      },
      {
        q: "Čo si mám pripraviť pred pneuservisom?",
        a: "Stačí prísť s autom. Ak máte puklice, je dobré ich dať dole (pri kontrole/STK aj pri práci okolo kolies).",
      },
      {
        q: "Robíte opravu defektu (zapichnutý klinec/skrutka)?",
        a: "Záleží od miesta poškodenia a stavu pneumatiky. Po kontrole povieme, či je oprava bezpečná.",
      },
      {
        q: "Kedy je čas na výmenu pneumatík?",
        a: "Ak je dezén nízky, pneumatika je stará/stvrdnutá, praská alebo je poškodená. Pri obhliadke vieme odporučiť ďalší postup.",
      },
    ],
  },
  {
    section: "Autosklo (výmena / oprava)",
    items: [
      {
        q: "Opravuje sa sklo alebo sa musí meniť?",
        a: "Záleží od typu a miesta poškodenia. Po obhliadke vám povieme, či je oprava bezpečná alebo odporúčame výmenu.",
      },
      {
        q: "Ako dlho trvá výmena čelného skla?",
        a: "Samotná výmena býva rýchla, ale po výmene je dôležitý čas na vytvrdnutie lepidla. Presný čas vám povieme podľa vozidla a typu skla.",
      },
      {
        q: "Môžem po výmene skla hneď odísť autom?",
        a: "Zvyčajne je potrebné počkať určitý čas, aby lepidlo správne vytvrdlo. Odporúčania dostanete pri odovzdaní vozidla.",
      },
      {
        q: "Viete opraviť malé „ťuknutie“ od kamienka?",
        a: "Ak je poškodenie malé a mimo kritických zón, často sa dá opraviť. Po obhliadke povieme, či je oprava vhodná.",
      },
      {
        q: "Čo robiť hneď po prasknutí skla?",
        a: "Odporúčame poškodenie prekryť (napr. páskou) proti vlhkosti/špine a prísť na obhliadku čo najskôr.",
      },
    ],
  },
  {
    section: "Ceny a záruka",
    items: [
      {
        q: "Koľko stojí oprava alebo servis?",
        a: "Cena závisí od rozsahu práce a dielov. Po diagnostike/obhliadke vám dáme cenový odhad.",
      },
      {
        q: "Dávate záruku na prácu a diely?",
        a: "Na vykonané práce a použité diely sa vzťahuje záruka podľa typu dielu a dohody. Detaily vám povieme pri zákazke.",
      },
    ],
  },
];

function ChromeCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[34px] p-[22px] shadow-2xl ${className}`}
      style={{
        background:
          "linear-gradient(90deg,#6b7077 0%,#c7cbd1 10%,#70757c 22%,#cfd3d8 36%,#6e737a 52%,#b8bcc2 66%,#5b6067 82%,#c7cbd1 92%,#5a5f66 100%)",
        boxShadow:
          "inset 0 16px 34px rgba(0,0,0,.70), inset 0 -14px 26px rgba(255,255,255,.10), 0 24px 60px rgba(0,0,0,.35)",
      }}
    >
      <div
        className="rounded-[26px] p-[12px]"
        style={{
          background:
            "linear-gradient(180deg,#0a0f15 0%,#141a22 55%,#070a0f 100%)",
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,.08), inset 0 -10px 30px rgba(0,0,0,.85)",
        }}
      >
        <div className="rounded-[20px] bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden relative">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-12 bg-white/10 blur-md" />
            <div className="absolute inset-0 ring-1 ring-white/5" />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.65)]" />
          </div>
          <div className="relative z-10 p-5 md:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-[70vh]">
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-950 to-black" />

        <div className="relative container mx-auto px-4 py-10">
          {/* Chrome header with StrokeText (like footer style) */}
          <div
            className="
              mb-8
              rounded-[2px]
              px-5 py-4
              [background:linear-gradient(180deg,#3A3A3A_-29.23%,#A4A4A4_-5.96%,#606060_11.48%,#CECECE_34.34%,#8F8F8F_50.25%,#464646_72.22%,#696969_94.18%)]
              shadow-[inset_0px_3.30363px_4.95545px_rgba(255,255,255,0.6)]
            "
          >
            <StrokeText
              tag="h1"
              strokeWidth={3}
              strokeColor="black"
              shadowSize={2}
              className="text-2xl md:text-3xl font-extrabold italic tracking-tight"
            >
              Často kladené otázky
            </StrokeText>

            <div className="mt-1">
              <StrokeText
                tag="p"
                strokeWidth={2}
                strokeColor="black"
                shadowSize={2}
                className="text-sm md:text-base text-white/90"
              >
                Rýchle odpovede k STK príprave, pneuservisu, autosklu a servisu.
              </StrokeText>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* FAQ */}
            <ChromeCard>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold italic text-red-500">
                    FAQ
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-zinc-300">
                    Kliknite na otázku pre rozbalenie odpovede.
                  </p>
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-zinc-700/70" />

              <div className="mt-6 space-y-10">
                {FAQ.map((group) => (
                  <div key={group.section}>
                    <h3 className="text-white/90 font-bold mb-3">
                      {group.section}
                    </h3>

                    <div className="space-y-3">
                      {group.items.map((item) => (
                        <details
                          key={item.q}
                          className="group rounded-md border border-white/10 bg-white/5 open:bg-white/10"
                        >
                          <summary className="cursor-pointer list-none px-4 py-3 grid grid-cols-[1fr_auto] items-center gap-4">
                            <StrokeText
                              strokeWidth={2}
                              strokeColor="black"
                              shadowSize={2}
                              className="text-base md:text-lg font-bold leading-snug pr-2"
                            >
                              {item.q}
                            </StrokeText>

                            <span className="text-white/70 group-open:rotate-90 transition-transform">
                              ▸
                            </span>
                          </summary>

                          <div className="px-4 pb-4 text-sm text-white/80 leading-relaxed">
                            {item.a}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            </ChromeCard>

            {/* CTA */}
            <ChromeCard className="lg:sticky lg:top-24">
              <h3 className="text-2xl font-extrabold italic text-red-500">
                Nenašli ste odpoveď?
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                Napíšte nám a uveďte značku/model + popis problému alebo
                požadovanú službu.
              </p>

              <div className="mt-6 h-px w-full bg-zinc-700/70" />

              <div className="mt-5">
                <ButtonLink
                  href="/kontakt"
                  text="Kontakt"
                  arrow
                  variant="small"
                />
              </div>

              <div className="mt-6 rounded-lg bg-black/20 ring-1 ring-white/5 p-4 text-sm text-zinc-300">
                <div className="text-xs text-zinc-400">Najčastejšie témy</div>
                <ul className="mt-2 space-y-1">
                  <li>• STK príprava</li>
                  <li>• Pneu (prezúvanie + vyváženie)</li>
                  <li>• Autosklo (oprava/výmena)</li>
                  <li>• Diagnostika a poruchy</li>
                </ul>
              </div>
            </ChromeCard>
          </div>
        </div>
      </section>
    </main>
  );
}
