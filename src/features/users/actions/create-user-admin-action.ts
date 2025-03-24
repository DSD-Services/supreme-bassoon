"use server";

import { reqRoles } from "../../auth/queries";
import { createAdminClient } from "@/utils/supabase/admin";
import { updateTechnicianDetails } from "@/features/technician-details/actions/update-technician-details.action";
import {
  type AdminCreateUserInput,
  AdminCreateUserSchema,
} from "@/features/users/schemas";
import { generateCreateUserEmail, sendEmail } from "@/utils/email-templates";

export async function createUserAdminAction(values: AdminCreateUserInput) {
  const profile = await reqRoles(["ADMIN"]);
  if (!profile) throw new Error("Forbidden");

  const parsedValues = AdminCreateUserSchema.safeParse(values);

  if (!parsedValues.success) {
    const [error] = parsedValues.error.issues;
    return { error: error.message };
  }

  const TEMP_PASSWORD = `${Date.now()}`.substring(0, 8);

  const supabase = createAdminClient();

  const { email, firstName, lastName, role, departmentId } = parsedValues.data;

  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: TEMP_PASSWORD,
    user_metadata: { first_name: firstName, last_name: lastName, role: role },
    email_confirm: true,
  });

  if (error) {
    console.error("[RegisterTechnicianActionError]:", error);
    return { error: "Oops! Something went wrong." };
  }

  if (role === "CLIENT") {
    const emailTemplate = generateCreateUserEmail({
      email,
      password: TEMP_PASSWORD,
      role: "CLIENT",
    });
    await sendEmail(email, emailTemplate.subject, emailTemplate.html);
    return {
      error: null,
    };
  }

  if (role === "TECHNICIAN" && !departmentId) {
    return { error: "Please select a department." };
  }

  const { error: updateTechnicianDetailsError } = await updateTechnicianDetails(
    data.user.id,
    {
      departmentId: parsedValues.data.departmentId,
    },
  );

  if (updateTechnicianDetailsError) {
    console.error(
      "[RegisterTechnicianActionError]:",
      updateTechnicianDetailsError,
    );
    return { error: "Oops! Something went wrong." };
  }

  const emailTemplate = generateCreateUserEmail({
    email,
    password: TEMP_PASSWORD,
    role: "TECHNICIAN",
  });
  await sendEmail(email, emailTemplate.subject, emailTemplate.html);

  return { error: null };
}
