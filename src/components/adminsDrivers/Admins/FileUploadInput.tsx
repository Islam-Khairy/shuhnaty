import { ChangeEvent, useState } from 'react';
import cameraIcon from '/images/camera.svg';

interface FileUploadInputProps {
  title?: string;
  initialImage?: string;
  onChange: (file: File | null, previewUrl: string | null) => void;
}

const FileUploadInput = ({
  title = 'اضغط لإضافة صورة',
  onChange,
  initialImage,
}: FileUploadInputProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    let url: string | null = null;

    if (file) {
      url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(initialImage || null);
    }

    onChange(file, url);
  };

  return (
    <div className='w-full border border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center py-8 font-Rubik relative'>
      {previewUrl ? (
        <div className='w-32 h-32 rounded-full overflow-hidden border-2 border-[#DD7E1F]'>
          <img
            src={previewUrl}
            alt='Preview'
            className='w-full h-full object-cover'
            onLoad={() => URL.revokeObjectURL(previewUrl)}
          />
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <div className='bg-[#F2F2F2] p-4 rounded-full'>
            <img
              src={cameraIcon}
              alt='camera icon'
            />
          </div>
          <span className='text-[#DD7E1F] mt-2 font-lg'>{title}</span>
        </div>
      )}
      <input
        type='file'
        className='opacity-0 absolute w-full h-full cursor-pointer'
        onChange={handleFileChange}
        accept='image/*'
      />
    </div>
  );
};

export default FileUploadInput;
