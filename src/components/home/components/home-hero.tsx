"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative flex flex-col-reverse items-center justify-center gap-6 bg-gradient-to-b from-blue-100 to-white px-6 py-12 md:flex-row md:gap-12 lg:gap-16 lg:px-16 lg:py-20">
      {/* Animated Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-center md:text-left"
      >
        <h1 className="text-3xl leading-tight font-bold text-blue-500 sm:text-4xl lg:text-5xl">
          Electrical, HVAC & Plumbing{" "}
          <span className="block text-blue-500">services for your home...</span>
          <span className="relative mt-4 inline-block sm:mt-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative z-10 text-gray-500 italic"
            >
              ...all under one roof!
            </motion.span>
            {/* Animated Hand-Drawn Underline */}
            <motion.svg
              initial={{ strokeDasharray: 200, strokeDashoffset: 200 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute bottom-[-18px] left-0 w-full"
              viewBox="0 0 200 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M5 15 C50 25, 150 -5, 195 15"
                stroke="#2b7fff" // Blue color for the underline
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </span>
        </h1>
      </motion.div>

      {/* Image Section with Fade-In */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="w-2/5 max-w-[350px] md:w-1/3"
      >
        <Image
          src="/images/blue-500-house.png"
          alt="DSD Services logo shaped like a house. Under the roof are four circles with a lightning bolt, flame, snowflake, and water droplet."
          width={403}
          height={451}
        />
      </motion.div>
    </section>
  );
}
//   return (
//     <section className="relative flex flex-col-reverse items-center justify-center gap-4 bg-gradient-to-l from-blue-200 to-white py-8 md:flex-row md:gap-10 md:py-10 lg:gap-16 lg:px-10 lg:py-12 xl:py-16">
//       {/* Animated Text Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="flex flex-col justify-center px-2 text-center text-3xl font-semibold text-blue-500 md:text-left md:text-4xl lg:text-5xl"
//       >
//         <h1>
//           {/* <h1 className="drop-shadow-md"> */}
//           Electrical, HVAC &amp; Plumbing{" "}
//           <span className="block">services for your home...</span>
//           <motion.span
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
//             className="block pt-4 italic md:pt-10"
//           >
//             ...all under one roof!
//           </motion.span>
//         </h1>
//         {/* <div className="after:mx-auto after:mt-2 after:block after:h-1 after:w-16 after:bg-blue-500 after:content-[''] md:after:mx-0"></div> */}
//       </motion.div>

//       {/* Image with subtle hover effect */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//         className="w-2/5 max-w-[350px] md:w-1/3"
//       >
//         <Image
//           src="/images/blue-500-house.png"
//           alt="DSD Services logo shaped like a house. Under the roof are four circles with a lightning bolt, flame, snowflake, and water droplet."
//           width={403}
//           height={451}
//           // className="transition-transform duration-300 ease-in-out"
//           // className="shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
//         />
//       </motion.div>
//     </section>
//   );
// }

// import Image from "next/image";

// export default function HomeHero() {
//   return (
//     <section className="flex flex-col-reverse items-center justify-center gap-4 py-8 md:flex-row md:gap-10 md:py-10 lg:gap-16 lg:px-10 lg:py-12 xl:py-16">
//       <div className="flex flex-col justify-center px-2 text-center text-3xl font-semibold text-blue-500 md:text-left md:text-4xl lg:text-5xl">
//         <h1>
//           Electrical, HVAC &amp; Plumbing{" "}
//           <span className="block">services for your home...</span>
//           <span className="block pt-4 italic md:pt-10">
//             ...all under one roof!
//           </span>
//         </h1>
//       </div>
//       <div className="w-2/5 max-w-[350px] md:w-1/3">
//         <Image
//           src="/images/blue-500-house.png"
//           alt="DSD Services logo shaped like a house. Under the roof are four circles with a lightning bolt, flame, snowflake, and water droplet."
//           width={403}
//           height={451}
//         />
//       </div>
//     </section>
//   );
// }
