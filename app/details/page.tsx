// app/details/page.tsx
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
    <main className="flex-1 text-black bg-white">
      <section className="relative overflow-hidden">
        {/* Background from Kontakt page */}
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-950 to-black" />

        <div className="relative container mx-auto px-4 py-10">
          {/* Silver Header Box */}
          <div
            className="
              mb-8
              rounded-[2px]
              px-5 py-4
              [background:linear-gradient(180deg,#3A3A3A_-29.23%,#A4A4A4_-5.96%,#606060_11.48%,#CECECE_34.34%,#8F8F8F_50.25%,#464646_72.22%,#696969_94.18%)]
              shadow-[inset_0px_3.30363px_4.95545px_rgba(255,255,255,0.6)]
            "
          >
            <h1 className="text-xl md:text-2xl font-bold text-black/85">
              Details
            </h1>
            <p className="text-sm text-black/70">
              Detailný prehľad služieb – diagnostika, servis a opravy na jednom
              mieste.
            </p>
          </div>
        </div>
      </section>

      <div className="h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome" />

      <section className="flex flex-col items-center">
        <StrokeText
          strokeWidth={7.8}
          tag="h2"
          shadowSize={7}
          className="text-[3rem] md:text-[4rem] font-bold translate-y-13 text-center"
        >
          Naše služby
        </StrokeText>

        <div className="pt-20 bg-chrome2 bg-size-[100%_30%] bg-no-repeat w-full">
          <div className="container mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <article
                  key={s.title}
                  className="rounded-2xl bg-white border border-black/10 shadow-sm p-6 hover:bg-black/5 transition-colors"
                >
                  <h3 className="text-xl font-bold">{s.title}</h3>

                  <ul className="mt-4 space-y-2 text-gray-700">
                    {s.description.map((line) => (
                      <li key={line} className="leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>

                  {s.note ? (
                    <p className="mt-4 text-sm text-gray-600 border-t border-black/10 pt-4">
                      {s.note}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
