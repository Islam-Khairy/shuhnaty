import { useEffect, useState, useMemo } from 'react';
import SearchInput from '../../searchInput/SearchInput';
import SelectMenu from '../../SelectMenu';
import ShipmentsTable from '../shipmentsTable/ShipmentsTable';
import AddNewItemButton from '../../shared/AddNewItemButton';
import { Shipment } from '../../../types/shipments';
import { fieldsToCheck, selectMenuOptions } from '../../../lib/data/shipments';
import { PageLoader } from '../../shared/PageLoader';

const ShipmentsPage = ({
  shipments,
  isAllShipmentsPage,
}: {
  shipments: Shipment[];
  isAllShipmentsPage?: boolean;
}) => {
  const [selectedShipmentStatus, setSelectedShipmentStatus] = useState('all');

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredShipments = useMemo(() => {
    let filtered = shipments;

    if (searchValue.trim()) {
      filtered = filtered.filter((shipment: Shipment) =>
        fieldsToCheck.some((field) => {
          const fieldValue = shipment[field];
          return (
            typeof fieldValue === 'string' &&
            fieldValue.toLowerCase().includes(searchValue.toLowerCase().trim())
          );
        }),
      );
    }

    if (isAllShipmentsPage && selectedShipmentStatus !== 'all') {
      filtered = filtered.filter(
        (shipment: Shipment) => shipment.status === selectedShipmentStatus,
      );
    }

    return filtered;
  }, [shipments, searchValue, selectedShipmentStatus, isAllShipmentsPage]);

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
            title='إضافة شحنة'
            path='/shipments/add'
          />

          <SearchInput
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='text-base md:text-xl font-bold'>قائمة الشحنات</h1>
            {isAllShipmentsPage && (
              <SelectMenu
                options={selectMenuOptions}
                selectedItem={selectedShipmentStatus}
                setSelectedItem={setSelectedShipmentStatus}
              />
            )}
          </div>
          <ShipmentsTable
            shipments={filteredShipments}
          />
        </div>
      </div>
    </>
  );
};
export default ShipmentsPage;
