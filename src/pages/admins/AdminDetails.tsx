import { useState } from 'react';
import SelectMenu from '../../components/SelectMenu';
import PieChart from '../../components/charts/PieChart';

import adminIdCardImage from '/images/adminDriver/personalCard.svg';
import userNameIcon from '/images/adminDriver/user-name.svg';
import mailIcon from '/images/adminDriver/sms.svg';
import callIcon from '/images/adminDriver/call.svg';
import flagIcon from '/images/adminDriver/flag.svg';
import AdminDriverProfileCard from '../../components/adminsDrivers/adminDriverProfileCard/AdminDriverProfileCard';
import { useParams } from 'react-router-dom';
import { admins, shipments } from '../../lib/data/mainData';
import AdminDriverDetailsTable from '../../components/adminsDrivers/AdminDriverDetailsTable';
import { buildMenuActions } from '../../lib/menuActions';
import { useChartData } from '../../hooks/useChartData';
import { selectMenuOptions } from '../../lib/data/drivers';

const AdminDetails = () => {
  const [selectedOption, setSelectedOption] = useState('all');
  const { adminId } = useParams();

  const selectedAdmin = admins.find((admin) => admin.id === Number(adminId));
  const adminShipments = shipments.filter((shipment) => shipment.adminId === selectedAdmin?.id);

  const menuActions = buildMenuActions({
    editLabel: 'تعديل البيانات',
    editPath: `/admins/edit/${adminId}`,
    deleteLabel: 'حذف البيانات',
    deletePath: `/admins/delete/${adminId}`,
  });

  const personalInfoData = {
    image: selectedAdmin?.image,
    firstName: selectedAdmin?.firstName,
    lastName: selectedAdmin?.lastName,
    status: selectedAdmin?.status,
  };

  const moreInfoData = [
    { image: adminIdCardImage, label: 'رقم المعرف (ID)', value: selectedAdmin?.id },
    { image: userNameIcon, label: 'اسم المستخدم', value: selectedAdmin?.userName },
    { image: mailIcon, label: 'البريد الإلكتروني', value: selectedAdmin?.email },
    { image: callIcon, label: 'رقم التواصل', value: selectedAdmin?.phoneNumber },
    { image: flagIcon, label: 'الجنسية', value: selectedAdmin?.nationality },
  ];

  const { pieChartData, filteredShipments } = useChartData(adminShipments, selectedOption);

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
