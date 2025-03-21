import { Input } from "../ui/input";
import StepButtons from "./step-buttons";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";
import { Profile } from "@/utils/supabase/types";

type PartialProfile = Omit<
  Profile,
  "id" | "created_at" | "updated_at" | "role"
>;

interface Step5ContactInformationProps {
  register: UseFormRegister<CreateWorkOrderInput>;
  watch: UseFormWatch<CreateWorkOrderInput>;
  selectedAddress: "onFile" | "new";
  prevStep: () => void;
  nextStep: () => void;
  isNextDisabled: boolean;
  userProfile: PartialProfile;
}

export default function Step5ContactInformation({
  register,
  selectedAddress,
  prevStep,
  nextStep,
  userProfile,
  isNextDisabled,
}: Step5ContactInformationProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="flex pb-2 text-center text-base font-semibold md:text-lg">
        {selectedAddress === "onFile" ? "Confirm" : "Enter"} your contact
        information:
      </h2>
      <div className="rounded-md bg-white px-6 pt-4 pb-6">
        <div className="mb-4 space-y-2">
          <div className="flex gap-2">
            <div className="flex w-1/2 flex-col">
              <label htmlFor="firstName" className="text-sm">
                First Name *
              </label>
              <Input
                type="text"
                id="firstName"
                value={userProfile.first_name}
                readOnly
              />
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="lastName" className="text-sm">
                Last Name *
              </label>
              <Input
                type="text"
                id="lastName"
                value={userProfile.last_name}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="addressLine1" className="text-sm">
              Address Line 1 *
            </label>
            <Input
              type="text"
              id="addressLine1"
              defaultValue={userProfile.address_line1 ?? ""}
              {...register("serviceAddress.addressLine1", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="addressLine2" className="text-sm">
              Address Line 2
            </label>
            <Input
              type="text"
              id="addressLine2"
              defaultValue={userProfile.address_line2 ?? ""}
              {...register("serviceAddress.addressLine2")}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex w-1/2 flex-col">
              <label htmlFor="city" className="text-sm">
                City *
              </label>
              <Input
                type="text"
                id="city"
                defaultValue={userProfile.city ?? ""}
                {...register("serviceAddress.city", { required: true })}
              />
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="state" className="text-sm">
                State *{" "}
              </label>
              <Input
                type="text"
                id="state"
                defaultValue={userProfile.state ?? ""}
                {...register("serviceAddress.state", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="postalCode" className="text-sm">
              Postal Code *
            </label>
            <Input
              type="text"
              id="postalCode"
              defaultValue={userProfile.postal_code ?? ""}
              {...register("serviceAddress.state", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="primaryPhone" className="text-sm">
              Primary Phone *{" "}
              <span className="text-xs text-slate-700 italic">
                (include area code)
              </span>
            </label>
            <Input
              type="text"
              id="primaryPhone"
              defaultValue={userProfile.primary_phone ?? ""}
              {...register("primaryPhone", { required: true })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="secondaryPhone" className="text-sm">
              Secondary Phone{" "}
              <span className="text-xs text-slate-700 italic">
                (include area code)
              </span>
            </label>
            <Input
              type="text"
              id="secondaryPhone"
              defaultValue={userProfile.secondary_phone ?? ""}
              {...register("secondaryPhone")}
            />
          </div>
          <div className="flex justify-center">
            <span>*</span>
            <span className="pl-2 text-center text-xs text-slate-700 italic">
              Required field
            </span>
          </div>
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
