/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

const AddNewItemButton = React.memo(({ title, path }: any) => {
  const navigate = useNavigate();
  console.log('AddNewItemButton rendered');
  return (
    <button
      className='flex items-center py-2 px-6 gap-2 rounded-lg bg-[#DD7E1F] text-[#FCFCFC] text-lg'
      onClick={() => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {title}
      <FiPlus size={24} />
    </button>
  );
});

export default AddNewItemButton;
