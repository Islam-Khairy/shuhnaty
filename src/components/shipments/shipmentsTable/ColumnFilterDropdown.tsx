import { useState } from 'react';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { Checkbox } from '../../ui/checkbox';

interface ColumnFilterDropdownProps {
  options: (string | number)[];
  selectedValues: (string | number)[];
  onChange: (values: string[]) => void;
  onClose: () => void;
  isPickupDate?: boolean;
  dateSort?: 'asc' | 'desc';
  setDateSort?: (sort: 'asc' | 'desc' | undefined) => void;
  placeholder?: string;
}

export function ColumnFilterDropdown({
  options = [],
  selectedValues = [],
  onChange,
  onClose,
  isPickupDate,
  dateSort,
  setDateSort,
  placeholder = 'ابحث...',
}: ColumnFilterDropdownProps) {
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(
    (opt) => opt !== null && opt !== undefined && opt.toString().toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      dir='rtl'
      className='absolute left-0 z-50 bg-white border border-gray-200 p-3 rounded-xl shadow-xl w-64 mt-2 font-Rubik text-right'
    >
      {!isPickupDate && (
        <input
          className='w-full mb-3 border rounded-md px-3 py-1.5 text-sm placeholder:text-gray-400 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/60 font-Rubik'
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {isPickupDate && setDateSort && (
        <div className='w-full flex items-center justify-between mb-3 px-1'>
          <div className='flex flex-col items-start gap-1.5 font-Rubik font-medium text-sm'>
            <button
              type='button'
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                dateSort === 'asc' ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => setDateSort('asc')}
            >
              <HiSortAscending size={18} />
              <span>الأحدث</span>
            </button>
            <button
              type='button'
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                dateSort === 'desc' ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'
              }`}
              onClick={() => setDateSort('desc')}
            >
              <HiSortDescending size={18} />
              <span>الأقدم</span>
            </button>
          </div>
        </div>
      )}

      <div className='max-h-36 overflow-y-auto space-y-0.5 pe-1'>
        {filteredOptions.length === 0 ? (
          <div className='py-4 text-center text-xs text-gray-400'>لا توجد خيارات</div>
        ) : (
          filteredOptions.map((opt) => {
            const isChecked = selectedValues.map(String).includes(String(opt));
            return (
              <label
                key={String(opt)}
                className='flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-black/5 cursor-pointer transition-colors select-none text-sm font-medium text-[#333333]'
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    const strOpt = String(opt);
                    const current = selectedValues.map(String);
                    onChange(
                      checked
                        ? [...current, strOpt]
                        : current.filter((v) => v !== strOpt),
                    );
                  }}
                />
                <span className='truncate'>{opt}</span>
              </label>
            );
          })
        )}
      </div>

      <div className='grid grid-cols-2 gap-2.5 w-full font-Rubik font-medium mt-3 pt-2 border-t border-gray-100'>
        <button
          type='button'
          className='bg-primary text-white border border-primary py-1.5 text-sm rounded-lg hover:bg-[#c96f18] transition-colors cursor-pointer text-center'
          onClick={onClose}
        >
          تأكيد
        </button>
        <button
          type='button'
          className='bg-white text-primary border border-primary py-1.5 text-sm rounded-lg hover:bg-primary/5 transition-colors cursor-pointer text-center'
          onClick={() => {
            if (dateSort && setDateSort) {
              setDateSort(undefined);
            }
            onChange([]);
          }}
        >
          إعادة تعيين
        </button>
      </div>
    </div>
  );
}
