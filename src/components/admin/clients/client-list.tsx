"use client";

import { useState } from "react";
import { Profile } from "@/utils/supabase/types";
import { ClientCard } from "./client-card";
import { Input } from "@/components/ui/input";

type ClientListProps = { initialProfiles: Array<Profile> };

export const ClientList = ({ initialProfiles }: ClientListProps) => {
  const [profiles, setProfiles] = useState<Array<Profile>>(initialProfiles);
  const [query, setQuery] = useState("");

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const q = evt.target.value.trim();
    setQuery(q);

    const filterOn = q.length > 3 ? profiles : initialProfiles;

    setProfiles(
      filterOn.filter(({ first_name, last_name }) => {
        const lowerQuery = q.toLowerCase();
        return (
          first_name.toLowerCase().includes(lowerQuery) ||
          last_name.toLowerCase().includes(lowerQuery)
        );
      }),
    );
  };

  return (
    <>
      <div>
        <Input
          type="search"
          className=""
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
      </div>

      {profiles?.map((profile) => (
        <ClientCard key={profile.id} profile={profile} />
      ))}
    </>
  );
};
