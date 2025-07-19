/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ActionsMenu from '../../actionsMenu/ActionsMenu';
import InfoRow from './infoRow/InfoRow';

const AdminDriverProfileCard = React.memo(
  ({ moreInfoData, personalInfoData, menuActions }: any) => {
    return (
      <>
        <div className='w-full flex justify-end'>
          <div className='relative w-full flex justify-end me-5 lg:me-0'>
            <ActionsMenu
              options={menuActions}
              position='top-7 -left-4'
            />{' '}
          </div>
        </div>
        <div className='w-full flex flex-col justify-center items-center mt-8'>
          <div
            className={`rounded-full border-2 ${
              personalInfoData.status === 'available' ? 'border-[#2E853F]' : 'border-gray-200'
            }`}
          >
            <img
              src={personalInfoData?.image}
              alt='avatar pic'
              loading='eager'
              fetchPriority='high'
              className='w-20 h-20 rounded-full object-cover'
            />
          </div>
          <h1 className='mt-4 mb-2 text-[#1A1A1A] font-bold text-xl'>
            {personalInfoData.name ?? `${personalInfoData.firstName} ${personalInfoData?.lastName}`}
          </h1>
          <h6
            className={`text-xs ${
              personalInfoData.status === 'available' ? 'text-[#2E853F]' : 'text-[#666666]'
            } font-bold`}
          >
            {personalInfoData.status === 'available' ? 'نشط' : 'غير نشط'}
          </h6>
        </div>
        <div className='mt-6 flex flex-col gap-4'>
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
      </>
    );
  },
);
export default AdminDriverProfileCard;
