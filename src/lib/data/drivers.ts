import { Driver, DriverFormData } from "../../types/drivers";

export const driverSectionInputsData = [
  {
    label: 'الاسم',
    name: 'name',
  },
  {
    label: 'رقم الهوية/الإقامة',
    name: 'identityNumber',
  },
  {
    label: 'رقم الهاتف',
    name: 'phoneNumber',
  },
  {
    label: 'الفرع',
    name: 'branch',
  },
  {
    label: 'رقم الشاحنة',
    name: 'vehicleNumber',
  },
];

export const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'يوم', value: 'day' },
  { label: 'أسبوع', value: 'week' },
  { label: 'شهر', value: 'month' },
];

export const fieldsToCheck: (keyof Driver)[] = [
  'id',
  'name',
  'nationality',
  'identityNumber',
  'phoneNumber',
  'vehicleNumber',
  'status',
];

export const EMPTY_DRIVER_FORM_DATA: DriverFormData = {
  id: 0,
  name: '',
  nationalityId: 0,
  languageId: 0,
  identityNumber: '',
  phoneNumber: '',
  branch: '',
  vehicleId: 0,
  vehicleType: '',
  vehicleNumber: '',
  image: null,
  imagePreview: '',
  licenseIssueDate: '',
  licenseExpirationDate: '',
  medicalReport: null,
  medicalReportName: '',
};

export const driverToFormData = (driver: Driver): DriverFormData => ({
  id: driver.id,
  name: driver.name ?? '',
  nationalityId: driver.nationalityId ?? 0,
  languageId: driver.languageId ?? 0,
  identityNumber: driver.identityNumber ?? '',
  phoneNumber: driver.phoneNumber ?? '',
  branch: driver.branch ?? '',
  vehicleId: driver.vehicleId ?? 0,
  vehicleType: driver.vehicleType ?? '',
  vehicleNumber: driver.vehicleNumber ?? '',
  image: null,
  imagePreview: driver.image ?? '',
  licenseIssueDate: driver.licenseIssueDate ?? '',
  licenseExpirationDate: driver.licenseExpirationDate ?? '',
  medicalReport: null,
  medicalReportName: '',
});
