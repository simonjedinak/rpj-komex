import StrokeText from "../components/StrokeText";
import ImageWrapper from "../components/ImageWrapper";

export default function AboutPage() {
  return (
    <main className="flex-1 bg-white px-20 py-8 text-white">
      <section className="bg-metal inset-shadow-xl flex flex-col gap-y-8 p-8">
        <div className="shadow-xl shadow-black/50 p-5 gap-20 pl-16 container flex flex-row from-[#2a2b2c] to-[#0c0d0f] bg-linear-to-b rounded-4xl border-black border-3">
          <div className="w-3/5 flex flex-col text-xl pt-3">
            <StrokeText
              key="about-title-1"
              tag="h2"
              strokeWidth={8}
              shadowSize={7}
              textColor="#ff2627"
              className="text-[5rem] font-bold italic mb-7"
            >
              O nás
            </StrokeText>
            <div className="space-y-8">
              <p>
                Autoservis KOMEX vznikol ako rodinná dielňa v Prešove na
                Strojníckej ulici, kde dodnes sídli a dlhodobo poskytuje servis
                osobným aj úžitkovým vozidlám.
              </p>
              <p>
                Postupne sa z menšieho pracoviska stal plnohodnotný servis so
                zameraním na mechanické opravy, diagnostiku, pneuservis a údržbu
                klimatizácií.
              </p>
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-y-4">
            <ImageWrapper>
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="O nas 1"
              />
            </ImageWrapper>
            <div className="flex flex-row gap-x-4">
              <ImageWrapper>
                <img
                  src="/images/o-nas/IMG_20251221_232348_556 1.png"
                  alt="O nas 1"
                />
              </ImageWrapper>
              <ImageWrapper>
                <img
                  src="/images/o-nas/IMG_20251221_232348_556 1.png"
                  alt="O nas 1"
                />
              </ImageWrapper>
            </div>
          </div>
        </div>
        <div className="shadow-xl shadow-black/50 container overflow-hidden flex flex-row bg-linear-to-b from-[#2a2b2c] to-[#0c0d0f] rounded-4xl border-black border-3">
          <div className="w-3/5 flex flex-col border-r-2 border-gray-400 relative min-h-144">
            <div className="w-full h-1/2 relative overflow-hidden">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Workshop background"
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1a1b1d] via-[#1a1b1d]/60 to-transparent" />

              <div className="absolute bottom-6 pl-16">
                <StrokeText
                  key="about-title-2"
                  tag="h2"
                  strokeWidth={6}
                  shadowSize={5}
                  textColor="#ff2627"
                  className="text-5xl font-bold italic leading-none"
                >
                  Servis a repasovanie autochladičov na jednom mieste
                </StrokeText>
              </div>
            </div>

            <div className="relative flex flex-col flex-1">
              <div className="px-16 pt-8 space-y-8 text-white text-xl leading-relaxed">
                <p>
                  Dôležitou súčasťou KOMEXu je aj špecializácia na opravy a
                  repasovanie autochladičov, ktorá dopĺňa klasické servisné
                  práce.
                </p>
                <p>
                  Vďaka tomu vie dielňa vyriešiť bežné opravy aj špecifické
                  problémy s chladením motora na jednom mieste.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>

          <div className="w-2/5 flex flex-col gap-4 p-4">
            <ImageWrapper className="flex-1">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Autoservis KOMEX workshop 1"
                className="w-full h-full object-cover rounded-2xl"
              />
            </ImageWrapper>

            <ImageWrapper className="flex-1">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Autoservis KOMEX workshop 2"
                className="w-full h-full object-cover rounded-2xl"
              />
            </ImageWrapper>

            <ImageWrapper className="flex-1">
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="Autoservis KOMEX workshop 3"
                className="w-full h-full object-cover rounded-2xl"
              />
            </ImageWrapper>
          </div>
        </div>
        <div className="shadow-xl shadow-black/50 p-5 gap-20 pl-16 container flex flex-row from-[#2a2b2c] to-[#0c0d0f] bg-linear-to-b rounded-4xl border-black border-3">
          <div className="w-3/5 flex flex-col space-y-7 text-xl pt-8">
            <StrokeText
              key="about-title-1"
              tag="h2"
              strokeWidth={6}
              shadowSize={5}
              textColor="#ff2627"
              className="text-5xl font-bold italic leading-none "
            >
              Rodinný servis dvoch generácií
            </StrokeText>
            <div className="space-y-8">
              <p>
                Rodinný charakter podniku a osobný prístup k zákazníkom sú
                základom dobrej povesti a stálej klientely servisu na
                Strojníckej ulici.
              </p>
              <p>
                Autoservis KOMEX dnes funguje ako spolupráca dvoch generácií -
                samotný servis vozidiel vedie Marcel Komka, zatiaľ čo na opravy
                a repasovanie autochladičov sa špecializuje jeho otec Dušan
                Komka
              </p>
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-y-4">
            <ImageWrapper>
              <img
                src="/images/o-nas/IMG_20251221_232348_556 1.png"
                alt="O nas 1"
              />
            </ImageWrapper>
            <div className="flex flex-row gap-x-4">
              <ImageWrapper>
                <img
                  src="/images/o-nas/IMG_20251221_232348_556 1.png"
                  alt="O nas 1"
                />
              </ImageWrapper>
              <ImageWrapper>
                <img
                  src="/images/o-nas/IMG_20251221_232348_556 1.png"
                  alt="O nas 1"
                />
              </ImageWrapper>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
