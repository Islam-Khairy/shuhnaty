import { useState, useEffect, useCallback } from 'react';

interface UsePaginationProps {
  totalItems: number;
  initialItemsPerPage?: number;
}

export const usePagination = ({
  totalItems,
  initialItemsPerPage = 10,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = useCallback(
    <T>(data: T[]): T[] => {
      const start = (currentPage - 1) * itemsPerPage;
      return data.slice(start, start + itemsPerPage);
    },
    [currentPage, itemsPerPage]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    paginate,
    handlePageChange,
    handleItemsPerPageChange,
  };
};