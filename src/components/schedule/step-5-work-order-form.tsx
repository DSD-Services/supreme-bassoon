import WorkOrderGroup from "../dashboard/work-order-group";
import { formatDateLong } from "@/lib/utils";
import StepButtons from "./step-buttons";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import type { Profile } from "@/utils/supabase/types";

interface Step5ConfirmAppointmentProps {
  userProfile: Profile;
  formValues: CreateWorkOrderInput;
  departmentName: string;
  serviceTypeName: string;
  selectedDate: Date | null;
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function Step5ConfirmAppointment({
  userProfile,
  formValues,
  departmentName,
  serviceTypeName,
  prevStep,
  isSubmitting,
}: Step5ConfirmAppointmentProps) {
  return (
    <div>
      <h2 className="flex pb-2 text-center text-lg font-semibold">
        Step 5: Confirm your appointment information:
      </h2>
      <div className="mb-6 flex flex-col gap-3 rounded-lg bg-white px-6 py-4">
        <WorkOrderGroup labelText="Name">
          {userProfile.first_name} {userProfile.last_name}
        </WorkOrderGroup>
        <WorkOrderGroup labelText="Address">
          <span>{formValues.serviceAddress.addressLine1}</span>
          {formValues.serviceAddress.addressLine2 && (
            <span>, {formValues.serviceAddress.addressLine2}</span>
          )}
          <p>
            {formValues.serviceAddress.city}
            {", "}
            {formValues.serviceAddress.state}
            {", "}
            {formValues.serviceAddress.postalCode}
          </p>
        </WorkOrderGroup>

        <WorkOrderGroup labelText="Primary Phone">
          {userProfile.primary_phone ?? ""}
        </WorkOrderGroup>

        <WorkOrderGroup labelText="Secondary Phone">
          {userProfile.secondary_phone ?? ""}
        </WorkOrderGroup>

        <WorkOrderGroup labelText="Department">{departmentName}</WorkOrderGroup>

        <WorkOrderGroup labelText="Service Type">
          {serviceTypeName}
        </WorkOrderGroup>

        {formValues.appointmentStart && formValues.appointmentEnd && (
          <>
            <WorkOrderGroup labelText="Date">
              {formatDateLong(new Date(formValues.appointmentStart))}
            </WorkOrderGroup>
            <WorkOrderGroup labelText="Time">
              {new Date(formValues.appointmentStart).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
              -{" "}
              {new Date(formValues.appointmentEnd).toLocaleTimeString([], {
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
        <Button type="submit" disabled={isSubmitting}>
          Submit <FontAwesomeIcon icon={faCircleCheck} />
        </Button>
      </div>
    </div>
  );
}
