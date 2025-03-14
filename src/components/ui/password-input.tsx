"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "./input";
import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "type">
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const icon = showPassword ? faEyeSlash : faEye;
  const type = showPassword ? "text" : "password";

  return (
    <div className="relative">
      <Input type={type} ref={ref} {...props} />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded text-gray-500 transition hover:text-gray-700 focus:outline-none"
        aria-label="Toggle password visibility"
      >
        <FontAwesomeIcon icon={icon} size="sm" />
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
export { PasswordInput };
