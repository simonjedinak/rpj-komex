import { NextResponse } from "next/server";

export const runtime = "nodejs";

// No caching – always fetch fresh data
export const dynamic = "force-dynamic";

type CalendarEvent = {
  isoDate: string; // YYYY-MM-DD
  from: string; // "HH:MM"
  to: string; // "HH:MM"
  summary: string;
  status: string;
};

/**
 * Minimal ICS parser – extracts VEVENT blocks and returns
 * date/time + summary for each event.
 */
function parseICS(icsText: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  // Split into VEVENT blocks
  const blocks = icsText.split("BEGIN:VEVENT");

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split("END:VEVENT")[0];

    const get = (key: string): string | null => {
      // Handle multi-line folded values and various separators
      const regex = new RegExp(`^${key}[;:](.*)`, "m");
      const match = block.match(regex);
      return match ? match[1].replace(/\r/g, "").trim() : null;
    };

    const dtStart = get("DTSTART");
    const dtEnd = get("DTEND");
    const summary = get("SUMMARY") ?? "Obsadené";

    if (!dtStart || !dtEnd) continue;

    // Parse date/time. Format: YYYYMMDDTHHMMSSZ or YYYYMMDD (all-day)
    const startDate = parseICSDate(dtStart);
    const endDate = parseICSDate(dtEnd);

    if (!startDate || !endDate) continue;

    // Convert UTC to Europe/Prague
    const pragueStart = toPrague(startDate);
    const pragueEnd = toPrague(endDate);

    const isoDate = formatISODate(pragueStart);
    const from = formatTime(pragueStart);
    const to = formatTime(pragueEnd);

    events.push({
      isoDate,
      from,
      to,
      summary,
      status: "Plné",
    });
  }

  return events;
}

function parseICSDate(raw: string): Date | null {
  // Remove any TZID prefix value (e.g. "TZID=Europe/Prague:")
  const value = raw.includes(":") ? raw.split(":").pop()! : raw;
  const clean = value.replace(/\r|\n/g, "").trim();

  // YYYYMMDDTHHMMSSZ
  const m = clean.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/);
  if (m) {
    const [, y, mo, d, h, mi, s] = m;
    // If no trailing Z, still treat as UTC for simplicity
    return new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, +s));
  }

  // YYYYMMDD (all-day event)
  const md = clean.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (md) {
    const [, y, mo, d] = md;
    return new Date(Date.UTC(+y, +mo - 1, +d, 0, 0, 0));
  }

  return null;
}

function toPrague(utcDate: Date): Date {
  // Use Intl to get the offset for Europe/Prague at this specific date
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = fmt.formatToParts(utcDate);
  const p = (type: string) => parts.find((x) => x.type === type)?.value ?? "00";

  return new Date(
    +p("year"),
    +p("month") - 1,
    +p("day"),
    +p("hour"),
    +p("minute"),
    +p("second"),
  );
}

function formatISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export async function GET() {
  const calendarUrl = process.env.CALENDAR_URL;

  if (!calendarUrl) {
    return NextResponse.json(
      { ok: false, error: "CALENDAR_URL not configured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(calendarUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Calendar fetch failed:", res.status, res.statusText);
      return NextResponse.json(
        { ok: false, error: "Failed to fetch calendar data" },
        { status: 502 },
      );
    }

    const icsText = await res.text();
    console.log("ICS payload:\n", icsText);
    const events = parseICS(icsText);

    // Sort by date, then by start time
    events.sort((a, b) => {
      const dateComp = a.isoDate.localeCompare(b.isoDate);
      if (dateComp !== 0) return dateComp;
      return a.from.localeCompare(b.from);
    });

    return NextResponse.json({ ok: true, events });
  } catch (err) {
    console.error("Calendar API error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
