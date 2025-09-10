export default function Portfolio() {
  return (
    <div className="bg-gray-200 flex flex-col items-center justify-start min-h-screen text-gray-800 font-sans selection:bg-black selection:text-white">
      {/* Header */}
      <header className="w-full py-32 flex flex-col items-center text-center px-4">
        <h1 className="font-semibold tracking-tight text-gray-900 mb-6 select-none">
          <span className="block text-4xl sm:text-6xl">19 thara</span>
          <span className="block text-lg sm:text-2xl mt-2 text-gray-500">
            Freelancer aus Berlin
          </span>
        </h1>

        <p className="mt-6 text-xl sm:text-3xl text-gray-800 max-w-3xl leading-snug font-light tracking-wide">
          Moderne Interfaces, klare Designs, schnelle Ergebnisse.
        </p>

        <p className="mt-4 text-sm sm:text-base text-gray-500 font-mono">
          Frontend Developer • HTML • TailwindCSS • JavaScript
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 space-y-16">
        <section className="flex justify-center">
          <p className="text-base text-center max-w-3xl text-sm sm:text-xl text-gray-500 font-mono tracking-wide">
            Ich entwickle intuitive und responsive Benutzeroberflächen …
          </p>
        </section>

        {/* Hier kannst du deine Cards als eigene React-Komponenten einfügen */}
      </main>

      {/* Footer */}
      <footer className="items-center mt-24 mb-6 text-center text-gray-600 text-sm">
        <p>© 2025 19thara.com</p>
        <div className="space-x-4 mt-2">
          <a href="/impressum" className="underline hover:text-gray-800">
            Impressum
          </a>
          <a href="/datenschutz" className="underline hover:text-gray-800">
            Datenschutz
          </a>
        </div>
      </footer>
    </div>
  );
}
