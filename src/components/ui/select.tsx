import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/60 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className='size-4 text-gray-500 transition-transform duration-200' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        dir='rtl'
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 text-[#333333] shadow-lg text-right',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            'p-1 flex flex-col gap-0.5',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      dir='rtl'
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center justify-start rounded-md px-3 py-2 text-sm outline-none transition-colors text-right',
        'focus:bg-primary focus:text-white hover:bg-primary hover:text-white',
        'data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary data-[state=checked]:font-semibold',
        'focus:data-[state=checked]:bg-primary focus:data-[state=checked]:text-white',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className='text-right w-full'>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
