"use client";

import { useEffect } from "react";
import StepButtons from "./step-buttons";
import { UseFormSetValue } from "react-hook-form";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";
import { Profile } from "@/utils/supabase/types";

type PartialProfile = Omit<
  Profile,
  "id" | "created_at" | "updated_at" | "role"
>;

interface Step4SelectAddressProps {
  setValue: UseFormSetValue<CreateWorkOrderInput>;
  setSelectedAddress: React.Dispatch<React.SetStateAction<"onFile" | "new">>;
  selectedAddress: "onFile" | "new";
  prevStep: () => void;
  nextStep: () => void;
  isNextDisabled: boolean;
  userProfile: PartialProfile;
}

export default function Step4SelectAddress({
  setValue,
  setSelectedAddress,
  selectedAddress,
  prevStep,
  nextStep,
  userProfile,
  isNextDisabled,
}: Step4SelectAddressProps) {
  useEffect(() => {
    if (selectedAddress === "onFile") {
      setValue("serviceAddress", {
        addressLine1: userProfile.address_line1 ?? "",
        addressLine2: userProfile.address_line2 ?? "",
        city: userProfile.city ?? "",
        state: userProfile.state ?? "",
        postalCode: userProfile.postal_code ?? "",
      });
    }
  }, [selectedAddress, setValue, userProfile]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="flex pb-2 text-center text-base font-semibold md:text-lg">
        Select your service address:
      </h2>
      <div className="rounded-md bg-white px-6 pt-4 pb-6 shadow-lg">
        <div className="mb-6 space-y-2">
          <fieldset>
            <legend className="p-2 text-center text-base text-blue-800 md:text-lg">
              Please select your preferred address for the service:
            </legend>
            <div>
              <div className="mt-4 flex items-center">
                <input
                  type="radio"
                  id="useOnFileAddress"
                  value="onFile"
                  name="selectServiceAddress"
                  checked={selectedAddress === "onFile"}
                  onChange={() => setSelectedAddress("onFile")}
                />
                <label
                  htmlFor="useOnFileAddress"
                  className="pl-3 font-semibold"
                >
                  Use address on file:
                </label>
              </div>
              <div className="mx-10 mt-2 rounded-md bg-blue-50 p-3 text-sm shadow-md md:text-base">
                <span className="block">{userProfile.address_line1}</span>
                <span className="block">{userProfile.address_line2 ?? ""}</span>
                <span className="">{userProfile.city},</span>{" "}
                <span className="">{userProfile.state}</span>{" "}
                <span className="">{userProfile.postal_code}</span>
              </div>
            </div>
            <div className="mt-4 mb-2 flex items-center">
              <input
                type="radio"
                id="addNewAddress"
                name="selectServiceAddress"
                value="new"
                checked={selectedAddress === "new"}
                onChange={() => setSelectedAddress("new")}
              />
              <label htmlFor="useOnFileAddress" className="pl-3 font-semibold">
                Add a new service address
              </label>
            </div>
          </fieldset>
        </div>
        <div className="flex justify-center gap-10">
          <StepButtons
            variant="prevNext"
            prevStep={prevStep}
            nextStep={nextStep}
            isNextDisabled={isNextDisabled}
          />
        </div>
      </div>
    </div>
  );
}
