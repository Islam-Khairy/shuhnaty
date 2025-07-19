/* eslint-disable @typescript-eslint/no-explicit-any */

import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { shipments } from '../../lib/data';
import { getShipmentStatusLabel } from '../../lib/utils';

const ReturnedShipments = () => {

    const returnedShipments = shipments.filter((shipment) => getShipmentStatusLabel(shipment.status) === 'مرتجعة') 

  return <ShipmentPage shipments={returnedShipments} />;
};

export default ReturnedShipments;
