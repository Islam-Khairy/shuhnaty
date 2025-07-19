import { useNavigate } from 'react-router-dom';
import { getAvailabilityStatusStyles, tableRowStyles } from '../../../lib/utils';
import Pagination from '../../pagination/Pagination';
import { useState } from 'react';
// import { ColumnFilterDropdown } from '../shipments/shipmentsTable/ColumnFilterDropdown';
// import { TiFilter } from 'react-icons/ti';

/* eslint-disable @typescript-eslint/no-explicit-any */

const tableHeading = [
  { key: 'id', label: '(ID)' },
  { key: 'name', label: 'الاسم' },
  { key: 'language', label: 'اللغة' },
  { key: 'nationality', label: 'الجنسية' },
  { key: 'branch', label: 'الفرع' },
  { key: 'identityNumber', label: 'رقم الهوية' },
  { key: 'phoneNumber', label: 'رقم الجوال' },
  { key: 'vehicleType', label: 'نوع الشاحنة' },
  { key: 'vehicleNumber', label: 'رقم الشاحنة' },
  { key: 'status', label: 'الحالة' },
];
const DriversTable = ({ selectedStatus, drivers, isSelectRecipientsPage = false }: any) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  //   const columnsToFilter = [
  //     { key: 'name', label: 'الاسم' },
  //     { key: 'language', label: 'اللغة' },
  //     { key: 'nationality', label: 'الجنسية' },
  //     { key: 'identity_number', label: 'رقم الهوية' },
  //     { key: 'phone_number', label: 'رقم الجوال' },
  //     { key: 'vehicle_number', label: 'رقم الشاحنة' },
  //     { key: 'status', label: 'الحالة' },
  //   ];

  //   const initialFilters: any = {};
  //   columnsToFilter.forEach((col: any) => (initialFilters[col.key] = []));

  //   const uniqueOptions: any = {};
  //   columnsToFilter.forEach((col) => {
  //     let values = data.map((item: any) => item[col.key]);
  //     if (col.key === 'status') {
  //       values = values.map((val: any) => (val === 'available' ? 'متاح' : 'غير متاح'));
  //     }
  //     uniqueOptions[col.key] = Array.from(new Set(values)).filter(Boolean);
  //   });

  //   const [filters, setFilters] = React.useState(initialFilters);
  //   const [showFilter, setShowFilter] = React.useState<any>({});

  //   const filteredData = data.filter(
  //     (item: any) =>
  //       Object.keys(filters).every((key) => {
  //         if (!filters[key] || filters[key].length === 0) return true;
  //         if (key === 'status') {
  //           const statusText = item.status === 'available' ? 'متاح' : 'غير متاح';
  //           return filters[key].includes(statusText);
  //         }
  //         return filters[key].includes(item[key]);
  //       }) &&
  //       (selectedStatus === 'الكل' ||
  //         (item.status === 'available' ? 'متاح' : 'غير متاح') === selectedStatus),
  //   );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  const filteredData = drivers.filter(
    (driver: any) =>
      selectedStatus === 'all' || driver.status.toLowerCase() === selectedStatus.toLowerCase(),
  );

  const sortedData = [...filteredData].sort((a: any, b: any) => a.id - b.id);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map((_: any, index: any) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <>
      <div className={`w-full overflow-x-auto`}>
        <table className={`bg-[#FCFCFC] w-full`}>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {isSelectRecipientsPage && (
                <th className={tableRowStyles}>
                  <input
                    className='w-4 h-4'
                    type='checkbox'
                    checked={selectedRows.length === paginatedData.length}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {tableHeading.map((col, index) => (
                <th
                  key={col.key}
                  className={tableRowStyles}
                >
                  <div
                    className={`flex items-center gap-1 ${
                      index === tableHeading.length - 1 && 'ms-20'
                    }`}
                  >
                    {col.label}
                    {/*  {uniqueOptions[col.key] && (
                    <button
                      type='button'
                      onClick={() =>
                        setShowFilter((prev: any) => (prev[col.key] ? {} : { [col.key]: true }))
                      }
                    >
                      <TiFilter
                        size={22}
                        className='text-gray-400 hover:text-gray-900'
                      />
                    </button>
                  )}
                  {showFilter[col.key] && (
                    <div className='z-50'>
                      <ColumnFilterDropdown
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
                        placeholder={`ابحث عن ${col.label}...`}
                      />
                    </div>
                  )} */}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <div className='h-8'></div>
          <tbody className='font-Rubik text-base font-medium'>
            {paginatedData.map((item: any, index: any) => {
              return (
                <tr className={`rounded-lg ${index % 2 === 0 && 'bg-[#F2F2F2]'}`}>
                  {isSelectRecipientsPage && (
                    <td className={tableRowStyles}>
                      <input
                        className='w-4 h-4'
                        type='checkbox'
                        checked={selectedRows.includes(index)}
                        onChange={() => handleSelectRow(index)}
                      />
                    </td>
                  )}
                  <button
                    key={index}
                    onClick={() => {
                      navigate(`/drivers/${item.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ display: 'contents' }}
                  >
                    <td className={tableRowStyles}>{item?.id}</td>
                    <td className={tableRowStyles}>{item?.name}</td>
                    <td className={tableRowStyles}>{item?.language}</td>
                    <td className={tableRowStyles}>{item?.nationality}</td>
                    <td className={tableRowStyles}>{item?.branch}</td>
                    <td className={tableRowStyles}>{item?.identityNumber}</td>
                    <td className={tableRowStyles}>{item?.phoneNumber}</td>
                    <td className={tableRowStyles}>{item?.vehicle}</td>
                    <td className={tableRowStyles}>{item?.vehicleNumber}</td>
                    <td className='py-2 px-4 text-center '>
                      <span
                        className={`p-2 inline-block rounded-md w-44 text-sm ${getAvailabilityStatusStyles(
                          item.status,
                        )}`}
                      >
                        {item.status === 'available' ? 'متاح' : 'غير متاح'}
                      </span>
                    </td>
                  </button>
                </tr>
              );
            })}
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
};

export default DriversTable;
