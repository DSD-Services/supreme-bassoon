"use client";

import Link from "next/link";
import MotionButtonWrapper from "../buttons/motion-button-wrapper";

type NavDataItem = {
  label: string;
  href: string;
  className: string;
};

interface NavLinksProps {
  navData: NavDataItem[];
}

export default function NavLinks({ navData }: NavLinksProps) {
  return (
    <>
      {navData.map((item) => (
        <MotionButtonWrapper key={item.label}>
          <Link href={item.href} className={item.className}>
            {item.label}
          </Link>
        </MotionButtonWrapper>
      ))}
    </>
  );
}
