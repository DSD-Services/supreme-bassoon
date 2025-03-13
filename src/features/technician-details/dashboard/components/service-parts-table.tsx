interface ServicePartsTableProps {
  data: {
    [key: number]: {
      name: string;
      qtyNeed: number;
      qtyReserved: number;
    };
  };
}

export default function ServicePartsTable({ data }: ServicePartsTableProps) {
  return (
    <table className="w-full rounded-md bg-gray-200 text-left">
      <thead>
        <tr className="text-xs text-blue-500">
          <th scope="column" className="px-2 py-1 text-left font-medium">
            Part Name
          </th>
          <th scope="column" className="px-2 py-1 font-medium">
            Qty<span className="block">Need</span>
          </th>
          <th scope="column" className="px-2 py-1 font-medium">
            Qty<span className="block">Reserved</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((partId) => {
          // Cast partId to number
          const id = Number(partId);
          const part = data[id];

          return (
            <tr key={id}>
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
                {part.qtyReserved}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
