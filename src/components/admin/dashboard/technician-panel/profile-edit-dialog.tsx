"use client";

import type { Profile } from "@/utils/supabase/types";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { type ProfileInput, ProfileSchema } from "@/features/profile/schemas";
import { updateProfile } from "@/features/profile/actions/update-profile.action";

type ProfileEditDialogProps = { profile: Profile };

export const ProfileEditDialog = ({ profile }: ProfileEditDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

    const errorKey = Object.keys(errors)?.[0] as keyof typeof errors;

    if (errorKey && errors[errorKey]?.message) {
      toast.error(errors[errorKey].message);
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
    setIsOpen(false);
    toast.success("Update successful");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-fit cursor-pointer items-center rounded bg-yellow-500 px-2 py-1 text-sm font-bold uppercase transition hover:bg-yellow-500/80"
      >
        <FontAwesomeIcon icon={faPencil} className="mr-2 text-sm" />
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-background w-full max-w-md rounded border p-6 shadow-md">
            <div className="mb-4 flex justify-between">
              <h2 className="text-xl font-bold">Form</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold"
              >
                X
              </button>
            </div>
            <form onSubmit={handleSubmit(submit)} className="space-y-2">
              <div className="flex gap-2">
                <div className="flex w-1/2 flex-col">
                  <label htmlFor="firstName" className="text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                  />
                </div>
                <div className="flex w-1/2 flex-col">
                  <label htmlFor="lastName" className="text-sm">
                    Last Name
                  </label>
                  <input type="text" id="lastName" {...register("lastName")} />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="addressLine1" className="text-sm">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  {...register("addressLine1")}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="addressLine2" className="text-sm">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  {...register("addressLine2")}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex w-1/2 flex-col">
                  <label htmlFor="city" className="text-sm">
                    City
                  </label>
                  <input type="text" id="city" {...register("city")} />
                </div>
                <div className="flex w-1/2 flex-col">
                  <label htmlFor="state" className="text-sm">
                    State
                  </label>
                  <input type="text" id="state" {...register("state")} />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="postalCode" className="text-sm">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  {...register("postalCode")}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="primaryPhone" className="text-sm">
                  Primary Phone
                </label>
                <input
                  type="text"
                  id="primaryPhone"
                  {...register("primaryPhone")}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="secondaryPhone" className="text-sm">
                  Secondary Phone
                </label>
                <input
                  type="text"
                  id="secondaryPhone"
                  {...register("secondaryPhone")}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm">
                  Role
                </label>
                <input type="text" id="role" {...register("role")} />
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary/70 text-primary-foreground w-full rounded px-2 py-1 font-bold transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
