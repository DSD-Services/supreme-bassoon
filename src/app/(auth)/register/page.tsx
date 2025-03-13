"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

type UserRole = "CLIENT" | "TECHNICIAN" | "ADMIN";

type Input = {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  password: string;
}

export default function Page() {
  const {register,handleSubmit,formState: { errors }} = useForm<Input>({mode: "onSubmit",})
  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log("Form Submitted:", data);

    toast.dismiss(); 
    toast.info("Registration successful! 🎉", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <h1 className="text-3xl mb-6 font-bold ">Welcome to registration at DSD Services!</h1>
      <ToastContainer/>
      <div className="bg-blue-300 border-2 border-blue-400 shadow-lg rounded-lg p-8 w-[544px] mt-2">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 p-6">
          Admin Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...register("firstName",{required: true})}
                />
                {errors.firstName && <span className="text-red-600">This field is required</span>}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName",{required: true})}
                  className="w-full p-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.lastName && <span className="text-red-600">This field is required</span>}
              </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email",{required: true})}
              className="w-full p-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <span className="text-red-600">This field is required</span>}
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium">
              Role
            </label>
            <select
              id="role"
              {...register("role",{})}
              defaultValue="CLIENT"
              className="w-full p-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-red-400"
            >
              <option value="CLIENT">CLIENT</option>
              <option value="TECHNICIAN">TECHNICIAN</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password",{required: true})}
              className="w-full p-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {errors.password && <span className="text-red-600">This field is required</span>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-700 transition p-4"
          >
            Register Account
          </button>
        </form>
      </div>
    </div>
  );
}