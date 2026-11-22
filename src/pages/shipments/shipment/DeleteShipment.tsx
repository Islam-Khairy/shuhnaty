import ShipmentStatusOverview from '../../../components/shipments/shipment/deleteShipment/ShipmentStatusOverview';
import { useParams } from 'react-router-dom';
import DeleteItemCard from '../../../components/shared/DeleteItemCard';
import { shipments } from '../../../lib/data/mainData';
import { useFormSubmission } from '../../../hooks/useFormSubmission';
import { PageLoader } from '../../../components/shared/PageLoader';

const DeleteShipment = () => {
  const { shipmentId } = useParams();

  const selectedShipment = shipments.find((shipment) => shipment.id === Number(shipmentId));
  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: 'تم حذف الشحنة بنجاح',
    redirectPath: '/shipments',
  });

  return (
    <div className='flex flex-col gap-20'>
      <PageLoader isLoading={isLoading} />
      <ShipmentStatusOverview selectedShipment={selectedShipment!} />
      <div className='flex justify-center items-start h-[70vh] mx-4'>
        <DeleteItemCard handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default DeleteShipment;
