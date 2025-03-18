"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { ActionState, loginAction } from "@/features/auth/actions/login.action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    loginAction,
    undefined,
  );

  useEffect(() => {
    if (state?.success) {
      router.push("/account");
      toast.success("Welcome back!");
    }

    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-2.5">
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
          <a
            href="#"
            className="self-end font-semibold text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
