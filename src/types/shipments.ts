export type ShipmentStatus =
  | 'shipping'
  | 'delayed'
  | 'delivered'
  | 'canceled'
  | 'returned'
  | 'completed';

export interface History {
  id?: number;
  label: string;
  admin: string;
  date: string;
}

export interface Shipment {
  id: number;
  trackingNumber: string;
  adminId: number;
  shipperId: number;
  driverId: number;
  recipientId: number;
  admin: string;
  shipper: string;
  recipient: string;
  driver: string;
  shipperBranch: string;
  shipperBranchId: number;
  status: ShipmentStatus;
  statusId: number;
  pickupCity: string;
  dropOffCity: string;
  pickupDate: string;
  expectedDeliveryDate: string;
  content: string;
  weight: number;
  shipmentNotes: string;
  baseCost: number;
  extraCost: number;
  deduct: number;
  stayedNights: number;
  costPerNight: number;
  shipperNotes: string | null;
  recipientNotes: string | null;
  history: History[];
}

export interface ShipmentFormData {
  driverId: number;
  driverVehicleId: number;
  driverVehicleNumber: string;
  driverPhoneNumber: string;
  shipmentPickupCityId: number;
  shipmentDropOffCityId: number;
  shipmentPickupDate: string;
  shipmentExpectedDeliveryDate: string;
  shipmentContent: string;
  shipmentWeight: number;
  shipmentNotes: string;
  shipperId: number;
  shipperBranchId: number;
  shipperAddress: string;
  shipperPrimaryPhoneNumber: string;
  shipperSecondaryPhoneNumber: string;
  shipperNotes: string;
  recipientId: number;
  recipientAddress: string;
  recipientPrimaryPhoneNumber: string;
  recipientSecondaryPhoneNumber: string;
  recipientNotes: string;
  baseCost: number;
  extraCost: number;
  stayedNights: number;
  costPerNight: number;
  deduct: number;
}
