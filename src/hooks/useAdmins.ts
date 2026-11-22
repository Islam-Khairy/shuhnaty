import { useState } from 'react';
import { AdminFormData } from '../types/admins';
import { EMPTY_ADMIN_FORM_DATA } from '../lib/data/admins';

export const useAdmins = (initialData?: AdminFormData) => {
  const [formData, setFormData] = useState<AdminFormData>(
    initialData ?? EMPTY_ADMIN_FORM_DATA,
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
    setFormData((prev: AdminFormData) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    handleFileChange,
    handleChange,
  };
};
