import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-6">
            Bine ai venit la ro-fish!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Comunitatea ta de pescuit în apele României
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <Link href="/tutorial">
                <h3 className="text-xl font-semibold mb-4">
                  🎣 Tehnici de pescuit
                </h3>
                <p className="text-gray-400">
                  Învață cele mai eficiente metode de pescuit în apele noastre
                </p>
              </Link>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <Link href="/fishes">
                <h3 className="text-xl font-semibold mb-4">
                  🐟 Specii de pești
                </h3>
                <p className="text-gray-400">
                  Descoperă biodiversitatea acvatică a României
                </p>
              </Link>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
              <Link href="/events">
                <h3 className="text-xl font-semibold mb-4">📅 Evenimente</h3>
                <p className="text-gray-400">
                  Participă la competiții și întâlniri de pescuit
                </p>
              </Link>
            </div>
          </div>

          {/* <div className="flex gap-6 justify-center">
            <Link
              href="/login"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Autentificare
            </Link>
            <Link
              href="/register"
              className="bg-gray-800 text-white px-8 py-4 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors text-lg"
            >
              Înregistrare
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
