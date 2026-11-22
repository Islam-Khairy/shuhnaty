import { Admin, AdminFormData } from "../../types/admins";

export const addEditAdminInputsData = [
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
    type: 'password',
    description: ['لا تقل عن 8 أحرف', 'حروف وأرقام إنجليزية فقط'],
  },
];

export const fieldsToCheck: (keyof Admin)[] = [
  'id',
  'userName',
  'firstName',
  'lastName',
  'email',
  'nationality',
  'status',
];

export const EMPTY_ADMIN_FORM_DATA: AdminFormData = {
  nationalityId: 1,
  firstName: '',
  lastName: '',
  userName: '',
  phoneNumber: '',
  email: '',
  password: '',
  image: null,
  imagePreview: '',
};

export const adminToFormData = (admin: Admin): AdminFormData => ({
  nationalityId: admin.nationalityId ?? 1,
  firstName: admin.firstName ?? '',
  lastName: admin.lastName ?? '',
  userName: admin.userName ?? '',
  phoneNumber: admin.phoneNumber ?? '',
  email: admin.email ?? '',
  password: admin.password ?? '',
  image: null,
  imagePreview: admin.image ?? '',
});