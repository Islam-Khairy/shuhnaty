import FormSection from '../../shared/FormSection';
import FormInput from '../../shared/FormInput';
import { ShipmentFormData } from '../../../types/shipments';

interface ShipmentCostSectionProps {
  inputs: { label: string; name: string; type?: string }[];
  value: ShipmentFormData;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string | number | object } },
  ) => void;
  totalCost: number;
}

const ShipmentCostSection = ({
  inputs,
  value,
  onChange,
  totalCost,
}: ShipmentCostSectionProps) => {

  const handleNightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ target: { name: 'stayedNights', value: parseInt(e.target.value, 10) || 0 } });
  };

  const handleCostPerNightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ target: { name: 'costPerNight', value: parseInt(e.target.value, 10) || 0 } });
  };

  const nights = value.stayedNights;
  const costPerNight = value.costPerNight;

  return (
    <>
      <div>
        <FormSection
          title='التكلفة ر.س'
          inputs={inputs}
          value={value}
          onChange={onChange}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='col-span-1 flex flex-col gap-1 font-Rubik'>
            <label className='text-[#1A1A1A]'>المبيت</label>
            <div className='flex border border-[#CCCCCC] rounded-lg overflow-hidden py-1'>
              <input
                type='number'
                required
                placeholder='عدد الليالي'
                value={nights || ''}
                onChange={handleNightsChange}
                className='w-2/6 lg:w-1/6 p-2 text-center border-l border-[#666666] focus:outline-none no-arrows'
              />
              <input
                type='number'
                required
                placeholder='تكلفة المبيت لليلة الواحدة'
                value={costPerNight || ''}
                onChange={handleCostPerNightChange}
                className='w-4/6 lg:w-5/6 py-2 ps-2 md:ps-4 lg:ps-10 text-start focus:outline-none no-arrows'
              />
            </div>
            {nights * costPerNight > 0 ? (
              <div className='text-primary mt-1'>
                تكلفة المبيت: {(nights * costPerNight).toLocaleString()} ر.س
              </div>
            ) : (
              <span className='text-[#999999] text-sm mt-1'>تظهر هنا تكلفة المبيت</span>
            )}
          </div>
          <div className='col-span-1'>
            <FormInput
              label='الخصم'
              type='number'
              name='deduct'
              value={value.deduct}
              onChange={onChange}
              required={false}
            />
          </div>
        </div>
      </div>
      <div className='w-full mt-12 flex flex-col items-center gap-4 text-primary font-Rubik text-lg'>
        <span>التكلفة الإجمالية</span>
        <span className='font-bold'>{totalCost > 0 ? totalCost.toLocaleString() : 0} ر.س</span>
      </div>
    </>
  );
};

export default ShipmentCostSection;
