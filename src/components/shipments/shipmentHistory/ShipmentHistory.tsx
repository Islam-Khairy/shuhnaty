/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getShipmentStatusLabel, statusIcons } from '../../../lib/utils';

const getShipmentStatusDisplayText = (status: string) => {
  switch (status) {
    case 'shipping':
    case 'delayed':
      return 'الشحنة في طريقها للعميل';
    case 'delivered':
    case 'completed':
      return 'تم تسليم الشحنة للعميل';
    case 'canceled':
      return 'تم إلغاء الشحنة';
    case 'returned':
      return 'الشحنة مرتجعة للمرسل';
  }
};

const getShipmentStatusDisplayTextStyles = (status: string) => {
  switch (status) {
    case 'shipping':
    case 'delayed':
      return 'bg-[#DD7E1F] text-[#FCFCFC]';
    case 'delivered':
    case 'completed':
      return 'bg-[#D9F2DE] text-[#2E853F]';
    case 'canceled':
    case 'returned':
      return 'bg-[#F8D3D4] text-[#CD2026]';
  }
};

const getVerticalLineBgColor = (status: string) => {
  switch (status) {
    case 'delayed':
      return '#B3B3B3';
    case 'delivered':
      return '#38A169';
    case 'completed':
      return '#2E853F';
    case 'canceled':
    case 'returned':
      return '#CD2026';
  }
};

const ShipmentHistory = ({ shipment }: any) => {
  const history = shipment.history || [];
  return (
    <div className='py-8 px-6'>
      <h1 className='text-center text-[#DD7E1F] text-xl font-bold'>تقرير الشحنة</h1>
      <hr className='border-0 border-t-2 border-dashed border-[#B3B3B3] my-6' />
      <div className='flex flex-col gap-20 items-start w-full'>
        <div
          key={shipment.id}
          className='relative w-full'
        >
          {history.length > 0 && (
            <div
              className='absolute right-2 top-12 h-[calc(100%+3rem)] w-[3px] rounded-lg'
              style={{ backgroundColor: getVerticalLineBgColor(history[0].label) }}
            ></div>
          )}
          <div className='flex font-Rubik w-full gap-4 -ms-2.5'>
            <img
              src={statusIcons['قيد الشحن']}
              alt={'shipping'}
            />
            <div className='flex flex-col justify-between gap-4 w-full'>
              <h2 className='text-lg'>قيد الشحن</h2>
              <div className='flex justify-between items-center w-full'>
                <h4 className='text-[#666666] text-xs'>بواسطة: {shipment.admin}</h4>
                <span className='text-[#666666] text-xs'>{shipment.pickupDate}</span>
              </div>
            </div>
          </div>
        </div>
        {history.length > 0 &&
          history.map((phase: any, index: number) => (
            <div
              key={phase.id}
              className='relative w-full'
            >
              {index !== history.length - 1 && (
                <div
                  className='absolute right-2 top-12 h-[calc(100%+3rem)] w-[3px] rounded-lg'
                  style={{
                    backgroundColor: getVerticalLineBgColor(history[index + 1].label),
                  }}
                ></div>
              )}
              <div className={`flex font-Rubik w-full gap-4`}>
                <img
                  src={statusIcons[getShipmentStatusLabel(phase.label)]}
                  alt={phase.label}
                />
                <div className='flex flex-col justify-between gap-4 w-full'>
                  <h2 className='text-lg'>{getShipmentStatusLabel(phase.label)}</h2>
                  <div className='flex justify-between items-center w-full'>
                    <h4 className='text-[#666666] text-xs'>بواسطة: {phase.admin}</h4>
                    <span className='text-[#666666] text-xs'>{phase.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <h1
        className={`font-medium text-xl font-Rubik text-center mt-10 py-2 px-6 rounded-lg ${getShipmentStatusDisplayTextStyles(
          history.length > 0 ? history[history.length - 1].label : 'shipping',
        )}`}
      >
        {getShipmentStatusDisplayText(
          history.length > 0 ? history[history.length - 1].label : 'shipping',
        )}
      </h1>
    </div>
  );
};

export default ShipmentHistory;
