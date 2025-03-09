import { ReactNode } from "react";

interface SmallLabelProps {
  children: ReactNode;
}

export default function SmallLabel({ children }: SmallLabelProps) {
  return <span className="text-primary text-xs font-medium">{children}</span>;
}
