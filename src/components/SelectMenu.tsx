/* eslint-disable @typescript-eslint/no-explicit-any */
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

const SelectMenu = React.memo(({ selectedItem, setSelectedItem, options }: any) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedItem(event.target.value);
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120 }}
      size='small'
    >
      <Select
        value={selectedItem}
        onChange={handleChange}
        sx={{
          color: '#666666',
          fontSize: '14px',
          justifyContent: 'end',
          fontFamily: 'Rubik',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#DD7E1F',
          },
        }}
      >
        {options.map((option: any) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              color: '#666666',
              fontSize: '14px',
              justifyContent: 'end',
              fontFamily: 'Rubik',
              ':hover': { backgroundColor: '#DD7E1F', color: '#FCFCFC' },
              '&.Mui-selected': {
                backgroundColor: '#FCFCFC !important',
                color: '#666666',
              },
              '&.Mui-selected:hover': {
                backgroundColor: '#DD7E1F !important',
                color: '#FCFCFC',
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default SelectMenu;
