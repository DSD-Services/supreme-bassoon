import { createClient } from "@/utils/supabase/server";
import type {
  Profile,
  ProfileWithTechnicianDetails,
  UserRole,
} from "@/utils/supabase/types";
import { PostgrestError } from "@supabase/supabase-js";

type FindAllProfilesOptions<Role extends UserRole | undefined = undefined> = {
  role?: Role;
  query?: string;
};

type FindAllProfilesReturn<Role extends UserRole | undefined> =
  Role extends "TECHNICIAN"
    ? {
        data: Array<ProfileWithTechnicianDetails> | null;
        error: PostgrestError | null;
      }
    : { data: Array<Profile> | null; error: PostgrestError | null };

export async function findAllProfiles<Role extends UserRole | undefined>(
  options: FindAllProfilesOptions<Role> = {},
): Promise<FindAllProfilesReturn<Role>> {
  const supabase = await createClient();

  const { role, query: searchQuery } = options;

  let query = supabase.from("profiles").select("*");

  if (role === "TECHNICIAN") {
    query = supabase
      .from("profiles")
      .select("*, technician_details(*, departments(*))");
  }

  if (role) {
    query = query.eq("role", role);
  }

  if (searchQuery) {
    query = query.or(
      `first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`,
    );
  }

  return (await query.order("last_name", {
    ascending: true,
  })) as FindAllProfilesReturn<Role>;
}

type FindOneProfileOptions = { role?: UserRole };

export async function findOneProfile(
  userId: string,
  options: FindOneProfileOptions = {},
) {
  const supabase = await createClient();
  const { role } = options;

  let query = supabase.from("profiles").select("*").eq("id", userId);
  if (role) query = query.eq("role", role);

  return await query.single();
}
