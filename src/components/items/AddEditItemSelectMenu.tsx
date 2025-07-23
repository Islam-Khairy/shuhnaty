/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface SelectMenuOption {
  [key: string]: any;
}

interface AddShipmentSelectMenuProps {
  options?: SelectMenuOption[];
  label: string;
  title?: string;
  onChange: (selected: SelectMenuOption | null) => void;
  value: SelectMenuOption | null;
  section?: 'driver' | 'shipment' | 'shipper' | 'recipient';
  disabled?: boolean;
}

const AddShipmentSelectMenu = ({
  options = [],
  label,
  title,
  onChange,
  value,
  disabled = false,
}: AddShipmentSelectMenuProps) => {
  const formattedOptions = options.map((option: SelectMenuOption, index: number) => ({
    ...option,
    label: `${index + 1}- ${option.name || 'Unknown Item'}`,
    displayIndex: index + 1,
  }));

  console.log('AddShipmentSelectMenu rendered');

  return (
    <div className='col-span-1 flex flex-col gap-1 -m-1'>
      <span className='text-[#1A1A1A]'>{label}</span>
      <Autocomplete
        disablePortal
        options={formattedOptions}
        getOptionLabel={(option) => {
          if (!option) return '';
          return option.name || '';
        }}
        disabled={disabled}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        renderOption={(props, option) => (
          <li
            {...props}
            key={option.id}
          >
            {option.displayIndex} - {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={title}
          />
        )}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#DD7E1F',
            },
            borderRadius: '8px',
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: '#DD7E1F',
            },
          },
        }}
      />
    </div>
  );
};

export default AddShipmentSelectMenu;
