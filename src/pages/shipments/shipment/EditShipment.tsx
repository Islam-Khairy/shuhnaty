/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import AddEditItemDataSection from '../../../components/items/AddEditItemDataSection';
import AddEditShipmentDataSection from '../../../components/shipments/addShipment/AddEditShipmentDataSection';
import AddEditShipmentCostSection from '../../../components/shipments/addShipment/AddEditShipmentCostSection';
import { useNavigate, useParams } from 'react-router-dom';
import { cities, drivers, recipients, shipments, shippers } from '../../../lib/data';
import AddShipmentTextArea from '../../../components/shipments/addShipment/addShipmentInputs/AddShipmentTextArea';
import { arabicDateStringToISO } from '../../../lib/utils';
import { toast } from 'sonner';

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

const EditShipment = () => {
  const { shipmentId } = useParams();
  const selectedShipment: any = shipments.find((shipment) => shipment.id === Number(shipmentId));
  const shipmentDriver = drivers.find((driver) => driver.id === selectedShipment?.driverId);
  const shipmentShipper = shippers.find((shipper) => shipper.id === selectedShipment?.shipperId);
  const shipmentRecipient = recipients.find(
    (recipient) => recipient.id === selectedShipment?.recipientId,
  );

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({
    driverId: 0,
    driverVehicleId: 0,
    driverVehicleNumber: '',
    driverPhoneNumber: '',
    shipmentPickupCityId: 0,
    shipmentDropOffCityId: 0,
    shipmentPickupDate: '',
    shipmentExpectedDeliveryDate: '',
    shipmentContent: '',
    shipmentWeight: '',
    shipmentNotes: '',
    shipperId: 0,
    shipperBranchId: 0,
    shipperAddress: '',
    shipperPrimaryPhoneNumber: '',
    shipperSecondaryPhoneNumber: '',
    shipperNotes: '',
    recipientId: 0,
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

  useEffect(() => {
    if (selectedShipment) {
      setFormData({
        ...selectedShipment,
        driverId: shipmentDriver?.id,
        driverVehicleId: shipmentDriver?.vehicleId,
        driverVehicleNumber: shipmentDriver?.vehicleNumber,
        driverPhoneNumber: shipmentDriver?.phoneNumber,
        shipmentPickupCityId: cities.find((city) => city.name === selectedShipment.pickupCity)?.id,
        shipmentDropOffCityId: cities.find((city) => city.name === selectedShipment.dropOffCity)
          ?.id,
        shipmentPickupDate: arabicDateStringToISO(selectedShipment.pickupDate),
        shipmentExpectedDeliveryDate: arabicDateStringToISO(selectedShipment.expectedDeliveryDate),
        shipmentContent: selectedShipment.content,
        shipmentWeight: selectedShipment.weight,
        shipperId: shipmentShipper?.id,
        shipperAddress: shipmentShipper?.address,
        shipperPrimaryPhoneNumber: shipmentShipper?.primaryPhoneNumber,
        shipperSecondaryPhoneNumber: shipmentShipper?.secondaryPhoneNumber,
        recipientId: shipmentRecipient?.id,
        recipientAddress: shipmentRecipient?.address,
        recipientPrimaryPhoneNumber: shipmentRecipient?.primaryPhoneNumber,
        recipientSecondaryPhoneNumber: shipmentRecipient?.secondaryPhoneNumber,
      });
    }
  }, [selectedShipment, shipmentDriver, shipmentShipper, shipmentRecipient]);

  const handleChange = (e: any) => {
    if (typeof e.target.value === 'object') {
      setFormData((prev: any) => ({ ...prev, ...e.target.value }));
    } else {
      const { name, value } = e.target;
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shipments');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('تم تعديل بيانات الشحنة بنجاح');
    }, 2000);
  };

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
          page='editShipment'
          section='driver'
          title='السائق'
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />

        <AddEditItemDataSection
          page='editShipment'
          section='shipment'
          title='الشحنة'
          inputs={shipmentSectionInputsData}
          value={formData}
          onChange={handleChange}
        />

        <AddShipmentTextArea
          page='editShipment'
          name='shipmentNotes'
          value={formData.shipmentNotes}
          onChange={(e: any) =>
            setFormData((prev: any) => ({ ...prev, shipmentNotes: e.target.value }))
          }
          existingNotes={!!selectedShipment.shipmentNotes}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] mb-12' />
        <AddEditShipmentDataSection
          page='editShipment'
          section='shipper'
          title='المرسِل'
          inputs={shipperSectionInputsData}
          value={formData}
          onChange={handleChange}
          setFormData={setFormData}
          existingNotes={!!selectedShipment.shipperNotes}
        />
        <AddEditShipmentDataSection
          page='editShipment'
          section='recipient'
          title='المستلِم'
          inputs={recipientSectionInputsData}
          value={formData}
          onChange={handleChange}
          setFormData={setFormData}
          existingNotes={!!selectedShipment.recipientNotes}
        />
        <AddEditShipmentCostSection
          page='editShipment'
          inputs={costSectionInputsData}
          nights={formData.stayedNights}
          setNights={(value: any) => setFormData((prev: any) => ({ ...prev, stayedNights: value }))}
          costPerNight={formData.costPerNight}
          setCostPerNight={(value: any) =>
            setFormData((prev: any) => ({ ...prev, costPerNight: value }))
          }
          value={formData}
          onChange={handleChange}
          totalCost={totalCost}
        />
        {/* <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' /> */}
        <button className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'>
          حفظ التعديلات
        </button>
      </form>
    </>
  );
};

export default EditShipment;
