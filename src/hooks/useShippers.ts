import { useState } from 'react';
import { Branch, newBranchData } from '../types/shippers';
import { EMPTY_SHIPPER_FORM_DATA } from '../lib/data/shippers';

export interface ShipperInitialData {
  main: Branch;
  branches: newBranchData[];
}

export const useShippers = (initialData?: ShipperInitialData) => {
  const [mainFormData, setMainFormData] = useState<Branch>(
    initialData?.main ?? EMPTY_SHIPPER_FORM_DATA.main,
  );
  const [branches, setBranches] = useState<newBranchData[]>(
    initialData?.branches ?? EMPTY_SHIPPER_FORM_DATA.branches,
  );

  const handleMainFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMainFormData((prev: Branch) => ({ ...prev, [name]: value }));
  };

  const handleBranchChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBranches((prev: newBranchData[]) => {
      const updatedBranches = [...prev];
      updatedBranches[index] = {
        ...updatedBranches[index],
        [name]: value,
      };
      return updatedBranches;
    });
  };

  const addNewBranch = () => {
    setBranches((prev: newBranchData[]) => [
      ...prev,
      {
        name: '',
        email: '',
        address: '',
        primaryPhoneNumber: '',
        secondaryPhoneNumber: '',
        description: '',
      },
    ]);
  };

  const deleteBranch = (index: number) => {
    setBranches((prev: newBranchData[]) => prev.filter((_, i) => i !== index));
  };

  return {
    handleMainFormChange,
    handleBranchChange,
    addNewBranch,
    deleteBranch,
    mainFormData,
    setMainFormData,
    branches,
    setBranches,
  };
};
