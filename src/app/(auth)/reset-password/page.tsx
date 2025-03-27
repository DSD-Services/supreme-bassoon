"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Password updated successfully!");

      setTimeout(() => {
        router.push("/login?resetSuccess=true");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Oops! Something went wrong");
      }
    }
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
