/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectMenuConfig } from '../../components/shared/FormSection';
import {
  cities,
  drivers,
  languages,
  nationalities,
  recipients,
  shippers,
  vehicles,
} from './mainData';


const getSelected = (
  options: { id: number }[],
  formData: Record<string, any>,
  idKey: string,
): any => options.find((o) => o.id === formData[idKey]) ?? null;

export const driverSectionSelectMenus = (
  formData: Record<string, any>,
): SelectMenuConfig[] => [
  {
    sectionPrefix: 'driver',
    options: drivers,
    label: 'اختر السائق',
    title: 'السائق',
    selectedItem: getSelected(drivers, formData, 'driverId'),
  },
  {
    sectionPrefix: 'driverVehicle',
    options: vehicles,
    label: 'اختر نوع الشاحنة',
    title: 'الشاحنة',
    selectedItem: getSelected(vehicles, formData, 'driverVehicleId'),
  },
];

export const shipmentSectionSelectMenus = (
  formData: Record<string, any>,
): SelectMenuConfig[] => [
  {
    sectionPrefix: 'shipmentPickupCity',
    options: cities,
    label: 'اختر مدينة التحميل',
    title: 'المدينة',
    selectedItem: getSelected(cities, formData, 'shipmentPickupCityId'),
  },
  {
    sectionPrefix: 'shipmentDropOffCity',
    options: cities,
    label: 'اختر مدينة التسليم',
    title: 'المدينة',
    selectedItem: getSelected(cities, formData, 'shipmentDropOffCityId'),
  },
];

export const shipperSectionSelectMenus = (
  formData: Record<string, any>,
): SelectMenuConfig[] => [
  {
    sectionPrefix: 'shipper',
    options: shippers,
    label: 'اختر المرسِل',
    title: 'المرسِل',
    selectedItem: getSelected(shippers, formData, 'shipperId'),
  },
];

export const recipientSectionSelectMenus = (
  formData: Record<string, any>,
): SelectMenuConfig[] => [
  {
    sectionPrefix: 'recipient',
    options: recipients,
    label: 'اختر المستلم',
    title: 'المستلم',
    selectedItem: getSelected(recipients, formData, 'recipientId'),
  },
];

export const adminSelectMenus = (
  formData: Record<string, any>,
): SelectMenuConfig[] => [
  {
    identifier: 'nationality',
    options: nationalities,
    label: 'اختر جنسية المستخدم',
    title: 'الجنسية',
    selectedItem: getSelected(nationalities as { id: number }[], formData, 'nationalityId'),
  },
];

export const driverFormSelectMenus = (
  formData: Record<string, any>,
): SelectMenuConfig[] => [
  {
    identifier: 'vehicle',
    options: vehicles,
    label: 'اختر نوع الشاحنة',
    title: 'الشاحنة',
    selectedItem: getSelected(vehicles, formData, 'vehicleId'),
  },
  {
    identifier: 'nationality',
    options: nationalities,
    label: 'اختر جنسية السائق',
    title: 'الجنسية',
    selectedItem: getSelected(nationalities as { id: number }[], formData, 'nationalityId'),
  },
  {
    identifier: 'language',
    options: languages,
    label: 'اختر اللغة',
    title: 'اللغة',
    selectedItem: getSelected(languages as { id: number }[], formData, 'languageId'),
  },
];
