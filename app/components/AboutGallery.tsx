"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Panel from "./Panel";

const galleryImages = [
  "/images/o-nas/IMG_20251221_232348_556 1.png",
  "/images/o-nas/IMG_20251221_232350_319 1.png",
  "/images/o-nas/IMG_20251221_232351_217 1.png",
  "/images/o-nas/IMG_20251221_232352_681 1.png",
  "/images/o-nas/IMG_20251221_232354_399 1.png",
  "/images/o-nas/IMG_20251221_232356_106 1.png",
  "/images/o-nas/IMG_20251221_232357_750 1.png",
  "/images/o-nas/IMG_20251221_232359_182 1.png",
];

export default function AboutGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleImageClick = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Row 1 */}
        <Panel title="Komplex" className="w-full" titleBar={false}>
          <p>
            V Komexe opravíme motor, prevodovku, podvozok, brzdy, výfuk aj elektrickú inštaláciu. Každé vozidlo prechádza dôkladnou diagnostikou pred začiatkom prác.
          </p>
          <p>
            Vykonávame pravidelné servisné prehliadky podľa odporúčaní výrobcov. Používame kvalitné náhradné diely a originálne oleje pre dlhú životnosť vášho vozidla.
          </p>
          <p>
            Náš pneuservis zabezpečí prezutie, vyváženie a uskladnenie pneumatík. Špecialista na chladiče vám opraví alebo vymení chladič motora či klimatizácie.
          </p>
        </Panel>
        <Panel
          title="Dielňa"
          className="w-full cursor-pointer transition-transform hover:scale-[1.02]"
          titleBar={false}
        >
          <div onClick={() => handleImageClick(0)}>
            <img
              src={galleryImages[0]}
              alt="Autoservis Komex - dielňa"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </Panel>

        {/* Row 2 */}
        <Panel
          title="Vybavenie"
          className="w-full cursor-pointer transition-transform hover:scale-[1.02]"
          titleBar={false}
        >
          <div onClick={() => handleImageClick(1)}>
            <img
              src={galleryImages[1]}
              alt="Autoservis Komex - vybavenie"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </Panel>
        <Panel title="Prístup" className="w-full" titleBar={false}>
          <p>
            V Komexe si ceníme každého zákazníka a venujeme mu plnú pozornosť. Vždy vám vysvetlíme, čo je potrebné opraviť a prečo, bez zbytočných prác.
          </p>
          <p>
            Naše ceny sú férové a transparentné. Pred opravou vám vytvoríme cenovú kalkuláciu, aby ste vedeli, s čím počítať. Žiadne skryté poplatky.
          </p>
          <p>
            Záleží nám na dlhodobej spokojnosti klientov. Preto robíme každú prácu kvalitne a s precíznosťou, akoby išlo o naše vlastné auto.
          </p>
        </Panel>

        {/* Row 3 */}
        <Panel title="Tím" className="w-full" titleBar={false}>
          <p>
            Náš tím tvoria dvaja skúsení automechanici s rokmi praxe a odborným vzdelaním. Neustále sa vzdelávajú v nových technológiách a postupoch.
          </p>
          <p>
            Špecialista na chladiče dokáže opraviť chladiče motorov, klimatizácií aj vykurovacích systémov pre všetky typy vozidiel s dlhoročnými skúsenosťami.
          </p>
          <p>
            Kombinujeme tradičné remeselné zručnosti s modernou diagnostikou. Vďaka tomu rýchlo identifikujeme problém a efektívne ho odstránime.
          </p>
        </Panel>
        <Panel
          title="Servis"
          className="w-full cursor-pointer transition-transform hover:scale-[1.02]"
          titleBar={false}
        >
          <div onClick={() => handleImageClick(2)}>
            <img
              src={galleryImages[2]}
              alt="Autoservis Komex - servis"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </Panel>

        {/* Row 4 */}
        <Panel
          title="Diagnostika"
          className="w-full cursor-pointer transition-transform hover:scale-[1.02]"
          titleBar={false}
        >
          <div onClick={() => handleImageClick(3)}>
            <img
              src={galleryImages[3]}
              alt="Autoservis Komex - diagnostika"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </Panel>
        <Panel title="Lokalita" className="w-full" titleBar={false}>
          <p>
            Autoservis Komex nájdete na Strojníckej ulici v Prešove s dobrým dopravným napojením a dostupným parkovaním priamo pred dielňou.
          </p>
          <p>
            Naša dielňa je vybavená všetkým potrebným - od zdvihakov cez kompletné náradie až po stroje na prezúvanie, vyvažovanie kolies a plnenie klimatizácií.
          </p>
          <p>
            Tešíme sa na vašu návštevu v Komexe, kde sa o vaše vozidlo postaráme s rešpektom, kvalitou a za férovú cenu.
          </p>
        </Panel>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={galleryImages.map((src) => ({ src }))}
      />
    </>
  );
}
