import WorkOrderGroup from "../dashboard/work-order-group";
import { formatDateLong } from "@/lib/utils";
import StepButtons from "./step-buttons";
import { CreateWorkOrderInput } from "@/features/work-orders/schemas";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import type { Profile } from "@/utils/supabase/types";

interface Step6ConfirmAppointmentProps {
  userProfile: Profile;
  formValues: CreateWorkOrderInput;
  departmentName: string;
  serviceTypeName: string;
  selectedDate: Date | null;
  prevStep: () => void;
  isSubmitting: boolean;
}

export default function Step6ConfirmAppointment({
  userProfile,
  formValues,
  departmentName,
  serviceTypeName,
  prevStep,
  isSubmitting,
}: Step6ConfirmAppointmentProps) {
  return (
    <div>
      <h2 className="pb-2 text-center text-base font-semibold md:text-lg">
        Confirm &amp; submit your
        <span className="block"> appointment information:</span>
      </h2>
      <div className="mb-6 rounded-lg bg-white px-6 py-4 shadow-lg sm:min-w-72 md:min-w-96">
        {formValues.appointmentStart && formValues.appointmentEnd && (
          <>
            <span className="block text-center text-sm font-bold text-blue-800 sm:text-base md:text-lg">
              {formatDateLong(new Date(formValues.appointmentStart))}
            </span>
            <span className="block text-center text-sm font-bold text-blue-800 sm:text-base md:text-base md:text-lg">
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
            </span>
          </>
        )}
        <span className="my-2 block text-center text-sm text-blue-800 sm:text-base md:text-lg">
          {departmentName}: {serviceTypeName}
        </span>
        <div className="bg-muted h-1" />
        <div className="mt-4 flex flex-col gap-3">
          <WorkOrderGroup labelText="Name">
            {userProfile.first_name} {userProfile.last_name}
          </WorkOrderGroup>
          <WorkOrderGroup labelText="Service Address">
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
            {formValues.primaryPhone ?? ""}
          </WorkOrderGroup>

          {formValues.secondaryPhone && (
            <WorkOrderGroup labelText="Secondary Phone">
              {formValues.secondaryPhone ?? ""}
            </WorkOrderGroup>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-10">
        <StepButtons variant="prevOnly" prevStep={prevStep} />
        <Button type="submit" disabled={isSubmitting}>
          Submit <FontAwesomeIcon icon={faCircleCheck} />
        </Button>
      </div>
    </div>
  );
}
