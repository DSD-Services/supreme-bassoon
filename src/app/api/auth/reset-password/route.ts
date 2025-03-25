import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { newPassword } = await req.json();

    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required" },
        { status: 400 },
      );
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => cookies().get(name)?.value,
          set: (name, value, options) =>
            cookies().set({ name, value, ...options }),
          remove: (name, options) =>
            cookies().set({ name, value: "", ...options }),
        },
      },
    );

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await supabase.auth.signOut();

    return NextResponse.json({
      success: "Password updated! Redirecting to login...",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
