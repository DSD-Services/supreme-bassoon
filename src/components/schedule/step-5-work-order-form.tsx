import WorkOrderGroup from "../dashboard/work-order-group";
import { formatDateLong } from "@/lib/utils";
import StepButtons from "./step-buttons";
import { UserProfile } from "./types/backend-data";
import { FormState } from "./types/form-state";
import { Timeslot } from "@/lib/types/work-order-types";
import SubmitButton from "./types/submit-button";
import { SubmitHandler } from "react-hook-form";

interface Step5ConfirmAppointmentProps {
  userProfile: UserProfile;
  getProfileOrFormValue: (
    profileValue: string | null | undefined,
    formValue: string | undefined,
  ) => string;
  formValues: FormState;
  departmentName: string;
  serviceTypeName: string;
  selectedDate: Date | null;
  selectedSlot: Timeslot | null;
  prevStep: () => void;
  handleSubmit: (
    onSubmit: SubmitHandler<FormState>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<FormState>;
}

export default function Step5ConfirmAppointment({
  userProfile,
  getProfileOrFormValue,
  formValues,
  departmentName,
  serviceTypeName,
  selectedSlot,
  prevStep,
  handleSubmit,
  onSubmit,
}: Step5ConfirmAppointmentProps) {
  return (
    <div>
      <h2 className="flex pb-2 text-center text-lg font-semibold">
        Step 4: Confirm your appointment information:
      </h2>
      <div className="mb-6 flex flex-col gap-3 rounded-lg bg-white px-6 py-4">
        <WorkOrderGroup labelText="Name">
          {userProfile.first_name} {userProfile.last_name}
        </WorkOrderGroup>
        <WorkOrderGroup labelText="Address">
          <span>
            {getProfileOrFormValue(
              userProfile.address_line1,
              formValues.addressLine1,
            )}
          </span>
          {getProfileOrFormValue(
            userProfile.address_line2,
            formValues.addressLine2,
          ) && (
            <span>
              {getProfileOrFormValue(
                userProfile.address_line2,
                formValues.addressLine2,
              )}
            </span>
          )}
          <div>
            <span>
              {getProfileOrFormValue(userProfile.city, formValues.city)},
            </span>{" "}
            <span>
              {getProfileOrFormValue(userProfile.state, formValues.state)}
            </span>{" "}
            <span>
              {getProfileOrFormValue(
                userProfile.postal_code,
                formValues.postalCode,
              )}
            </span>
          </div>
        </WorkOrderGroup>
        <WorkOrderGroup labelText="Primary Phone">
          {getProfileOrFormValue(
            userProfile.primary_phone,
            formValues.primaryPhone,
          )}
        </WorkOrderGroup>
        {getProfileOrFormValue(
          userProfile.secondary_phone,
          formValues.secondaryPhone,
        ) && (
          <WorkOrderGroup labelText="Secondary Phone">
            {getProfileOrFormValue(
              userProfile.secondary_phone,
              formValues.secondaryPhone,
            )}
          </WorkOrderGroup>
        )}
        <WorkOrderGroup labelText="Department">{departmentName}</WorkOrderGroup>
        <WorkOrderGroup labelText="Service Type">
          {serviceTypeName}
        </WorkOrderGroup>
        {selectedSlot && (
          <>
            <WorkOrderGroup labelText="Date">
              {formatDateLong(new Date(selectedSlot.start))}
            </WorkOrderGroup>
            <WorkOrderGroup labelText="Time">
              {new Date(selectedSlot.start).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
              -{" "}
              {new Date(selectedSlot.end).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </WorkOrderGroup>
          </>
        )}
      </div>
      {/* TODO - redirect after successful submission */}
      <div className="flex justify-center gap-10">
        <StepButtons variant="prevOnly" prevStep={prevStep} />
        <SubmitButton handleSubmit={handleSubmit} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
