/* eslint-disable @typescript-eslint/no-explicit-any */
interface WaybillInfoRowProps {
  label: string;
  value: string;
}

const WaybillInfoRow = ({ label, value }: WaybillInfoRowProps) => {
  return (
    <div className='flex items-center justify-between md:justify-start px-0 py-1 font-Rubik max-w-screen'>
      <div className='flex items-center gap-2 '>
        <span className='font-medium text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis'>
          {label}
        </span>
      </div>
      <div className='md:grow flex items-center gap-2'>
        <div className='md:grow border-t-2 border-[#999999] border-dashed mx-2'></div>
        <span className='text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis'>
          {value}
        </span>
      </div>
    </div>
  );
};

export default WaybillInfoRow;
