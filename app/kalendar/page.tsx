// app/kalendar/page.tsx
"use client";

import React, { useMemo, useState } from "react";

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

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Pondelok ako prvý deň v týždni (0..6 => Po..Ne)
function mondayIndex(date: Date) {
  const js = date.getDay(); // 0=Ne..6=So
  return (js + 6) % 7; // Po=0 ... Ne=6
}

type DayCell = {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  iso: string; // YYYY-MM-DD
};

function buildMonthGrid(viewDate: Date): DayCell[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstOfMonth = startOfDay(new Date(year, month, 1));
  const offset = mondayIndex(firstOfMonth);
  const gridStart = addDays(firstOfMonth, -offset);

  const today = startOfDay(new Date());
  const cells: DayCell[] = [];

  for (let i = 0; i < 42; i++) {
    const date = addDays(gridStart, i);
    cells.push({
      date,
      inMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
      iso: date.toISOString().slice(0, 10),
    });
  }

  return cells;
}

function ChevronLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronRightIcon({ className = "" }: { className?: string }) {
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

/**
 * Termíny bez detailov: iba časový interval + stav.
 * isoDate: "YYYY-MM-DD"
 */
type Slot = {
  isoDate: string;
  from: string; // "10:00"
  to: string;   // "12:00"
  status: "Plné" | "Voľné";
};

/**
 * DEMO dáta – nahraď podľa seba (napr. z DB).
 * Kľúčové: žiadne mená, žiadne poznámky.
 */
const slots: Slot[] = [
  { isoDate: "2026-01-23", from: "10:00", to: "12:00", status: "Plné" },
  { isoDate: "2026-01-23", from: "13:00", to: "14:00", status: "Plné" },
  { isoDate: "2026-01-24", from: "09:00", to: "10:30", status: "Plné" },
  { isoDate: "2026-01-27", from: "15:00", to: "16:00", status: "Plné" },
  { isoDate: "2026-01-29", from: "11:00", to: "12:00", status: "Plné" },
];

function groupSlotsByDay(all: Slot[]) {
  const map = new Map<string, Slot[]>();
  for (const s of all) {
    const arr = map.get(s.isoDate) ?? [];
    arr.push(s);
    map.set(s.isoDate, arr);
  }
  // sort time inside day
  for (const [k, arr] of map.entries()) {
    arr.sort((a, b) => a.from.localeCompare(b.from));
    map.set(k, arr);
  }
  return map;
}

export default function KalendarPage() {
  const [viewDate, setViewDate] = useState(() => startOfDay(new Date()));
  const [selectedIso, setSelectedIso] = useState(() => new Date().toISOString().slice(0, 10));

  const cells = useMemo(() => buildMonthGrid(viewDate), [viewDate]);

  const slotsByDay = useMemo(() => groupSlotsByDay(slots), []);
  const selectedSlots = slotsByDay.get(selectedIso) ?? [];

  const monthLabel = useMemo(() => {
    const fmt = new Intl.DateTimeFormat("sk-SK", { month: "long", year: "numeric" });
    const raw = fmt.format(viewDate);
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }, [viewDate]);

  const selectedLabel = useMemo(() => {
    const d = new Date(selectedIso + "T00:00:00");
    return new Intl.DateTimeFormat("sk-SK", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d);
  }, [selectedIso]);

  function prevMonth() {
    setViewDate((d) => startOfDay(new Date(d.getFullYear(), d.getMonth() - 1, 1)));
  }

  function nextMonth() {
    setViewDate((d) => startOfDay(new Date(d.getFullYear(), d.getMonth() + 1, 1)));
  }

  const week = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

  return (
    <main className="min-h-[70vh] bg-neutral-200 py-10">
      <section className="mx-auto w-[min(1100px,92vw)]">

        <ChromePanel>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold italic text-red-500">
                Mesačný prehľad
              </h2>
              <p className="mt-2 text-sm md:text-base text-zinc-300">
                Červené bloky znamenajú „Plné“ v danom čase.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevMonth}
                className="
                  inline-flex items-center justify-center
                  h-10 w-10 rounded-xl
                  border border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition
                  focus:outline-none focus:ring-2 focus:ring-white/15
                "
                aria-label="Predchádzajúci mesiac"
              >
                <ChevronLeftIcon className="h-5 w-5 text-zinc-200" />
              </button>

              <div
                className="
                  px-4 py-2 rounded-xl
                  border border-white/10
                  bg-white/5
                  text-zinc-100 font-extrabold tracking-tight
                "
              >
                {monthLabel}
              </div>

              <button
                type="button"
                onClick={nextMonth}
                className="
                  inline-flex items-center justify-center
                  h-10 w-10 rounded-xl
                  border border-white/10
                  bg-white/5
                  hover:bg-white/10
                  transition
                  focus:outline-none focus:ring-2 focus:ring-white/15
                "
                aria-label="Nasledujúci mesiac"
              >
                <ChevronRightIcon className="h-5 w-5 text-zinc-200" />
              </button>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-zinc-700/70" />

          <div className="mt-6">
            {/* hlavička dní */}
            <div className="grid grid-cols-7 gap-3 text-center text-xs md:text-sm text-zinc-300">
              {week.map((w) => (
                <div key={w} className="py-2 font-extrabold tracking-wide">
                  {w}
                </div>
              ))}
            </div>

            {/* dni */}
            <div className="mt-3 grid grid-cols-7 gap-3">
              {cells.map((c) => {
                const daySlots = slotsByDay.get(c.iso) ?? [];
                const isSelected = c.iso === selectedIso;

                // aby sa karta nezaplnila: zobraz max 2 sloty + "＋N"
                const visible = daySlots.slice(0, 2);
                const extra = Math.max(0, daySlots.length - visible.length);

                return (
                  <button
                    key={c.iso}
                    type="button"
                    onClick={() => setSelectedIso(c.iso)}
                    className={[
                      "group relative overflow-hidden text-left",
                      "rounded-2xl border",
                      "p-3 md:p-4",
                      "h-[92px] sm:h-[108px] md:h-[130px]",
                      "transition",
                      "focus:outline-none focus:ring-2 focus:ring-white/15",
                      "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/15",
                      c.inMonth ? "text-white" : "text-zinc-500",
                      isSelected ? "bg-red-500/15 border-red-400/40" : "",
                    ].join(" ")}
                    aria-label={`Vybrať dátum ${c.iso}`}
                  >
                    {/* shine */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -top-10 left-[-35%] h-24 w-[170%] rotate-[-8deg] bg-white/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-0 ring-1 ring-white/5" />
                    </div>

                    <div className="relative z-10 flex items-start justify-between">
                      <div
                        className={[
                          "text-sm md:text-base font-extrabold",
                          c.inMonth ? "text-zinc-100" : "text-zinc-500",
                          isSelected ? "text-red-200" : "",
                        ].join(" ")}
                      >
                        {c.date.getDate()}
                      </div>

                      {c.isToday ? (
                        <span
                          className="
                            inline-flex items-center
                            rounded-full
                            border border-white/15
                            bg-white/10
                            px-2 py-0.5
                            text-[10px] md:text-xs
                            text-zinc-100
                          "
                        >
                          Dnes
                        </span>
                      ) : null}
                    </div>

                    {/* sloty (bez detailov) */}
                    <div className="relative z-10 mt-2 space-y-1">
                      {visible.map((s, idx) => (
                        <div
                          key={`${s.isoDate}-${s.from}-${idx}`}
                          className={[
                            "w-full rounded-lg border px-2 py-1",
                            "text-[10px] md:text-xs font-extrabold",
                            "truncate",
                            s.status === "Plné"
                              ? "border-red-400/30 bg-red-500/20 text-red-200"
                              : "border-emerald-400/20 bg-emerald-500/15 text-emerald-200",
                          ].join(" ")}
                          title={`${s.from}–${s.to} ${s.status}`}
                        >
                          {s.from}–{s.to} • {s.status}
                        </div>
                      ))}

                      {extra > 0 ? (
                        <div className="text-[10px] md:text-xs text-zinc-300">
                          +{extra} ďalšie
                        </div>
                      ) : null}

                      {daySlots.length === 0 ? (
                        <div className="text-[10px] md:text-xs text-zinc-500">
                          —
                        </div>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* zoznam pre vybraný deň: stále iba časy + stav */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-zinc-400">Vybraný deň</p>
            <p className="mt-1 text-base md:text-lg font-extrabold text-zinc-100">
              {selectedLabel}
            </p>

            <div className="mt-4">
              {selectedSlots.length === 0 ? (
                <p className="text-sm text-zinc-300">
                  Žiadne zverejnené bloky obsadenosti.
                </p>
              ) : (
                <ul className="space-y-2">
                  {selectedSlots.map((s, idx) => (
                    <li
                      key={`${s.isoDate}-${s.from}-${idx}`}
                      className="
                        flex items-center justify-between gap-3
                        rounded-xl border border-white/10 bg-zinc-950/30
                        px-4 py-3
                      "
                    >
                      <span className="text-sm md:text-base font-extrabold text-zinc-100">
                        {s.from}–{s.to}
                      </span>
                      <span
                        className={[
                          "inline-flex items-center rounded-full border px-2 py-1",
                          "text-xs font-extrabold",
                          s.status === "Plné"
                            ? "border-red-400/30 bg-red-500/20 text-red-200"
                            : "border-emerald-400/20 bg-emerald-500/15 text-emerald-200",
                        ].join(" ")}
                      >
                        {s.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>


          </div>
        </ChromePanel>
      </section>
    </main>
  );
}
