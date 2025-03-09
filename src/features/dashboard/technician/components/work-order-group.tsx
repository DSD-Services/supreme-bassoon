import { ReactNode } from 'react';
import SmallLabel from './small-label';

interface WorkOrderGroupProps {
  labelText: string;
  children: ReactNode;
}

export default function WorkOrderGroup({
  labelText,
  children,
}: WorkOrderGroupProps) {
  return (
    <div className='flex flex-col'>
      <SmallLabel>{labelText}</SmallLabel>
      <span className='font-semibold text-xs md:text-sm'>{children}</span>
    </div>
  );
}
