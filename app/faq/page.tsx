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

export default function FaqPage() {
    return (
        <main className="min-h-[70vh]">
            <section className="relative overflow-hidden">
                {/* Background (no carbon) */}
                <div className="absolute inset-0 bg-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-950 to-black" />

                <div className="relative container mx-auto px-4 py-10">
                    {/* Chrome header */}
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
                            Často kladené otázky
                        </h1>
                        <p className="text-sm text-black/70">
                            Rýchle odpovede k STK príprave, pneuservisu, autosklu a servisu.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
                        {/* FAQ */}
                        <div className="rounded-lg border border-white/10 bg-black/40 p-5 md:p-6">
                            <div className="space-y-8">
                                {FAQ.map((group) => (
                                    <div key={group.section}>
                                        <h2 className="text-white/90 font-bold mb-3">
                                            {group.section}
                                        </h2>

                                        <div className="space-y-3">
                                            {group.items.map((item) => (
                                                <details
                                                    key={item.q}
                                                    className="group rounded-md border border-white/10 bg-white/5 open:bg-white/10"
                                                >
                                                    <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-4">
                                                        <StrokeText
                                                            strokeWidth={2}
                                                            className="text-lg font-bold text-shadow-small"
                                                        >
                                                            {item.q}
                                                        </StrokeText>

                                                        <span className="text-white/70 group-open:rotate-90 transition-transform">
                              ▸
                            </span>
                                                    </summary>

                                                    <div className="px-4 pb-4 text-sm text-white/80">
                                                        {item.a}
                                                    </div>
                                                </details>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <aside className="rounded-lg border border-white/10 bg-black/35 p-5">
                            <h3 className="font-bold text-white/95 mb-2">Nenašli ste odpoveď?</h3>
                            <p className="text-sm text-white/75 mb-4">
                                Napíšte nám a uveďte značku/model + popis problému alebo požadovanú službu.
                            </p>
                            <ButtonLink href="/kontakt" text="Kontakt" arrow variant="small" />
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}
