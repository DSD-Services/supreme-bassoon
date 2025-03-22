"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I book a service appointment?",
    answer:
      "You can book a service appointment through our online booking system. Select the type of service you need, choose an available time slot, and confirm your appointment. You'll receive a confirmation email with all the details.",
  },
  {
    question: "Will I know what parts are needed for my repair?",
    answer:
      "Yes! Once your appointment is scheduled, our system will determine the required parts based on the type of repair. If any parts are missing from inventory, your service provider will be notified before your appointment.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "Absolutely. You can reschedule or cancel your appointment through your account dashboard.",
  },
  {
    question: "How do I know my service provider is qualified?",
    answer:
      "All our service providers are licensed, background-checked professionals with experience in their respective fields. We ensure high-quality service and customer satisfaction.",
  },
];

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="pt-8 pb-20" id="faqs">
      <section className="mx-auto my-10 max-w-3xl rounded-lg bg-white p-6 shadow-none md:shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b">
              <button
                className="flex w-full items-center justify-between py-3 text-left font-medium focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span>{faq.question}</span>
                <span>{openQuestion === index ? "-" : "+"}</span>
              </button>
              {openQuestion === index && (
                <p className="px-4 pb-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
