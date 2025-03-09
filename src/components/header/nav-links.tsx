"use client";

import Link from "next/link";
import MotionButtonWrapper from "../buttons/motion-button-wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavDataItem } from "./types/header.types";

interface NavLinksProps {
  navData: NavDataItem[];
}

export default function NavLinks({ navData }: NavLinksProps) {
  return (
    <>
      {navData.map((item) => (
        <MotionButtonWrapper key={item.label}>
          <Link href={item.href} className={item.className}>
            {item.icon ? (
              <>
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.label}
              </>
            ) : (
              item.label
            )}
          </Link>
        </MotionButtonWrapper>
      ))}
    </>
  );
}
