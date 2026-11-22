import { useState } from 'react';

export function useFilteredSearchValue<T extends object>(
  fieldsToCheck: (keyof T)[],
  items: T[],
) {
  const [searchValue, setSearchValue] = useState('');

  const filteredData = items.filter((item) =>
    fieldsToCheck.some((field) => {
      const fieldValue = item[field];
      return (
        typeof fieldValue === 'string' &&
        fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
    }),
  );

  return { filteredData, searchValue, setSearchValue };
}
