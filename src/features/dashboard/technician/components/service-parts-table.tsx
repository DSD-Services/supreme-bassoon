import { Part } from '../../types/work-order.types';

interface ServicePartsTableProps {
  data: {
    parts: Part[];
  };
}

export default function ServicePartsTable({ data }: ServicePartsTableProps) {
  return (
    <table className='w-full bg-blue-50 text-left rounded-md'>
      <thead>
        <tr className='text-blue-800 text-xs'>
          <th scope='column' className='text-left font-medium px-2'>
            Part Name
          </th>
          <th scope='column' className='font-medium px-2'>
            Qty<span className='block'>Need</span>
          </th>
          <th scope='column' className='font-medium px-2'>
            Qty<span className='block'>Stock</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.parts.map((part) => (
          <tr key={part.name} className='border-t-2 border-white'>
            <th scope='row' className='font-normal px-2 text-xs md:text-sm'>
              {part.name}
            </th>
            <td className='font-normal px-2 text-xs md:text-sm'>
              {part.qtyNeed}
            </td>
            <td className='font-normal px-2 text-xs md:text-sm'>
              {part.qtyStock}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
