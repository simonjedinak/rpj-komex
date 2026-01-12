export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">KOMEX</h3>
            <p className="text-gray-400">
              Váš spoľahlivý partner pre autoservis a opravy
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <p className="text-gray-400">Email: info@komex.sk</p>
            <p className="text-gray-400">Telefón: 0905 489 092</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Otváracie hodiny</h4>
            <p className="text-gray-400">Po - Pia: 8:00 - 16:00</p>
            <p className="text-gray-400">So - Ne: Zatvorené</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2026 KOMEX. Všetky práva vyhradené.</p>
        </div>
      </div>
    </footer>
  );
}
