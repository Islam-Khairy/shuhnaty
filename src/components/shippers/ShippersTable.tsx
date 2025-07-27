import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Pagination from '../pagination/Pagination';
import { tableRowStyles } from '../../lib/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

const tableHeading = [
  { key: 'id', label: '(ID)' },
  { key: 'name', label: 'الاسم' },
  { key: 'primaryPhoneNumber', label: 'رقم الهاتف الأساسي' },
  { key: 'primaryPhoneNumber', label: 'رقم الهاتف الاحتياطي' },
  { key: 'email', label: 'البريد الالكتروني' },
  { key: 'address', label: 'العنوان' },
];
const ShippersTable = ({ data }: any) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPageChange: any) => {
    setItemsPerPage(itemsPerPageChange);
    setCurrentPage(1);
  };

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
                      index === tableHeading.length - 1 && 'lg:ms-12'
                    }`}
                  >
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-Rubik font-medium'>
            {paginatedData.map((item: any, index: any) => (
              <>
                <tr
                  key={item.id}
                  onClick={() => {
                    navigate(`/shippers/${item.id}`);
                  }}
                  className={`rounded-lg ${index % 2 === 0 && 'bg-[#F2F2F2]'}`}
                >
                  <td className={tableRowStyles}>{item.id}</td>
                  <td className={tableRowStyles}>{item.name}</td>
                  <td className={tableRowStyles}>{item.primaryPhoneNumber}</td>
                  <td className={tableRowStyles}>{item.secondaryPhoneNumber}</td>
                  <td className={tableRowStyles}>{item.email}</td>
                  <td className={tableRowStyles}>{item.address}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default ShippersTable;
