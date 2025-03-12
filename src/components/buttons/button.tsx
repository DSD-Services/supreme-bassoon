"use client";

import { ReactNode } from "react";
import MotionButtonWrapper from "./motion-button-wrapper";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  fontWeight: "regular" | "medium" | "semibold" | "bold";
  type?: "button" | "submit";
}

export default function Button({
  children,
  size = "md",
  fontWeight = "semibold",
  type = "button",
}: ButtonProps) {
  const sizeClasses = {
    sm: "text-base py-1 px-2",
    md: "text-lg py-2 px-4",
    lg: "text-xl py-3 px-6",
    xl: "text-2xl py-3 px-6",
  };

  const weightClasses = {
    regular: "font-regular",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <MotionButtonWrapper>
      <button
        className={`cursor-pointer rounded-md bg-blue-500 text-white shadow-lg transition hover:bg-blue-600 ${sizeClasses[size]} ${weightClasses[fontWeight]}`}
      >
        {children}
      </button>
    </MotionButtonWrapper>
  );
}
