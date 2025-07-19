/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { ColumnFilterDropdown } from './ColumnFilterDropdown';
import { useNavigate } from 'react-router-dom';
import {
  arabicDateStringToISO,
  getShipmentStatusLabel,
  getShipmentStatusStyles,
  tableRowStyles,
} from '../../../lib/utils';
import { BiFilterAlt } from 'react-icons/bi';
import Pagination from '../../pagination/Pagination';

const columnsToFilter = [
  { key: 'admin', label: 'المسئول' },
  { key: 'shipper', label: 'المرسل' },
  { key: 'shipperBranch', label: 'فرع المرسل' },
  { key: 'recipient', label: 'المستلم' },
  { key: 'driver', label: 'السائق' },
  { key: 'pickupCity', label: 'المصدر' },
  { key: 'dropOffCity', label: 'الوجهة' },
  { key: 'date', label: 'تاريخ التحميل' },
  { key: 'status', label: 'حالة الشحنة' },
];

const initialFilters: any = {};

columnsToFilter.forEach((col) => (initialFilters[col.key] = []));

const tableHeading = [
  { label: 'رقم الشحنة', key: 'id' },
  { label: 'السائق', key: 'driver' },
  { label: 'المرسل', key: 'shipper' },
  { label: 'فرع المرسل', key: 'shipperBranch' },
  { label: 'المستلم', key: 'recipient' },
  { label: 'المسئول', key: 'admin' },
  { label: 'المصدر', key: 'pickupCity' },
  { label: 'الوجهة', key: 'dropOffCity' },
  { label: 'تاريخ التحميل', key: 'date' },
  { label: 'حالة الشحنة', key: 'status' },
];

const ShipmentsTable = React.memo(({ shipments }: any) => {
  const navigate = useNavigate();
  const [dateSort, setDateSort] = useState<'asc' | 'desc' | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState(initialFilters);
  const [showFilter, setShowFilter] = useState<any>({});

  const filteredData = shipments.filter((shipment: any) =>
    Object.keys(filters).every((key) => {
      if (key === 'date') {
        if (!filters[key] || filters[key].length === 0) return true;
        return filters[key].includes(shipment.pickupDate);
      }
      return !filters[key] || filters[key].length === 0 || filters[key].includes(shipment[key]);
    }),
  );

  const uniqueOptions: any = {};
  columnsToFilter.forEach((col) => {
    let values = filteredData.map((shipment: any) => {
      if (col.key === 'status') {
        return getShipmentStatusLabel(shipment[col.key]);
      }
      return shipment[col.key];
    });

    if (col.key === 'date') {
      values = values.filter(Boolean).map((dateStr: string) => dateStr);
    }
    uniqueOptions[col.key] = Array.from(new Set(values)).filter(Boolean);
  });

  const sortedData = [...filteredData];

  const parseDate = (dateStr: string): Date => {
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    const isoDate = arabicDateStringToISO(dateStr);
    if (isoDate) {
      return new Date(isoDate);
    }

    return new Date(dateStr);
  };

  if (dateSort === 'asc') {
    sortedData.sort((a, b) => {
      const dateA = parseDate(a.pickupDate);
      const dateB = parseDate(b.pickupDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

  if (dateSort === 'desc') {
    sortedData.sort((a, b) => {
      const dateA = parseDate(a.pickupDate);
      const dateB = parseDate(b.pickupDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowFilter({});
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='w-full overflow-x-auto min-h-[40vh]'>
        <table className='bg-[#FCFCFC] w-full'>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {tableHeading.map((col, index) => (
                <th
                  key={col.key}
                  className={tableRowStyles + ' relative'}
                >
                  <div
                    className={`flex items-center gap-1 ${
                      index === tableHeading.length - 1 && 'ms-4'
                    }`}
                  >
                    {col.label}

                    {uniqueOptions[col.key] && (
                      <button
                        type='button'
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFilter((prev: any) => (prev[col.key] ? {} : { [col.key]: true }));
                        }}
                      >
                        <BiFilterAlt
                          size={22}
                          color='#CC8B3D'
                        />
                      </button>
                    )}
                    {showFilter[col.key] && (
                      <div
                        className='z-50'
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <ColumnFilterDropdown
                          isPickupDate={col.key === 'date'}
                          dateSort={dateSort}
                          setDateSort={setDateSort}
                          options={uniqueOptions[col.key]}
                          selectedValues={filters[col.key] || []}
                          onChange={(vals: any) =>
                            setFilters((f: any) => ({
                              ...f,
                              [col.key]: vals,
                            }))
                          }
                          onClose={() =>
                            setShowFilter((f: any) => ({
                              ...f,
                              [col.key]: false,
                            }))
                          }
                          placeholder={`ابحث عن ${col.label}`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <div className='h-8'></div>
          <tbody className='font-Rubik text-base font-medium'>
            {paginatedData.map((shipment: any, index: any) => (
              <tr
                key={shipment.id}
                className={`rounded-lg ${index % 2 === 0 ? 'bg-[#F2F2F2]' : ''}`}
              >
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/shipments/${shipment.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ display: 'contents' }}
                >
                  <td className={tableRowStyles}>{shipment.trackingNumber}</td>
                  <td className={tableRowStyles}>{shipment.driver}</td>
                  <td className={tableRowStyles}>{shipment.shipper}</td>
                  <td className={tableRowStyles}>{shipment.shipperBranch}</td>
                  <td className={tableRowStyles}>{shipment.recipient}</td>
                  <td className={tableRowStyles}>{shipment.admin}</td>
                  <td className={tableRowStyles}>{shipment.pickupCity}</td>
                  <td className={tableRowStyles}>{shipment.dropOffCity}</td>
                  <td className={tableRowStyles}>
                    {(shipment.pickupDate && arabicDateStringToISO(shipment.pickupDate)) || '-'}
                  </td>
                  <td className={tableRowStyles}>
                    <span
                      className={`py-2 text-center font-medium inline-block rounded-md w-36 text-sm ${getShipmentStatusStyles(
                        getShipmentStatusLabel(shipment.status),
                      )}`}
                    >
                      {getShipmentStatusLabel(shipment.status)}
                    </span>
                  </td>
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={sortedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
});

export default ShipmentsTable;
