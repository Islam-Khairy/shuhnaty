import ShipmentPage from '../../components/shipments/shipmentPage/ShipmentPage';
import { shipments } from '../../lib/data';

const AllShipments = () => {
  console.log('AllShipments rendered');
  return (
    <>
    {/* <ShipmentsFilterDialog /> */}
      <ShipmentPage
        shipments={shipments}
        isAllShipmentsPage={true}
      />
    </>
  );
};

export default AllShipments;
