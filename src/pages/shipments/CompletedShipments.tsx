import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { shipments } from '../../lib/data';
import { getShipmentStatusLabel } from '../../lib/utils';

const CompletedShipments = () => {
  const completedShipments = shipments.filter((shipment) => getShipmentStatusLabel(shipment.status) === 'مكتملة')
  return (
    <ShipmentPage
      shipments={completedShipments}
    />
  );
};

export default CompletedShipments;
