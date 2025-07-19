/* eslint-disable @typescript-eslint/no-explicit-any */
const DetailRow = ({ label, value }: { label?: string; value: string; isLink?: boolean }) => {
  return (
    <div className='flex items-center gap-2'>
      <span>{label}</span>
      <span className='xs:text-xs'>{value}</span>
    </div>
  );
};

const ShipperBranchDetailsSection = ({
  title,
  name,
  address,
  primaryPhone,
  secondaryPhone,
}: any) => {
  return (
    <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
      <h1 className='text-[#1A1A1A] font-bold text-2xl mb-6'>{title}</h1>
      <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 font-Rubik'>
        <div className='flex flex-col gap-4'>
          <DetailRow value={name} />
          <DetailRow
            label='العنوان: '
            value={address}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <DetailRow
            label='رقم الهاتف (أساسي): '
            value={primaryPhone}
          />
          <DetailRow
            label='رقم الهاتف (احتياطي): '
            value={secondaryPhone}
          />
        </div>
      </div>
    </div>
  );
};

export default ShipperBranchDetailsSection;
