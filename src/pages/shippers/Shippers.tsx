import { useState, useEffect } from 'react';
import SearchInput from '../../components/searchInput/SearchInput';
import ShippersTable from '../../components/shippers/ShippersTable';
import { shippers } from '../../lib/data/mainData';
import AddNewItemButton from '../../components/shared/AddNewItemButton';
import { useFilteredSearchValue } from '../../hooks/useFilteredSearchValue';
import { fieldsToCheck } from '../../lib/data/shippers';
import { PageLoader } from '../../components/shared/PageLoader';

const Shippers = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { filteredData, searchValue, setSearchValue } = useFilteredSearchValue(
     fieldsToCheck,
     shippers,
   );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <div className='p-4'>
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          <AddNewItemButton
            title='إضافة عميل'
            path='/shippers/add'
          />

          <SearchInput
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='text-xl font-bold'>قائمة العملاء</h1>
          </div>
          <ShippersTable
            data={filteredData}
          />
        </div>
      </div>
    </>
  );
};

export default Shippers;
