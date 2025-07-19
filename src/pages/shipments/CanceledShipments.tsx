import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { shipments } from '../../lib/data';
import { getShipmentStatusLabel } from '../../lib/utils';

const CanceledShipments = () => {
  const canceledShipments = shipments.filter((shipment) => getShipmentStatusLabel(shipment.status) === 'ملغية')
  return (
    <ShipmentPage
      shipments={canceledShipments}
    />
  );
};

export default CanceledShipments;
