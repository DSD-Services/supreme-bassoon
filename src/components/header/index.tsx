import { createClient } from "@/utils/supabase/server";
import { Logo } from "./logo";
import Nav from "./nav";
import { clientNavItems, loggedOutNavItems, navItems } from "./nav-items";
import { findOneProfile } from "@/features/profiles/queries";

export const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Nav navData={loggedOutNavItems} />;
  }

  const { data: profile } = await findOneProfile(user.id);

  const navData = profile?.role === "CLIENT" ? clientNavItems : navItems;

  return (
    <header className="text-background flex h-16 items-center justify-between bg-blue-500 pr-6 pl-4 md:px-8">
      <Logo />
      <Nav navData={navData} authenticated />
    </header>
  );
};
