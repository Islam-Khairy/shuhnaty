import { useState } from 'react';
import { DriverFormData } from '../types/drivers';
import { EMPTY_DRIVER_FORM_DATA } from '../lib/data/drivers';

export const useDrivers = (initialData?: DriverFormData) => {
  const [formData, setFormData] = useState<DriverFormData>(
    initialData ?? EMPTY_DRIVER_FORM_DATA,
  );

  const handleFileChange = (file: File | null, previewUrl: string | null) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: previewUrl || prev.imagePreview,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: DriverFormData) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    handleFileChange,
    handleChange,
  };
};
