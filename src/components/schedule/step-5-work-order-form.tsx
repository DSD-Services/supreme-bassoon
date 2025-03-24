import { Input } from "../ui/input";
import StepButtons from "./step-buttons";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";
import { Profile } from "@/utils/supabase/types";

type PartialProfile = Omit<
  Profile,
  "id" | "created_at" | "updated_at" | "role"
>;

interface Step5ContactInformationProps {
  register: UseFormRegister<CreateWorkOrderInput>;
  watch: UseFormWatch<CreateWorkOrderInput>;
  errors: FieldErrors<CreateWorkOrderInput>;
  clearErrors: UseFormClearErrors<CreateWorkOrderInput>;
  formValues: CreateWorkOrderInput;
  selectedAddress: "onFile" | "new";
  prevStep: () => void;
  nextStep: () => void;
  userProfile: PartialProfile;
}

export default function Step5ContactInformation({
  register,
  watch,
  errors,
  clearErrors,
  formValues,
  selectedAddress,
  prevStep,
  nextStep,
  userProfile,
}: Step5ContactInformationProps) {
  const jobDetailsInput = watch("jobDetails", "");

  const handleInputChange = (field: keyof CreateWorkOrderInput) => {
    clearErrors(field);
  };

  return (
    <div className="m-2 flex flex-col items-center">
      <h2 className="flex pb-2 text-center text-base font-semibold md:text-lg">
        {selectedAddress === "onFile" ? "Confirm" : "Enter"} your contact
        information:
      </h2>
      <div className="rounded-md bg-white px-6 pt-4 pb-6 sm:min-w-96">
        <div className="mb-3 space-y-2">
          <div className="flex gap-2">
            <div className="flex w-1/2 flex-col">
              <label htmlFor="firstName" className="text-sm text-blue-800">
                First Name
              </label>
              <span
                id="firstName"
                className="block text-sm font-semibold md:text-base"
              >
                {userProfile.first_name}
              </span>
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="lastName" className="text-sm text-blue-800">
                Last Name
              </label>
              <span
                id="lastName"
                className="block text-sm font-semibold md:text-base"
              >
                {userProfile.last_name}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="addressLine1" className="text-sm text-blue-800">
              Address Line 1 *
            </label>
            <Input
              type="text"
              id="addressLine1"
              defaultValue={formValues.serviceAddress.addressLine1}
              {...register("serviceAddress.addressLine1", { required: true })}
              autoComplete="street-address"
              onChange={() => handleInputChange("serviceAddress")}
            />
            <div className="h-6">
              {errors?.serviceAddress?.addressLine1?.message && (
                <span
                  className="text-sm text-red-500"
                  role="alert"
                  aria-live="polite"
                >
                  {errors?.serviceAddress?.addressLine1?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="addressLine2" className="text-sm text-blue-800">
              Address Line 2
            </label>
            <Input
              type="text"
              id="addressLine2"
              defaultValue={formValues.serviceAddress.addressLine2 ?? ""}
              {...register("serviceAddress.addressLine2")}
              autoComplete="address-line2"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex w-1/2 flex-col">
              <label htmlFor="city" className="text-sm text-blue-800">
                City *
              </label>
              <Input
                type="text"
                id="city"
                defaultValue={formValues.serviceAddress.city}
                {...register("serviceAddress.city", { required: true })}
                autoComplete="address-level1"
                onChange={() => handleInputChange("serviceAddress")}
              />
              <div className="h-6">
                {errors?.serviceAddress?.city?.message && (
                  <span
                    className="text-sm text-red-500"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors?.serviceAddress?.city?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-1/2 flex-col">
              <label htmlFor="state" className="text-sm text-blue-800">
                State *{" "}
              </label>
              <Input
                type="text"
                id="state"
                defaultValue={formValues.serviceAddress.state}
                {...register("serviceAddress.state", { required: true })}
                onChange={() => handleInputChange("serviceAddress")}
              />
              <div className="h-6">
                {errors?.serviceAddress?.state?.message && (
                  <span
                    className="text-sm text-red-500"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors?.serviceAddress?.state?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="postalCode" className="text-sm text-blue-800">
              Postal Code *
            </label>
            <Input
              type="text"
              id="postalCode"
              autoComplete="postal-code"
              defaultValue={formValues.serviceAddress.postalCode}
              {...register("serviceAddress.postalCode", { required: true })}
              onChange={() => handleInputChange("serviceAddress")}
            />
            <div className="h-6">
              {errors?.serviceAddress?.postalCode?.message && (
                <span
                  className="text-sm text-red-500"
                  role="alert"
                  aria-live="polite"
                >
                  {errors?.serviceAddress?.postalCode?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="primaryPhone" className="text-sm text-blue-800">
              Primary Phone *{" "}
              <span
                id="primaryPhoneHelp"
                className="text-xs text-slate-700 italic"
              >
                (include area code)
              </span>
            </label>
            <Input
              type="tel"
              id="primaryPhone"
              aria-describedby="primaryPhoneHelp"
              autoComplete="tel"
              defaultValue={userProfile.primary_phone ?? ""}
              {...register("primaryPhone", { required: true })}
              required
              onChange={() => handleInputChange("primaryPhone")}
            />
            <div className="h-6">
              {errors?.primaryPhone?.message && (
                <span
                  className="text-sm text-red-500"
                  role="alert"
                  aria-live="polite"
                >
                  {errors?.primaryPhone?.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="secondaryPhone" className="text-sm text-blue-800">
              Secondary Phone{" "}
              <span
                id="secondaryPhoneHelp"
                className="text-xs text-slate-700 italic"
              >
                (include area code)
              </span>
            </label>
            <Input
              type="tel"
              id="secondaryPhone"
              aria-describedby="secondaryPhoneHelp"
              defaultValue={userProfile.secondary_phone ?? ""}
              {...register("secondaryPhone")}
            />
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="jobDetails" className="text-sm text-blue-800">
              Job Details
            </label>
            <textarea
              id="jobDetails"
              className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none md:text-base"
              defaultValue={formValues.jobDetails ?? ""}
              {...register("jobDetails")}
              placeholder="Please provide any additional details about the job..."
            />
            {jobDetailsInput && (
              <p className="text-xs text-gray-500">
                {`Max characters: 1000.  ${jobDetailsInput.length}/1000`}
              </p>
            )}
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
          />
        </div>
      </div>
    </div>
  );
}
