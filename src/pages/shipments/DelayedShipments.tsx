/* eslint-disable @typescript-eslint/no-explicit-any */

import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { shipments } from '../../lib/data';
import { getShipmentStatusLabel } from '../../lib/utils';

const DelayedShipments = () => {
  const delayedShipments = shipments.filter((shipment) => getShipmentStatusLabel(shipment.status) === 'متأخرة');
  return <ShipmentPage shipments={delayedShipments} />;
};

export default DelayedShipments;
