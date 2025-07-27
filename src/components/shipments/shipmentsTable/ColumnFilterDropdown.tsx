/* eslint-disable @typescript-eslint/no-explicit-any */
// ColumnFilterDropdown.jsx
import React from 'react';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';

export function ColumnFilterDropdown({
  options,
  selectedValues,
  onChange,
  onClose,
  isPickupDate,
  dateSort,
  setDateSort,
  placeholder = 'ابحث...',
}: any) {
  const [search, setSearch] = React.useState('');
  return (
    <div className='absolute left-0 z-50 bg-white border p-4 rounded-lg shadow-lg w-60 mt-3'>
      {!isPickupDate && (
        <input
          className='w-full mb-2 border rounded-md px-2 py-1 placeholder:text-current placeholder:opacity-30 border-[#CCCCCC] focus:outline-none focus:ring-1 focus:ring-[#DD7E1F] font-Rubik font-medium'
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      {isPickupDate && (
        <div className='w-full flex items-center justify-between my-2'>
          <div className='flex flex-col items-start font-Rubik font-medium'>
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => setDateSort('asc')}
            >
              <span
                style={{
                  fontSize: 10,
                  lineHeight: 1,
                  color: dateSort === 'asc' ? '#DD7E1F' : '#aaa',
                }}
              >
                <HiSortAscending
                  size={16}
                  className={`${dateSort === 'asc' ? '#DD7E1F' : 'text-gray-500'}`}
                />
              </span>
              <span>الأحدث</span>
            </div>
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => setDateSort('desc')}
            >
              <span
                style={{
                  fontSize: 10,
                  lineHeight: 1,
                  color: dateSort === 'desc' ? '#DD7E1F' : '#aaa',
                }}
              >
                <HiSortDescending
                  size={16}
                  className={`${dateSort === 'desc' ? '#DD7E1F' : 'text-gray-500'}`}
                />
              </span>
              <span>الأقدم</span>
            </div>
          </div>
        </div>
      )}
      <div style={{ maxHeight: 140, overflowY: 'auto' }}>
        {options
          .filter((opt: any) => opt && opt.toString().toLowerCase().includes(search.toLowerCase()))
          .map((opt: any) => (
            <div
              key={opt}
              className='mb-2 flex items-center gap-2'
            >
              <input
                type='checkbox'
                checked={selectedValues.includes(opt)}
                onChange={(e) => {
                  onChange(
                    e.target.checked
                      ? [...selectedValues, opt]
                      : selectedValues.filter((v: any) => v !== opt),
                  );
                }}
              />
              <span className='font-medium font-Rubik'>{opt}</span>
            </div>
          ))}
      </div>
      <div className='grid grid-cols-2 gap-4 w-full font-Rubik font-medium mt-2'>
        <button
          className='col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] py-1 rounded-lg'
          onClick={onClose}
        >
          تأكيد
        </button>
        <button
          className='col-span-1 bg-[#FCFCFC] text-[#DD7E1F] border border-[#DD7E1F] py-1 rounded-lg'
          onClick={() => (dateSort ? setDateSort(undefined) : onChange([]))}
        >
          إعادة تعيين
        </button>
      </div>
    </div>
  );
}
