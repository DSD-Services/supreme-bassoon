import { ReactNode } from "react";

interface SmallLabelProps {
  children: ReactNode;
}

export default function SmallLabel({ children }: SmallLabelProps) {
  return <span className="text-xs font-medium text-blue-500">{children}</span>;
}
