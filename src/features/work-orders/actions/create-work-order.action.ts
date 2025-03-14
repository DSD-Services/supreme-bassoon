"use server";

import { type WorkOrderInput, WorkOrderSchema } from "../schemas";

export async function createWorkOrderAction(values: WorkOrderInput) {
  const parsedValues = WorkOrderSchema.safeParse(values);

  if (!parsedValues.success) {
    console.log(parsedValues.error.issues);
    return;
  }

  console.log(parsedValues.data);
}
