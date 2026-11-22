import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import ExpandMoreIcon from '/images/arrow.svg';

const messageTitleOptions = [
  'شحنة متأخرة',
  'شحنة ملغية',
  'مشكلة في المستندات',
  'تصرف غير لائق',
  'خصم من الراتب',
  'حالة طارئة',
];

const MessageTitleAccordion = () => {
  const [messageSelectedTitle, setMessageSelectedTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='rounded-2xl overflow-hidden'
      >
        <CollapsibleTrigger className='w-full flex items-center justify-between bg-[#FCF2E9] rounded-2xl px-4 py-3'>
          <span className='text-primary'>{messageSelectedTitle || 'اختر عنوانًا للرسالة'}</span>
          <img
            src={ExpandMoreIcon}
            alt=''
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className='bg-white border border-t-0 border-gray-100 rounded-b-2xl max-h-48 overflow-y-auto'>
          <div className='flex flex-col gap-4 px-4 py-3'>
            {messageTitleOptions.map((option) => (
              <span
                key={option}
                onClick={() => { setMessageSelectedTitle(option); setIsOpen(false); }}
                className='text-primary cursor-pointer hover:underline'
              >
                {option}
              </span>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default MessageTitleAccordion;
