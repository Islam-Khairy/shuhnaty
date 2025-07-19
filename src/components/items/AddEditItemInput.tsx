/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const AddEditItemInput = React.memo(({ label, description, required = true, ...props }: any) => {
  return (
    <div className='col-span-1 flex flex-col gap-1'>
      <span className='text-[#1A1A1A]'>{label}</span>
      <input
        className='p-3 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DD7E1F] font-Rubik'
        required={required}
        {...props}
      />
      {description && (
        <div className='text-[#999] font-Rubik mt-1 text-sm'>
          {Array.isArray(description) ? (
            <ul className='list-disc list-inside'>
              {description.map((desc, index) => (
                <li
                  key={index}
                  className='text-[#666666]'
                >
                  {desc}
                </li>
              ))}
            </ul>
          ) : (
            <span>{description}</span>
          )}
        </div>
      )}
    </div>
  );
});

export default AddEditItemInput;
