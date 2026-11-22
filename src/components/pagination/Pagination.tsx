import { useMemo, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function Pagination({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const pageSizeOptions = useMemo(() => {
    if (totalItems <= 0) return [10];
    const baseSteps = [10, 20, 30];
    const maxStepNeeded =
      baseSteps.find((step) => step >= totalItems) ?? baseSteps[baseSteps.length - 1];
    const available = baseSteps.filter((step) => step <= maxStepNeeded);
    return available.length > 0 ? available : [10];
  }, [totalItems]);

  useEffect(() => {
    if (!pageSizeOptions.includes(itemsPerPage)) {
      onItemsPerPageChange(pageSizeOptions[pageSizeOptions.length - 1]);
    }
  }, [pageSizeOptions, itemsPerPage, onItemsPerPageChange]);

  return (
    <div
      dir='rtl'
      className='my-8 flex flex-col sm:flex-row justify-between gap-5 md:gap-0 md:items-center'
    >
      <div className='flex items-center gap-2' dir='rtl'>
        <span className='text-sm text-[#666666]'>عرض النتائج:</span>
        <Select
          dir='rtl'
          value={String(itemsPerPage)}
          onValueChange={(val) => onItemsPerPageChange(Number(val))}
        >
          <SelectTrigger dir='rtl' className='w-[76px] h-9 font-Rubik text-center justify-between'>
            <SelectValue>{itemsPerPage}</SelectValue>
          </SelectTrigger>
          <SelectContent align='end' dir='rtl' className='font-Rubik min-w-[76px]'>
            {pageSizeOptions.map((option) => (
              <SelectItem
                dir='rtl'
                key={option}
                value={String(option)}
                className='font-Rubik text-center justify-center cursor-pointer'
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex items-center gap-3 max-w-full overflow-x-auto' dir='rtl'>
        <button
          type='button'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='hidden md:block text-primary disabled:text-gray-400 font-medium cursor-pointer disabled:cursor-not-allowed'
        >
          السابق
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            type='button'
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-3.5 font-bold py-1.5 text-center text-sm rounded-lg transition-colors cursor-pointer ${
              currentPage === index + 1
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          type='button'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className='hidden md:block text-primary disabled:text-gray-400 font-medium cursor-pointer disabled:cursor-not-allowed'
        >
          التالي
        </button>
      </div>
    </div>
  );
}

export default Pagination;
