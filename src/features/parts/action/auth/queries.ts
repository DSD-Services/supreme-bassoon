import { createClient } from "@/utils/supabase/server";

export async function getAuthUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function authorize() {
  const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");
}
