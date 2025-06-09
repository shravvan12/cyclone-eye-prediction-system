
import React from 'react';
import { useDataStore } from '@/store/dataStore';

export const DataPreview = () => {
  const { dataset, headers } = useDataStore();

  if (!dataset || !headers) return null;

  const previewData = dataset.slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-600">
            {headers.map((header, index) => (
              <th
                key={index}
                className="text-left p-3 text-slate-300 font-medium"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {previewData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-slate-700 hover:bg-slate-700/30"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-3 text-slate-200">
                  {typeof cell === 'number' ? cell.toFixed(4) : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-slate-400 text-sm mt-2">
        Showing first 5 rows of {dataset.length} total rows
      </p>
    </div>
  );
};
