// app/kontakt/ContactForm.tsx (alebo kde to máš)
"use client";

import React, { useMemo, useState } from "react";
import StrokeText from "../components/StrokeText";

type Subject = "prehliadka" | "sklo" | "pneu" | "porucha" | "podozrenie";

type FormState = {
  name: string;
  email: string;
  phone: string;
  brand: string;
  model: string;
  subject: Subject;
  message: string;
  consent: boolean;
};

// ASCII keys kvôli ESLint varovaniam, pekné názvy riešime cez BRAND_LABELS
const BRAND_MODELS: Record<string, string[]> = {
  "": ["— Vyberte značku —"],
  Audi: ["A3", "A4", "A6", "Q5", "Q7", "Iné"],
  BMW: ["1", "3", "5", "X3", "X5", "Iné"],
  Citroen: ["Berlingo", "C3", "C4", "Jumper", "Iné"],
  Dacia: ["Duster", "Logan", "Sandero", "Iné"],
  Fiat: ["Ducato", "Panda", "Punto", "Iné"],
  Ford: ["Fiesta", "Focus", "Transit", "Iné"],
  Hyundai: ["i30", "Tucson", "Iné"],
  Kia: ["Ceed", "Sportage", "Iné"],
  Mercedes: ["A", "C", "E", "Sprinter", "Vito", "Iné"],
  Opel: ["Astra", "Corsa", "Insignia", "Vivaro", "Iné"],
  Peugeot: ["Partner", "308", "Boxer", "Iné"],
  Renault: ["Clio", "Megane", "Master", "Trafic", "Iné"],
  Skoda: ["Fabia", "Octavia", "Superb", "Kodiaq", "Iné"],
  Toyota: ["Corolla", "Yaris", "RAV4", "Hilux", "Iné"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Transporter", "Iné"],
  Volvo: ["S60", "XC60", "XC90", "Iné"],
  InaZnacka: ["Iné"],
};

const BRAND_LABELS: Record<string, string> = {
  Citroen: "Citroën",
  Skoda: "Škoda",
  InaZnacka: "Iná značka",
};

function brandLabel(key: string) {
  return BRAND_LABELS[key] ?? key;
}

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Nepodarilo sa odoslať. Skúste znova.";
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  const { label, value, onChange, placeholder, required, type } = props;

  const common =
    "w-full rounded-md bg-zinc-950/40 text-zinc-100 ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70 px-3 py-2 outline-none";

  return (
    <div className="space-y-2">
      <label className="text-sm text-zinc-200">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <input
        type={type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={common}
      />
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorText, setErrorText] = useState("");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    subject: "prehliadka",
    message: "",
    consent: false,
  });

  const modelsForBrand = useMemo(() => {
    return BRAND_MODELS[form.brand] ?? ["Iné"];
  }, [form.brand]);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      form.email.trim().includes("@") &&
      form.brand.trim().length >= 1 &&
      form.model.trim().length >= 1 &&
      form.message.trim().length >= 10 &&
      form.consent === true &&
      status !== "sending"
    );
  }, [form, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setStatus("sending");
      setErrorText("");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type") || "";
      const payload: unknown = contentType.includes("application/json")
        ? await res.json().catch(() => ({}))
        : { error: await res.text().catch(() => "") };

      const payloadObj =
        payload && typeof payload === "object"
          ? (payload as Record<string, unknown>)
          : null;
      const payloadError =
        payloadObj && typeof payloadObj.error === "string"
          ? payloadObj.error
          : "";

      if (!res.ok) {
        throw new Error(payloadError || `Server error (${res.status})`);
      }

      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        brand: "",
        model: "",
        subject: "prehliadka",
        message: "",
        consent: false,
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorText(getErrorMessage(err));
    }
  }

  return (
    <main className="flex-1 bg-white px-4 md:px-10 lg:px-20 py-4 md:py-8 text-white">
      <section className="bg-metal inset-shadow-xl flex flex-col gap-y-4 md:gap-y-8 p-4 md:p-8 relative">
        {/* rovnaký “light streak” ako About */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="fixed left-0 right-0 top-2/5 h-30 blur-xl rotate-15 bg-linear-to-r from-white/50 via-white/70 to-white/50 shadow-[0_0_100px_10px_rgba(255,255,255,0.6)]" />
        </div>

        {/* panel v štýle About (jeden veľký blok) */}
        <div className="shadow-xl shadow-black/50 p-4 md:p-5 gap-6 md:gap-10 pl-4 md:pl-16 container flex flex-col from-[#1b1b1c] to-[#0c0d0f] bg-linear-to-b rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
          <div className="w-full flex flex-col text-base md:text-xl pt-3 md:pt-6">
            <StrokeText
              strokeWidth={8}
              shadowSize={7}
              className="text-3xl md:text-5xl lg:text-[5rem] font-bold italic mb-3 md:mb-6"
              textColor="#ff2627"
            >
              Napíšte nám
            </StrokeText>

            <p className="text-sm md:text-base text-zinc-200/90 max-w-4xl">
              Odpovieme čo najskôr. Pre urýchlenie vyplňte značku, model a typ
              problému.
            </p>

            <div className="mt-6 h-0.5 w-full bg-linear-to-r from-transparent via-zinc-600 to-transparent" />
          </div>

          {/* kontakt info (ostáva responsívne, len dizajn zarovnaný) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">Telefón</div>
              <div className="mt-1 text-sm md:text-base text-zinc-100">
                +421 905 489 092
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">E-mail</div>
              <div className="mt-1 text-sm md:text-base text-zinc-100">
                komex.autos@gmail.com
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">Preferovaný kontakt</div>
              <div className="mt-1 text-sm md:text-base text-zinc-100">
                Telefón alebo e-mail
              </div>
            </div>
          </div>

          <div className="mt-2 h-px w-full bg-zinc-700/70" />

          <form
            onSubmit={onSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Field
              label="Meno a priezvisko"
              required
              value={form.name}
              onChange={(v) => setForm((s) => ({ ...s, name: v }))}
              placeholder="napr. Ján Novák"
            />

            <Field
              label="E-mail"
              required
              value={form.email}
              onChange={(v) => setForm((s) => ({ ...s, email: v }))}
              placeholder="napr. jan.novak@email.sk"
              type="email"
            />

            <Field
              label="Telefón"
              value={form.phone}
              onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
              placeholder="napr. +421 9xx xxx xxx"
            />

            <div className="space-y-2">
              <label className="text-sm text-zinc-200">
                Typ <span className="text-red-500">*</span>
              </label>
              <select
                value={form.subject}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    subject: e.target.value as Subject,
                  }))
                }
                className="w-full rounded-md bg-zinc-950/40 text-zinc-100 ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70 px-3 py-2 outline-none"
              >
                <option value="prehliadka">Prehliadka</option>
                <option value="sklo">Sklo</option>
                <option value="pneu">Pneu</option>
                <option value="porucha">Porucha</option>
                <option value="podozrenie">Podozrenie</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-200">
                Značka auta <span className="text-red-500">*</span>
              </label>
              <select
                value={form.brand}
                onChange={(e) => {
                  const brand = e.target.value;
                  setForm((s) => ({ ...s, brand, model: "" }));
                }}
                className="w-full rounded-md bg-zinc-950/40 text-zinc-100 ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70 px-3 py-2 outline-none"
              >
                <option value="">— Vyberte značku —</option>
                {Object.keys(BRAND_MODELS)
                  .filter((b) => b !== "")
                  .map((b) => (
                    <option key={b} value={b}>
                      {brandLabel(b)}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-200">
                Model / názov auta <span className="text-red-500">*</span>
              </label>
              <select
                value={form.model}
                onChange={(e) =>
                  setForm((s) => ({ ...s, model: e.target.value }))
                }
                disabled={!form.brand}
                className="w-full rounded-md bg-zinc-950/40 text-zinc-100 ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70 px-3 py-2 outline-none disabled:opacity-40"
              >
                {!form.brand ? (
                  <option value="">Najprv vyberte značku</option>
                ) : (
                  <>
                    <option value="">— Vyberte model —</option>
                    {modelsForBrand.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-zinc-200">
                Správa <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm((s) => ({ ...s, message: e.target.value }))
                }
                rows={6}
                placeholder="Popíšte problém, prípadne VIN/ŠPZ a preferovaný termín..."
                className="w-full rounded-md bg-zinc-950/40 text-zinc-100 ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70 px-3 py-2 outline-none resize-y"
              />
              <div className="text-xs text-zinc-400">Minimum 10 znakov.</div>
            </div>

            <div className="md:col-span-2 mt-1 flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={form.consent}
                onChange={(e) =>
                  setForm((s) => ({ ...s, consent: e.target.checked }))
                }
                className="mt-1 h-4 w-4 accent-red-500"
              />
              <label htmlFor="consent" className="text-sm text-zinc-300">
                Súhlasím so spracovaním údajov pre účely kontaktovania.
                <span className="text-red-500"> *</span>
              </label>
            </div>

            <div className="md:col-span-2 mt-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="text-sm">
                {status === "sent" && (
                  <span className="text-green-400">Správa bola odoslaná.</span>
                )}
                {status === "error" && (
                  <span className="text-red-400">
                    {errorText || "Nepodarilo sa odoslať. Skúste znova."}
                  </span>
                )}
                {status === "sending" && (
                  <span className="text-zinc-300">Odosielanie…</span>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center justify-center rounded-md bg-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900 shadow transition hover:bg-white disabled:opacity-40 disabled:hover:bg-zinc-200"
              >
                Odoslať správu
              </button>
            </div>
          </form>

          <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-zinc-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">Adresa</div>
              <div className="mt-1">Strojnícka ulica, Prešov</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">Otváracie hodiny</div>
              <div className="mt-1">Po–Pi 08:00–16:00</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">Tip</div>
              <div className="mt-1">Pridajte VIN/ŠPZ a preferovaný termín.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
