export interface Part {
  name: string;
  qtyNeed: number;
  qtyReserved: number;
}

export interface WorkOrderData {
  id: number;
  time: string;
  serviceType: string;
  jobNumber: string;
  clientFirstName: string;
  clientLastName: string;
  missingParts: boolean;
  clientStreetAddress: string;
  clientCity: string;
  clientState: string;
  clientPostalCode: string;
  workOrderStatus: "pending" | "in progress" | "complete" | "cancelled";
  clientPrimaryPhone: string;
  clientSecondaryPhone: string;
  clientEmail: string;
  parts: Part[];
  appointmentNotes: string;
}
