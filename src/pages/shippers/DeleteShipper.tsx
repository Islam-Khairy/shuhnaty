import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteItemCard from '../../components/items/DeleteItemCard';
import { toast } from 'sonner';
import { shippers } from '../../lib/data';

const DeleteShipper = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { shipperId } = useParams();
  const selectedShipper = shippers.find((shipper) => shipper.id === Number(shipperId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shippers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('تم حذف العميل بنجاح');
    }, 2000);
  };

  return (
    <div className='flex flex-col gap-20'>
      <div className='border border-[#DD7E1F] rounded-lg px-6 pt-10 pb-4 mx-4 md:mx-0'>
        <div className='w-full flex justify-between items-center relative'>
          <div className='flex flex-col gap-2'>
            {[
              { label: 'الاسم', value: selectedShipper?.name },
              { label: 'رقم السجل التجاري', value: selectedShipper?.commercialRegistration },
            ].map((item, index) => (
              <div
                className='flex gap-2 font-medium text-base font-Rubik'
                key={index}
              >
                <span>{item.label}: </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        <h1 className='mt-10 mb-4 bg-[#FCF2E9] font-md font-Rubik text-lg text-[#1A1A1A] p-3 rounded-md'>
          {selectedShipper?.description}
        </h1>
      </div>
      <div className='flex justify-center items-start h-[70vh] mx-4'>
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
};

export default DeleteShipper;
