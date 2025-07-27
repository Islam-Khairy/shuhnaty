/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import addIcon from '/images/add.svg';
import AddEditShipperDataSection from '../../components/shippers/AddEditShipperDataSection';
import AddShipmentTextArea from '../../components/shipments/addShipment/addShipmentInputs/AddShipmentTextArea';
import { useNavigate, useParams } from 'react-router-dom';
import { shippers } from '../../lib/data';
import trashIcon from '/images/trash.svg';
import { toast } from 'sonner';

const shipperSectionInputsData = [
  { label: 'الاسم', name: 'name' },
  { label: 'رقم السجل التجاري', name: 'commercialRegistration' },
  { label: 'البريد الإلكتروني', name: 'email' },
  { label: 'العنوان', name: 'address' },
];

const shipperAdditionalBranchSectionInputsData = [
  { label: 'الاسم', name: 'name' },
  { label: 'العنوان', name: 'address' },
  { label: 'رقم الهاتف (أساسي)', name: 'primaryPhoneNumber' },
  { label: 'رقم الهاتف (احتياطي)', name: 'secondaryPhoneNumber' },
];

const EditShipper = () => {
  const { shipperId } = useParams();
  const selectedShipper = shippers.find((shipper) => shipper?.id === Number(shipperId));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [mainFormData, setMainFormData] = useState({
    name: '',
    email: '',
    address: '',
    primaryPhoneNumber: '',
    secondaryPhoneNumber: '',
    description: '',
    commercialRegistration: '',
  });

  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    if (selectedShipper) {
      setMainFormData({
        ...selectedShipper,
      });
      if (selectedShipper.branches && selectedShipper.branches.length > 0) {
        const formattedBranches = selectedShipper.branches.map((branch) => ({
          id: branch.id,
          name: branch.name || '',
          address: branch.address || '',
          primaryPhoneNumber: branch.primaryPhoneNumber || '',
          secondaryPhoneNumber: branch.secondaryPhoneNumber || '',
        }));
        setBranches(formattedBranches);
      }
    }
  }, [selectedShipper]);

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

  const deleteBranch = (index: number) => {
    setBranches((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // const submissionData = {
    //   id: selectedShipper?.id,
    //   ...mainFormData,
    //   branches: branches.map(branch => ({
    //     id: branch.id,
    //     name: branch.name,
    //     email: branch.email,
    //     address: branch.address,
    //     primaryPhoneNumber: branch.primaryPhoneNumber,
    //     secondaryPhoneNumber: branch.secondaryPhoneNumber,
    //   })),
    // };

    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shippers');
      toast.success('تم تحديث بيانات العميل بنجاح');
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
        className='border border-[#DD7E1F] rounded-lg px-6 mx-4 md:mx-0'
      >
        <AddEditShipperDataSection
          inputs={shipperSectionInputsData}
          value={mainFormData}
          onChange={handleMainFormChange}
        />
        <AddShipmentTextArea
          page='editShipper'
          name='description'
          value={mainFormData.description}
          onChange={handleMainFormChange}
          existingNotes={selectedShipper?.description}
        />

        {branches.map((branch, index) => (
          <div
            key={branch.id}
            className='mt-8'
          >
            <hr className='border-0 border-t-2 border-dashed border-[#666] my-8' />
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
          <span>إضافة فرع آخر</span>
          <img
            src={addIcon}
            alt='upload image'
          />
        </button>
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mb-8'
        >
          تحديث البيانات
        </button>
      </form>
    </>
  );
};

export default EditShipper;
