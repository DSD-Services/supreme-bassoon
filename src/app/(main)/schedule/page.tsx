import ScheduleWorkOrderForm from "@/components/schedule/schedule-work-order-form";
import { findAllDepartments } from "@/features/departments/queries";
import { protect } from "@/features/auth/queries";
import { findOneProfile } from "@/features/profiles/queries";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule",
};

export default async function Page() {
  const { userId } = await protect();

  const { data: userProfile } = await findOneProfile(userId, {
    role: "CLIENT",
  });
  if (!userProfile) notFound();

  const { data: departments } = await findAllDepartments();
  const sortedDepartments = (departments ?? []).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <section className="m-2 grid min-h-[calc(100vh-136px)] rounded-lg bg-blue-50">
      <ScheduleWorkOrderForm
        sortedDepartments={sortedDepartments}
        userProfile={userProfile}
      />
    </section>
  );
}
