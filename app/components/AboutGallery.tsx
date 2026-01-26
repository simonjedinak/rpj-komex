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
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-y-20 items-center">
                {/* Row 1 */}
                <Panel title="O nás" className="w-120 mx-auto" titleBar={false}>
                    <p>
                        Nezávislý autoservis zameraný na kompletnú starostlivosť o osobné a
                        úžitkové vozidlá všetkých bežných značiek.
                    </p>
                </Panel>
                <Panel
                    title="O nás"
                    className="w-120 mx-auto cursor-pointer transition-transform hover:scale-[1.02]"
                    titleBar={false}
                >
                    <div onClick={() => handleImageClick(0)}>
                        <img src={galleryImages[0]} alt="O nás 1" className="w-full h-auto" />
                    </div>
                </Panel>

                {/* Row 2 */}
                <Panel
                    title="O nás"
                    className="w-120 mx-auto cursor-pointer transition-transform hover:scale-[1.02]"
                    titleBar={false}
                >
                    <div onClick={() => handleImageClick(1)}>
                        <img src={galleryImages[1]} alt="O nás 2" className="w-full h-auto" />
                    </div>
                </Panel>
                <Panel title="O nás" className="w-120 mx-auto" titleBar={false}>
                    <p>
                        Nezávislý autoservis zameraný na kompletnú starostlivosť o osobné a
                        úžitkové vozidlá všetkých bežných značiek.
                    </p>
                </Panel>

                {/* Row 3 */}
                <Panel
                    title="O nás"
                    className="w-120 mx-auto cursor-pointer transition-transform hover:scale-[1.02]"
                    titleBar={false}
                >
                    <div onClick={() => handleImageClick(2)}>
                        <img src={galleryImages[2]} alt="O nás 3" className="w-full h-auto" />
                    </div>
                </Panel>
                <Panel
                    title="O nás"
                    className="w-120 mx-auto cursor-pointer transition-transform hover:scale-[1.02]"
                    titleBar={false}
                >
                    <div onClick={() => handleImageClick(3)}>
                        <img src={galleryImages[3]} alt="O nás 4" className="w-full h-auto" />
                    </div>
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
