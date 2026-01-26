import Display from "./components/Display";
import FisheyeCarousel from "./components/FisheyeCarousel";
import Panel from "./components/Panel";
import StrokeText from "./components/StrokeText";
import SvgBar from "./components/SvgBar";

export default function Home() {
  return (
    <main className="flex-1 text-black bg-white">
      <section className="relative from-gray-900 to-gray-800 text-white overflow-hidden">
        <SvgBar className="rotate-180 top-0" />
        <FisheyeCarousel />
        <SvgBar className="bottom-0" />
      </section>
      <div className="h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome "></div>

      <section className="flex flex-col items-center">
        <StrokeText
          strokeWidth={7.8}
          tag="h2"
          shadowSize={7}
          className="text-[4rem] font-bold translate-y-13"
        >
          Naše služby
        </StrokeText>
        <div className="pt-20 bg-chrome2 bg-size-[100%_30%] bg-no-repeat w-full">
          <Display className="w-full" />
        </div>
        <div className="h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome" />
        <div className="w-full h-32 bg-amber-950" />
        <div className="h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome" />
      </section>

      <section className="py-16 px-28 flex flex-col items-center gap-10 bg-neutral-300">
        <Panel title="O nás" className="w-200 ">
          <p>
            Nezávislý autoservis zameraný na kompletnú starostlivosť o osobné a
            úžitkové vozidlá všetkých bežných značiek.
          </p>
          <p>
            Staviame na dlhoročných skúsenostiach, poctivej práci a
            individuálnom prístupe ku každému zákazníkovi.
          </p>
          <p>
            Pri práci používame overené náhradné diely a moderné vybavenie,
            vďaka ktorému dokážeme rýchlo nájsť a odstrániť poruchu.
          </p>
        </Panel>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-y-20 items-center">
          <Panel title="O nás" className="w-120 mx-auto" titleBar={false}>
            <p>
              Nezávislý autoservis zameraný na kompletnú starostlivosť o osobné
              a úžitkové vozidlá všetkých bežných značiek.
            </p>
          </Panel>
          <Panel title="O nás" className="w-120 mx-auto" titleBar={false}>
            <img src="/images/o-nas/IMG_20251221_232348_556 1.png" />
          </Panel>
          <Panel title="O nás" className="w-120 mx-auto" titleBar={false}>
            <img src="/images/o-nas/IMG_20251221_232348_556 1.png" />
          </Panel>
          <Panel title="O nás" className="w-120 mx-auto" titleBar={false}>
            <p>
              Nezávislý autoservis zameraný na kompletnú starostlivosť o osobné
              a úžitkové vozidlá všetkých bežných značiek.
            </p>
          </Panel>
          <Panel title="O nás" className="w-120 mx-auto" titleBar={false}>
            <img src="/images/o-nas/IMG_20251221_232348_556 1.png" />
          </Panel>
          <Panel title="O nás" className="w-120 mx-auto" titleBar={false}>
            <img src="/images/o-nas/IMG_20251221_232348_556 1.png" />
          </Panel>
        </div>
      </section>
    </main>
  );
}
