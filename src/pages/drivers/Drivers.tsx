import { useState, useEffect } from 'react';
import SelectMenu from '../../components/SelectMenu';
import SearchInput from '../../components/searchInput/SearchInput';
import { drivers } from '../../lib/data/mainData';
import AddNewItemButton from '../../components/shared/AddNewItemButton';
import DriversTable from '../../components/adminsDrivers/drivers/DriversTable';
import { useFilteredSearchValue } from '../../hooks/useFilteredSearchValue';
import { selectMenuOptions } from '../../lib/data/shared';
import { fieldsToCheck } from '../../lib/data/drivers';
import { PageLoader } from '../../components/shared/PageLoader';

const Drivers = () => {
  const [selectedDriverStatus, setSelectedDriverStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const { filteredData, searchValue, setSearchValue } = useFilteredSearchValue(
    fieldsToCheck,
    drivers,
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
            title='إضافة سائق'
            path='/drivers/add'
          />
          <SearchInput
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='xs:text-lg text-xl text-nowrap font-bold'>قائمة السائقين</h1>
            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedDriverStatus}
              setSelectedItem={setSelectedDriverStatus}
            />
          </div>
          <DriversTable
            selectedStatus={selectedDriverStatus}
            drivers={filteredData}
          />
        </div>
      </div>
    </>
  );
};

export default Drivers;
