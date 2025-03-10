import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "CLIENT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { data: clientData, error: clientError } = await supabase
    .from("profiles")
    .select(
      "id, address_line1, address_line2, city, state, postal_code, primary_phone, secondary_phone",
    )
    .eq("user_id", user.id)
    .single();

  if (clientError) {
    return NextResponse.json({ error: clientError.message }, { status: 500 });
  }

  return NextResponse.json({
    clientId: clientData.id,
    addressLine1: clientData.address_line1,
    addressLine2: clientData.address_line2,
    city: clientData.city,
    state: clientData.state,
    postalCode: clientData.postal_code,
    primaryPhone: clientData.primary_phone,
    secondaryPhone: clientData.secondary_phone,
  });
}
