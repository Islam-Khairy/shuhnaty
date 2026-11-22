import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ChevronDown, Package } from 'lucide-react';

interface SidebarAccordionProps {
  items: { name: string; nav: string }[];
  title: string;
  isSelected: (path: string) => boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function SidebarAccordion({
  items,
  title,
  isSelected,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarAccordionProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isShipmentsSelected = isSelected('/shipments');

  const handleOpenChange = (open: boolean) => {
    if (!isSidebarOpen) {
      setIsSidebarOpen(true);
    }
    setIsOpen(open);
  };

  return (
    <div className='w-full mb-2'>
      <Collapsible
        open={isSidebarOpen ? isOpen : false}
        onOpenChange={handleOpenChange}
      >
        <CollapsibleTrigger asChild className='w-full'>
          <button
            type='button'
            className={`flex items-center w-full gap-2 transition-colors duration-200 ${
              isSidebarOpen ? 'p-3 justify-start' : 'p-2 justify-center'
            } ${
              isShipmentsSelected && !isSidebarOpen
                ? 'bg-primary rounded-lg text-[#FCFCFC]'
                : ''
            } rounded-lg hover:bg-black/5 cursor-pointer text-[#333333]`}
          >
            <Package
              className={`size-6 transition-colors ${
                isShipmentsSelected && !isSidebarOpen ? 'text-white' : 'text-[#333333]'
              }`}
            />
            {isSidebarOpen && (
              <span className='flex-1 text-right font-medium'>{title}</span>
            )}
            {isSidebarOpen && (
              <ChevronDown
                className={`size-6 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            )}
          </button>
        </CollapsibleTrigger>

        {isSidebarOpen && (
          <CollapsibleContent className='pt-2 px-4 pb-2'>
            {items.map((item, index) => (
              <button
                type='button'
                key={item.nav}
                onClick={() => navigate(item.nav)}
                className={`flex items-center w-full ${
                  index !== items.length - 1 ? 'mb-4' : ''
                } px-3 py-2 justify-start cursor-pointer rounded-lg transition-colors ${
                  isSelected(item.nav) ? 'bg-primary text-[#FCFCFC]' : 'hover:bg-black/5'
                }`}
              >
                <span>{item.name}</span>
              </button>
            ))}
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
}

export default SidebarAccordion;
