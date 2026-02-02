// app/details/page.tsx
import React from "react";
import StrokeText from "../components/StrokeText";

type Service = {
  title: string;
  description: string[];
  note?: string;
};

const services: Service[] = [
  {
    title: "Motor",
    description: [
      "Naši odborníci vykonávajú podrobnú diagnostiku motora a zameriame sa na skutočnú príčinu problému, nie len na jeho prejavy.",
      "Pri diagnostike pracujeme aj s OBD‑II chybovými kódmi (DTC) a následne ich overujeme meraním a kontrolami priamo na vozidle.",
      "Robíme aj diagnostiku a opravy systémov ako turbo, EGR/DPF a vstrekovanie podľa typu a modelu vozidla, vrátane návrhu ďalšieho postupu opravy.",
    ],
  },
  {
    title: "Výmena oleja",
    description: [
      "Špecialista sa postará o kompletnú výmenu motorového oleja vrátane filtrov.",
      "Typ oleja volíme podľa predchádzajúcej prehliadky a zároveň podľa želania zákazníka (vždy tak, aby to zodpovedalo špecifikácii motora).",
      "Pracujeme podľa odporúčaní výrobcu pre každý typ motora a upozorníme aj na zistenia, ktoré sa pri výmene často ukážu (úniky, nadmerná spotreba oleja, stav tesnení).",
    ],
  },
  {
    title: "Brzdy",
    description: [
      "Zabezpečujeme detailnú kontrolu a opravu brzdového systému – platničky, kotúče, strmene, hadice aj diagnostiku príčiny vibrácií či pískania.",
      "Brzdy testujeme a servisujeme s maximálnou presnosťou, aby bol brzdný účinok bezpečný a stabilný v každej situácii.",
      "Robíme aj výmenu brzdovej kvapaliny a odvzdušnenie.",
    ],
    note:
        "Ako všeobecné odporúčanie sa často uvádza približne každé 2 roky (vždy však podľa výrobcu a stavu kvapaliny).",
  },
  {
    title: "Sklá vozidla",
    description: [
      "Opravujeme aj vymieňame čelné, bočné a zadné sklá vozidiel a riešime aj drobné poškodenia typu „ťuknutie“ (ak je oprava možná a bezpečná).",
      "Používame kvalitné materiály a profesionálne technológie, pričom postup vždy prispôsobíme špecifikácii konkrétneho modelu.",
    ],
    note: "ADAS kalibráciu kamier/senzorov po výmene čelného skla nevykonávame.",
  },
  {
    title: "Elektronika",
    description: [
      "Realizujeme kompletnú diagnostiku elektronických systémov vozidla a vyhodnocujeme chybové hlásenia riadiacich jednotiek.",
      "Neostávame len pri „prečítaní chýb“ – hľadáme príčinu (kabeláž, konektory, snímače, reálne hodnoty), aby sa zbytočne nemenili diely naslepo.",
      "Zabezpečujeme aj špecializované kontroly elektroniky podľa značky a typu vozidla.",
    ],
  },
  {
    title: "Prehliadky",
    description: [
      "Poskytujeme komplexné technické a emisné prehliadky vozidiel a prípravu na STK/EK.",
      "Všetky úkony riešime efektívne a na jednom mieste – od kontroly až po odstránenie zistených nedostatkov po odsúhlasení.",
      "Ponúkame aj odvoz vozidla na STK/EK podľa dohody, aby zákazník nemusel riešiť logistiku.",
    ],
  },
  {
    title: "Osvetlenie",
    description: [
      "Vymieňame a kontrolujeme všetky typy svetiel na vozidle – svetlomety aj vnútorné osvetlenie.",
      "Riešime aj poruchy kontaktov, pätíc, poistiek a kabeláže, aby bolo osvetlenie spoľahlivé a bezpečné.",
      "Rýchla a kvalitná výmena je u nás štandardom.",
    ],
  },
  {
    title: "Pneumatiky",
    description: [
      "Zabezpečujeme kompletný pneuservis – prezutie, vyvažovanie aj kontrolu tlaku.",
      "Používame moderné vybavenie pre presnú montáž pneumatík a servis prispôsobujeme značke a typu vozidla.",
      "Ponúkame aj uskladnenie pneumatík, aby zákazník nemusel riešiť priestor a manipuláciu doma.",
    ],
  },
  {
    title: "Mechanické systémy",
    description: [
      "Opravujeme mechanické časti vozidiel pomocou špičkových nástrojov a s dôrazom na detail.",
      "Kontroly mechaniky vykonávame podľa špecifikácie výrobcu a reálneho stavu vozidla (vôle, úniky, opotrebenie), aby bolo jasné, čo je nutné riešiť hneď a čo môže počkať.",
      "Odborné know‑how a kvalitne odvedená práca sú u nás samozrejmosťou.",
    ],
  },
  {
    title: "Klíma",
    description: [
      "Vykonávame plnenie, čistenie a opravu klimatizačných systémov, aby ste mali optimálne chladenie aj v horúcich podmienkach.",
      "Servisujeme klimatizácie s chladivom R134a; servis klimatizácií na R1234yf momentálne neponúkame.",
      "R1234yf systémy používajú odlišné servisné pripojenia/couplery a vyžadujú špecifické vybavenie, preto je dôležité mať to uvedené transparentne.",
    ],
  },
];

export default function DetailsPage() {
  return (
      <main className="flex-1 bg-white px-4 md:px-10 lg:px-20 py-4 md:py-8 text-white">
        <section className="bg-metal inset-shadow-xl flex flex-col gap-y-4 md:gap-y-8 p-4 md:p-8 relative">
          {/* rovnaký “light streak” background ako v About */}
          <div
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              aria-hidden="true"
          >
            <div className="fixed left-0 right-0 top-2/5 h-30 blur-xl rotate-15 bg-linear-to-r from-white/50 via-white/70 to-white/50 shadow-[0_0_100px_10px_rgba(255,255,255,0.6)]" />
          </div>

          {/* HERO panel (ako prvý blok v About) */}
          <div className="shadow-xl shadow-black/50 p-4 md:p-5 gap-6 md:gap-20 pl-4 md:pl-16 container flex flex-col from-[#2a2b2c] to-[#0c0d0f] bg-linear-to-b rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
            <div className="w-full flex flex-col pt-2 md:pt-5">
              <StrokeText
                  key="details-title"
                  tag="h2"
                  strokeWidth={8}
                  shadowSize={7}
                  textColor="#ff2627"
                  className="text-3xl md:text-5xl lg:text-[5rem] font-bold italic mb-3 md:mb-6"
              >
                Naše služby
              </StrokeText>

              <p className="text-base md:text-xl text-white/90 max-w-4xl leading-relaxed">
                Prehľadne podľa oblastí. Ak si neviete vybrať, napíšte značku/model
                a popis problému.
              </p>

              <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            </div>
          </div>

          {/* GRID panel (vizuálne podobné “sekciám” v About) */}
          <div className="shadow-xl shadow-black/50 container overflow-hidden flex flex-col bg-linear-to-b from-[#2a2b2c] to-[#0c0d0f] rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
            <div className="px-4 md:px-16 pt-6 md:pt-10 pb-6 md:pb-10">
              <StrokeText
                  key="details-subtitle"
                  tag="h2"
                  strokeWidth={6}
                  shadowSize={5}
                  textColor="#ff2627"
                  className="text-2xl md:text-4xl lg:text-5xl font-bold italic leading-none"
              >
                Detailný prehľad
              </StrokeText>

              <p className="mt-3 text-sm md:text-base text-zinc-200/90 max-w-3xl">
                Každá karta vysvetľuje, čo vieme spraviť, čo kontrolujeme a na čo
                si dať pozor.
              </p>

              <div className="mt-6 h-px w-full bg-zinc-700/70" />

              {/* Karty: glass + shine + hover (ako v tvojom pôvodnom Details) */}
              <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
                {services.map((s) => (
                    <article
                        key={s.title}
                        className="
                    group relative overflow-hidden
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                    backdrop-blur-md
                    p-6
                    transition
                    hover:bg-white/10
                    hover:border-white/15
                    hover:-translate-y-[2px]
                    hover:shadow-[0_18px_55px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]
                    focus-within:ring-2 focus-within:ring-white/15
                  "
                    >
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -top-12 left-[-40%] h-28 w-[180%] rotate-[-8deg] bg-white/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-0 ring-1 ring-white/5" />
                        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.65)]" />
                      </div>

                      <div className="relative z-10">
                        <h3
                            className="
                        text-lg md:text-xl
                        font-extrabold
                        text-white
                        tracking-tight
                        transition-colors
                        group-hover:text-red-400
                      "
                        >
                          {s.title}
                        </h3>

                        <ul className="mt-4 space-y-2 text-sm md:text-[15px] text-zinc-200">
                          {s.description.map((line) => (
                              <li key={line} className="leading-relaxed text-zinc-200/95">
                                {line}
                              </li>
                          ))}
                        </ul>

                        {s.note ? (
                            <div className="mt-4 border-t border-white/10 pt-4">
                              <p className="text-xs md:text-sm text-zinc-300/95">
                                {s.note}
                              </p>
                            </div>
                        ) : null}
                      </div>
                    </article>
                ))}
              </div>

              <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            </div>
          </div>
        </section>
      </main>
  );
}
