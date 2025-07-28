import { useEffect, useState } from 'react';

type CPFYearProjection = {
  year: number;
  age: number;
  oa: number;
  sa: number;
  ma: number;
  total: number;
};

type ResultTableProps = {
  data: CPFYearProjection[];
};

export default function ResultTable({ data }: ResultTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [data]);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleCSVExport = () => {
    const headers = ['Year', 'Age','OA', 'SA', 'MA', 'Total'];
    const rows = data.map((row) => [
      `"${row.year}"`,
      row.age.toString(),
      row.oa.toFixed(2),
      row.sa.toFixed(2),
      row.ma.toFixed(2),
      row.total.toFixed(2),
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'cpf_projection.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overflow-x-auto mt-8 border rounded shadow bg-gray-900 p-4">
      <div className="flex justify-between items-center pb-2">
        <span className="text-sm text-gray-300">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleCSVExport}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
        >
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-blue-400 text-sm italic">Loading results...</div>
      ) : (
        <table className="min-w-full border-collapse text-sm md:text-base">
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">OA</th>
              <th className="px-4 py-2">SA</th>
              <th className="px-4 py-2">MA</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((year, idx) => (
                <tr key={idx} className="even:bg-gray-700 hover:bg-gray-800 border-b">
                  <td className="px-4 py-2">{year.year}</td>
                  <td className="px-4 py-2">{year.age}</td>
                  <td className="px-4 py-2 font-mono tabular-nums">
                    ${year.oa.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-2 font-mono tabular-nums">
                    ${year.sa.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-2 font-mono tabular-nums">
                    ${year.ma.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-2 font-mono tabular-nums font-semibold">
                    ${year.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No data to display</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="w-32 bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-32 bg-gray-200 text-black px-4 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
