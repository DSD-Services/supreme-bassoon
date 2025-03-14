import { UserProfile } from "../types/backend-data";

export const hasCompleteAddress = (user: UserProfile) => {
  return (
    user.first_name &&
    user.last_name &&
    user.address_line1 &&
    (user.address_line2 || user.address_line2 === null) &&
    user.city &&
    user.state &&
    user.postal_code &&
    user.primary_phone &&
    (user.secondary_phone || user.address_line2 === null) &&
    user.email
  );
};
