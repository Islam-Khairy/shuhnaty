/* eslint-disable @typescript-eslint/no-explicit-any */

import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { shipments } from '../../lib/data';
import { getShipmentStatusLabel } from '../../lib/utils';
const DeliveredShipments = () => {
  const deliveredShipments = shipments.filter((shipment) => getShipmentStatusLabel(shipment.status) === 'تم التوصيل')
  return <ShipmentPage shipments={deliveredShipments} />;
};

export default DeliveredShipments;
