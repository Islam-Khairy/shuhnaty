/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import AddEditItemDataSection from '../../components/items/AddEditItemDataSection';
import FileUploadInput from '../../components/adminsDrivers/Admins/FileUploadInput';
import { admins } from '../../lib/data';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const editAdminInputsData = [
  {
    label: 'الاسم الأول',
    name: 'firstName',
  },
  {
    label: 'الاسم الأخير',
    name: 'lastName',
  },
  {
    label: 'اسم المستخدم',
    name: 'userName',
  },
  {
    label: 'رقم التواصل',
    name: 'phoneNumber',
  },
  {
    label: 'البريد الإلكتروني',
    name: 'email',
  },
  {
    label: 'كلمة المرور',
    name: 'password',
  },
];

const EditAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { adminId } = useParams();
  const selectedAdmin = admins.find((admin) => admin.id === Number(adminId));
  const [formData, setFormData] = useState({
    nationalityId: 1,
    firstName: '',
    lastName: '',
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
    image: null as File | null,
    imagePreview: selectedAdmin?.image || '',
  });

  useEffect(() => {
    if (selectedAdmin) {
      setFormData({
        ...selectedAdmin,
        image: null,
        imagePreview: selectedAdmin.image,
      });
    }
  }, [selectedAdmin]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admins');
      toast.success('تم تحديث بيانات المستخدم بنجاح');
    }, 2000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null, previewUrl: string | null) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: previewUrl || prev.imagePreview,
    }));
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
        <FileUploadInput
          onChange={handleFileChange}
          initialImage={selectedAdmin?.image}
        />{' '}
        <AddEditItemDataSection
          inputs={editAdminInputsData}
          value={formData}
          onChange={handleChange}
          page='editAdmin'
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <button className='w-full py-3 rounded-lg text-xl bg-[#DD7E1F] text-[#FCFCFC] mt-4'>
          تحديث البيانات
        </button>
      </form>
    </>
  );
};

export default EditAdmin;
