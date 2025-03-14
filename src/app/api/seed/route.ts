// DELETE FOR PRODUCTION

import { createClient } from "@/utils/supabase/server";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const seedData = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "technician1@gmail.com",
    password: "testing",
    role: "TECHNICIAN",
  },
  {
    firstName: "Bob",
    lastName: "Williams",
    email: "technician2@gmail.com",
    password: "testing",
    role: "TECHNICIAN",
  },
  {
    firstName: "Charlie",
    lastName: "Brown",
    email: "technician3@gmail.com",
    password: "testing",
    role: "TECHNICIAN",
  },
  {
    firstName: "David",
    lastName: "Smith",
    email: "client1@gmail.com",
    password: "testing",
    role: "CLIENT",
  },
  {
    firstName: "Emily",
    lastName: "Clark",
    email: "client2@gmail.com",
    password: "testing",
    role: "CLIENT",
  },
  {
    firstName: "Frank",
    lastName: "Taylor",
    email: "client3@gmail.com",
    password: "testing",
    role: "CLIENT",
  },
  {
    firstName: "Grace",
    lastName: "Miller",
    email: "admin1@gmail.com",
    password: "testing",
    role: "ADMIN",
  },
];

export async function GET() {
  return Response.json({ early_return: true }, { status: 200 });

  const supabase = await createClient();

  try {
    await Promise.all(
      seedData.map(({ role, ...values }) => {
        return supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              first_name: values.firstName,
              last_name: values.lastName,
              role,
            },
          },
        });
      }),
    );

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    if (isRedirectError(err)) {
      return Response.json({ success: true }, { status: 200 });
    }
    console.error(err);
    return Response.json({ success: false }, { status: 500 });
  }
}
