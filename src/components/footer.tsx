export default function Footer() {
  return (
    <footer className="h-16 bg-blue-500 p-4 text-white md:px-12">
      <div className="container mx-auto flex h-full items-center justify-between">
        <div aria-label="Copyright notice" className="text-sm opacity-80">
          <span>
            &copy; {new Date().getFullYear()} DSD Services. All rights reserved.
          </span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex gap-2 text-sm">
            <li>
              <a
                href="#services"
                className="opacity-80 transition hover:text-white hover:opacity-100 focus:ring-2 focus:ring-white focus:outline-none"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="opacity-80 transition hover:text-white hover:opacity-100 focus:ring-2 focus:ring-white focus:outline-none"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="opacity-80 transition hover:text-white hover:opacity-100 focus:ring-2 focus:ring-white focus:outline-none"
              >
                FAQs
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
