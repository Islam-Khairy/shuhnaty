import { useState } from 'react';
import { ShipmentFormData } from '../types/shipments';
import { EMPTY_SHIPMENT_FORM_DATA } from '../lib/data/shipments';

export const useShipment = (initialData?: ShipmentFormData) => {
  const [formData, setFormData] = useState<ShipmentFormData>(
    initialData ?? EMPTY_SHIPMENT_FORM_DATA,
  );

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string | number | object } },
  ) => {
    const { name, value } = e.target;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      setFormData((prev) => ({ ...prev, ...value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getTotalCost = () => {
    const { baseCost, extraCost, stayedNights, costPerNight, deduct } = formData;
    return (
      Number(baseCost) + Number(extraCost) + Number(stayedNights) * Number(costPerNight) - deduct
    );
  };

  return {
    formData,
    setFormData,
    handleChange,
    getTotalCost,
  };
};
