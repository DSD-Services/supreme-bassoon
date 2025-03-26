import React from "react";

const steps = [
  {
    id: 1,
    title: "Choose a Service",
    description:
      "First, select a department (e.g., Plumbing). Then, choose a specific service within that department (e.g., Faucet Repair).",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-500"
      >
        <path
          d="M8 7V6.2C8 5.0799 8 4.51984 8.21799 4.09202C8.40973 3.71569 8.71569 3.40973 9.09202 3.21799C9.51984 3 10.0799 3 11.2 3H12.8C13.9201 3 14.4802 3 14.908 3.21799C15.2843 3.40973 15.5903 3.71569 15.782 4.09202C16 4.51984 16 5.0799 16 6.2V7M7 21V7.00169M17 21V7M7 7.00169C7.24373 7 7.50929 7 7.8 7H16M7 7.00169C5.83507 7.00979 5.16873 7.05658 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H17M17 7H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Pick a Time Slot",
    description: "Choose a convenient time for the service provider to visit.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-500"
      >
        <path
          d="M3 9H21M17 13.0014L7 13M10.3333 17.0005L7 17M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Confirm & Get Ready",
    description:
      "We notify the provider and ensure required parts are available before arrival.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-500"
      >
        <path
          d="M4 12.6111L8.92308 17.5L20 6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section
      className="bg-[url('/images/background/tile_250x250_blue-50.png')] bg-fixed bg-center bg-repeat py-24"
      id="how-it-works"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-8 text-3xl font-bold">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg"
            >
              {step.icon}
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
