
import { 
  generateClientEmailTemplate, 
  generateTechnicianEmailTemplate,
  generateAdminMissingPartsTemplate,
  sendEmail
} from './email-templates';

export type ServiceAddress = {
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
};

export type MissingPart = {
  partId: number;
  partName?: string;
  manufacturer?: string | null;
  quantity: number;
};

export type WorkOrderEmailContext = {
  workOrderId: string;
  clientEmail: string;
  technicianEmail: string;
  adminEmail?: string;
  appointmentStart: string;
  appointmentEnd: string;
  serviceAddress: ServiceAddress;
  serviceTypeName?: string;
  missingParts?: MissingPart[];
  clientName?: string;
  clientLastName?: string;
  technicianName?: string;
  technicianLastName?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  jobDetails?: string;
  appointmentNotes?: string;
  estimatedDuration?: string;
};

/**
 * Sends all required emails for a work order
 * @param context All data needed to generate and send emails
 * @returns Results from email sending operations
 */
export async function sendWorkOrderEmails(context: WorkOrderEmailContext) {
  const { 
    workOrderId, 
    clientEmail, 
    technicianEmail, 
    adminEmail,
    appointmentStart, 
    appointmentEnd, 
    serviceAddress,
    serviceTypeName,
    missingParts,
    clientName,
    clientLastName,
    technicianName,
    technicianLastName,
    primaryPhone,
    secondaryPhone,
    jobDetails,
    appointmentNotes,
    estimatedDuration
  } = context;

  const emailData = {
    workOrderId,
    appointmentStart,
    appointmentEnd,
    serviceAddress,
    serviceTypeName,
    missingParts,
    clientName,
    clientLastName,
    technicianName,
    technicianLastName,
    primaryPhone,
    secondaryPhone,
    jobDetails,
    appointmentNotes,
    estimatedDuration
  };

  // Send email to client
  const clientTemplate = generateClientEmailTemplate(emailData);
  const clientEmailPromise = sendEmail(
    clientEmail,
    clientTemplate.subject,
    clientTemplate.html
  );

  // Send email to technician
  const technicianTemplate = generateTechnicianEmailTemplate(emailData);
  const technicianEmailPromise = sendEmail(
    technicianEmail,
    technicianTemplate.subject,
    technicianTemplate.html
  );

  // Only send admin email if there are missing parts and we have an admin email
  let adminEmailPromise: Promise<Response | null> = Promise.resolve(null);
  if (missingParts && missingParts.length > 0 && adminEmail) {
    const adminTemplate = generateAdminMissingPartsTemplate(emailData);
    adminEmailPromise = sendEmail(
      adminEmail,
      adminTemplate.subject,
      adminTemplate.html
    );
  }

  return Promise.all([clientEmailPromise, technicianEmailPromise, adminEmailPromise]);
}