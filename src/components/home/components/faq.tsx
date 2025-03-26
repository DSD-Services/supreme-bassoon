"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
      "Absolutely. If you need to cancel your appointment, please contact us directly. You can then reschedule your appointment through your account dashboard.",
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
    <div
      className="bg-opacity-50 bg-[url('/images/background/tile_250x250_blue-50.png')] bg-fixed bg-center bg-repeat py-24"
      id="faqs"
    >
      <section className="mx-6 max-w-xl rounded-lg bg-white p-6 shadow-lg sm:mx-auto md:max-w-3xl">
        <h2 className="mb-4 text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b">
              <button
                className="flex w-full cursor-pointer items-center justify-between py-3 text-left font-medium focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span>{faq.question}</span>
                <motion.span
                  initial={false}
                  animate={{ rotate: openQuestion === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-auto px-2 text-right text-xl font-medium text-blue-500 sm:px-4"
                  style={{ transformOrigin: "center" }}
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </motion.span>
              </button>
              <AnimatePresence>
                {openQuestion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full overflow-hidden"
                  >
                    <p className="px-4 pb-3 text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
