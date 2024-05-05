import { useState } from 'react';

export const usePagination = <T extends unknown>(
  items: T[],
  itemsPerPage: number,
  initialPage: number = 1
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (direction: number) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return { paginatedItems, totalPages, currentPage, handlePageChange };
};