"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <motion.div
      className="group"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
        transformOrigin: "center",
      }}
      whileTap={{ scale: 0.9, transformOrigin: "center" }}
    >
      <Link href="/">
        <div className="flex">
          <div>
            <Image
              src="/images/small-roof-logo.svg"
              alt="Small white logo with roof and four circles underneath with a lightning bolt, flame, snowflake and water droplet."
              width={49}
              height={24}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <span className="pl-2 text-xl font-semibold md:text-2xl">
            DSD Services
          </span>
        </div>
      </Link>
    </motion.div>
  );
};
