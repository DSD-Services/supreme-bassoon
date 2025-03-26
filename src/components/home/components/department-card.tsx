"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DepartmentCardProps {
  title: string;
  imageSrc: string;
  altText: string;
  description: string;
}

export default function DepartmentCard({
  title,
  imageSrc,
  altText,
  description,
}: DepartmentCardProps) {
  return (
    <motion.div
      className="relative h-80 w-64 overflow-hidden rounded-md bg-blue-500 shadow-lg"
      whileHover={{ scale: 1.03, rotateX: 5, rotateY: 5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
        <div className="flex h-2/3 w-full items-center justify-center">
          <Image
            src={imageSrc}
            alt={altText}
            width={224}
            height={224}
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <h4 className="pt-8 pb-2 text-center text-2xl font-bold">{title}</h4>
        <motion.p
          className="absolute inset-0 flex items-center justify-center rounded-md bg-blue-700/95 p-4 text-center text-white opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
