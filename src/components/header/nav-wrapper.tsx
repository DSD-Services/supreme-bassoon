"use client";

import { createClient } from "@/utils/supabase/client";
import { UserRole } from "@/utils/supabase/types";
import { useEffect, useState } from "react";
import Nav from "./nav";
import { clientNavItems, loggedOutNavItems, navItems } from "./nav-items";

export const NavWrapper = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const supabase = createClient();

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return setUserRole(null);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setUserRole(profile ? profile.role : null);
    })();
  }, []);

  if (!userRole) {
    return <Nav navData={loggedOutNavItems} />;
  }
  console.log("here");
  let navData = [];
  switch (userRole) {
    case "CLIENT":
      navData = clientNavItems;
      break;
    case "TECHNICIAN":
    case "ADMIN":
      navData = navItems;
      break;
  }

  return <Nav navData={navData} authenticated />;
};
