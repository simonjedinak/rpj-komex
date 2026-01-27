// app/details/page.tsx

import React from "react";

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

function ChromePanel({
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
            <div className="relative z-10 p-6 md:p-8">{children}</div>
          </div>
        </div>
      </div>
  );
}

export default function DetailsPage() {
  return (
      <main className="min-h-[70vh] bg-neutral-200 py-10">
        <section className="mx-auto w-[min(1100px,92vw)]">


          <ChromePanel>
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold italic text-red-500">
                Naše služby
              </h2>
              <p className="mt-2 text-sm md:text-base text-zinc-300">
                Prehľadne podľa oblastí. Ak si neviete vybrať, napíšte značku/model
                a popis problému.
              </p>
            </div>

            <div className="mt-6 h-px w-full bg-zinc-700/70" />

            {/* Upravené: karty dizajnovo bližšie k FAQ (glass + shine + jemný hover) */}
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

          </ChromePanel>
        </section>
      </main>
  );
}
