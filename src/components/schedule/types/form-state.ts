export type FormState = {
  departmentId: string;
  serviceTypeId: string;
  selectedDate: string;
  selectedSlot: string;
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  primaryPhone: string;
  secondaryPhone?: string;
};

// TODO add more fields if added to form and import in the form file
