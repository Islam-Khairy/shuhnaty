/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import SelectMenu from '../../components/SelectMenu';
import PieChart from '../../components/charts/PieChart';
import driverIdCardImage from '/images/adminDriver/personalCard.svg';
// import userIcon from '/images/adminDriver/user-name.svg';
import locationIcon from '/images/adminDriver/location.svg';
import callIcon from '/images/adminDriver/call.svg';
import flagIcon from '/images/adminDriver/flag.svg';
import truckIcon from '/images/truck.svg';
import editShipmentIcon from '/images/edit-shipment-icon.svg';
import deleteShipmentIcon from '/images/delete-shipment-icon.svg';
import ImageModal from '../../components/adminsDrivers/drivers/ImageModal';
import licenseBackSideImage from '/images/adminDriver/driver/license/16.webp';
import AdminDriverProfileCard from '../../components/adminsDrivers/adminDriverProfileCard/AdminDriverProfileCard';
import { useParams } from 'react-router-dom';
import { drivers, shipments } from '../../lib/data';
import AdminDriverDetailsTable from '../../components/adminsDrivers/AdminDriverDetailsTable';
import { arabicDateStringToISO, getRangeDates } from '../../lib/utils';

const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'يوم', value: 'day' },
  { label: 'أسبوع', value: 'week' },
  { label: 'شهر', value: 'month' },
];

const DriverDetails = () => {
  const [selectedOption, setSelectedOption] = useState('all');

  const { driverId } = useParams();

  const selectedDriver = drivers.find((driver) => driver?.id === Number(driverId));
  const driverShipments = shipments.filter((shipment) => shipment?.driverId === Number(driverId));

  const menuActions = [
    { label: 'تعديل البيانات', icon: editShipmentIcon, path: `/drivers/edit/${driverId}` },
    { label: 'حذف البيانات', icon: deleteShipmentIcon, path: `/drivers/delete/${driverId}` },
  ];

  const licenseInfo = [
    {
      label: 'تاريخ الإصدار',
      value: selectedDriver?.licenseIssueDate,
    },
    {
      label: 'تاريخ الانتهاء',
      value: selectedDriver?.licenseExpirationDate,
    },
    {
      label: 'وجه أمامي',
      value: (
        <ImageModal
          image={selectedDriver?.licenseImage}
          fileName='license front side image'
          status={selectedDriver?.licenseStatus}
        />
      ),
    },
    {
      label: 'وجه خلفي',
      value: (
        <ImageModal
          image={licenseBackSideImage}
          fileName='license back side image'
          status={selectedDriver?.licenseStatus}
        />
      ),
    },
  ];

  const personalInfoData = {
    image: selectedDriver?.image,
    name: selectedDriver?.name,
    status: selectedDriver?.status,
  };

  const moreInfoData = [
    // {
    //   image: userIcon,
    //   label: 'رقم المعرف (ID)',
    //   value: selectedDriver?.id,
    // },
    {
      image: driverIdCardImage,
      label: 'رقم الهوية',
      value: selectedDriver?.identityNumber,
    },
    {
      image: locationIcon,
      label: 'الفرع',
      value: 'الصناعية الثالثة',
    },
    {
      image: callIcon,
      label: 'رقم التواصل',
      value: selectedDriver?.phoneNumber,
    },
    {
      image: flagIcon,
      label: 'الجنسية',
      value: selectedDriver?.nationality,
    },
    {
      image: truckIcon,
      label: 'نوع الشاحنة',
      value: selectedDriver?.vehicle,
    },
    {
      image: callIcon,
      label: 'رقم الشاحنة',
      value: selectedDriver?.vehicleNumber,
    },
  ];

  function getPieChartData(option: string, driverShipments: any) {
    const statusOrder = ['completed', 'returned', 'canceled', 'delayed', 'shipping', 'delivered'];
    const { start, end } = getRangeDates(option);
    const filteredShipments =
      option === 'all'
        ? driverShipments
        : driverShipments.filter((shipment: any) => {
            const isoDate = arabicDateStringToISO(shipment.pickupDate);
            if (!isoDate) return false;

            const shipmentDate = new Date(isoDate);
            return shipmentDate >= start && shipmentDate <= end;
          });

    const data = statusOrder.map(
      (status) => filteredShipments.filter((shipment: any) => shipment.status === status).length,
    );

    const sum = filteredShipments.length;

    return {
      data,
      sum,
    };
  }

  const pieChartData = useMemo(
    () => getPieChartData(selectedOption, driverShipments),
    [selectedOption, driverShipments],
  );

  const filterShipmentsByDateRange = (shipments: any[], option: string) => {
    if (option === 'all') return shipments;

    const { start, end } = getRangeDates(option);

    return shipments.filter((shipment: any) => {
      const isoDate = arabicDateStringToISO(shipment.pickupDate);
      if (!isoDate) return false;

      const shipmentDate = new Date(isoDate);
      return shipmentDate >= start && shipmentDate <= end;
    });
  };

  const filteredShipments = useMemo(
    () => filterShipmentsByDateRange(driverShipments, selectedOption),
    [driverShipments, selectedOption],
  );

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      <div className='col-span-1 lg:col-span-2 h-fit shadow-lg rounded-3xl px-8 py-4 w-full overflow-x-auto'>
        <div className='w-full flex justify-between items-center mb-6'>
          <h1 className='xs:text-lg text-xl font-bold'>قائمة الشحنات</h1>
          <SelectMenu
            options={selectMenuOptions}
            selectedItem={selectedOption}
            setSelectedItem={setSelectedOption}
          />
        </div>
        <AdminDriverDetailsTable shipments={filteredShipments} />
      </div>
      <div className='col-span-1 min-h-screen bg-[#FCFCFC]'>
        <div className='w-full shadow-sm rounded-3xl lg:px-8 py-4 mb-6'>
          <AdminDriverProfileCard
            personalInfoData={personalInfoData}
            moreInfoData={moreInfoData}
            menuActions={menuActions}
          />
        </div>
        <hr className='border-0 border-t-2 border-[#999999] mx-8' />
        <div
          className={`mt-8 shadow-sm rounded-2xl px-8 py-4 border-[3px] ${
            selectedDriver?.licenseStatus === 'active'
              ? 'border-green-700'
              : 'border-[#CD2026] bg-[#FCE9EA]'
          }  font-Rubik w-[90%] md:w-[80%] m-auto`}
        >
          <h1 className='font-bold text-center text-xl'>بيانات الرخصة</h1>
          <div className='w-full mt-8'>
            {licenseInfo.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between mt-4'
              >
                <span className='font-medium xs:text-sm text-base text-nowrap'>{item.label}</span>
                <div className='md:grow flex items-center gap-2'>
                  <div className='md:grow border-t-2 border-[#999999] border-dashed mx-2'></div>
                  <span className='xs:text-sm text-base text-nowrap'>{item.value}</span>
                </div>
              </div>
            ))}
            <h1
              className={`'font-bold text-xl ${
                selectedDriver?.licenseStatus === 'active' ? 'text-[#1A1A1A]' : 'text-[#CD2026]'
              } text-center mt-8`}
            >
              {selectedDriver?.licenseStatus === 'active' ? 'رخصة سارية' : 'منتهية'}
            </h1>
          </div>
        </div>
        <div className='w-full shadow-sm rounded-3xl px-8 py-4 bg-[#FFF]'>
          <div className='flex items-center justify-center gap-2 mt-12 mb-12'>
            <h1 className='text-xl font-bold text-[##1A1A1A]'>بيان الشهر</h1>
          </div>
          <PieChart
            pieChartData={pieChartData.data}
            sum={pieChartData.sum}
          />{' '}
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
