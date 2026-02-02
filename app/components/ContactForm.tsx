// components/ContactForm.tsx

"use client";

import { useState } from "react";
import StrokeText from "./StrokeText";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { ok: boolean; message: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data?.message || "Niečo sa pokazilo. Skúste to znova.");
        return;
      }

      setStatus("ok");
      setMessage(data.message);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Nepodarilo sa odoslať formulár. Skúste to znova.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
      {/* Form card */}
      <div
        className="
          rounded-lg border border-white/10
          bg-black/40 backdrop-blur-[2px]
          shadow-[0_18px_50px_rgba(0,0,0,0.55)]
          p-5 md:p-6
        "
      >
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Meno a priezvisko" name="name" required />
            <Field label="Telefón" name="phone" inputMode="tel" />
            <Field label="E-mail" name="email" type="email" required />
            <Field label="Preferovaný kontakt" name="contactMethod" as="select">
              <option value="telefon">Telefón</option>
              <option value="email">E-mail</option>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Značka" name="carMake" placeholder="Škoda, VW..." />
            <Field label="Model" name="carModel" placeholder="Octavia..." />
            <Field label="Rok výroby" name="carYear" placeholder="2016" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Služba" name="service" as="select" required>
              <option value="">Vyberte</option>
              <option value="servis_a_udrzba">Servis a údržba</option>
              <option value="diagnostika">Diagnostika</option>
              <option value="oprava">Oprava</option>
              <option value="ine">Iné</option>
            </Field>
            <Field
              label="Preferovaný termín"
              name="preferredDate"
              type="date"
            />
          </div>

          <Field
            label="Popis problému"
            name="problem"
            as="textarea"
            placeholder="Napíšte, čo auto robí / nerobí, kedy sa problém prejavuje..."
            required
          />

          <div className="flex items-start gap-3">
            <input
              id="gdpr"
              name="gdpr"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 accent-white"
            />
            <label htmlFor="gdpr" className="text-sm text-white/85">
              Súhlasím so spracovaním osobných údajov za účelom vybavenia mojej
              požiadavky.
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="
              inline-flex items-center justify-center
              rounded-lg px-4 py-2
              bg-white/10 hover:bg-white/15
              border border-white/15
              disabled:opacity-60
            "
          >
            <StrokeText
              strokeWidth={2}
              shadowSize={2}
              className="text-lg font-bold  flex items-center gap-2"
            >
              {status === "sending" ? "Odosielam..." : "Odoslať"}
              <span className="inline-block -translate-y-0.5">▸</span>
            </StrokeText>
          </button>

          {message && (
            <p
              className={[
                "text-sm",
                status === "ok" ? "text-emerald-200" : "text-red-200",
              ].join(" ")}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      {/* Sidebar info */}
      <aside
        className="
          rounded-lg border border-white/10
          bg-black/35 backdrop-blur-[2px]
          p-5
        "
      >
        <h2 className="font-bold text-white/95 mb-3">Kontakt</h2>
        <div className="space-y-1 text-sm text-white/80">
          <p>E-mail: info@komex.sk</p>
          <p>Telefón: 0905 489 092</p>
          <p>Po – Pia: 8:00 – 16:00</p>
          <p>So – Ne: Zatvorené</p>
        </div>

        <div className="mt-5 text-sm text-white/70">
          <p className="mb-2 font-semibold text-white/85">Tip</p>
          <p>
            Ak viete, napíšte aj značku/model a stručný popis problému – urýchli
            to diagnostiku.
          </p>
        </div>
      </aside>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
};

function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
  inputMode,
  as = "input",
  children,
}: FieldProps) {
  const common =
    "w-full rounded-md bg-black/40 border border-white/15 px-3 py-2 text-white/90 placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white/25";

  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/90 mb-1">
        {label} {required ? <span className="text-red-200">*</span> : null}
      </span>

      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          className={common + " min-h-[120px] resize-y"}
        />
      ) : as === "select" ? (
        <select name={name} required={required} className={common}>
          {children}
        </select>
      ) : (
        <input
          name={name}
          required={required}
          placeholder={placeholder}
          type={type}
          inputMode={inputMode}
          className={common}
        />
      )}
    </label>
  );
}
