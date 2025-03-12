"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { type ProfileInput, ProfileSchema } from "@/features/profiles/schemas";
import { updateProfile } from "@/features/profiles/actions/update-profile.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Profile } from "@/utils/supabase/types";

type UpdateProfileFormProps = {
  profile: Profile;
  onSuccess?: () => void;
};

export const UpdateProfileForm = ({
  profile,
  onSuccess,
}: UpdateProfileFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      addressLine1: profile.address_line1,
      addressLine2: profile.address_line2,
      city: profile.city,
      firstName: profile.first_name,
      lastName: profile.last_name,
      postalCode: profile.postal_code,
      state: profile.state,
      primaryPhone: profile.primary_phone,
      secondaryPhone: profile.secondary_phone,
      ...(profile.role ? { role: profile.role } : {}),
    },
  });

  useEffect(() => {
    if (!errors || typeof errors !== "object") return;

    const field = Object.keys(errors)?.[0] as keyof typeof errors;

    if (field && errors[field]?.message) {
      toast.error(errors[field].message);
    }
  }, [errors]);

  const submit = async (values: ProfileInput) => {
    if (!profile.id) return null;
    const { error } = await updateProfile(profile.id, values);

    if (error) {
      toast.error(error);
      return;
    }

    router.refresh();
    onSuccess?.();
    toast.success("Update successful");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-2">
      <div className="flex gap-2">
        <div className="flex w-1/2 flex-col">
          <label htmlFor="firstName" className="text-sm">
            First Name
          </label>
          <Input type="text" id="firstName" {...register("firstName")} />
        </div>
        <div className="flex w-1/2 flex-col">
          <label htmlFor="lastName" className="text-sm">
            Last Name
          </label>
          <Input type="text" id="lastName" {...register("lastName")} />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="addressLine1" className="text-sm">
          Address Line 1
        </label>
        <Input type="text" id="addressLine1" {...register("addressLine1")} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="addressLine2" className="text-sm">
          Address Line 2
        </label>
        <Input type="text" id="addressLine2" {...register("addressLine2")} />
      </div>
      <div className="flex gap-2">
        <div className="flex w-1/2 flex-col">
          <label htmlFor="city" className="text-sm">
            City
          </label>
          <Input type="text" id="city" {...register("city")} />
        </div>
        <div className="flex w-1/2 flex-col">
          <label htmlFor="state" className="text-sm">
            State
          </label>
          <Input type="text" id="state" {...register("state")} />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="postalCode" className="text-sm">
          Postal Code
        </label>
        <Input type="text" id="postalCode" {...register("postalCode")} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="primaryPhone" className="text-sm">
          Primary Phone
        </label>
        <Input type="text" id="primaryPhone" {...register("primaryPhone")} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="secondaryPhone" className="text-sm">
          Secondary Phone
        </label>
        <Input
          type="text"
          id="secondaryPhone"
          {...register("secondaryPhone")}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="role" className="text-sm">
          Role
        </label>
        <Input type="text" id="role" {...register("role")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        Update
      </Button>
    </form>
  );
};
