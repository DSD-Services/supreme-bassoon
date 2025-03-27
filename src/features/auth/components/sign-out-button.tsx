import { Button } from "@/components/ui/button";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SignOutButton = () => {
  return (
    <form action="/api/auth/signout" method="post">
      <Button type="submit" className="bg-blue-900 hover:bg-blue-800">
        <FontAwesomeIcon size="sm" icon={faSignOutAlt} />
        Sign out
      </Button>
    </form>
  );
};
