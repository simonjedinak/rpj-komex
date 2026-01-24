"use client";

import React, { useState } from "react";
import CRTEffect from "vault66-crt-effect";
// @ts-ignore
import "vault66-crt-effect/dist/vault66-crt-effect.css";

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const iconColors = {
  red: { bg: "bg-[#fd4a5e]", glow: "255, 0, 0" },
  orange: { bg: "bg-[#ffce52]", glow: "255, 111, 0" },
  green: { bg: "bg-[#a7ff4a]", glow: "50, 255, 0" },
  blue: { bg: "bg-[#4fc7ff]", glow: "87, 126, 255" },
};

const items: {
  key: string;
  description: string;
  icon: string;
  color: (typeof iconColors)[keyof typeof iconColors];
}[] = [
  {
    key: "Motor",
    description:
      "Naši odborníci vykonávajú podrobnú diagnostiku motora. Vykonávame špecifické kontroly podľa typu a modelu vozidla. Generálne opravy motora realizujeme rýchlo, precízne a v najvyššej kvalite.",
    icon: "/services/motor.svg",
    color: iconColors.red,
  },
  {
    key: "Výmena oleja",
    description:
      "Špecialista sa postará o kompletnú výmenu oleja vrátane filtrov. Pracujeme podľa odporúčaní výrobcu pre každý typ motora. Ponúkame aj individuálne olejové servisy šité na mieru modelu vozidla.",
    icon: "/services/olej.svg",
    color: iconColors.orange,
  },
  {
    key: "Brzdy",
    description:
      "Zabezpečujeme detailnú opravu a kontrolu brzdového systému. Brzdy testujeme a servisujeme s maximálnou presnosťou. Venovanosť kvalite a rýchlosti opravy je u nás samozrejmosťou.",
    icon: "/services/brzdy.svg",
    color: iconColors.green,
  },
  {
    key: "Elektronika",
    description:
      "Realizujeme kompletnú diagnostiku elektronických systémov vozidla. Analyzujeme a riešime chybové hlásenia riadiacej jednotky. Zabezpečujeme aj špecializované kontroly elektroniky podľa značky.",
    icon: "/services/elektronika.svg",
    color: iconColors.blue,
  },
  {
    key: "Osvetlenie",
    description:
      "Vymieňame a kontrolujeme všetky typy svetiel na vozidle. Postaráme sa o svetlomety aj vnútorné osvetlenie profesionálne. Rýchla a kvalitná výmena je u nás štandardom.",
    icon: "/services/osvetlenie.svg",
    color: iconColors.orange,
  },
  {
    key: "Pneumatiky",
    description:
      "Zabezpečujeme kompletný pneuservis – výmenu, vyvažovanie aj kontrolu tlaku. Používame moderné vybavenie pre presnú montáž pneumatík. Každý servis prispôsobujeme značke a typu vozidla.",
    icon: "/services/pneumatiky.svg",
    color: iconColors.green,
  },
  {
    key: "Klíma",
    description:
      "Vykonávame plnenie, čistenie a opravu klimatizačných systémov. Zabezpečíme optimálne chladenie aj v horúcich podmienkach. Kontroly realizujeme podľa odporúčaní pre konkrétnu značku vozidla.",
    icon: "/services/klima.svg",
    color: iconColors.blue,
  },
  {
    key: "Mechanika",
    description:
      "Opravujeme mechanické časti vozidiel pomocou špičkových nástrojov. Venovanosť detailom a odborné know-how sú našou výhodou. Kontroly mechaniky vykonávame podľa špecifikácie výrobcu.",
    icon: "/services/mechanika.svg",
    color: iconColors.red,
  },
];

export default function Display({ className = "" }: { className?: string }) {
  const [selectedItem, setSelectedItem] = useState<
    (typeof items)[number] | null
  >(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleItemClick = (item: (typeof items)[number]) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <div
      className={`rounded-t-[7rem] crt p-2 bg-[linear-gradient(150deg,#404040_0%,#888888_13%,#2d2c2c_22%,#171717_100%)] shadow-[0px_-4px_14px_2px_#000002] ${className}`}
    >
      <div className="rounded-t-[calc(7rem-8px)] overflow-hidden">
        <CRTEffect
          enabled={true}
          // Scanlines: visible but not “stripy”
          enableScanlines={true}
          scanlineOrientation="horizontal"
          scanlineColor="rgba(255,255,255,1)" // white only
          scanlineOpacity={0.08} // keep low; CRT scanlines aren’t usually harsh
          scanlineThickness={2} // 1–2 px usually feels right
          scanlineGap={3} // 2–4 px depending on resolution
          // Sweep: optional; keep very subtle (many “CRT sweep” looks like an LCD shader)
          enableSweep={true}
          sweepStyle="classic"
          sweepDuration={5}
          sweepThickness={6}
          // Glow/bloom: monochrome “phosphor bloom” is mostly brightness spread, not colored
          enableGlow={true}
          glowColor="rgba(255,255,255,0.10)" // your current black glow kills bloom; use white w/ low alpha
          enableEdgeGlow={true}
          edgeGlowColor="rgba(255,255,255,0.1)"
          edgeGlowSize={120} // 80–160; too big looks like fog
          // Flicker: subtle and slow; monochrome long-persistence phosphor also reduces harsh flicker
          enableFlicker={true}
          flickerIntensity={0.06}
          flickerSpeed={0.4}
          // Vignette: helps sell curvature/optics without adding RGB artifacts
          enableVignette={true}
          vignetteIntensity={0.22}
          // Glitch: real CRTs don’t “RGB glitch” constantly; keep off or extremely low
          enableGlitch={true}
          // If you really want it:
          glitchIntensity={0.11}
          glitchSpeed={0.4}
          theme="custom"
        >
          <div className="bg-black pb-20 pt-21 px-50 w-full h-150">
            {selectedItem ? (
              <div className="flex flex-col h-full">
                <button
                  onClick={handleBack}
                  className="self-start text-white hover:text-gray-300 transition-colors p-2 -ml-4 -mt-4 mb-2"
                  aria-label="Go back"
                >
                  <ArrowLeftIcon />
                </button>
                <div className="flex items-center justify-between flex-1">
                  <div className="mr-20">
                    <h3 className="text-white font-bold text-[5rem] mb-6 text-crt">
                      {selectedItem.key}
                    </h3>
                    <p className="text-white text-[1.5rem] font-mono">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="w-full">
                    <div
                      style={{
                        filter: `drop-shadow(0 0 12px rgba(${selectedItem.color.glow}, 0.7)) drop-shadow(0 0 24px rgba(${selectedItem.color.glow}, 0.7))`,
                      }}
                    >
                      <div
                        className={`${selectedItem.color.bg} aspect-square w-full h-full mask-contain mask-no-repeat mask-center`}
                        style={{
                          maskImage: `url(${selectedItem.icon})`,
                          WebkitMaskImage: `url(${selectedItem.icon})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 grid-rows-2 gap-y-5">
                {items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex flex-col gap-4 items-center justify-center px-7 hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div
                      className="w-full transition-[filter] duration-200"
                      style={{
                        filter: `drop-shadow(0 0 2px rgba(${item.color.glow}, 1)) drop-shadow(0 0 5px rgba(${item.color.glow}, 0.6))${hoveredIndex === index ? ` drop-shadow(0 0 16px rgba(${item.color.glow}, 0.5))` : ""}`,
                      }}
                    >
                      <div
                        className={`${item.color.bg} w-full aspect-square mask-contain mask-no-repeat mask-center`}
                        style={{
                          maskImage: `url(${item.icon})`,
                          WebkitMaskImage: `url(${item.icon})`,
                        }}
                      />
                    </div>
                    <p className="text-white text-center font-bold text-3xl text-crt">
                      {item.key}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </CRTEffect>
      </div>
    </div>
  );
}
