import ScheduleWorkOrderForm from "@/components/schedule/schedule-work-order-form";
import { findAllDepartments } from "@/features/departments/queries";
import { getAuthUser } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import type { UserProfile } from "@/components/schedule/types/backend-data";

export default async function Page() {
  const { data: departments } = await findAllDepartments();
  const sortedDepartments = (departments ?? []).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const user = await getAuthUser();
  const userId = user?.id;

  const { data: userProfile, error } = await findOneProfile(userId ?? "");
  if (error || !userProfile) {
    console.error("Failed to fetch profile", error);
    return <p>Error loading profile.</p>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, updated_at, ...filteredProfile } = userProfile;

  return (
    <ScheduleWorkOrderForm
      sortedDepartments={sortedDepartments}
      userProfile={filteredProfile as UserProfile}
    />
  );
}
