"use client";

import MotionButtonWrapper from "../buttons/motion-button-wrapper";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";
import { NavDataItem } from "./nav-items";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type NavLinkProps = NavDataItem & {
  className?: string;
};

export const NavLink = ({
  label,
  className,
  icon,
  href,
  roles,
}: NavLinkProps) => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data) setUser(data.user);
    });
  }, [supabase.auth]);

  if (roles && !roles.includes(user?.user_metadata?.role)) return null;

  return (
    <MotionButtonWrapper>
      <Link
        href={href}
        className={cn(
          "text-primary-foreground hover:text-primary-foreground/80 flex items-center justify-center text-sm transition",
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
