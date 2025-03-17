"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDialog } from "@/components/ui/use-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "@/components/ui/dialog";
import type { Department } from "@/utils/supabase/types";
import { Select } from "@/components/ui/select";
import { type AdminCreateUserInput, AdminCreateUserSchema } from "../schemas";
import { createUserAdminAction } from "@/features/users/actions/create-user-admin-action";

type CreateUserDialogProps =
  | { role: "CLIENT" }
  | { role: "TECHNICIAN"; departments: Array<Department> };

export const CreateUserDialog = (props: CreateUserDialogProps) => {
  const { isOpen, closeDialog, openDialog } = useDialog();

  return (
    <>
      <Button size="sm" variant="secondary" onClick={openDialog}>
        <FontAwesomeIcon icon={faAdd} />
        <span className="capitalize">
          register {props.role === "CLIENT" ? "client" : "technician"}
        </span>
      </Button>

      <Dialog
        title={`Register ${props.role === "CLIENT" ? "Client" : "Technician"}`}
        isOpen={isOpen}
        onClose={closeDialog}
      >
        <CreateUserForm
          onSuccess={closeDialog}
          {...(props.role === "TECHNICIAN"
            ? { departments: props.departments }
            : {})}
          role={props.role}
        />
      </Dialog>
    </>
  );
};

type CreateUserFormProps = {
  onSuccess: () => void;
  departments?: Array<Department>;
  role: "CLIENT" | "TECHNICIAN";
};

const CreateUserForm = ({
  onSuccess,
  departments,
  role,
}: CreateUserFormProps) => {
  const router = useRouter();

  const {
    register,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<AdminCreateUserInput>({
    resolver: zodResolver(AdminCreateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      departmentId: undefined,
      role,
    },
  });

  const submit = async (values: AdminCreateUserInput) => {
    const res = await createUserAdminAction(values);

    if (res.error) {
      setError("departmentId", { message: res.error });
      return;
    }

    router.refresh();
    toast.success(
      `${role === "CLIENT" ? "Client" : "Technician"} registered! They must verify their email to log in.`,
    );
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-2.5">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name:
        </label>
        <Input
          type="text"
          id="firstName"
          className="bg-white"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <span className="text-sm text-red-600">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name:
        </label>
        <Input
          type="text"
          id="lastName"
          {...register("lastName", { required: true })}
          className="bg-white"
        />
        {errors.lastName && (
          <span className="text-sm text-red-600">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          className="bg-white"
        />
        {errors.email && (
          <span className="text-sm text-red-600">{errors.email.message}</span>
        )}
      </div>

      {departments && departments.length > 0 ? (
        <div>
          <label
            htmlFor="departmentId"
            className="block text-sm font-medium text-gray-700"
          >
            Department:
          </label>
          <Select {...register("departmentId", { required: true })}>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
        </div>
      ) : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};
