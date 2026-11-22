export interface Branch {
  id?: number;
  name: string;
  address: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  email: string;
  description: string;
  commercialRegistration?: string;
}

export interface Shipper {
  id: number;
  name: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  email: string;
  address: string;
  commercialRegistration: string;
  description: string;
  branches: newBranchData[];
}

export interface newBranchData {
    id?: number;
  name: string;
  address: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
}
