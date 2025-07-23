/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  arabicDateStringToISO,
  getShipmentStatusLabel,
  getShipmentStatusStyles,
} from '../../lib/utils';
import Pagination from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const tableRowStyles = 'py-2 px-4 text-right text-nowrap';
const tableHeading = ['رقم الشحنة', 'المصدر', 'الوجهة', 'تاريخ التحميل'];

const AdminDriverDetailsTable = ({ shipments }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  const paginatedData = shipments.slice(
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

  console.log('AdminDriverDetailsTable rendered');

  return (
    <>
      <div className={`w-full overflow-x-auto`}>
        <table className={`bg-[#FCFCFC] w-full`}>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {tableHeading.map((item, index) => (
                <th
                  key={index}
                  className={tableRowStyles}
                >
                  {item}
                </th>
              ))}
              <th className='py-2 px-4 text-center text-nowrap'>حالة الشحنة</th>
            </tr>
          </thead>
          <tbody className='font-Rubik text-base font-medium'>
            {paginatedData.map((shipment: any, index: any) => (
              <tr
                key={shipment.id}
                onClick={() => {
                  navigate(`/shipments/${shipment.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`rounded-lg ${index % 2 === 0 && 'bg-[#F2F2F2]'}`}
              >
                <td className={tableRowStyles}>{shipment.trackingNumber}</td>
                <td className={tableRowStyles}>{shipment.pickupCity}</td>
                <td className={tableRowStyles}>{shipment.dropOffCity}</td>
                <td className={tableRowStyles}>{arabicDateStringToISO(shipment.pickupDate)}</td>
                <td className='py-2 px-4 text-center'>
                  <span
                    className={`p-2.5 inline-block rounded-md w-44 text-sm ${getShipmentStatusStyles(
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
        totalItems={shipments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default AdminDriverDetailsTable;
