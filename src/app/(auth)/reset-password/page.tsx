"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/features/auth/actions/reset-password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(password);
    router.push("/login");
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid place-items-center md:flex-row">
        <h1 className="text-center text-2xl font-bold whitespace-nowrap sm:text-4xl md:w-2/4 md:text-3xl">
          Set a New Password
        </h1>
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center p-4 md:p-6 lg:px-8">
        <div className="mt-2 rounded-lg bg-[#E2EAFF] p-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mb-4 text-center text-xl font-semibold">
            Choose a new password
          </h2>
          {message && <p className="mb-2 text-center text-sm">{message}</p>}
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              type="password"
              className="bg-white"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
