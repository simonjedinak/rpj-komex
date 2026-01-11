export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">O nás</h1>
          <p className="text-xl text-gray-300">
            Zoznámte sa s KOMEX - vaším dôveryhodným autoservisom
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Naša história</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              KOMEX je rodinná firma s dlhoročnou tradíciou v oblasti autoservisu a opráv vozidiel.
              Od nášho založenia sme sa zaviazali poskytovať našim zákazníkom tú najvyššiu úroveň
              servisu a odbornosti.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Naša filozofia je jednoduchá - spokojnosť zákazníka je na prvom mieste. Každé vozidlo
              ošetrujeme s rovnakou starostlivosťou a pozornosťou, akoby išlo o naše vlastné.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Náš tím</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 text-center mb-12 leading-relaxed">
              Náš tím tvoria skúsení mechanici a technici s certifikátmi pre prácu s rôznymi značkami
              vozidiel. Pravidelne sa vzdelávame a sledujeme najnovšie trendy v automobilovom priemysle,
              aby sme mohli poskytovať tie najlepšie služby.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-6xl mb-4">👨‍🔧</div>
                <h3 className="font-semibold text-xl mb-2">Hlavný mechanik</h3>
                <p className="text-gray-600">20+ rokov skúseností</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-6xl mb-4">👨‍💻</div>
                <h3 className="font-semibold text-xl mb-2">Diagnostik</h3>
                <p className="text-gray-600">Špecialista na elektroniku</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-6xl mb-4">👨‍🔧</div>
                <h3 className="font-semibold text-xl mb-2">Servisný technik</h3>
                <p className="text-gray-600">Odborník na údržbu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">Naše hodnoty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="flex gap-4">
                <div className="text-3xl text-red-500">🎯</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Profesionalita</h3>
                  <p className="text-gray-600">
                    Pristupujeme ku každej oprave s maximálnou zodpovednosťou a odbornosťou.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl text-red-500">🤝</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Dôveryhodnosť</h3>
                  <p className="text-gray-600">
                    Transparentná komunikácia a férové ceny sú základom našej práce.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl text-red-500">⭐</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Kvalita</h3>
                  <p className="text-gray-600">
                    Používame len originálne a overené náhradné diely od renomovaných výrobcov.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-3xl text-red-500">💡</div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Inovácia</h3>
                  <p className="text-gray-600">
                    Investujeme do moderných technológií a vzdelávania našich zamestnancov.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
