/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import AddEditShipmentDataSection from '../../../components/shipments/addShipment/AddEditShipmentDataSection';
import AddEditItemDataSection from '../../../components/items/AddEditItemDataSection';
import AddEditShipmentCostSection from '../../../components/shipments/addShipment/AddEditShipmentCostSection';
import AddShipmentTextArea from '../../../components/shipments/addShipment/addShipmentInputs/AddShipmentTextArea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const driverSectionInputsData = [
  { label: 'رقم الشاحنة', name: 'driverVehicleNumber' },
  { label: 'رقم الهاتف', name: 'driverPhoneNumber' },
];

const shipmentSectionInputsData = [
  {
    label: 'تاريخ التحميل',
    name: 'shipmentPickupDate',
    type: 'date',
    description:
      'يتم تحديد تاريخ التحميل بشكل تلقائي حسب تاريخ اليوم، إذا كانت الشحنة تستلزم تاريخا محدددا للتحميل يمكنك التعديل بناء عليه.',
  },
  {
    label: 'تاريخ التسليم',
    name: 'shipmentExpectedDeliveryDate',
    type: 'date',
    description: 'أكّد مع المستلم التاريخ الدقيق للاستلام',
  },
  { label: 'المحتويات', name: 'shipmentContent' },
  { label: 'الوزن بالطن', name: 'shipmentWeight' },
];

const shipperSectionInputsData = [{ label: 'العنوان', name: 'shipperAddress' }];

const recipientSectionInputsData = [{ label: 'العنوان', name: 'recipientAddress' }];

const costSectionInputsData = [
  { label: 'التكلفة الأساسية', name: 'baseCost', type: 'number' },
  { label: 'الزيادة', name: 'extraCost', type: 'number' },
];

const AddShipment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    driverPhoneNumber: '',
    driverVehicleNumber: '',
    shipmentPickupDate: '',
    shipmentExpectedDeliveryDate: '',
    shipmentContent: '',
    shipmentWeight: '',
    shipmentNotes: '',
    shipperAddress: '',
    shipperPrimaryPhoneNumber: '',
    shipperSecondaryPhoneNumber: '',
    shipperNotes: '',
    recipientAddress: '',
    recipientPrimaryPhoneNumber: '',
    recipientSecondaryPhoneNumber: '',
    recipientNotes: '',
    baseCost: 0,
    extraCost: 0,
    stayedNights: 0,
    costPerNight: 0,
    deduct: 0,
    totalCost: 0,
  });

  const handleChange = (e: any) => {
    if (typeof e.target.value === 'object') {
      setFormData((prev) => ({ ...prev, ...e.target.value }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shipments');
      toast.success('تم إضاافة الشحنة بنجاح');
    }, 2000);
  };

  const totalCost = useMemo(() => {
    const { baseCost, extraCost, stayedNights, costPerNight, deduct } = formData;
    return Number(baseCost) + Number(extraCost) + stayedNights * costPerNight - deduct;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.baseCost,
    formData.extraCost,
    formData.stayedNights,
    formData.costPerNight,
    formData.deduct,
  ]);

  console.log('add shipment rendered');

  return (
    <>
     {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}
        >
          <span className='loader'></span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='border border-[#DD7E1F] rounded-lg p-8 mx-4 md:mx-0'
      >
        <AddEditItemDataSection
          section='driver'
          title='السائق'
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />

        <AddEditItemDataSection
          section='shipment'
          title='الشحنة'
          inputs={shipmentSectionInputsData}
          value={formData}
          onChange={handleChange}
        />
        <AddShipmentTextArea
          name='shipmentNotes'
          value={formData.shipmentNotes}
          onChange={(e: any) => setFormData((prev) => ({ ...prev, shipmentNotes: e.target.value }))}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] mb-12' />
        <AddEditShipmentDataSection
          section='shipper'
          title='المرسِل'
          inputs={shipperSectionInputsData}
          value={formData}
          onChange={handleChange}
          setFormData={setFormData}
        />
        <AddEditShipmentDataSection
          section='recipient'
          title='المستلِم'
          inputs={recipientSectionInputsData}
          value={formData}
          onChange={handleChange}
          setFormData={setFormData}
        />
        <AddEditShipmentCostSection
          inputs={costSectionInputsData}
          nights={formData.stayedNights}
          setNights={(value: any) => setFormData((prev) => ({ ...prev, stayedNights: value }))}
          costPerNight={formData.costPerNight}
          setCostPerNight={(value: any) =>
            setFormData((prev) => ({ ...prev, costPerNight: value }))
          }
          value={formData}
          onChange={handleChange}
          totalCost={totalCost}
        />
        {/* <hr className='border-0 border-t-2 border-dashed border-[#666]' /> */}
        <button className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'>
          إضافة الشحنة
        </button>
      </form>
    </>
  );
};

export default AddShipment;
