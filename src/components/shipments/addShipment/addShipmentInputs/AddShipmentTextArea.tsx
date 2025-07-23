/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

const AddShipmentTextArea = 
  ({
    value,
    onChange,
    page,
    existingNotes,
    placeholder = 'يمكنك هنا إضافة ملاحظات يجب أن ينتبه لها السائق',
  }: any) => {
    const [isNotesAreaVisible, setIsNotesAreaVisible] = useState(false);
    const getButtonLabel = () => {
      if (page === 'addShipper') return 'أضف وصف للمنشأة';
      else if (page === 'editShipper') {
        if (existingNotes) {
          return 'تعديل وصف المنشأة';
        }
        return 'أضف وصف للمنشأة';
      } else if (page === 'editShipment' && existingNotes) return 'تعديل الملاحظات';
      else return 'إضافة ملاحظات';
    };

    console.log('AddShipmentTextArea rendered');
    return (
      <>
        {isNotesAreaVisible ? (
          <div className='w-full flex flex-col items-start mb-12'>
            <span>{page === 'addShipper' ? 'وصف المنشأة' : 'ملاحظات'}</span>
            <textarea
              name='shipmentNotes'
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className='w-full h-56 mt-4 mb-2 p-4 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F] resize-none font-Rubik'
            ></textarea>
            <div className='w-full flex items-center justify-end'>
              <button
                onClick={() => setIsNotesAreaVisible(false)}
                className='col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] p-2 rounded-lg'
              >
                إخفاء
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsNotesAreaVisible(true)}
            className='col-span-1 bg-[#DD7E1F] text-[#FCFCFC] border border-[#DD7E1F] p-2 rounded-lg mb-6'
          >
            {getButtonLabel()}
          </button>
        )}
      </>
    );
  };

export default AddShipmentTextArea;
