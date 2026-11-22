import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import addIcon from '/images/add.svg';
import trashIcon from '/images/trash.svg';
import ShipperFormSection from '../../components/shippers/ShipperFormSection';
import NotesArea from '../../components/shipments/addShipment/addShipmentInputs/NotesArea';
import { PageLoader } from '../../components/shared/PageLoader';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import {
  branchSectionInputsData,
  shipperSectionInputsData,
  shipperToFormData,
} from '../../lib/data/shippers';
import { shippers } from '../../lib/data/mainData';
import { useShippers } from '../../hooks/useShippers';

interface ShipperFormProps {
  mode: 'add' | 'edit';
}

const ShipperForm = ({ mode }: ShipperFormProps) => {
  const isEdit = mode === 'edit';
  const { shipperId } = useParams();

  const selectedShipper = useMemo(() => {
    if (!isEdit) return undefined;
    return shippers.find((shipper) => shipper?.id === Number(shipperId));
  }, [isEdit, shipperId]);

  const initialData = useMemo(() => {
    return selectedShipper ? shipperToFormData(selectedShipper) : undefined;
  }, [selectedShipper]);

  const {
    branches,
    mainFormData,
    handleMainFormChange,
    handleBranchChange,
    addNewBranch,
    deleteBranch,
  } = useShippers(initialData);

  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: isEdit ? 'تم تحديث بيانات العميل بنجاح' : 'تم إضافة العميل بنجاح',
    redirectPath: '/shippers',
  });

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className='border border-primary rounded-lg px-6 mx-4 md:mx-0'
      >
        <ShipperFormSection
          inputs={shipperSectionInputsData}
          value={mainFormData}
          onChange={handleMainFormChange}
        />
        <NotesArea
          mode={mode}
          variant='shipper'
          name='description'
          placeholder='أضف وصفٍا للمنشة ومجال عملها'
          value={mainFormData.description}
          onChange={handleMainFormChange}
          existingNotes={!!selectedShipper?.description}
        />

        {branches.map((branch, index) => (
          <div
            key={branch.id ?? index}
            className='mt-8'
          >
            <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
            <div className='w-full flex items-center justify-between'>
              <h2 className='text-xl font-bold my-4'>الفرع ({index + 1})</h2>
              {branches.length > 0 && (
                <button
                  type='button'
                  onClick={() => deleteBranch(index)}
                  className='flex items-center gap-2'
                >
                  <span className='font-Rubik text-primary text-sm'>حذف الفرع</span>
                  <img
                    src={trashIcon}
                    alt='delete branch'
                  />
                </button>
              )}
            </div>
            <ShipperFormSection
              inputs={branchSectionInputsData}
              value={branch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleBranchChange(index, e)}
            />
          </div>
        ))}

        <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
        <button
          type='button'
          onClick={addNewBranch}
          className='flex items-center gap-2 text-primary border-2 border-primary py-2 px-3 text-sm rounded-lg font-Rubik my-12'
        >
          <span>{branches.length > 0 ? 'إضافة فرع آخر' : 'إضافة فرع'}</span>
          <img
            src={addIcon}
            alt='upload image'
          />
        </button>
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-primary text-[#FCFCFC] mb-8'
        >
          {isEdit ? 'تحديث البيانات' : 'إضافة العميل'}
        </button>
      </form>
    </>
  );
};

export default ShipperForm;
