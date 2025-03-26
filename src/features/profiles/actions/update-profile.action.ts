"use server";

import { reqRoles } from "@/features/auth/queries";
import { ProfileInput, ProfileSchema } from "../schemas";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(profileId: string, values: ProfileInput) {
  const profile = await reqRoles(["ADMIN", "CLIENT", "TECHNICIAN"]);
  if (!profile) throw new Error("Forbidden");

  if (profile.role !== "ADMIN" && profile.id !== profileId) {
    return { error: "Unauthorized" };
  }

  const parsedValues = ProfileSchema.safeParse(values);

  if (!parsedValues.success) {
    const error = parsedValues.error.issues?.[0].message;
    return { data: null, error };
  }

  const supabase = await createClient();

  const {
    addressLine1,
    addressLine2,
    city,
    firstName,
    lastName,
    postalCode,
    primaryPhone,
    role,
    secondaryPhone,
    state,
  } = parsedValues.data;

  if (profile.role !== "ADMIN" && role === "ADMIN") {
    return { error: "Forbidden" };
  }

  return await supabase
    .from("profiles")
    .update({
      address_line1: addressLine1 ? addressLine1 : "",
      address_line2: addressLine2 ? addressLine2 : "",
      city: city ? city : "",
      state: state ? state : "",
      postal_code: postalCode ? postalCode : "",
      primary_phone: primaryPhone ? primaryPhone : "",
      secondary_phone: secondaryPhone ? secondaryPhone : "",
      first_name: firstName,
      last_name: lastName,
      ...(role ? { role: role } : {}),
    })
    .eq("id", profileId);
}
