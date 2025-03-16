"use client";

import { createClient } from "@/utils/supabase/client";
import { UserRole } from "@/utils/supabase/types";
import { useEffect, useState } from "react";
import Nav from "./nav";
import { clientNavItems, loggedOutNavItems, navItems } from "./nav-items";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const NavWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const supabase = createClient();

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        setUserRole(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setUserRole(profile ? profile.role : null);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} className="animate-spin opacity-50" />
      </div>
    );
  }

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
