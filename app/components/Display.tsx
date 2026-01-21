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

const iconColors = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-orange-500",
];
const items: Record<string, string> = {
  Motor:
    "Naši odborníci vykonávajú podrobnú diagnostiku motora. Vykonávame špecifické kontroly podľa typu a modelu vozidla. Generálne opravy motora realizujeme rýchlo, precízne a v najvyššej kvalite.",
  "Výmena oleja":
    "Špecialista sa postará o kompletnú výmenu oleja vrátane filtrov. Pracujeme podľa odporúčaní výrobcu pre každý typ motora. Ponúkame aj individuálne olejové servisy šité na mieru modelu vozidla.",
  Brzdy:
    "Zabezpečujeme detailnú opravu a kontrolu brzdového systému. Brzdy testujeme a servisujeme s maximálnou presnosťou. Venovanosť kvalite a rýchlosti opravy je u nás samozrejmosťou.",
  Elektronika:
    "Realizujeme kompletnú diagnostiku elektronických systémov vozidla. Analyzujeme a riešime chybové hlásenia riadiacej jednotky. Zabezpečujeme aj špecializované kontroly elektroniky podľa značky.",
  Osvetlenie:
    "Vymieňame a kontrolujeme všetky typy svetiel na vozidle. Postaráme sa o svetlomety aj vnútorné osvetlenie profesionálne. Rýchla a kvalitná výmena je u nás štandardom.",
  Pneumatiky:
    "Zabezpečujeme kompletný pneuservis – výmenu, vyvažovanie aj kontrolu tlaku. Používame moderné vybavenie pre presnú montáž pneumatík. Každý servis prispôsobujeme značke a typu vozidla.",
  Mechanika:
    "Opravujeme mechanické časti vozidiel pomocou špičkových nástrojov. Venovanosť detailom a odborné know-how sú našou výhodou. Kontroly mechaniky vykonávame podľa špecifikácie výrobcu.",
  Klíma:
    "Vykonávame plnenie, čistenie a opravu klimatizačných systémov. Zabezpečíme optimálne chladenie aj v horúcich podmienkach. Kontroly realizujeme podľa odporúčaní pre konkrétnu značku vozidla.",
};

export default function Display({ className = "" }: { className?: string }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (key: string) => {
    setSelectedItem(key);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <div
      className={`rounded-t-[7rem] p-2 bg-[linear-gradient(150deg,#404040_0%,#888888_13%,#2d2c2c_22%,#171717_100%)] shadow-[0px_-4px_14px_2px_#000002] ${className}`}
    >
      <div className="rounded-t-[calc(7rem-8px)] overflow-hidden">
        <CRTEffect
          enabled={true}
          sweepDuration={5}
          sweepThickness={10}
          scanlineOpacity={0.1}
          theme="custom"
          enableScanlines={true}
          enableSweep={true}
          enableGlow={true}
          glowColor="rgba(0, 0, 0, 1)"
          enableEdgeGlow={true}
          edgeGlowColor="rgba(255, 255, 255, 0.1)"
          edgeGlowSize={200}
          enableFlicker={true}
          enableGlitch={true}
          glitchIntensity={0.2}
          glitchSpeed={0.6}
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
                    <h3 className="text-white font-bold text-6xl mb-6">
                      {selectedItem}
                    </h3>
                    <p className="text-white text-xl">{items[selectedItem]}</p>
                  </div>

                  <div className="w-full">
                    <div
                      className={`${iconColors[Object.keys(items).indexOf(selectedItem) % iconColors.length]} aspect-square rounded-full`}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 grid-rows-2 gap-y-5">
                {Object.entries(items).map(([key], index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(key)}
                    className="flex flex-col gap-4 items-center justify-center px-7 hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div
                      className={`${iconColors[index % iconColors.length]} w-full aspect-square rounded-full`}
                    />
                    <p className="text-white text-center font-bold text-xl">
                      {key}
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
