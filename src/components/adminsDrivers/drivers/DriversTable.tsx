import { useNavigate } from 'react-router-dom';
import { getAvailabilityStatusStyles, tableRowStyles } from '../../../lib/utils';
import Pagination from '../../pagination/Pagination';
import { useState } from 'react';
import { usePagination } from '../../../hooks/usePagination';
import { Driver } from '../../../types/drivers';
import { Checkbox } from '../../ui/checkbox';

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
interface DriversTableProps {
  selectedStatus: string;
  drivers: Driver[];
  isSelectRecipientsPage?: boolean;
  selectedDriverIds?: number[];
  onSelectedDriverIdsChange?: (ids: number[]) => void;
}

const DriversTable = ({
  selectedStatus,
  drivers,
  isSelectRecipientsPage = false,
  selectedDriverIds: controlledSelectedDriverIds,
  onSelectedDriverIdsChange,
}: DriversTableProps) => {
  const navigate = useNavigate();
  const [internalSelectedDriverIds, setInternalSelectedDriverIds] = useState<number[]>(() =>
    isSelectRecipientsPage ? drivers.map((d) => d.id) : [],
  );

  const isControlled = controlledSelectedDriverIds !== undefined;
  const selectedDriverIds = isControlled
    ? controlledSelectedDriverIds
    : internalSelectedDriverIds;

  const updateSelectedDriverIds = (next: number[]) => {
    if (isControlled) {
      onSelectedDriverIdsChange?.(next);
    } else {
      setInternalSelectedDriverIds(next);
    }
  };

  const filteredData = drivers.filter(
    (driver: Driver) =>
      selectedStatus === 'all' || driver.status.toLowerCase() === selectedStatus.toLowerCase(),
  );

  const sortedData = [...filteredData].sort((a: Driver, b: Driver) => a.id - b.id);

  const { currentPage, itemsPerPage, handlePageChange, handleItemsPerPageChange, paginate } =
    usePagination({ totalItems: sortedData.length });

  const paginatedData = paginate(sortedData) as Driver[];

  const isAllPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedDriverIds.includes(item.id));

  const handleSelectAll = (checked: boolean) => {
    const pageIds = paginatedData.map((d) => d.id);
    if (checked) {
      updateSelectedDriverIds(Array.from(new Set([...selectedDriverIds, ...pageIds])));
    } else {
      updateSelectedDriverIds(selectedDriverIds.filter((id) => !pageIds.includes(id)));
    }
  };

  const handleSelectRow = (id: number) => {
    if (selectedDriverIds.includes(id)) {
      updateSelectedDriverIds(selectedDriverIds.filter((i) => i !== id));
    } else {
      updateSelectedDriverIds([...selectedDriverIds, id]);
    }
  };

  return (
    <>
      <div className={`w-full overflow-x-auto`}>
        <table className={`bg-[#FCFCFC] w-full`}>
          <thead>
            <tr className='border-b-2 border-[#CCCCCC]'>
              {isSelectRecipientsPage && (
                <th className={tableRowStyles}>
                  <Checkbox
                    checked={isAllPageSelected}
                    onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                  />
                </th>
              )}
              {tableHeading.map((col, index) => (
                <th key={col.key} className={tableRowStyles}>
                  <div
                    className={`flex items-center gap-1 ${
                      index === tableHeading.length - 1 && 'ms-20'
                    }`}
                  >
                    {col.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-Rubik text-base font-medium'>
            {paginatedData.map((item: Driver, index: number) => {
              return (
                <tr
                  key={item?.id}
                  className={`rounded-lg cursor-pointer ${index % 2 === 0 && 'bg-[#F2F2F2]'}`}
                >
                  {isSelectRecipientsPage && (
                    <td className={tableRowStyles} onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedDriverIds.includes(item.id)}
                        onCheckedChange={() => handleSelectRow(item.id)}
                      />
                    </td>
                  )}
                  <button
                    type='button'
                    key={index}
                    onClick={() => {
                      navigate(`/drivers/${item.id}`);
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
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default DriversTable;
