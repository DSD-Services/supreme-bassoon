export interface Part {
  name: string;
  qtyNeed: number;
  qtyStock: number;
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
  workOrderStatus: "pending" | "complete" | "cancelled";
  clientPrimaryPhone: string;
  clientSecondaryPhone: string;
  clientEmail: string;
  parts: Part[];
  appointmentNotes: string;
}
