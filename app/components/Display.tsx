"use client";

import React, { useState } from "react";

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

const items = {
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
  "Mechanické systémy":
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
      className={`rounded-t-[7rem] p-2 bg-[linear-gradient(150deg,#404040_0%,#888888_13%,#2d2c2c_22%,#171717_100%)]
        shadow-[0px_-4px_14px_2px_#000002]${className}`}
    >
      <div className="bg-black rounded-t-[calc(7rem-8px)] py-10 px-50 w-full min-h-100">
        {selectedItem ? (
          // Detail View
          <div className="relative flex items-center justify-between h-full">
            <button
              onClick={handleBack}
              className="absolute top-0 left-0 text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Go back"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex-1 pl-12">
              <h2 className="text-white font-bold text-4xl mb-6">
                {selectedItem}
              </h2>
              <p className="text-white text-lg">
                {items[selectedItem as keyof typeof items]}
              </p>
            </div>
            <div className="shrink-0">
              <div className="bg-red-500 w-48 h-48 rounded-full" />
            </div>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-4 grid-rows-2">
            {Object.entries(items).map(([key, value], index) => (
              <button
                key={index}
                onClick={() => handleItemClick(key)}
                className="flex flex-col gap-4 items-center justify-center px-7 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <div className="bg-red-500 w-full aspect-square rounded-full" />
                <p className="text-white text-center font-bold text-xl">
                  {key}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

//https://www.npmjs.com/package/vault66-crt-effect
