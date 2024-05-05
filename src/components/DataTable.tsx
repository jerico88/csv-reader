import React, { useState } from 'react';
import { usePagination } from '../utils/paginationUtils';

interface DataRow {
  [key: string]: string | number;
}

interface DataTableProps {
  data: DataRow[];
  searchTerm: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const { paginatedItems, totalPages, handlePageChange } = usePagination(
    filteredData,
    itemsPerPage,
    currentPage
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;