import { Shipment, ShipmentFormData } from '../../types/shipments';
import { cities, drivers, recipients, shippers } from './mainData';
import { arabicDateStringToISO } from '../utils';

export const EMPTY_SHIPMENT_FORM_DATA: ShipmentFormData = {
  driverId: 0,
  driverVehicleId: 0,
  driverVehicleNumber: '',
  driverPhoneNumber: '',
  shipmentPickupCityId: 0,
  shipmentDropOffCityId: 0,
  shipmentPickupDate: '',
  shipmentExpectedDeliveryDate: '',
  shipmentContent: '',
  shipmentWeight: 0,
  shipmentNotes: '',
  shipperId: 0,
  shipperBranchId: 0,
  shipperAddress: '',
  shipperPrimaryPhoneNumber: '',
  shipperSecondaryPhoneNumber: '',
  shipperNotes: '',
  recipientId: 0,
  recipientAddress: '',
  recipientPrimaryPhoneNumber: '',
  recipientSecondaryPhoneNumber: '',
  recipientNotes: '',
  baseCost: 0,
  extraCost: 0,
  stayedNights: 0,
  costPerNight: 0,
  deduct: 0,
};

export function shipmentToFormData(shipment: Shipment): ShipmentFormData {
  const driver = drivers.find((d) => d.id === shipment.driverId);
  const shipper = shippers.find((s) => s.id === shipment.shipperId);
  const recipient = recipients.find((r) => r.id === shipment.recipientId);

  return {
    driverId: driver?.id ?? 0,
    driverVehicleId: driver?.vehicleId ?? 0,
    driverVehicleNumber: driver?.vehicleNumber ?? '',
    driverPhoneNumber: driver?.phoneNumber ?? '',
    shipmentPickupCityId: cities.find((c) => c.name === shipment.pickupCity)?.id ?? 0,
    shipmentDropOffCityId: cities.find((c) => c.name === shipment.dropOffCity)?.id ?? 0,
    shipmentPickupDate: arabicDateStringToISO(shipment.pickupDate) ?? '',
    shipmentExpectedDeliveryDate: arabicDateStringToISO(shipment.expectedDeliveryDate) ?? '',
    shipmentContent: shipment.content ?? '',
    shipmentWeight: shipment.weight ?? 0,
    shipmentNotes: shipment.shipmentNotes ?? '',
    shipperId: shipper?.id ?? 0,
    shipperBranchId: shipment.shipperBranchId ?? 0,
    shipperAddress: shipper?.address ?? '',
    shipperPrimaryPhoneNumber: shipper?.primaryPhoneNumber ?? '',
    shipperSecondaryPhoneNumber: shipper?.secondaryPhoneNumber ?? '',
    shipperNotes: shipment.shipperNotes ?? '',
    recipientId: recipient?.id ?? 0,
    recipientAddress: recipient?.address ?? '',
    recipientPrimaryPhoneNumber: recipient?.primaryPhoneNumber ?? '',
    recipientSecondaryPhoneNumber: recipient?.secondaryPhoneNumber ?? '',
    recipientNotes: shipment.recipientNotes ?? '',
    baseCost: shipment.baseCost ?? 0,
    extraCost: shipment.extraCost ?? 0,
    stayedNights: shipment.stayedNights ?? 0,
    costPerNight: shipment.costPerNight ?? 0,
    deduct: shipment.deduct ?? 0,
  };
}

export const driverSectionInputsData = [
  { label: 'رقم الشاحنة', name: 'driverVehicleNumber' },
  { label: 'رقم الهاتف', name: 'driverPhoneNumber' },
];

export const costSectionInputsData = [
  { label: 'التكلفة الأساسية', name: 'baseCost', type: 'number' },
  { label: 'الزيادة', name: 'extraCost', type: 'number' },
];

export const shipmentSectionInputsData = [
  {
    label: 'تاريخ التحميل',
    name: 'shipmentPickupDate',
    type: 'date',
    description:
      'يتم تحديد تاريخ التحميل بشكل تلقائي حسب تاريخ اليوم، إذا كانت الشحنة تستلزم تاريخا محدددا للتحميل يمكنك التعديل بناء عليه.',
  },
  {
    label: 'تاريخ التسليم',
    name: 'shipmentExpectedDeliveryDate',
    type: 'date',
    description: 'أكّد مع المستلم التاريخ الدقيق للاستلام',
  },
  { label: 'المحتويات', name: 'shipmentContent' },
  { label: 'الوزن بالطن', name: 'shipmentWeight' },
];

export const shipperSectionInputsData = [{ label: 'العنوان', name: 'shipperAddress' }];

export const recipientSectionInputsData = [{ label: 'العنوان', name: 'recipientAddress' }];

export const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'قيد الشحن', value: 'shipping' },
  { label: 'متأخرة', value: 'delayed' },
  { label: 'تم التوصيل', value: 'delivered' },
  { label: 'مكتملة', value: 'completed' },
  { label: 'ملغية', value: 'canceled' },
  { label: 'مرتجعة', value: 'returned' },
];

export const fieldsToCheck: (keyof Shipment)[] = [
  'id',
  'admin',
  'recipient',
  'driver',
  'shipperBranch',
  'pickupCity',
  'dropOffCity',
  'pickupDate',
  'status',
];
