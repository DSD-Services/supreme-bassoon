import * as React from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "success"
  | "warning"
  | "ghost"
  | "link";
type ButtonSizes = "default" | "sm" | "lg" | "icon";

const buttonVariants = ({
  variant = "default",
  size = "default",
}: {
  variant?: ButtonVariants;
  size?: ButtonSizes;
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer";

  const variants = {
    default: "bg-blue-500 text-white shadow hover:bg-blue-600",
    destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
    outline:
      "border border-gray-300 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900",
    secondary: "bg-gray-200 text-gray-900 shadow-sm hover:bg-gray-300",
    success: "bg-green-500 text-white shadow-sm hover:bg-green-600",
    warning: "bg-yellow-500 text-foreground shadow-sm hover:bg-yellow-600",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-blue-500 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-8 w-8",
  };

  return cn(base, variants[variant], sizes[size]);
};

type ButtonBaseProps = {
  className?: string;
  variant?: ButtonVariants;
  size?: ButtonSizes;
};

type ButtonAsButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asLink?: false;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    asLink: true;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const ButtonAsButton = React.forwardRef<HTMLButtonElement, ButtonAsButtonProps>(
  (props, ref) => {
    const { className, variant = "default", size = "default", ...rest } = props;
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...rest}
      />
    );
  },
);

const ButtonAsLink = React.forwardRef<HTMLAnchorElement, ButtonAsLinkProps>(
  (props, ref) => {
    const { className, variant = "default", size = "default", ...rest } = props;
    return (
      <Link
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...rest}
      />
    );
  },
);

const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { asLink, ...rest } = props;
  if (asLink) {
    return (
      <ButtonAsLink
        {...(rest as ButtonAsLinkProps)}
        ref={ref as React.Ref<HTMLAnchorElement>}
      />
    );
  }

  return (
    <ButtonAsButton
      {...(props as ButtonAsButtonProps)}
      ref={ref as React.Ref<HTMLButtonElement>}
    />
  );
});

ButtonAsButton.displayName = "ButtonAsButton";
ButtonAsLink.displayName = "ButtonAsLink";
Button.displayName = "Button";

export { Button };
