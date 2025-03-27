import { DeletePartDialog } from "@/features/parts/components/delete-part-dialog";
import { UpdatePartDialog } from "@/features/parts/components/update-part-quantity-form";
import type { Part } from "@/utils/supabase/types";

type PartListProps = { parts: Array<Part> };

export const PartList = ({ parts }: PartListProps) => {
  return (
    <>
      <tbody className="divide-y">
        {parts?.map((part) => (
          <tr key={part.id} className="divide-x">
            <td className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base">
              {part.name}
            </td>
            <td className="px-3 py-1.5 text-sm whitespace-nowrap tabular-nums sm:text-base">
              {part.quantity}
            </td>
            <td className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base">
              {part.manufacturer}
            </td>
            <td className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base">
              <UpdatePartDialog part={part} />
            </td>
            <td className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base">
              <DeletePartDialog partId={part.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};
