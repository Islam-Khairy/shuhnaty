/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import SearchInput from '../../components/searchInput/SearchInput';
import ShippersTable from '../../components/shippers/ShippersTable';
import { shippers } from '../../lib/data';
import AddNewItemButton from '../../components/items/AddNewItemButton';

const fieldsToCheck = [
  'id',
  'name',
  'primaryPhoneNumber',
  'secondaryPhoneNumber',
  'email',
  'address',
];
const Shippers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredData = shippers.filter((shipper: any) =>
    fieldsToCheck.some((field) => {
      const fieldValue = shipper[field];
      return (
        typeof fieldValue === 'string' &&
        fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
    }),
  );

  const sortedData = [...filteredData].sort((a: any, b: any) => a.id - b.id);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <>
     {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}
        >
          <span className='loader'></span>
        </div>
      )}
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
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='text-xl font-bold'>قائمة العملاء</h1>
          </div>
          <ShippersTable data={sortedData} />
        </div>
      </div>
    </>
  );
};

export default Shippers;
