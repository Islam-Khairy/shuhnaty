/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { getAvailabilityStatusStyles, tableRowStyles } from '../../../lib/utils';
import Pagination from '../../pagination/Pagination';
import { useState } from 'react';

const tableHeading = [
  { key: 'id', label: '(ID)' },
  { key: 'firstName', label: 'الاسم الأول' },
  { key: 'lastName', label: 'الاسم الأخير' },
  { key: 'userName', label: 'اسم المستخدم' },
  { key: 'email', label: 'البريد الالكتروني' },
  { key: 'phoneNumber', label: 'رقم التواصل' },
  { key: 'nationality', label: 'الجنسية' },
  { key: 'status', label: 'الحالة' },
];
const AdminsTable = ({ selectedStatus, data }: any) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

  const filteredData = data.filter(
    (admin: any) =>
      selectedStatus === 'all' || admin.status.toLowerCase() === selectedStatus.toLowerCase(),
  );

  const sortedData = [...filteredData].sort((a: any, b: any) => a.id - b.id);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  console.log('AdminsTable rendered');
  return (
    <>
      <div className={`w-full overflow-x-auto`}>
        <table className={`bg-[#FCFCFC] w-full`}>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {tableHeading.map((col, index) => (
                <th
                  key={col.key}
                  className={tableRowStyles}
                >
                  <div
                    className={`flex items-center gap-1 ${
                      index === tableHeading.length - 1 && 'ms-16'
                    }`}
                  >
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-Rubik text-base font-medium'>
            {paginatedData.map((item: any, index: any) => {
              return (
                <tr
                  key={item.id}
                  onClick={() => {
                    navigate(`/admins/${item.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`rounded-lg ${index % 2 === 0 ? 'bg-[#F2F2F2]' : ''}`}
                >
                  <td className={tableRowStyles}>{item.id}</td>
                  <td className={tableRowStyles}>{item.firstName}</td>
                  <td className={tableRowStyles}>{item.lastName}</td>
                  <td className={tableRowStyles}>{item.userName}</td>
                  <td className={tableRowStyles}>{item?.email || '-'}</td>
                  <td className={tableRowStyles}>{item.phoneNumber}</td>
                  <td className={tableRowStyles}>{item?.nationality}</td>
                  <td className={tableRowStyles}>
                    <span
                      className={`py-2 text-center font-medium inline-block rounded-md w-44 text-sm ${getAvailabilityStatusStyles(
                        item.status,
                      )}`}
                    >
                      {item.status === 'available' ? 'متاح' : 'غير متاح'}
                    </span>
                  </td>
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

export default AdminsTable;
