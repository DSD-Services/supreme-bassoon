import { ReactNode } from 'react';

interface SmallLabelProps {
  children: ReactNode;
}

export default function SmallLabel({ children }: SmallLabelProps) {
  return <span className='text-blue-800 font-medium text-xs'>{children}</span>;
}
