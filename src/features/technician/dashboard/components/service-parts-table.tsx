import { Part } from "@/features/technician/dashboard/types/work-order.types";

interface ServicePartsTableProps {
  data: {
    parts: Part[];
  };
}

export default function ServicePartsTable({ data }: ServicePartsTableProps) {
  return (
    <table className="bg-secondary/30 w-full rounded-md text-left">
      <thead>
        <tr className="text-primary text-xs">
          <th scope="column" className="px-2 py-1 text-left font-medium">
            Part Name
          </th>
          <th scope="column" className="px-2 py-1 font-medium">
            Qty<span className="block">Need</span>
          </th>
          <th scope="column" className="px-2 py-1 font-medium">
            Qty<span className="block">Stock</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.parts.map((part) => (
          <tr key={part.name}>
            <th
              scope="row"
              className="px-2 py-1 text-xs font-normal md:text-sm"
            >
              {part.name}
            </th>
            <td className="px-2 py-1 text-xs font-normal md:text-sm">
              {part.qtyNeed}
            </td>
            <td className="px-2 py-1 text-xs font-normal md:text-sm">
              {part.qtyStock}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
