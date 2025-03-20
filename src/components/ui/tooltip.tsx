"use client";

import { useState } from "react";
import { ReactNode } from "react";
import "./tooltip.css";

interface TooltipProps {
  infoText: string;
  children?: ReactNode;
}

export default function Tooltip({ infoText, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  let timeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setShowTooltip(true);
    setIsVisible(true);
  };
  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setShowTooltip(false);
    }, 500);
    setIsVisible(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <div
        className={`tooltip ${showTooltip ? "open" : ""} ${isVisible ? "visible" : ""}`}
      >
        {infoText}
        <div className="arrow" />
      </div>
    </div>
  );
}
