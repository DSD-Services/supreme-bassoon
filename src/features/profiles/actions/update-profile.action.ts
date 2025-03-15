"use server";

import { protect } from "@/features/auth/queries";
import { ProfileInput, ProfileSchema } from "../schemas";
import { findOneProfile } from "@/features/profiles/queries";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(profileId: string, values: ProfileInput) {
  const { userId } = await protect();

  const { data: profile } = await findOneProfile(userId);
  if (!profile) return { error: "Unauthenticated" };

  if (profile.role !== "ADMIN" && userId !== profile.id) {
    return { error: "Unauthorized" };
  }

  const parsedValues = ProfileSchema.safeParse(values);

  if (!parsedValues.success) {
    const error = parsedValues.error.issues?.[0].message;
    return { error };
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
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      ...(addressLine1 ? { address_line1: addressLine1 } : {}),
      ...(addressLine2 ? { address_line2: addressLine2 } : {}),
      ...(city ? { city: city } : {}),
      first_name: firstName,
      last_name: lastName,
      ...(postalCode ? { postal_code: postalCode } : {}),
      ...(primaryPhone ? { primary_phone: primaryPhone } : {}),
      ...(role ? { role: role } : {}),
      ...(secondaryPhone ? { secondary_phone: secondaryPhone } : {}),
      ...(state ? { state: state } : {}),
    })
    .eq("id", profileId);

  return { error: error ? error.message : null };
}
