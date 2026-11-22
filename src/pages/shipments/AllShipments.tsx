import ShipmentsPage from '../../components/shipments/shipmentPage/ShipmentsPage';
import { shipments } from '../../lib/data/mainData';

const AllShipments = () => {
  return (
    <ShipmentsPage
      shipments={shipments}
      isAllShipmentsPage
    />
  );
};

export default AllShipments;
