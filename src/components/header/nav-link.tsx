"use client";

import MotionButtonWrapper from "../ui/motion-button-wrapper";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";
import { NavDataItem } from "./nav-items";

type NavLinkProps = NavDataItem & {
  className?: string;
};

export const NavLink = ({ label, className, icon, href }: NavLinkProps) => {
  return (
    <MotionButtonWrapper>
      <Link
        href={href}
        className={cn(
          "flex items-center justify-center text-sm text-white transition hover:text-white/80",
          className,
        )}
      >
        {icon ? (
          <FontAwesomeIcon icon={icon} className="mr-2" size="sm" />
        ) : null}
        <span>{label}</span>
      </Link>
    </MotionButtonWrapper>
  );
};
