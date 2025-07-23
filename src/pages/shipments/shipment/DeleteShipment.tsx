import ShipmentStatusOverview from '../../../components/shipments/shipment/deleteShipment/ShipmentStatusOverview';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteItemCard from '../../../components/items/DeleteItemCard';
import { toast } from 'sonner';
import { shipments } from '../../../lib/data';

const DeleteShipment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { shipmentId } = useParams();

  const selectedShipment = shipments.find((shipment) => shipment.id === Number(shipmentId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shipments');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('تم حذف الشحنة بنجاح');
    }, 2000);
  };

  console.log('DeleteShipment rendered');

  return (
    <div className='flex flex-col gap-20'>
      <ShipmentStatusOverview selectedShipment={selectedShipment} />
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

export default DeleteShipment;
