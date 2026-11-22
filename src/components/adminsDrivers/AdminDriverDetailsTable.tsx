import {
  arabicDateStringToISO,
  getShipmentStatusLabel,
  getShipmentStatusStyles,
  tableRowStyles,
} from '../../lib/utils';
import Pagination from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';
import { Shipment } from '../../types/shipments';

const tableHeading = ['رقم الشحنة', 'المصدر', 'الوجهة', 'تاريخ التحميل'];

const AdminDriverDetailsTable = ({ shipments }: { shipments: Shipment[] }) => {
  const navigate = useNavigate();

  const { currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange, paginate } = usePagination({ totalItems: shipments.length });
  const paginatedData = paginate(shipments) as Shipment[];

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
            {paginatedData.map((shipment: Shipment, index: number) => (
              <tr
                key={shipment.id}
                onClick={() => {
                  navigate(`/shipments/${shipment.id}`);
                }}
                className={`rounded-lg cursor-pointer ${index % 2 === 0 && 'bg-[#F2F2F2]'}`}
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
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default AdminDriverDetailsTable;
