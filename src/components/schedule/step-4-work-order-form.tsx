import { Input } from "../ui/input";
import StepButtons from "./step-buttons";
import { UseFormRegister } from "react-hook-form";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";
import { Profile } from "@/utils/supabase/types";

type PartialProfile = Omit<
  Profile,
  "id" | "created_at" | "updated_at" | "role"
>;

interface Step4ContactInformationProps {
  register: UseFormRegister<CreateWorkOrderInput>;
  prevStep: () => void;
  nextStep: () => void;
  isNextDisabled: boolean;
  userProfile: PartialProfile;
}

export default function Step4ContactInformation({
  register,
  prevStep,
  nextStep,
  userProfile,
  isNextDisabled,
}: Step4ContactInformationProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="flex pb-2 text-center text-lg font-semibold">
        Step 4: Enter your contact information:
      </h2>
      <div className="rounded-md bg-white px-6 pt-4 pb-6">
        <div className="mb-6 space-y-2">
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
                {...register("serviceAddress.city", { required: true })}
              />
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="state" className="text-sm">
                State *
              </label>
              <Input
                type="text"
                id="state"
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
              {...register("serviceAddress.state", { required: true })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="primaryPhone" className="text-sm">
              Primary Phone *
            </label>
            <Input
              type="text"
              id="primaryPhone"
              defaultValue={userProfile.primary_phone ?? ""}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="secondaryPhone" className="text-sm">
              Secondary Phone
            </label>
            <Input
              type="text"
              id="secondaryPhone"
              value={userProfile.secondary_phone ?? ""}
              readOnly
            />
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
