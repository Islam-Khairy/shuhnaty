import noSelectedMessageIcon from '/images/no-selected-message.svg';

const NoSelectedMessages = () => {
  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-16'>
        <img
          src={noSelectedMessageIcon}
          alt='no selected message icon'
        />
        <h1 className='text-lg lg:text-3xl font-normal text-[#333333]'>
          اختر رسالة للاطلاع على تفاصيلها
        </h1>
      </div>
    </div>
  );
};

export default NoSelectedMessages;
