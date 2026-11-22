import { useEffect, useState } from 'react';
import { ColumnFilterDropdown } from './ColumnFilterDropdown';
import { useNavigate } from 'react-router-dom';
import {
  arabicDateStringToISO,
  getShipmentStatusLabel,
  getShipmentStatusStyles,
  parsePickupDate,
  tableRowStyles,
} from '../../../lib/utils';
import { BiFilterAlt } from 'react-icons/bi';
import Pagination from '../../pagination/Pagination';
import { usePagination } from '../../../hooks/usePagination';
import { Shipment } from '../../../types/shipments';

const columnsToFilter: { key: string; label: string }[] = [
  { key: 'admin', label: 'المستخدم' },
  { key: 'shipper', label: 'المرسل' },
  { key: 'shipperBranch', label: 'فرع المرسل' },
  { key: 'recipient', label: 'المستلم' },
  { key: 'driver', label: 'السائق' },
  { key: 'pickupCity', label: 'المصدر' },
  { key: 'dropOffCity', label: 'الوجهة' },
  { key: 'date', label: 'تاريخ التحميل' },
  { key: 'status', label: 'حالة الشحنة' },
];

const initialFilters = Object.fromEntries(columnsToFilter.map((col) => [col.key, []])) as Record<
  string,
  string[]
>;

const tableHeading = [
  { label: 'رقم الشحنة', key: 'id' },
  { label: 'السائق', key: 'driver' },
  { label: 'المرسل', key: 'shipper' },
  { label: 'فرع المرسل', key: 'shipperBranch' },
  { label: 'المستلم', key: 'recipient' },
  { label: 'المستخدم', key: 'admin' },
  { label: 'المصدر', key: 'pickupCity' },
  { label: 'الوجهة', key: 'dropOffCity' },
  { label: 'تاريخ التحميل', key: 'date' },
  { label: 'حالة الشحنة', key: 'status' },
];

const ShipmentsTable = ({
  shipments,
}: {
  shipments: Shipment[];
}) => {
  const navigate = useNavigate();
  const [dateSort, setDateSort] = useState<'asc' | 'desc' | undefined>();
  const [filters, setFilters] = useState(initialFilters);
  const [showFilter, setShowFilter] = useState<Record<string, boolean>>({});

  const filteredData = shipments.filter((shipment: Shipment) =>
    Object.keys(filters).every((key) => {
      
      if (key === 'status') {
        if (!filters[key] || filters[key].length === 0) return true;
        const arabicStatus = getShipmentStatusLabel((shipment as Shipment)[key]);
        return filters[key].includes(arabicStatus);
      }

      return (
        !filters[key] ||
        filters[key].length === 0 ||
        filters[key].includes(String((shipment as unknown as Record<string, unknown>)[key]))
      );
    }),
  );

  const uniqueOptions: Record<string, string[]> = {};
  columnsToFilter.forEach((col) => {
    const values = filteredData.map((shipment) => {
      if (col.key === 'status') {
        return getShipmentStatusLabel(shipment[col.key as keyof Shipment] as string);
      }
      return shipment[col.key as keyof Shipment] as string;
    });
    
    uniqueOptions[col.key] = Array.from(new Set(values)).filter(Boolean);
  });

  const sortedData = [...filteredData];

  if (dateSort === 'asc') {
    sortedData.sort((a, b) => {
      const dateA = parsePickupDate(a.pickupDate);
      const dateB = parsePickupDate(b.pickupDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

  if (dateSort === 'desc') {
    sortedData.sort((a, b) => {
      const dateA = parsePickupDate(a.pickupDate);
      const dateB = parsePickupDate(b.pickupDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  const { currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange, paginate } =
    usePagination({ totalItems: sortedData.length });
  const paginatedData = paginate(sortedData) as Shipment[];

  useEffect(() => {
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
                <th key={col.key} className={tableRowStyles + ' relative'}>
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
                          setShowFilter((prev) => (prev[col.key] ? {} : { [col.key]: true }));
                        }}
                      >
                        <BiFilterAlt size={22} color='#CC8B3D' />
                      </button>
                    )}
                    {showFilter[col.key] && (
                      <div className='z-50' onMouseDown={(e) => e.stopPropagation()}>
                        <ColumnFilterDropdown
                          isPickupDate={col.key === 'date'}
                          dateSort={dateSort}
                          setDateSort={setDateSort}
                          options={uniqueOptions[col.key]}
                          selectedValues={filters[col.key] || []}
                          onChange={(vals: string[]) =>
                            setFilters((f) => ({
                              ...f,
                              [col.key]: vals,
                            }))
                          }
                          onClose={() =>
                            setShowFilter((f) => ({
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
          <tbody className='font-Rubik text-base font-medium'>
            {paginatedData.map((shipment: Shipment, index: number) => (
              <tr
                key={shipment.id}
                onClick={() => {
                  navigate(`/shipments/${shipment.id}`);
                }}
                className={`rounded-lg cursor-pointer ${index % 2 === 0 ? 'bg-[#F2F2F2]' : ''}`}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={sortedData.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default ShipmentsTable;
