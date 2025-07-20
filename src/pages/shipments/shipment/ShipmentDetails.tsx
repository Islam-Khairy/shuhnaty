/* eslint-disable @typescript-eslint/no-explicit-any */
import ShipmentDetailsInfoSection from '../../../components/shipments/shipmentDetails/infoSection/ShipmentDetailsInfoSection';
import editShipmentIcon from '/images/edit-shipment-icon.svg';
import deleteShipmentIcon from '/images/delete-shipment-icon.svg';

import ActionsMenu from '../../../components/actionsMenu/ActionsMenu';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { UseSidebar } from '../../../context/SidebarContext';
import { admins, drivers, recipients, shipments, shippers } from '../../../lib/data';
import PrintWaybillDialog from '../../../components/shipments/shipment/PrintWaybillDialog';
import ShipmentHistory from '../../../components/shipments/shipmentHistory/ShipmentHistory';

const ShipmentDetails = () => {
  const { isSidebarOpen } = UseSidebar();
  const { shipmentId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const selectedShipment = shipments.find((shipment) => shipment.id === Number(shipmentId));
  const selectedDriver = drivers.find((driver) => driver.id === selectedShipment?.driverId);
  const selectedAdmin = admins.find((admin) => admin.id === selectedShipment?.adminId);
  const selectedShipper = shippers.find((shipper) => shipper.id === selectedShipment?.shipperId);
  const selectedShipperBranch = selectedShipper?.branches.find(
    (branch) => branch.id === selectedShipment?.shipperBranchId,
  );
  const selectedRecipient = recipients.find(
    (recipient) => recipient.id === selectedShipment?.recipientId,
  );

  const menuActions = [
    {
      label: 'تعديل الشحنة',
      icon: editShipmentIcon,
      path: `/shipments/edit/${shipmentId}`,
    },
    {
      label: 'حذف الشحنة',
      icon: deleteShipmentIcon,
      path: `/shipments/delete/${shipmentId}`,
    },
  ];

  const shipperData = [
    { label: 'الاسم', value: selectedShipper?.name || '-' },
    { label: 'العنوان', value: selectedShipper?.address || '-' },
    { label: 'الفرع', value: selectedShipperBranch?.name || '-' },
  ];

  const recipientData = [
    { label: 'الاسم', value: selectedRecipient?.name || '-' },
    { label: 'العنوان', value: selectedRecipient?.address || '-' },
    { label: 'بيانات التواصل', value: selectedRecipient?.primaryPhoneNumber || '-' },
  ];

  const driverData = [
    { label: 'الاسم', value: selectedDriver?.name || '-' },
    { label: 'نوع الشاحنة', value: selectedDriver?.vehicle || '-' },
    { label: 'رقم الشاحنة', value: selectedDriver?.vehicleNumber || '-' },
  ];

  const shipmentData = [
    { label: 'من', value: selectedShipment?.pickupCity || '-' },
    { label: 'إلى', value: selectedShipment?.dropOffCity || '-' },
    { label: 'المحتويات', value: selectedShipment?.content || '-' },
    { label: 'الوزن', value: selectedShipment?.weight + ' طن' || '-' },
  ];

  const shipmentCost = [
    {
      label: 'التكلفة الأساسية',
      value: `${selectedShipment?.baseCost} ر.س`,
    },
    {
      label: 'الزيادة ',
      value: `${selectedShipment?.extraCost} ر.س`,
    },
    {
      label: 'الخصم',
      value: `${selectedShipment?.deduct} ر.س`,
    },
  ];

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <div className='border border-[#DD7E1F] rounded-lg mx-4 bg-[#FCFCFC]'>
        <div className='grid xs:grid-cols-10 grid-cols-12 gap-8'>
          <div
            className={`xs:col-span-10 col-span-12 ${
              isSidebarOpen ? 'lg:col-span-8' : 'lg:col-span-9'
            } px-6 py-8 relative`}
          >
            <div className='absolute -left-8 top-0 bottom-0 w-px bg-[#B3B3B3] hidden lg:block'></div>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl sm:text-2xl font-bold'>السائق</h1>
              <ActionsMenu
                options={menuActions}
                position='top-16 left-4'
              />{' '}
            </div>
            <div className='flex flex-col items-start gap-3 font-Rubik text-[#333333] text-base'>
              <ShipmentDetailsInfoSection data={driverData} />
            </div>
            <hr className='border-0 border-t-2 border-dashed border-[#666666] my-12' />{' '}
            <div className='grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-2 font-Rubik text-[#333333]'>
              <ShipmentDetailsInfoSection
                title='بيانات المرسل'
                data={shipperData}
              />
              <ShipmentDetailsInfoSection
                title='بيانات المستلم'
                data={recipientData}
              />
            </div>
            <hr className='border-0 border-t-2 border-dashed border-[#666666] my-12' />{' '}
            <div className='font-Rubik'>
              <ShipmentDetailsInfoSection
                title='تفاصيل الشحنة'
                data={shipmentData}
              />
              <div className='bg-[#F8F8F8] w-full rounded-lg py-4 px-3 flex flex-col items-start gap-2 font-Rubik text-[#333333] border border-[#CCC] mt-6 mb-12 xs:text-base text-lg font-medium'>
                {[
                  'ملاحظات:',
                  'يرجى التأكد من الشراع الثقيل',
                  'يرجى تسليم الشحنة بالموعد المحدد',
                  'تأكد من إرجاع جهاز الحرارة',
                ].map((item, index) => (
                  <span key={index}>- {item}</span>
                ))}
              </div>
              <div className='w-full p-6 bg-[#FCF2E9] rounded-lg'>
                <h1 className='text-2xl text-center sm:text-start font-bold font-Almarai text-[#DD7E1F]'>
                  تكلفة الشحنة
                </h1>
                <hr className='border-0 border-t-2 border-dashed border-[#B3B3B3] my-6' />{' '}
                <div className='flex flex-col items-start gap-2 my-6 w-full font-Rubik text-[#333333] font-bold xs:text-sm text-lg'>
                  {shipmentCost.map((item, index) => (
                    <div
                      key={index}
                      className='w-full flex justify-between items-center'
                    >
                      <span className=''>{item.label}</span> <span className=''>{item.value}</span>
                    </div>
                  ))}
                </div>
                <hr className='border-0 border-t-2 border-dashed border-[#666666]' />{' '}
                {selectedShipment && (
                  <div className='w-full flex justify-between items-center mt-6 font-Rubik text-[#333333] font-bold xs:text-base text-lg'>
                    <span>الإجمالي</span>{' '}
                    <span className='xs:text-nowrap'>
                      {selectedShipment.baseCost +
                        selectedShipment.extraCost -
                        selectedShipment.deduct}{' '}
                      ر.س
                    </span>
                  </div>
                )}
              </div>
              <div className='my-10 w-full flex flex-col gap-2 sm:flex-row sm:gap-1 justify-center items-center font-Rubik text-[#666666] text-xl sm:text-2xl'>
                <span>المستخدم المسئول:</span>
                <span>
                  {selectedAdmin?.firstName} {selectedAdmin?.lastName}
                </span>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className='w-full text-center text-xl sm:text-2xl  rounded-lg py-3 text-[#FCFCFC] bg-[#DD7E1F]'
              >
                طباعة البوليصة
              </button>
            </div>
          </div>

          <div
            className={`xs:col-span-10 col-span-12 ${
              isSidebarOpen ? 'lg:col-span-4' : 'lg:col-span-3'
            }`}
          >
            <ShipmentHistory shipment={selectedShipment} />
          </div>
        </div>
      </div>
      <PrintWaybillDialog
        shipment={selectedShipment}
        driver={selectedDriver}
        shipper={selectedShipper}
        recipient={selectedRecipient}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
      />
    </>
  );
};

export default ShipmentDetails;
