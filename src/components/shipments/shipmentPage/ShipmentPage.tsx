/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import SearchInput from '../../searchInput/SearchInput';
import SelectMenu from '../../SelectMenu';
import ShipmentsTable from '../shipmentsTable/ShipmentsTable';
import AddNewItemButton from '../../items/AddNewItemButton';

const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'قيد الشحن', value: 'shipping' },
  { label: 'متأخرة', value: 'delayed' },
  { label: 'تم التوصيل', value: 'delivered' },
  { label: 'مكتملة', value: 'completed' },
  { label: 'ملغية', value: 'canceled' },
  { label: 'مرتجعة', value: 'returned' },
];

const fieldsToCheck = [
  'id',
  'admin',
  'recipient',
  'driver',
  'branch',
  'pickupCity',
  'dropOffCity',
  'date',
  'status',
];

const ShipmentPage = ({ shipments, isAllShipmentsPage = false }: any) => {
  const [selectedShipmentStatus, setSelectedShipmentStatus] = useState('all');

  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredShipments = React.useMemo(() => {
    let filtered = shipments;

    if (searchValue.trim()) {
      filtered = filtered.filter((shipment: any) =>
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
      filtered = filtered.filter((shipment: any) => shipment.status === selectedShipmentStatus);
    }

    return filtered;
  }, [shipments, searchValue, selectedShipmentStatus, isAllShipmentsPage]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  console.log('shipment page rendered');

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
            title='إضافة شحنة'
            path='/shipments/add'
          />

          <SearchInput
            value={searchValue}
            onChange={(e: any) => setSearchValue(e.target.value)}
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
            selectedShipmentStatus={selectedShipmentStatus}
            shipments={filteredShipments}
          />
        </div>
      </div>
    </>
  );
};
export default ShipmentPage;
