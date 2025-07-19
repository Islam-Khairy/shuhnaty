/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import DeleteItemCard from './DeleteItemCard';
import { toast } from 'sonner';
import InfoRow from '../adminsDrivers/adminDriverProfileCard/infoRow/InfoRow';

const DeleteItem = React.memo(({ moreInfoData, personalData, isActive, item }: any) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      switch (item) {
        case 'admin':
          navigate('/admins');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          toast.success('تم حذف المسئول بنجاح');
          break;
        case 'driver':
          navigate('/drivers');
          toast.success('تم حذف السائق بنجاح');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
      }
    }, 2000);
  };

  return (
    <div className='flex flex-col gap-20 mx-4 md:mx-0 mb-10 md:mb-0'>
      <div className='w-full grid grid-cols-1 gap-16 md:gap-0 md:grid-cols-5 border border-[#DD7E1F] rounded-2xl'>
        {' '}
        <div className='col-span-1 w-full h-full flex flex-col justify-center mt-4 md:-mt-4 items-center'>
          <div
            className={`rounded-full border-2 border-${
              isActive ? '[#2E853F]' : 'gray-200'
            } w-24 h-24 lg:w-28 lg:h-28`}
          >
            <img
              src={personalData.image}
              alt='avatar pic'
              className='w-full h-full rounded-full object-cover'
            />
            <h1 className='mt-4 mb-2 text-[#1A1A1A] font-bold text-lg lg:text-2xl text-nowrap'>
              {personalData?.name ?? `${personalData.firstName} ${personalData?.lastName}`}
            </h1>
          </div>
        </div>
        <div className='col-span-1 md:col-span-4'>
          <div className='flex flex-col gap-2 px-4 md:px-8 py-2'>
            {moreInfoData.map((row: any, index: any) => (
              <div key={index}>
                <InfoRow
                  image={row.image}
                  label={row.label}
                  value={row.value}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center items-start h-[70vh]'>
      {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}
        >
          <span className='loader'></span>
        </div>
      )}
        <DeleteItemCard handleSubmit={handleSubmit} />
      </div>
    </div>
  );
});

export default DeleteItem;
