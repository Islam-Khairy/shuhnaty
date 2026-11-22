import { useState, useEffect } from 'react';
import SelectMenu from '../../components/SelectMenu';
import SearchInput from '../../components/searchInput/SearchInput';
import AdminsTable from '../../components/adminsDrivers/Admins/AdminsTable';
import { admins } from '../../lib/data/mainData';
import AddNewItemButton from '../../components/shared/AddNewItemButton';
import { useFilteredSearchValue } from '../../hooks/useFilteredSearchValue';
import { selectMenuOptions } from '../../lib/data/shared';
import { fieldsToCheck } from '../../lib/data/admins';
import { PageLoader } from '../../components/shared/PageLoader';

const Admins = () => {
  const [selectedAdminStatus, setSelectedAdminStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const { filteredData, searchValue, setSearchValue } = useFilteredSearchValue(
    fieldsToCheck,
    admins,
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
            title='إضافة مستخدم'
            path='/admins/add'
          />
          <SearchInput
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
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
