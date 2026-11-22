import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Option {
  label: string;
  value: string;
}

export function SelectMenu({
  selectedItem,
  setSelectedItem,
  options,
}: {
  selectedItem: string;
  setSelectedItem: (value: string) => void;
  options: Option[];
}) {
  const currentLabel = options.find((opt) => opt.value === selectedItem)?.label;

  return (
    <div className='m-1' dir='rtl'>
      <Select value={selectedItem} onValueChange={setSelectedItem} dir='rtl'>
        <SelectTrigger dir='rtl' className='min-w-[130px] h-9 text-[#666666] text-sm font-Rubik border-gray-300 bg-white hover:border-gray-400 text-right'>
          <SelectValue>{currentLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent align='end' dir='rtl' className='font-Rubik text-right'>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              dir='rtl'
              className='font-Rubik text-right'
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectMenu;
