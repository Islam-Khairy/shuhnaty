import ActionsMenu from '../../components/actionsMenu/ActionsMenu';
import editShipmentIcon from '/images/edit-shipment-icon.svg';
import deleteShipmentIcon from '/images/delete-shipment-icon.svg';
import ShipperBranchDetailsSection from '../../components/shippers/ShipperBranchDetailsSection';
import { useParams } from 'react-router-dom';
import { shippers } from '../../lib/data';
// import { shippers } from '../../lib/data';

const ShipperDetails = () => {
  const { shipperId } = useParams();
  const selectedShipper = shippers.find((shipper) => shipper?.id === Number(shipperId));

  const menuActions = [
    { label: 'تعديل البيانات', icon: editShipmentIcon, path: `/shippers/edit/${shipperId}` },
    { label: 'حذف البيانات', icon: deleteShipmentIcon, path: `/shippers/delete/${shipperId}` },
  ];

  return (
    <div className='border border-[#DD7E1F] rounded-lg px-6 pt-10 pb-4 mx-4 md:mx-0'>
      <div className='w-full flex justify-between items-start sm:items-center relative'>
        <div className='flex flex-col gap-2'>
          {[
            { label: 'الاسم', value: selectedShipper?.name },
            { label: 'رقم السجل التجاري', value: selectedShipper?.commercialRegistration },
          ].map((item, index) => (
            <div
              className='flex gap-1 font-medium text-base font-Rubik'
              key={index}
            >
              <span>{item.label}: </span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <ActionsMenu
          options={menuActions}
          position={`top-7 -left-3 sm:top-11`}
        />{' '}
      </div>
      <h1 className='mt-10 bg-[#FCF2E9] font-md font-Rubik text-lg text-[#1A1A1A] p-3 rounded-md'>
        {selectedShipper?.description}
      </h1>
      <hr className='border-0 border-t-2 border-dashed border-[#666] my-10' />
      {selectedShipper?.branches.map((branch, index) => (
        <div key={index}>
          <ShipperBranchDetailsSection
            title={`الفرع (${index + 1})`}
            name={branch.name}
            address={branch.address}
            primaryPhone={branch.primaryPhoneNumber}
            secondaryPhone={branch.secondaryPhoneNumber}
          />
          {index < selectedShipper?.branches.length - 1 && (
            <hr className='border-0 border-t-2 border-dashed border-[#666] my-10' />
          )}
        </div>
      ))}
    </div>
  );
};

export default ShipperDetails;
