import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./utils/supabase/types/database.types.ts";

const PUBLIC_PAGES = ["/", "/login", "/register"];
const AUTH_PAGES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value);
          });
        },
      },
    },
  );

  const isPublicPage = PUBLIC_PAGES.includes(request.nextUrl.pathname);
  const isAuthPage = AUTH_PAGES.includes(request.nextUrl.pathname);

  const { data, error } = await supabase.auth.getUser();
  const isAuthenticated = !error && data?.user;

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  if (!isPublicPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
