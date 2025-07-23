/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import SelectMenu from '../../components/SelectMenu';
import SearchInput from '../../components/searchInput/SearchInput';
import AdminsTable from '../../components/adminsDrivers/Admins/AdminsTable';
import { admins } from '../../lib/data';
import AddNewItemButton from '../../components/items/AddNewItemButton';

const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'متاح', value: 'available' },
  { label: 'غير متاح', value: 'notAvailable' },
];

const fieldsToCheck = ['id', 'userName', 'firstName', 'lastName', 'email', 'nationality', 'status'];

const Admins = () => {
  const [selectedAdminStatus, setSelectedAdminStatus] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredData = admins.filter((admin: any) =>
    fieldsToCheck.some((field) => {
      const fieldValue = admin[field];
      return (
        typeof fieldValue === 'string' &&
        fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
      );
    }),
  );

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <div className='p-4'>
        <div
          className={`flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10`}
        >
          <AddNewItemButton
            title='إضافة مستخدم'
            path='/admins/add'
          />
          <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='xs:text-lg text-xl text-nowrap font-bold'>قائمة المستخدمين</h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedAdminStatus}
              setSelectedItem={setSelectedAdminStatus}
            />
          </div>
          <AdminsTable
            selectedStatus={selectedAdminStatus}
            data={filteredData}
          />
        </div>
      </div>
    </>
  );
};

export default Admins;
