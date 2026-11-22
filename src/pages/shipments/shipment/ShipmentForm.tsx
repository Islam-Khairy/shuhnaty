import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ShipperRecipientSection from '../../../components/shipments/addShipment/ShipperRecipientSection';
import FormSection from '../../../components/shared/FormSection';
import ShipmentCostSection from '../../../components/shipments/addShipment/ShipmentCostSection';
import NotesArea from '../../../components/shipments/addShipment/addShipmentInputs/NotesArea';
import { PageLoader } from '../../../components/shared/PageLoader';
import {
  costSectionInputsData,
  driverSectionInputsData,
  recipientSectionInputsData,
  shipmentSectionInputsData,
  shipperSectionInputsData,
  shipmentToFormData,
} from '../../../lib/data/shipments';
import {
  driverSectionSelectMenus,
  shipmentSectionSelectMenus,
} from '../../../lib/data/selectMenuConfigs';
import { shipments } from '../../../lib/data/mainData';
import { useShipment } from '../../../hooks/useShipment';
import { useFormSubmission } from '../../../hooks/useFormSubmission';

interface ShipmentFormProps {
  mode: 'add' | 'edit';
}

const ShipmentForm = ({ mode }: ShipmentFormProps) => {
  const isEdit = mode === 'edit';
  const { shipmentId } = useParams();

  const selectedShipment = useMemo(() => {
    if (!isEdit) return undefined;
    return shipments.find((s) => s.id === Number(shipmentId));
  }, [isEdit, shipmentId]);

  const initialData = useMemo(
    () => (selectedShipment ? shipmentToFormData(selectedShipment) : undefined),
    [selectedShipment],
  );

  const { formData, handleChange, getTotalCost } = useShipment(initialData);
  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: isEdit ? 'تم تعديل بيانات الشحنة بنجاح' : 'تم إضافة الشحنة بنجاح',
    redirectPath: '/shipments',
  });

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <form onSubmit={handleSubmit} className='border border-primary rounded-lg p-8 mx-4 md:mx-0'>
        <FormSection
          title='السائق'
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
          selectMenus={driverSectionSelectMenus(formData)}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />

        <FormSection
          title='الشحنة'
          inputs={shipmentSectionInputsData}
          value={formData}
          onChange={handleChange}
          selectMenus={shipmentSectionSelectMenus(formData)}
        />
        <NotesArea
          name='shipmentNotes'
          value={formData.shipmentNotes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange({ target: { name: 'shipmentNotes', value: e.target.value } })
          }
          existingNotes={!!selectedShipment?.shipmentNotes}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] mb-12' />

        <ShipperRecipientSection
          section='shipper'
          title='المرسِل'
          inputs={shipperSectionInputsData}
          value={formData}
          onChange={handleChange}
          existingNotes={!!selectedShipment?.shipperNotes}
        />
        <ShipperRecipientSection
          section='recipient'
          title='المستلِم'
          inputs={recipientSectionInputsData}
          value={formData}
          onChange={handleChange}
          existingNotes={!!selectedShipment?.recipientNotes}
        />
        <ShipmentCostSection
          inputs={costSectionInputsData}
          value={formData}
          onChange={handleChange}
          totalCost={getTotalCost()}
        />
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-primary text-[#FCFCFC] mt-4'
        >
          {isEdit ? 'حفظ التعديلات' : 'إضافة الشحنة'}
        </button>
      </form>
    </>
  );
};

export default ShipmentForm;
