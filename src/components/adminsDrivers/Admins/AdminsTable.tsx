import { useNavigate } from 'react-router-dom';
import { getAvailabilityStatusStyles, tableRowStyles } from '../../../lib/utils';
import Pagination from '../../pagination/Pagination';
import { usePagination } from '../../../hooks/usePagination';
import { Admin } from '../../../types/admins';

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
const AdminsTable = ({
  selectedStatus,
  data,
}: {
  selectedStatus: string;
  data: Admin[];
}) => {
  const navigate = useNavigate();

  const filteredData = data.filter(
    (admin: Admin) =>
      selectedStatus === 'all' || admin.status.toLowerCase() === selectedStatus.toLowerCase(),
  );

  const sortedData = [...filteredData].sort((a: Admin, b: Admin) => a.id - b.id);

  const {
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    paginate,
  } = usePagination({ totalItems: filteredData.length });

  const paginatedData = paginate(filteredData) as Admin[];

  return (
    <>
      <div className={`w-full overflow-x-auto`}>
        <table className={`bg-[#FCFCFC] w-full`}>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {tableHeading.map((col, index) => (
                <th key={col.key} className={tableRowStyles}>
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
            {paginatedData.map((item: Admin, index: number) => {
              return (
                <tr
                  key={item.id}
                  onClick={() => {
                    navigate(`/admins/${item.id}`);
                  }}
                  className={`rounded-lg cursor-pointer ${index % 2 === 0 ? 'bg-[#F2F2F2]' : ''}`}
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
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default AdminsTable;
