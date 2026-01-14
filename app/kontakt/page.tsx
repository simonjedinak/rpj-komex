// app/kontakt/page.tsx

import ContactForm from "../components/ContactForm";

export default function KontaktPage() {
    return (
        <main className="min-h-[70vh]">
            <section className="relative overflow-hidden">
                {/* New background (no carbon) */}
                <div className="absolute inset-0 bg-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-950 to-black" />

                <div className="relative container mx-auto px-4 py-10">
                    {/* Silver header */}
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
                            Kontaktujte nás
                        </h1>
                        <p className="text-sm text-black/70">
                            Napíšte nám a ozveme sa čo najskôr (servis, diagnostika, opravy).
                        </p>
                    </div>

                    <ContactForm />
                </div>
            </section>
        </main>
    );
}
