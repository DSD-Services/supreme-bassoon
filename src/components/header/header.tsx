"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="bg-primary text-background flex h-16 items-center justify-between pr-6 pl-4 md:px-8">
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
              />
            </div>
            <span className="pl-2 text-xl font-semibold md:text-2xl">
              DSD Services
            </span>
          </div>
        </Link>
      </motion.div>

      {children}
    </header>
  );
}
