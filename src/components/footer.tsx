import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-80 border-t-2 border-blue-800 bg-blue-950 text-white shadow-lg">
      <div className="container mx-auto flex h-full flex-col justify-between px-6 py-6">
        <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="mb-3 text-2xl font-bold">DSD Services</div>
            <p className="mb-3 text-blue-200">
              Booking system for plumbing, electrical work and HVAC repairs.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Demonico/supreme-bassoon"
                target="_blank"
                aria-label="GitHub"
                className="transition-colors hover:text-blue-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-white">Quick Links</h3>
            <div className="grid grid-cols-3 gap-y-2 md:grid-cols-1">
              <Link
                href="/#services"
                className="text-blue-200 transition-colors hover:text-white"
              >
                Services
              </Link>
              <Link
                href="#how-it-works"
                className="text-blue-200 transition-colors hover:text-white"
              >
                How It Works
              </Link>
              <Link
                href="/#faqs"
                className="text-blue-200 transition-colors hover:text-white"
              >
                FAQs
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-blue-800 pt-4">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <div
              aria-label="Copyright notice"
              className="text-sm font-medium text-blue-200"
            >
              &copy; {new Date().getFullYear()} DSD Services. All rights
              reserved.
            </div>

            <div className="flex gap-4 text-xs text-blue-300">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
