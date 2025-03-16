"use client";

import { useEffect, useRef } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import MotionButtonWrapper from "@/components/ui/motion-button-wrapper";
import { NavDataItem } from "@/components/header/nav-items";
import { NavLink } from "@/components/header/nav-link";
import { SignOutButton } from "@/features/auth/components/sign-out-button";

interface MobileMenuProps {
  handleMenuClick: () => void;
  isMenuOpen: boolean;
  navData: NavDataItem[];
  authenticated?: boolean;
}

export default function MobileMenu({
  handleMenuClick,
  isMenuOpen,
  navData,
  authenticated,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const isClickInsideMenu = menuRef.current?.contains(event.target as Node);
      const clickedLabel = (event.target as HTMLElement)?.textContent?.trim();
      const isClickOnNavLabel = navData.some(
        (item) => item.label === clickedLabel,
      );

      if (menuRef.current && (!isClickInsideMenu || isClickOnNavLabel)) {
        setTimeout(() => {
          handleMenuClick();
        }, 500);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleMenuClick, navData]);

  return (
    <AnimatePresence mode="wait">
      {isMenuOpen && (
        <>
          <div className="fixed top-0 left-0 z-10 h-full w-full backdrop-blur-xs transition" />
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: 224 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              x: 224,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            ref={menuRef}
            aria-label="Mobile navigation menu"
            className="bg-opacity-90 fixed top-0 right-0 z-20 h-full w-full max-w-[240px] bg-blue-500 sm:w-1/3"
          >
            <div className="flex justify-end">
              <MotionButtonWrapper>
                <div
                  role="button"
                  aria-label="Close mobile navigation menu"
                  tabIndex={0}
                  className="text-background group cursor-pointer pt-5 pr-6 text-2xl"
                >
                  <FontAwesomeIcon icon={faClose} onClick={handleMenuClick} />
                </div>
              </MotionButtonWrapper>
            </div>
            <div className="flex h-full max-h-[calc(100dvh-4rem)] flex-col gap-8 p-6 font-semibold text-white transition">
              {navData.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
              <div className="flex-1" />
              {authenticated ? (
                <div className="flex justify-center">
                  <SignOutButton />
                </div>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
