import AddEditItemInput from '../items/AddEditItemInput';
import PhoneNumberInput from '../shipments/addShipment/addShipmentInputs/phoneNumberInput/PhoneNumberInput';

/* eslint-disable @typescript-eslint/no-explicit-any */
const AddEditShipperDataSection = ({ title, inputs, value, onChange }: any) => {
  console.log('value: ', value)
  return (
    <>
      {title && <h1 className='font-bold text-xl sm:text-2xl'>{title}</h1>}
      <div className='w-full grid gap-10 my-10 grid-cols-1 md:grid-cols-2'>
        {inputs.map((input: any, index: any) => (
          <AddEditItemInput
            key={index}
            label={input.label}
            name={input.name}
            value={value[input.name]}
            onChange={onChange}
            description={input.description}
            type={input.type}
          />
        ))}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-10'>
        {['primaryPhoneNumber', 'secondaryPhoneNumber'].map((type, index) => (
          <PhoneNumberInput
            key={index}
            label={`رقم الهاتف (${type === 'primaryPhoneNumber' ? 'أساسي' : 'احتياطي'})`}
            value={value[type]}
            onChange={(val: string) => onChange({ target: { name: type, value: val } })}
          />
        ))}
      </div>
    </>
  );
};

export default AddEditShipperDataSection;
