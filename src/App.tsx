import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import Login from './pages/Login';
import Layout from './Layout';
import { SidebarProvider } from './context/SidebarContext';
import { Toaster } from 'sonner';
import AllShipments from './pages/shipments/AllShipments';
import DeliveredShipments from './pages/shipments/DeliveredShipments';
import DelayedShipments from './pages/shipments/DelayedShipments';
import ReturnedShipments from './pages/shipments/ReturnedShipments';
import ShipmentDetails from './pages/shipments/shipment/ShipmentDetails';
import ShipmentForm from './pages/shipments/shipment/ShipmentForm';
import DeleteShipment from './pages/shipments/shipment/DeleteShipment';
import AlertMessages from './pages/alertMessages/AlertMessages';
import SelectRecipients from './pages/alertMessages/SelectRecipients';
import ShippingShipments from './pages/shipments/ShippingShipments';
import CanceledShipments from './pages/shipments/CanceledShipments';
import CompletedShipments from './pages/shipments/CompletedShipments';
import DeleteShipper from './pages/shippers/DeleteShipper';
import ShipperForm from './pages/shippers/ShipperForm';
import ShipperDetails from './pages/shippers/ShipperDetails';
import Shippers from './pages/shippers/Shippers';
import AdminDetails from './pages/admins/AdminDetails';
import Admins from './pages/admins/Admins';
import DeleteAdmin from './pages/admins/DeleteAdmin';
import AdminForm from './pages/admins/AdminForm';
import Drivers from './pages/drivers/Drivers';
import DriverDetails from './pages/drivers/DriverDetails';
import DriverForm from './pages/drivers/DriverForm';
import DeleteDriver from './pages/drivers/DeleteDriver';

function App() {
  return (
    <div dir='rtl'>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route path='dashboard' element={<DashboardPage />} />

              <Route path='shipments'>
                <Route index element={<AllShipments />} />
                <Route path='all' element={<AllShipments />} />
                <Route path='add' element={<ShipmentForm mode='add' />} />
                <Route path='shipping' element={<ShippingShipments />} />
                <Route path='delayed' element={<DelayedShipments />} />
                <Route path='canceled' element={<CanceledShipments />} />
                <Route path='delivered' element={<DeliveredShipments />} />
                <Route path='completed' element={<CompletedShipments />} />
                <Route path='returned' element={<ReturnedShipments />} />
                <Route path='edit/:shipmentId' element={<ShipmentForm mode='edit' />} />
                <Route path='delete/:shipmentId' element={<DeleteShipment />} />
                <Route path=':shipmentId' element={<ShipmentDetails />} />
              </Route>
              <Route path='admins'>
                <Route index element={<Admins />} />
                <Route path='add' element={<AdminForm mode='add' />} />
                <Route path='edit/:adminId' element={<AdminForm mode='edit' />} />
                <Route path='delete/:adminId' element={<DeleteAdmin />} />
                <Route path=':adminId' element={<AdminDetails />} />
              </Route>
              <Route path='drivers'>
                <Route index element={<Drivers />} />
                <Route path='add' element={<DriverForm mode='add' />} />
                <Route path='edit/:driverId' element={<DriverForm mode='edit' />} />
                <Route path='delete/:driverId' element={<DeleteDriver />} />
                <Route path=':driverId' element={<DriverDetails />} />
              </Route>
              <Route path='shippers'>
                <Route index element={<Shippers />} />
                <Route path='add' element={<ShipperForm mode='add' />} />
                <Route path='edit/:shipperId' element={<ShipperForm mode='edit' />} />
                <Route path='delete/:shipperId' element={<DeleteShipper />} />
                <Route path=':shipperId' element={<ShipperDetails />} />
              </Route>
              <Route path='alert-messages'>
                <Route index element={<AlertMessages />} />
                <Route path='select-recipients' element={<SelectRecipients />} />
              </Route>
            </Route>
          </Routes>
          <Toaster
            position='top-center'
            toastOptions={{
              style: {
                textAlign: 'center',
                justifyContent: 'center',
              },
            }}
          />
        </BrowserRouter>
      </SidebarProvider>
    </div>
  );
}

export default App;
