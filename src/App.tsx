import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './Layout';
import { SidebarProvider } from './context/SidebarContext';
import { Toaster } from 'sonner';
import { PageLoader } from './components/shared/PageLoader';

const Login = lazy(() => import('./pages/Login'));
const DashboardPage = lazy(() => import('./pages/Dashboard'));

const AllShipments = lazy(() => import('./pages/shipments/AllShipments'));
const DeliveredShipments = lazy(() => import('./pages/shipments/DeliveredShipments'));
const DelayedShipments = lazy(() => import('./pages/shipments/DelayedShipments'));
const ReturnedShipments = lazy(() => import('./pages/shipments/ReturnedShipments'));
const ShipmentDetails = lazy(() => import('./pages/shipments/shipment/ShipmentDetails'));
const ShipmentForm = lazy(() => import('./pages/shipments/shipment/ShipmentForm'));
const DeleteShipment = lazy(() => import('./pages/shipments/shipment/DeleteShipment'));
const ShippingShipments = lazy(() => import('./pages/shipments/ShippingShipments'));
const CanceledShipments = lazy(() => import('./pages/shipments/CanceledShipments'));
const CompletedShipments = lazy(() => import('./pages/shipments/CompletedShipments'));

const Shippers = lazy(() => import('./pages/shippers/Shippers'));
const ShipperDetails = lazy(() => import('./pages/shippers/ShipperDetails'));
const ShipperForm = lazy(() => import('./pages/shippers/ShipperForm'));
const DeleteShipper = lazy(() => import('./pages/shippers/DeleteShipper'));

const Admins = lazy(() => import('./pages/admins/Admins'));
const AdminDetails = lazy(() => import('./pages/admins/AdminDetails'));
const AdminForm = lazy(() => import('./pages/admins/AdminForm'));
const DeleteAdmin = lazy(() => import('./pages/admins/DeleteAdmin'));

const Drivers = lazy(() => import('./pages/drivers/Drivers'));
const DriverDetails = lazy(() => import('./pages/drivers/DriverDetails'));
const DriverForm = lazy(() => import('./pages/drivers/DriverForm'));
const DeleteDriver = lazy(() => import('./pages/drivers/DeleteDriver'));

const AlertMessages = lazy(() => import('./pages/alertMessages/AlertMessages'));
const SelectRecipients = lazy(() => import('./pages/alertMessages/SelectRecipients'));

function App() {
  return (
    <div dir='rtl'>
      <SidebarProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
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
                  <Route path='edit/:shipmentId' element={<ShipmentForm mode='edit' />} />
                  <Route path='delete/:shipmentId' element={<DeleteShipment />} />
                  <Route path=':shipmentId' element={<ShipmentDetails />} />
                  <Route path='shipping' element={<ShippingShipments />} />
                  <Route path='delayed' element={<DelayedShipments />} />
                  <Route path='canceled' element={<CanceledShipments />} />
                  <Route path='delivered' element={<DeliveredShipments />} />
                  <Route path='completed' element={<CompletedShipments />} />
                  <Route path='returned' element={<ReturnedShipments />} />
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
          </Suspense>
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
