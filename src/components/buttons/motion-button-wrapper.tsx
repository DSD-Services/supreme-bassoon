"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MotionButtonWrapperProps {
  children: ReactNode;
}

export default function MotionButtonWrapper({
  children,
}: MotionButtonWrapperProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.07,
        transition: { duration: 0.2 },
        transformOrigin: "center",
      }}
      whileTap={{ scale: 0.9, transformOrigin: "center" }}
    >
      {children}
    </motion.div>
  );
}
