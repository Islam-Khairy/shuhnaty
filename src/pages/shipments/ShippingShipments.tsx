/* eslint-disable @typescript-eslint/no-explicit-any */

import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { shipments } from '../../lib/data';
import { getShipmentStatusLabel } from '../../lib/utils';



const ShippingShipments = () => {
  const shippingShipments = shipments.filter((shipment) => getShipmentStatusLabel(shipment.status) === 'قيد الشحن')
  return <ShipmentPage shipments={shippingShipments} />;
};

export default ShippingShipments;
