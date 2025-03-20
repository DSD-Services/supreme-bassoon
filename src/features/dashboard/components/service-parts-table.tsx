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
    <table className="w-full rounded-md bg-gray-100 text-left">
      <thead>
        <tr className="text-xs text-blue-800">
          <th scope="column" className="px-2 py-1 text-left font-medium">
            Part Name for Service Type
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
        {data && Object.keys(data).length > 0 ? (
          Object.keys(data).map((partId) => {
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
                <td
                  className={`px-2 py-1 text-xs font-normal md:text-sm ${part.qtyReserved === 0 || part.qtyReserved < part.qtyNeed ? "font-semibold text-red-500" : ""}`}
                >
                  {part.qtyReserved}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5} className="text-center">
              {data === undefined ? "Loading parts..." : "No parts available"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
