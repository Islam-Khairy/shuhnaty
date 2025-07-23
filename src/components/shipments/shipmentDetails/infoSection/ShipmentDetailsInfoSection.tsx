/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

interface ShipmentDetailsInfoSectionProps {
  title?: string;
  data: { label: string; value: string }[];
}

const ShipmentDetailsInfoSection =
  ({ title, data }: ShipmentDetailsInfoSectionProps) => {
    console.log('ShipmentDetailsInfoSection rendered');
    return (
      <div className='col-span-1'>
        {title && <h1 className='text-xl sm:text-2xl font-bold font-Almarai'>{title}</h1>}
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${index === 0 ? 'mt-6' : 'mt-4'}`}
          >
            <span>{item.label}:</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    );
  };
export default ShipmentDetailsInfoSection;
