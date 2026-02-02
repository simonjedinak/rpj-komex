// app/kalendar/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import StrokeText from "../components/StrokeText";

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
  const js = date.getDay(); // 0=Ne.6=So
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
  to: string; // "12:00"
  status: "Plné" | "Voľné";
};

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
      <main className="flex-1 bg-white px-4 md:px-10 lg:px-20 py-4 md:py-8 text-white">
        <section className="bg-metal inset-shadow-xl flex flex-col gap-y-4 md:gap-y-8 p-4 md:p-8 relative">
          {/* rovnaký “light streak” background ako About */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <div className="fixed left-0 right-0 top-2/5 h-30 blur-xl rotate-15 bg-linear-to-r from-white/50 via-white/70 to-white/50 shadow-[0_0_100px_10px_rgba(255,255,255,0.6)]" />
          </div>

          {/* HERO panel */}
          <div className="shadow-xl shadow-black/50 p-4 md:p-5 gap-6 md:gap-20 pl-4 md:pl-16 container flex flex-col from-[#2a2b2c] to-[#0c0d0f] bg-linear-to-b rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
            <div className="w-full flex flex-col pt-2 md:pt-5">
              <StrokeText
                  key="calendar-title"
                  tag="h2"
                  strokeWidth={8}
                  shadowSize={7}
                  textColor="#ff2627"
                  className="text-3xl md:text-5xl lg:text-[5rem] font-bold italic mb-3 md:mb-6"
              >
                Mesačný prehľad
              </StrokeText>

              <p className="text-base md:text-xl text-white/90 max-w-4xl leading-relaxed">
                Červené bloky znamenajú „Plné“ v danom čase.
              </p>

              <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            </div>
          </div>

          {/* KALENDAR panel */}
          <div className="shadow-xl shadow-black/50 container overflow-hidden flex flex-col bg-linear-to-b from-[#2a2b2c] to-[#0c0d0f] rounded-2xl md:rounded-4xl border-black border-3 relative z-10">
            <div className="px-4 md:px-16 pt-6 md:pt-10 pb-6 md:pb-10">
              {/* Header + navigácia mesiacov */}
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <StrokeText
                      key="calendar-subtitle"
                      tag="h2"
                      strokeWidth={6}
                      shadowSize={5}
                      textColor="#ff2627"
                      className="text-2xl md:text-4xl lg:text-5xl font-bold italic leading-none"
                  >
                    Kalendár
                  </StrokeText>
                  <p className="mt-3 text-sm md:text-base text-zinc-200/90">
                    Vyberte deň pre zobrazenie blokov obsadenosti.
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

              {/* Hlavička dní (mobile scroll ostáva) */}
              <div className="mt-6 overflow-x-auto touch-pan-x">
                <div className="min-w-[560px] grid grid-cols-7 gap-2 sm:gap-3 text-center text-xs md:text-sm text-zinc-300">
                  {week.map((w) => (
                      <div key={w} className="py-2 font-extrabold tracking-wide">
                        {w}
                      </div>
                  ))}
                </div>
              </div>

              {/* Grid dní (mobile scroll ostáva) */}
              <div className="mt-3 overflow-x-auto touch-pan-x">
                <div className="min-w-[560px] grid grid-cols-7 gap-2 sm:gap-3">
                  {cells.map((c) => {
                    const daySlots = slotsByDay.get(c.iso) ?? [];
                    const isSelected = c.iso === selectedIso;

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
                              "p-2 sm:p-3 md:p-4",
                              "h-[82px] sm:h-[108px] md:h-[130px]",
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
                            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.65)]" />
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
                                <div className="text-[10px] md:text-xs text-zinc-500">—</div>
                            ) : null}
                          </div>
                        </button>
                    );
                  })}
                </div>
              </div>

              {/* Vybraný deň */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs text-zinc-400">Vybraný deň</p>
                <p className="mt-1 text-base md:text-lg font-extrabold text-zinc-100">
                  {selectedLabel}
                </p>

                <div className="mt-4">
                  {selectedSlots.length === 0 ? (
                      <p className="text-sm text-zinc-300">Žiadne zverejnené bloky obsadenosti.</p>
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

              <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            </div>
          </div>
        </section>
      </main>
  );
}
