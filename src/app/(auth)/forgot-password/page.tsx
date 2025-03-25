"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const supabase = createClient();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(
        "If this email is registered, check your inbox for the reset link.",
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid place-items-center md:flex-row">
        <h1 className="text-center text-2xl font-bold whitespace-nowrap sm:text-4xl md:w-2/4 md:text-3xl">
          Reset Your Password
        </h1>
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center p-4 md:p-6 lg:px-8">
        <div className="mt-2 rounded-lg bg-[#E2EAFF] p-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mb-4 text-center text-xl font-semibold">
            Enter your email to get a reset link
          </h2>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <Input
              type="email"
              className="bg-white"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
