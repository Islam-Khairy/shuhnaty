import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  onCheckedChange,
  className,
  id,
  disabled,
}: CheckboxProps) {
  return (
    <label className={cn('relative inline-flex items-center justify-center cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          onChange?.(e);
          onCheckedChange?.(e.target.checked);
        }}
        className='sr-only peer'
      />
      <div
        className={cn(
          'size-4 rounded-sm border flex items-center justify-center transition-all duration-150 shrink-0',
          'border-gray-300 bg-white hover:border-primary/70',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-1',
          checked && 'bg-primary border-primary text-white hover:border-primary hover:bg-[#c96f18]',
          className,
        )}
      >
        {checked && <Check className='size-3 stroke-[3]' />}
      </div>
    </label>
  );
}

export default Checkbox;
