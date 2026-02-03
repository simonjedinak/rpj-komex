// app/faq/page.tsx
import React from "react";
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

const faqGallery = [
  { src: "/images/o-nas/IMG_20251221_232348_556 1.png", alt: "Servis - foto 1" },
  { src: "/images/o-nas/IMG_20251221_232348_556 1.png", alt: "Servis - foto 2" },
  { src: "/images/o-nas/IMG_20251221_232348_556 1.png", alt: "Servis - foto 3" },
  { src: "/images/o-nas/IMG_20251221_232348_556 1.png", alt: "Servis - foto 4" },
];

function CaretIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GalleryBlock({
  images,
  className = "",
}: {
  images: { src: string; alt: string }[];
  className?: string;
}) {
  const main = images.slice(0, 2);
  const thumbs = images.slice(2, 6);

  return (
    <div className={className}>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs text-zinc-300/80 font-extrabold tracking-wide">Fotogaléria</div>

        <div className="mt-3 grid grid-cols-1 gap-3">
          {main.map((img) => (
            <div
              key={img.src + img.alt}
              className="
                relative overflow-hidden rounded-2xl
                border border-white/10 bg-black/20
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
              "
            >
              <div className="aspect-[16/10]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.65)]" />
            </div>
          ))}
        </div>

        {thumbs.length ? (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {thumbs.map((img) => (
              <div
                key={img.src + img.alt}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20"
                title={img.alt}
              >
                <div className="aspect-square">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="flex-1 bg-white px-4 md:px-10 lg:px-20 py-4 md:py-8 text-white">
      <section className="bg-metal inset-shadow-xl flex flex-col gap-y-4 md:gap-y-8 p-4 md:p-8 relative">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="fixed left-0 right-0 top-2/5 h-30 blur-xl rotate-15 bg-linear-to-r from-white/50 via-white/70 to-white/50 shadow-[0_0_100px_10px_rgba(255,255,255,0.6)]" />
        </div>

        {/* header like About */}
        <div className="shadow-xl shadow-black/50 p-4 md:p-5 gap-6 md:gap-20 pl-4 md:pl-16 container flex flex-col from-[#2a2b2c] to-[#0c0d0f] bg-linear-to-b rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
          <div className="w-full flex flex-col text-base md:text-xl pt-5">
            <StrokeText
              key="faq-title"
              tag="h2"
              strokeWidth={8}
              shadowSize={7}
              textColor="#ff2627"
              className="text-3xl md:text-5xl lg:text-[5rem] font-bold italic mb-4 md:mb-10"
            >
              FAQ
            </StrokeText>

            <div className="space-y-2 md:space-y-4 text-white/90">
              <p>Často kladené otázky k termínom, STK príprave, pneuservisu, autosklu a servisu.</p>
              <p>Kliknite na otázku pre rozbalenie odpovede.</p>
            </div>
          </div>
        </div>

        <div className="container grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4 md:gap-8 relative z-10">
          {/* left: faq */}
          <div className="shadow-xl shadow-black/50 overflow-hidden flex flex-col bg-linear-to-b from-[#2a2b2c] to-[#0c0d0f] rounded-2xl md:rounded-4xl border-black border-3">
            <div className="px-4 md:px-16 pt-6 md:pt-10 pb-6 md:pb-10">
              {FAQ.map((group) => (
                <div key={group.section} className="mb-10 last:mb-0">
                  <StrokeText
                    tag="h3"
                    strokeWidth={4}
                    shadowSize={3}
                    textColor="#ff2627"
                    className="text-xl md:text-2xl font-bold italic leading-none"
                  >
                    {group.section}
                  </StrokeText>

                  <div className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <details
                        key={item.q}
                        className="
                          group relative overflow-hidden
                          rounded-2xl
                          border border-white/10
                          bg-white/5
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                          transition
                          hover:bg-white/10
                          hover:border-white/15
                          hover:-translate-y-[2px]
                          hover:shadow-[0_18px_55px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]
                          focus-within:ring-2 focus-within:ring-white/15
                          open:bg-white/10
                        "
                      >
                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute -top-12 left-[-40%] h-28 w-[180%] rotate-[-8deg] bg-white/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="absolute inset-0 ring-1 ring-white/5" />
                        </div>

                        <summary
                          className="
                            relative z-10
                            cursor-pointer list-none
                            px-4 py-4
                            grid grid-cols-[1fr_auto] items-center gap-4
                            [&::-webkit-details-marker]:hidden
                          "
                        >
                          <StrokeText
                            tag="span"
                            strokeWidth={2}
                            strokeColor="black"
                            shadowSize={2}
                            className="text-base md:text-lg font-bold leading-snug pr-2"
                          >
                            {item.q}
                          </StrokeText>

                          <span
                            className="
                              inline-flex items-center justify-center
                              h-10 w-10 rounded-xl
                              border border-white/10
                              bg-white/5
                              text-white/80
                              transition-transform
                              group-open:rotate-90
                            "
                            aria-hidden="true"
                          >
                            <CaretIcon className="h-5 w-5" />
                          </span>
                        </summary>

                        <div className="relative z-10 px-4 pb-5 text-sm md:text-[15px] text-white/85 leading-relaxed">
                          {item.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            </div>
          </div>

          {/* right: cta + images */}
          <aside className="shadow-xl shadow-black/50 p-4 md:p-5 pl-4 md:pl-10 flex flex-col from-[#242425] to-[#0c0d0f] bg-linear-to-b rounded-2xl md:rounded-4xl border-black border-3 relative lg:sticky lg:top-24 h-fit">
            <div className="pt-4 md:pt-8">
              <StrokeText
                key="faq-cta"
                tag="h2"
                strokeWidth={6}
                shadowSize={5}
                textColor="#ff2627"
                className="text-2xl md:text-4xl font-bold italic leading-none"
              >
                Nenašli ste odpoveď?
              </StrokeText>

              <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed">
                Napíšte nám a uveďte značku/model + popis problému alebo požadovanú službu.
              </p>

              <div className="mt-6">
                <ButtonLink href="/kontakt" text="Kontakt" arrow variant="small" />
              </div>

              <GalleryBlock images={faqGallery} className="mt-6" />

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-zinc-300/80 font-extrabold tracking-wide">
                  Najčastejšie témy
                </div>
                <ul className="mt-2 space-y-1 text-sm text-white/80">
                  <li>• STK príprava</li>
                  <li>• Pneu (prezúvanie + vyváženie)</li>
                  <li>• Autosklo (oprava/výmena)</li>
                  <li>• Diagnostika a poruchy</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
