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
  red: "bg-[#f00]",
  orange: "bg-[#ff7400]",
  green: "bg-[#0FBD06]",
  blue: "bg-[#007ffb]",
};

const items: {
  key: string;
  description: string;
  icon: string;
  color?: string;
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

  const handleItemClick = (item: (typeof items)[number]) => {
    setSelectedItem(item);
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
                      {selectedItem.key}
                    </h3>
                    <p className="text-white text-xl">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="w-full">
                    <div
                      className={`${selectedItem.color} aspect-square w-full h-full`}
                      style={{
                        maskImage: `url(${selectedItem.icon})`,
                        WebkitMaskImage: `url(${selectedItem.icon})`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 grid-rows-2 gap-y-5">
                {items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="flex flex-col gap-4 items-center justify-center px-7 hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div
                      className={`${item.color} w-full aspect-square`}
                      style={{
                        maskImage: `url(${item.icon})`,
                        WebkitMaskImage: `url(${item.icon})`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                    <p className="text-white text-center font-bold text-xl">
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
