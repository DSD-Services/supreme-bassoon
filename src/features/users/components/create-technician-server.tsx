import React from "react";
import { findAllDepartments } from "@/features/departments/queries";
import { CreateUserDialog } from "./create-user-dialog";

export const CreateTechnicianServer = async () => {
  const { data: departments } = await findAllDepartments();

  return (
    <CreateUserDialog role={"TECHNICIAN"} departments={departments ?? []} />
  );
};
