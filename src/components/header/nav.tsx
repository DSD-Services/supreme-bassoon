"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import MobileMenu from "./mobile-menu";
import MotionButtonWrapper from "../buttons/motion-button-wrapper";
import { NavDataItem } from "./nav-items";
import { NavLink } from "./nav-link";

interface NavProps {
  navData: NavDataItem[];
}

export default function Nav({ navData }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="hidden gap-8 font-semibold md:flex">
        {navData.map((item) => (
          <NavLink
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </div>
      <MotionButtonWrapper>
        <div
          role="button"
          aria-label="Open mobile navigation menu"
          tabIndex={0}
          className="flex cursor-pointer transition hover:text-blue-200 md:hidden"
        >
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl"
            onClick={handleMenuClick}
          />
        </div>
      </MotionButtonWrapper>
      <MobileMenu
        handleMenuClick={handleMenuClick}
        isMenuOpen={isMenuOpen}
        navData={navData}
      />
    </nav>
  );
}
