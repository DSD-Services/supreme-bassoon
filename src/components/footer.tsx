export default function Footer() {
  return (
    <footer className="min-h-16 bg-blue-500 px-6 py-4 text-white md:px-12">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div
          aria-label="Copyright notice"
          className="flex flex-col justify-center text-sm md:flex-row md:gap-1"
        >
          <span>&copy; {new Date().getFullYear()} DSD Services</span>
          <span>All rights reserved.</span>
        </div>

        <nav aria-label="Footer navigation" className="mt-4 md:mt-0">
          <ul className="flex flex-col gap-4 text-sm md:flex-row md:gap-6">
            <li>
              <a
                href="#services"
                className="hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
              >
                FAQs
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-4 md:mt-0">
          <a
            href="#book-a-service"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:ring-2 focus:ring-white focus:outline-none"
          >
            Book a Service
          </a>
        </div>
      </div>
    </footer>
  );
}
