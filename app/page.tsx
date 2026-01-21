import Display from "./components/Display";
import FisheyeCarousel from "./components/FisheyeCarousel";
import { Panel } from "./components/Panel";
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
        <div className="h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome " />
        <div className="w-full h-32 bg-amber-950" />
        <div className="h-6 w-full relative bg-chrome2 shadow-navbar-inset-chrome " />
      </section>

      <section className="py-16 bg-neutral-300">
        <Panel title="O nás"></Panel>
      </section>
    </main>
  );
}
