import { useState } from 'react';
import imageIcon from '/images/gallery.svg';

export default function ImageModal({
  image,
  fileName,
  status,
}: {
  image: string | undefined;
  fileName: string;
  status: string | undefined;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className={`${
          status === 'active' ? 'text-[#1A1A1A]' : 'text-primary'
        } normal-case flex items-center gap-2 px-0 text-sm`}
      >
        <span>{fileName}</span>
        <div className='xs:hidden block w-4 h-4'>
          <img src={imageIcon} alt='license image' className='w-full h-full' />
        </div>
      </button>

      {open && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onMouseDown={() => setOpen(false)}
        >
          <div
            className='bg-white w-[600px] max-w-[90vw] rounded-xl overflow-hidden'
            onMouseDown={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt='modal image'
              loading='eager'
              fetchPriority='high'
              className='object-contain w-full'
            />
          </div>
        </div>
      )}
    </>
  );
}
