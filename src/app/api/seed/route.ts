// DELETE FOR PRODUCTION

import { registerAction } from "@/features/auth/actions/register.action";
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

// map each to a formData
const registerFormValues = seedData.map((data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key as keyof typeof data]);
  }
  return formData;
});

export async function GET() {
  return Response.json({ early_return: true }, { status: 200 });

  try {
    await Promise.all(registerFormValues.map(registerAction));
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    if (isRedirectError(err)) {
      return Response.json({ success: true }, { status: 200 });
    }
    console.error(err);
    return Response.json({ success: false }, { status: 500 });
  }
}
