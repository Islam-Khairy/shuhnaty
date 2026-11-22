import { useState } from 'react';

interface NotesAreaProps {
  name?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  mode?: 'add' | 'edit';
  /** 'shipper' shows facility-description labels; 'shipment'/'recipient' show generic notes labels. */
  variant?: 'shipment' | 'shipper' | 'recipient';
  existingNotes?: boolean;
  placeholder?: string;
}

const NotesArea = ({
  name,
  value,
  onChange,
  mode = 'add',
  variant = 'shipment',
  existingNotes,
  placeholder = 'يمكنك هنا إضافة ملاحظات يجب أن ينتبه لها السائق',
}: NotesAreaProps) => {
  const [isNotesAreaVisible, setIsNotesAreaVisible] = useState(false);

  const buttonLabel = (() => {
    if (variant === 'shipper') {
      return mode === 'edit' && existingNotes ? 'تعديل وصف المنشأة' : 'أضف وصف للمنشأة';
    }
    return mode === 'edit' && existingNotes ? 'تعديل الملاحظات' : 'إضافة ملاحظات';
  })();

  const areaLabel = variant === 'shipper' ? 'وصف المنشأة' : 'ملاحظات';

  return (
    <>
      {isNotesAreaVisible ? (
        <div className='w-full flex flex-col items-start mb-12'>
          <span>{areaLabel}</span>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='w-full h-56 mt-4 mb-2 p-4 border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none font-Rubik'
          />
          <div className='w-full flex items-center justify-end'>
            <button
              type='button'
              onClick={() => setIsNotesAreaVisible(false)}
              className='col-span-1 bg-primary text-[#FCFCFC] border border-primary p-2 rounded-lg'
            >
              إخفاء
            </button>
          </div>
        </div>
      ) : (
        <button
          type='button'
          onClick={() => setIsNotesAreaVisible(true)}
          className='col-span-1 bg-primary text-[#FCFCFC] border border-primary p-2 rounded-lg mb-6'
        >
          {buttonLabel}
        </button>
      )}
    </>
  );
};

export default NotesArea;
