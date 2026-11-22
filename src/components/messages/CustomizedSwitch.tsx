interface CustomSwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function CustomSwitchComponent({ checked, onChange }: CustomSwitchProps) {
  return (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        className='sr-only peer'
        checked={checked}
        onChange={(e) => onChange(e, e.target.checked)}
      />
      <div className='w-[42px] h-[26px] rounded-full bg-[#E6E6E6] transition-colors duration-300 peer-checked:bg-[#E6E6E6]' />
      <div
        className={`absolute top-[1px] left-[1px] w-6 h-6 rounded-full transition-all duration-300 ${
          checked
            ? 'translate-x-4 bg-[#349848]'
            : 'translate-x-0 bg-[#666666]'
        }`}
      />
    </label>
  );
}
