/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import SelectMenu from '../../components/SelectMenu';
import PieChart from '../../components/charts/PieChart';

import adminIdCardImage from '../../assets/images/adminDriver/personalCard.svg';
import userNameIcon from '../../assets/images/adminDriver/user-name.svg';
import mailIcon from '../../assets/images/adminDriver/sms.svg';
import callIcon from '../../assets/images/adminDriver/call.svg';
import flagIcon from '../../assets/images/adminDriver/flag.svg';
import editShipmentIcon from '../../assets/images/edit-shipment-icon.svg';
import deleteShipmentIcon from '../../assets/images/delete-shipment-icon.svg';
import AdminDriverProfileCard from '../../components/adminsDrivers/adminDriverProfileCard/AdminDriverProfileCard';
import { useParams } from 'react-router-dom';
import { admins, shipments } from '../../lib/data';
import AdminDriverDetailsTable from '../../components/adminsDrivers/AdminDriverDetailsTable';
import { arabicDateStringToISO, getRangeDates } from '../../lib/utils';

const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'أسبوعي', value: 'week' },
  { label: 'شهري', value: 'month' },
  { label: 'سنوي', value: 'year' },
];

const AdminDetails = () => {
  const [selectedOption, setSelectedOption] = useState('all');

  const { adminId } = useParams();

  const selectedAdmin = admins.find((admin) => admin.id === Number(adminId));

  const adminShipments = shipments.filter((shipment) => shipment.adminId === selectedAdmin?.id);

  const menuActions = [
    { label: 'تعديل البيانات', icon: editShipmentIcon, path: `/admins/edit/${adminId}` },
    {
      label: 'حذف البيانات',
      icon: deleteShipmentIcon,
      path: `/admins/delete/${adminId}`,
    },
  ];

  const personalInfoData = {
    image: selectedAdmin?.image,
    firstName: selectedAdmin?.firstName,
    lastName: selectedAdmin?.lastName,
    status: selectedAdmin?.status,
  };

  const moreInfoData = [
    {
      image: adminIdCardImage,
      label: 'رقم المعرف (ID)',
      value: selectedAdmin?.id,
    },
    {
      image: userNameIcon,
      label: 'اسم المستخدم',
      value: selectedAdmin?.userName,
    },
    {
      image: mailIcon,
      label: 'البريد الإلكتروني',
      value: selectedAdmin?.email,
    },
    {
      image: callIcon,
      label: 'رقم التواصل',
      value: selectedAdmin?.phoneNumber,
    },
    {
      image: flagIcon,
      label: 'الجنسية',
      value: selectedAdmin?.nationality,
    },
  ];

  function getPieChartData(option: string, adminShipments: any) {
    const statusOrder = ['completed', 'returned', 'canceled', 'delayed', 'shipping', 'delivered'];
    const { start, end } = getRangeDates(option);

    const filteredShipments =
      option === 'all'
        ? adminShipments
        : adminShipments.filter((shipment: any) => {
            const isoDate = arabicDateStringToISO(shipment.pickupDate);
            if (!isoDate) return false;

            const shipmentDate = new Date(isoDate);
            console.log('shipmentDate: ', new Date(arabicDateStringToISO(shipment.pickupDate)));
            console.log('start: ', start);
            console.log('end: ', end);
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
    () => getPieChartData(selectedOption, adminShipments),
    [selectedOption, adminShipments],
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
    () => filterShipmentsByDateRange(adminShipments, selectedOption),
    [adminShipments, selectedOption],
  );

  return (
    <div className='grid col-span-2 lg:grid-cols-3 gap-8'>
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
        <div className='w-full shadow-sm rounded-3xl md:px-8 py-4 bg-[#FFF]'>
          <div className='flex items-center justify-center gap-2 my-12'>
            <h1 className='text-xl font-bold text-[#333333]'>بيان الشهر</h1>
          </div>
          <PieChart
            pieChartData={pieChartData.data}
            sum={pieChartData.sum}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
