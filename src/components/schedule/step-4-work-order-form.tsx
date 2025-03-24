"use client";

import StepButtons from "./step-buttons";
import { Profile } from "@/utils/supabase/types";

type PartialProfile = Omit<
  Profile,
  "id" | "created_at" | "updated_at" | "role"
>;

interface Step4SelectAddressProps {
  setSelectedAddress: React.Dispatch<React.SetStateAction<"onFile" | "new">>;
  selectedAddress: "onFile" | "new";
  step: number;
  prevStep: () => void;
  nextStep: () => void;
  userProfile: PartialProfile;
}

export default function Step4SelectAddress({
  setSelectedAddress,
  selectedAddress,
  step,
  prevStep,
  nextStep,
  userProfile,
}: Step4SelectAddressProps) {
  return (
    <div
      aria-current={step === 4 ? "step" : undefined}
      className="flex flex-col items-center"
    >
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
                  className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                />
                <label
                  htmlFor="useOnFileAddress"
                  className="pl-3 font-semibold"
                >
                  Use address on file:
                </label>
              </div>
              <address className="mx-10 mt-2 rounded-md bg-blue-50 p-3 text-sm shadow-md md:text-base">
                <p>{userProfile.address_line1}</p>
                {userProfile.address_line2 && (
                  <p>{userProfile.address_line2}</p>
                )}
                <p>
                  {userProfile.city}, {userProfile.state}{" "}
                  {userProfile.postal_code}
                </p>
              </address>
            </div>
            <div className="mt-4 mb-2 flex items-center">
              <input
                type="radio"
                id="addNewAddress"
                name="selectServiceAddress"
                value="new"
                checked={selectedAddress === "new"}
                onChange={() => setSelectedAddress("new")}
                className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
              <label htmlFor="addNewAddress" className="pl-3 font-semibold">
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
          />
        </div>
      </div>
    </div>
  );
}
