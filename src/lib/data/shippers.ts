import { Branch, newBranchData, Shipper } from "../../types/shippers";

export const fieldsToCheck: (keyof Shipper)[] = [
  'id',
  'name',
  'primaryPhoneNumber',
  'secondaryPhoneNumber',
  'email',
  'address',
];

export const shipperSectionInputsData = [
  { label: 'الاسم', name: 'name' },
  { label: 'رقم السجل التجاري', name: 'commercialRegistration' },
  { label: 'البريد الإلكتروني', name: 'email' },
  { label: 'العنوان', name: 'address' },
];

export const branchSectionInputsData = [
  { label: 'الاسم', name: 'name' },
  { label: 'العنوان', name: 'address' },
];

export const editShipperAdditionalBranchSectionInputsData = branchSectionInputsData;
export const addShipperAdditionalBranchSectionInputsData = branchSectionInputsData;

export const EMPTY_SHIPPER_FORM_DATA = {
  main: {
    name: '',
    email: '',
    address: '',
    primaryPhoneNumber: '',
    secondaryPhoneNumber: '',
    commercialRegistration: '',
    description: '',
  } as Branch,
  branches: [] as newBranchData[],
};

export const shipperToFormData = (shipper: Shipper) => ({
  main: {
    id: shipper.id,
    name: shipper.name ?? '',
    email: shipper.email ?? '',
    address: shipper.address ?? '',
    primaryPhoneNumber: shipper.primaryPhoneNumber ?? '',
    secondaryPhoneNumber: shipper.secondaryPhoneNumber ?? '',
    commercialRegistration: shipper.commercialRegistration ?? '',
    description: shipper.description ?? '',
  } as Branch,
  branches: (shipper.branches ?? []).map((branch) => ({
    id: branch.id ?? 0,
    name: branch.name ?? '',
    address: branch.address ?? '',
    primaryPhoneNumber: branch.primaryPhoneNumber ?? '',
    secondaryPhoneNumber: branch.secondaryPhoneNumber ?? '',
  })),
});