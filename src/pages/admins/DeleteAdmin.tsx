import adminImage from '/images/adminDriver/personalCard.svg';
import locationIcon from '/images/adminDriver/location.svg';
import mailIcon from '/images/adminDriver/sms.svg';
import callIcon from '/images/adminDriver/call.svg';
import flagIcon from '/images/adminDriver/flag.svg';
import { useParams } from 'react-router-dom';
import { admins } from '../../lib/data';
import DeleteItem from '../../components/items/DeleteItem';

const DeleteAdmin = () => {
  const { adminId } = useParams();
  const selectedAdmin = admins.find((admin) => admin.id === Number(adminId));
  const moreInfoData = [
    {
      image: adminImage,
      label: 'رقم المعرف (ID)',
      value: selectedAdmin?.id,
    },
    {
      image: locationIcon,
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

  const personalData = {
    image: selectedAdmin?.image,
    firstName: selectedAdmin?.firstName,
    lastName: selectedAdmin?.lastName,
  };

  return (
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalData}
      isActive={selectedAdmin?.status === 'available'}
      item='admin'
    />
  );
};

export default DeleteAdmin;
