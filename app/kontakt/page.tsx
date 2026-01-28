"use client";

import React, { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;

  brand: string;
  model: string;

  subject: "prehliadka" | "sklo" | "pneu" | "porucha" | "podozrenie";
  message: string;
  consent: boolean;
};

const BRAND_MODELS: Record<string, string[]> = {
  "": ["— Vyberte značku —"],
  Audi: ["A3", "A4", "A6", "Q5", "Q7", "Iné"],
  BMW: ["1", "3", "5", "X3", "X5", "Iné"],
  Citroën: ["Berlingo", "C3", "C4", "Jumper", "Iné"],
  Dacia: ["Duster", "Logan", "Sandero", "Iné"],
  Fiat: ["Ducato", "Panda", "Punto", "Iné"],
  Ford: ["Fiesta", "Focus", "Transit", "Iné"],
  Hyundai: ["i30", "Tucson", "Iné"],
  Kia: ["Ceed", "Sportage", "Iné"],
  Mercedes: ["A", "C", "E", "Sprinter", "Vito", "Iné"],
  Opel: ["Astra", "Corsa", "Insignia", "Vivaro", "Iné"],
  Peugeot: ["Partner", "308", "Boxer", "Iné"],
  Renault: ["Clio", "Megane", "Master", "Trafic", "Iné"],
  Škoda: ["Fabia", "Octavia", "Superb", "Kodiaq", "Iné"],
  Toyota: ["Corolla", "Yaris", "RAV4", "Hilux", "Iné"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Transporter", "Iné"],
  Volvo: ["S60", "XC60", "XC90", "Iné"],
  "Iná značka": ["Iné"],
};

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
      const payload = contentType.includes("application/json")
        ? await res.json().catch(() => ({}))
        : { error: await res.text().catch(() => "") };

      if (!res.ok) {
        throw new Error(payload?.error || `Server error (${res.status})`);
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
    } catch (err: any) {
      setStatus("error");
      setErrorText(err?.message || "Nepodarilo sa odoslať. Skúste znova.");
    }
  }

  return (
    <section className="w-full">
      <div
        className="rounded-[34px] p-[22px] shadow-2xl"
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

            <div className="relative z-10 p-6 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold italic text-red-500">
                    Napíšte nám
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-zinc-300">
                    Odpovieme čo najskôr. Pre urýchlenie vyplňte značku, model a
                    typ problému.
                  </p>
                </div>

                <div className="hidden md:block text-right">
                  <div className="text-xs text-zinc-400">Telefón</div>
                  <div className="text-sm text-zinc-200">+421 905 489 092</div>
                  <div className="mt-2 text-xs text-zinc-400">E-mail</div>
                  <div className="text-sm text-zinc-200">info@komex.sk</div>
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-zinc-700/70" />

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
                        subject: e.target.value as FormState["subject"],
                      }))
                    }
                    className="w-full rounded-md bg-zinc-950/40 text-zinc-100
                               ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70
                               px-3 py-2 outline-none"
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
                    className="w-full rounded-md bg-zinc-950/40 text-zinc-100
                               ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70
                               px-3 py-2 outline-none"
                  >
                    <option value="">— Vyberte značku —</option>
                    {Object.keys(BRAND_MODELS)
                      .filter((b) => b !== "")
                      .map((b) => (
                        <option key={b} value={b}>
                          {b}
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
                    className="w-full rounded-md bg-zinc-950/40 text-zinc-100
                               ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70
                               px-3 py-2 outline-none disabled:opacity-40"
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
                    className="w-full rounded-md bg-zinc-950/40 text-zinc-100
                               ring-1 ring-zinc-700/70 focus:ring-2 focus:ring-red-500/70
                               px-3 py-2 outline-none resize-y"
                  />
                  <div className="text-xs text-zinc-400">
                    Minimum 10 znakov.
                  </div>
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
                      <span className="text-green-400">
                        Správa bola odoslaná.
                      </span>
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
                    className="inline-flex items-center justify-center rounded-md
                               bg-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-900
                               shadow transition hover:bg-white
                               disabled:opacity-40 disabled:hover:bg-zinc-200"
                  >
                    Odoslať správu
                  </button>
                </div>
              </form>

              <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-zinc-300">
                <div className="rounded-lg bg-black/20 ring-1 ring-white/5 p-4">
                  <div className="text-xs text-zinc-400">Adresa</div>
                  <div className="mt-1">Strojnícka ulica, Prešov</div>
                </div>
                <div className="rounded-lg bg-black/20 ring-1 ring-white/5 p-4">
                  <div className="text-xs text-zinc-400">Otváracie hodiny</div>
                  <div className="mt-1">Po–Pi 08:00–16:00</div>
                </div>
                <div className="rounded-lg bg-black/20 ring-1 ring-white/5 p-4">
                  <div className="text-xs text-zinc-400">
                    Preferovaný kontakt
                  </div>
                  <div className="mt-1">Telefón alebo e-mail</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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
