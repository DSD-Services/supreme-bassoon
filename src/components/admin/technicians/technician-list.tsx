"use client";

import { useEffect, useState } from "react";
import { ProfileWithTechnicianDetails } from "@/utils/supabase/types";
import { Input } from "@/components/ui/input";
import { TechnicianCard } from "./technician-card";

type TechnicianListProps = {
  initialProfiles: Array<ProfileWithTechnicianDetails>;
};

export const TechnicianList = ({ initialProfiles }: TechnicianListProps) => {
  const [profiles, setProfiles] =
    useState<Array<ProfileWithTechnicianDetails>>(initialProfiles);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setProfiles(initialProfiles);
  }, [initialProfiles]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const q = evt.target.value.trim();
    setQuery(q);

    const filterOn = q.length > 3 ? profiles : initialProfiles;

    setProfiles(
      filterOn.filter(({ first_name, last_name, technician_details }) => {
        const lowerQuery = q.toLowerCase();
        return (
          first_name.toLowerCase().includes(lowerQuery) ||
          last_name.toLowerCase().includes(lowerQuery) ||
          technician_details?.departments?.name
            .toLowerCase()
            .includes(lowerQuery)
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
        <TechnicianCard key={profile.id} profile={profile} />
      ))}
    </>
  );
};
