import { usePagination } from '../utils/paginationUtils';
import '@testing-library/jest-dom';

describe('usePagination', () => {
  const mockItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('returns correct paginated items', () => {
    const { paginatedItems, totalPages, currentPage } = usePagination(mockItems, 3);
    expect(paginatedItems).toEqual([1, 2, 3]);
    expect(totalPages).toBe(4);
    expect(currentPage).toBe(1);
  });

  it('handles page change', () => {
    const { paginatedItems, handlePageChange } = usePagination(mockItems, 3);

    expect(paginatedItems).toEqual([1, 2, 3]);

    handlePageChange(1);
    expect(paginatedItems).toEqual([4, 5, 6]);

    handlePageChange(1);
    expect(paginatedItems).toEqual([7, 8, 9]);
  });

  it('handles empty items', () => {
    const { paginatedItems, totalPages, currentPage } = usePagination([], 3);
    expect(paginatedItems).toEqual([]);
    expect(totalPages).toBe(0);
    expect(currentPage).toBe(1);
  });

  it('handles custom initial page', () => {
    const { paginatedItems, currentPage } = usePagination(mockItems, 3, 2);
    expect(paginatedItems).toEqual([4, 5, 6]);
    expect(currentPage).toBe(2);
  });
});