import driverIdCardImage from '/images/adminDriver/personalCard.svg';
import locationIcon from '/images/adminDriver/location.svg';
import callIcon from '/images/adminDriver/call.svg';
import flagIcon from '/images/adminDriver/flag.svg';
import truckIcon from '/images/truck.svg';
import { useParams } from 'react-router-dom';
import { drivers } from '../../lib/data';
import DeleteItem from '../../components/items/DeleteItem';

const DeleteDriver = () => {
  const { driverId } = useParams();
  const selectedDriver = drivers.find((driver) => driver?.id === Number(driverId));

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

  return (
    <DeleteItem
      moreInfoData={moreInfoData}
      personalData={personalInfoData}
      item='driver'
    />
  );
};

export default DeleteDriver;
