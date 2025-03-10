import React from "react";
import MotionButtonWrapper from "../buttons/motion-button-wrapper";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  label: string;
  href: string;
  icon?: IconDefinition;
  className?: string;
};

export const NavLink = ({ label, className, icon, href }: NavLinkProps) => {
  return (
    <MotionButtonWrapper>
      <Link
        href={href}
        className={cn(
          "text-primary-foreground hover:text-primary-foreground/80 flex justify-center transition",
          className,
        )}
      >
        {icon ? (
          <>
            <FontAwesomeIcon icon={icon} className="mr-2" />
            {label}
          </>
        ) : (
          label
        )}
      </Link>
    </MotionButtonWrapper>
  );
};
