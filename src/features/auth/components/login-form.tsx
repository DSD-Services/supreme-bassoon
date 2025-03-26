"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { ActionState, loginAction } from "@/features/auth/actions/login.action";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    loginAction,
    undefined,
  );
  const [banner, setBanner] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("resetSuccess");

  useEffect(() => {
    if (resetSuccess) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("resetSuccess");
      window.history.replaceState({}, "", newUrl.toString());

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [resetSuccess, router]);

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
      toast.success("Welcome back!");
    }

    if (state?.error) {
      if (state.error.includes("confirm")) {
        setBanner(true);
      } else {
        toast.error(state.error);
        setBanner(false);
      }
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-2.5">
      {banner ? (
        <div className="mt-2 rounded bg-red-600 px-2 py-0.5">
          <span className="rounded text-sm text-white">
            Please confirm your email address to log in. If you haven&apos;t
            received a confirmation email,{" "}
            <Button
              asLink
              href="/register/resend"
              variant="link"
              className="inline px-0 text-white"
            >
              click here
            </Button>{" "}
            to resend it.
          </span>
        </div>
      ) : null}
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-blue-800"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          className="bg-white"
          defaultValue={state?.error ? state.defaultValues?.email : ""}
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between pt-2">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-blue-800"
          >
            Password
          </label>
        </div>
        <PasswordInput
          id="password"
          name="password"
          className="bg-white"
          required
        />
        <div className="flex justify-end pt-1 pb-2 text-sm">
          <Link
            href="/forgot-password"
            className="self-end font-semibold text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
