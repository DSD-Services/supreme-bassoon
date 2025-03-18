export default function Footer() {
  return (
    <footer className="min-h-16 bg-blue-500 p-2 text-white md:h-14 md:p-4 md:px-12">
      <div className="container mx-auto flex h-full flex-col-reverse items-center justify-between gap-2 md:flex-row">
        <div
          aria-label="Copyright notice"
          className="text-xs opacity-80 md:text-sm"
        >
          <span>
            &copy; {new Date().getFullYear()} DSD Services. All rights reserved.
          </span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex gap-4 text-sm">
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
