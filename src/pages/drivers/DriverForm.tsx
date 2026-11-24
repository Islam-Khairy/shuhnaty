import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/shared/FormSection';
import { driverFormSelectMenus } from '../../lib/data/selectMenuConfigs';
import uploadImage from '/images/upload.svg';
import infoIcon from '/images/info-circle.svg';
import FileUploadInput from '../../components/adminsDrivers/Admins/FileUploadInput';
import { PageLoader } from '../../components/shared/PageLoader';
import { MdCancelPresentation } from 'react-icons/md';
import { drivers } from '../../lib/data/mainData';
import licenseBackSideImage from '/images/adminDriver/driver/license/16.webp';
import { DriverFormData } from '../../types/drivers';
import { driverSectionInputsData, driverToFormData } from '../../lib/data/drivers';
import { useDrivers } from '../../hooks/useDrivers';
import { useFormSubmission } from '../../hooks/useFormSubmission';

interface DriverFormProps {
  mode: 'add' | 'edit';
}

const DriverForm = ({ mode }: DriverFormProps) => {
  const isEdit = mode === 'edit';
  const { driverId } = useParams();
  const [isHovered, setIsHovered] = useState(false);

  const selectedDriver = useMemo(() => {
    if (!isEdit) return undefined;
    return drivers.find((driver) => driver?.id === Number(driverId));
  }, [isEdit, driverId]);

  const initialData = useMemo(() => {
    return selectedDriver ? driverToFormData(selectedDriver) : undefined;
  }, [selectedDriver]);

  const { formData, setFormData, handleFileChange, handleChange } = useDrivers(initialData);

  const { isLoading, handleSubmit } = useFormSubmission({
    successMessage: isEdit ? 'تم تحديث بيانات السائق بنجاح' : 'تم إضافة السائق بنجاح',
    redirectPath: '/drivers',
  });

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <form onSubmit={handleSubmit} className='border border-primary rounded-lg p-8 mx-4 md:mx-0'>
        <FileUploadInput initialImage={selectedDriver?.image} onChange={handleFileChange} />
        <FormSection
          selectMenus={driverFormSelectMenus(formData)}
          inputs={driverSectionInputsData}
          value={formData}
          onChange={handleChange}
        />

        <div>
          <h1 className='font-bold text-lg md:text-3xl my-8'>بيانات الرخصة</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            {[
              {
                uploadImageTitle: 'إضافة الوجه الأمامي للرخصة',
                inputLabel: 'تاريخ الإصدار',
                image: selectedDriver?.licenseImage,
                name: 'licenseIssueDate',
              },
              {
                uploadImageTitle: 'إضافة الوجه الخلفي للرخصة',
                inputLabel: 'تاريخ الانتهاء',
                image: isEdit ? licenseBackSideImage : undefined,
                name: 'licenseExpirationDate',
              },
            ].map((item, index) => (
              <div key={index} className='col-span-1'>
                <FileUploadInput
                  onChange={handleFileChange}
                  initialImage={item?.image}
                  title={item.uploadImageTitle}
                />
                <div className='col-span-1 flex flex-col gap-2 mt-8'>
                  <span className='text-[#1A1A1A] text-xl'>{item.inputLabel}</span>
                  <input
                    type='text'
                    className='p-3 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-primary'
                    min={0}
                    name={item.name}
                    value={(formData[item.name as keyof DriverFormData] as string) || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className='border-0 border-t-2 border-dashed border-[#666] my-12' />
        <div>
          <div className='flex items-center gap-2 relative'>
            <h1 className='my-12 font-bold text-lg md:text-3xl'>ملاحظات صحية</h1>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className='relative'
            >
              <img src={infoIcon} alt='Info' className='cursor-pointer' />
              {isHovered && (
                <div className='absolute bottom-10 right-1/2 transform translate-x-1/2 mt-2 w-64 rounded-2xl shadow-lg p-6 z-10 font-Rubik text-[#864D13] border border-primary bg-[#FCF2E9]'>
                  <p>
                    مثل مشاكل في النظر أو القلب أو أن السائق يعاني من مرض السكري. فيجب كتابة ذلك مع
                    إضافة تقرير طبي من جهة طبية معتمدة تفيد بقدرته على القيادة
                  </p>
                  <div className='absolute -bottom-2 right-1/2 transform translate-x-1/2 w-4 h-4 bg-[#FCF2E9] rotate-45 border-b border-r border-primary '></div>
                </div>
              )}
            </div>
          </div>
          <div className='relative w-fit'>
            <input
              type='file'
              id='medical-report-upload'
              className='absolute inset-0 w-full h-full hidden cursor-pointer'
              accept='.pdf,.doc,.docx,.jpg,.png'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev: DriverFormData) => ({
                    ...prev,
                    medicalReport: file,
                    medicalReportName: file.name,
                  }));
                }
              }}
            />
            {formData.medicalReport ? (
              <div className='flex items-center gap-2 bg-[#F5F5F5] py-2 px-3 border-2 border-primary rounded-lg mt-2 mb-12'>
                <span className='text-[#1A1A1A]'>{formData.medicalReportName}</span>
                <button
                  type='button'
                  onClick={() =>
                    setFormData((prev: DriverFormData) => ({
                      ...prev,
                      medicalReport: null,
                      medicalReportName: '',
                    }))
                  }
                  className='text-primary font-bold'
                >
                  <MdCancelPresentation size={20} />
                </button>
              </div>
            ) : (
              <label
                htmlFor='medical-report-upload'
                className='flex items-center gap-2 text-primary border-2 border-primary py-2 px-3 text-sm rounded-lg font-Rubik mt-2 mb-12 cursor-pointer'
              >
                <span>تحميل التقرير الطبي</span>
                <img src={uploadImage} alt='upload icon' />
              </label>
            )}
          </div>
        </div>
        <button
          type='submit'
          className='w-full py-4 rounded-lg text-xl bg-primary text-[#FCFCFC] mt-4'
        >
          {isEdit ? 'تحديث بيانات السائق' : 'إضافة السائق'}
        </button>
      </form>
    </>
  );
};

export default DriverForm;
