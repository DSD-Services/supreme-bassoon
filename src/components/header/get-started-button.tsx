import { createClient } from "@/utils/supabase/server";
import { NavLink } from "./nav-link";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Nav from "./nav";
import { clientNavItems } from "./nav-items";

export default async function GetStartedButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <NavLink href="/account" label="Account" icon={faUser} />;
  }

  return <Nav navData={clientNavItems} />;
}
