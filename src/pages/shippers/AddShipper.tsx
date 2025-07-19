/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import addIcon from '../../assets/images/add.svg';
import AddEditShipperDataSection from '../../components/shippers/AddEditShipperDataSection';
import AddShipmentTextArea from '../../components/shipments/addShipment/addShipmentInputs/AddShipmentTextArea';
import trashIcon from '../../assets/images/trash.svg';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const shipperSectionInputsData = [
  { label: 'الاسم', name: 'name' },
  { label: 'رقم السجل التجاري', name: 'commercialRegistration' },
  { label: 'البريد الإلكتروني', name: 'email' },
  { label: 'العنوان', name: 'address' },
];

const shipperAdditionalBranchSectionInputsData = [
  { label: 'البريد الإلكتروني', name: 'email' },
  { label: 'العنوان', name: 'address' },
];

interface BranchData {
  name: string;
  email: string;
  address: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  description: string;
}

const AddShipper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [mainFormData, setMainFormData] = useState<BranchData>({
    name: '',
    email: '',
    address: '',
    primaryPhoneNumber: '',
    secondaryPhoneNumber: '',
    description: '',
  });

  const [branches, setBranches] = useState<BranchData[]>([]);

  const handleMainFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMainFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBranchChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBranches((prev) => {
      const updatedBranches = [...prev];
      updatedBranches[index] = {
        ...updatedBranches[index],
        [name]: value,
      };
      return updatedBranches;
    });
  };

  const addNewBranch = () => {
    setBranches((prev) => [
      ...prev,
      {
        name: '',
        email: '',
        address: '',
        primaryPhoneNumber: '',
        secondaryPhoneNumber: '',
        description: '',
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    // const submissionData = {
    //   main: mainFormData,
    //   branches: branches,
    // };
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shippers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('تم إضاافة العميل بنجاح');
    }, 2000);
  };

  const deleteBranch = (index: number) => {
    setBranches((prev) => prev.filter((_, i) => i !== index));
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
        className='border border-[#DD7E1F] rounded-lg px-6 mx-4 md:mx-0'
      >
        <AddEditShipperDataSection
          inputs={shipperSectionInputsData}
          value={mainFormData}
          onChange={handleMainFormChange}
        />
        <AddShipmentTextArea
          page='addShipper'
          name='description'
          placeholder='أضف وصفٍا للمنشة ومجال عملها'
          value={mainFormData.description}
          onChange={handleMainFormChange}
        />

        {branches.map((branch, index) => (
          <div
            key={index}
            className='mt-8'
          >
            <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
            {branches.length > 0 ? (
              <div className='w-full flex items-center justify-between'>
                <h2 className='text-xl font-bold my-4'>الفرع ({index + 1})</h2>
                <button
                  type='button'
                  onClick={() => deleteBranch(index)}
                  className='flex items-center gap-2'
                >
                  <span className='font-Rubik text-[#DD7E1F] text-sm'>حذف الفرع</span>
                  <img
                    src={trashIcon}
                    alt='delete branch'
                  />
                </button>
              </div>
            ) : (
              <h2 className='text-xl font-bold my-4'>الفرع ({index + 1})</h2>
            )}
            <AddEditShipperDataSection
              inputs={shipperAdditionalBranchSectionInputsData}
              value={branch}
              onChange={(e: any) => handleBranchChange(index, e)}
            />
          </div>
        ))}

        <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
        <button
          type='button'
          onClick={addNewBranch}
          className='flex items-center gap-2 text-[#DD7E1F] border-2 border-[#DD7E1F] py-2 px-3 text-sm rounded-lg font-Rubik my-12'
        >
          <span>{branches.length > 0 ? 'إضافة فرع آخر' : 'إضافة فرع'}</span>
          <img
            src={addIcon}
            alt='upload image'
          />
        </button>
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mb-8'
        >
          إضافة العميل
        </button>
      </form>
    </>
  );
};

export default AddShipper;
