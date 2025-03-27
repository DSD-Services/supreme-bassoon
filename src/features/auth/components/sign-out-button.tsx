import { Button } from "@/components/ui/button";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SignOutButton = () => {
  return (
    <form action="/api/auth/signout" method="post">
      <Button type="submit" variant="destructive">
        <FontAwesomeIcon size="sm" icon={faSignOutAlt} />
        Sign out
      </Button>
    </form>
  );
};
