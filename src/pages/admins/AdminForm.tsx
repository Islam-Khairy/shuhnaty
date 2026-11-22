import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/shared/FormSection';
import { adminSelectMenus } from '../../lib/data/selectMenuConfigs';
import FileUploadInput from '../../components/adminsDrivers/Admins/FileUploadInput';
import { PageLoader } from '../../components/shared/PageLoader';
import { admins } from '../../lib/data/mainData';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import { addEditAdminInputsData, adminToFormData } from '../../lib/data/admins';
import { useAdmins } from '../../hooks/useAdmins';

interface AdminFormProps {
  mode: 'add' | 'edit';
}

const AdminForm = ({ mode }: AdminFormProps) => {
  const isEdit = mode === 'edit';
  const { adminId } = useParams();

  const selectedAdmin = useMemo(() => {
    if (!isEdit) return undefined;
    return admins.find((admin) => admin.id === Number(adminId));
  }, [isEdit, adminId]);

  const initialData = useMemo(() => {
    return selectedAdmin ? adminToFormData(selectedAdmin) : undefined;
  }, [selectedAdmin]);

  const { handleSubmit, isLoading } = useFormSubmission({
    successMessage: isEdit ? 'تم تحديث بيانات المستخدم بنجاح' : 'تم إضافة المستخدم بنجاح',
    redirectPath: '/admins',
  });

  const { formData, handleFileChange, handleChange } = useAdmins(initialData);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className='border border-primary rounded-lg p-8 mx-4 md:mx-0'
      >
        <FileUploadInput
          onChange={handleFileChange}
          initialImage={selectedAdmin?.image}
        />
        <FormSection
          inputs={addEditAdminInputsData}
          value={formData}
          onChange={handleChange}
          selectMenus={adminSelectMenus(formData)}
        />
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <button
          type='submit'
          className='w-full py-3 rounded-lg text-xl bg-primary text-[#FCFCFC] mt-4'
        >
          {isEdit ? 'تحديث البيانات' : 'إضافة المستخدم'}
        </button>
      </form>
    </>
  );
};

export default AdminForm;
