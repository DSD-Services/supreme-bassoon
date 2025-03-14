"use client";

import { useForm } from "react-hook-form";
import { registerAction } from "@/features/auth/actions/register.action";
import { RegisterInput, RegisterSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submit = async (values: RegisterInput) => {
    const res = await registerAction(values);

    if (res.error) {
      setError("confirmPassword", { message: res.error });
      return;
    }

    toast.success(
      "Registration successful! Please check your email to verify your account.",
      { duration: 4000 },
    );
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name:
        </label>
        <Input
          type="text"
          id="firstName"
          className="bg-white"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <span className="text-sm text-red-600">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name:
        </label>
        <Input
          type="text"
          id="lastName"
          {...register("lastName", { required: true })}
          className="bg-white"
        />
        {errors.lastName && (
          <span className="text-sm text-red-600">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          className="bg-white"
        />
        {errors.email && (
          <span className="text-sm text-red-600">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password:
        </label>
        <Input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="bg-white"
        />
        {errors.password && (
          <span className="text-sm text-red-600">
            {errors.password.message}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password:
        </label>
        <Input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", { required: true })}
          className="bg-white"
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};
