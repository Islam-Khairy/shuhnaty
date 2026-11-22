import { Message } from '../../types/alertMessages';
import { Driver } from '../../types/drivers';
import repeatIcon from '/images/refresh-2.svg';
const Messages = ({
  messagesData,
  selectedMessageId,
  setSelectedMessageId,
  setIsDialogVisible,
  selectedCategory,
}: {
  messagesData: Message[];
  selectedMessageId: number;
  setSelectedMessageId: (id: number) => void;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
}) => {
  return (
    <div className='mt-6'>
      {messagesData
        .filter((message: Message) => message.category === selectedCategory)
        .map((message: Message, index: number) => (
          <div
            onClick={() => {
              setSelectedMessageId(message?.id);
            }}
            key={index}
            className={`my-2 p-5 cursor-pointer flex flex-col rounded-lg ${
              selectedMessageId === message?.id && 'bg-[#F2F2F2]'
            } transition-all duration-200`}
          >
            <div className='flex justify-between items-center mb-2'>
              <span className='text-primary text-lg'>{message.title}</span>
              <span className='font-Rubik text-[#333333] my-2 text-xs'>{message.date}</span>
            </div>
            <span className='overflow-hidden text-ellipsis whitespace-nowrap font-Rubik text-xs'>
              {message?.drivers?.map(
                (driver: Driver, index: number) =>
                  `${driver?.name}${index === message?.drivers.length - 1 ? '' : '، '}`,
              )}
            </span>
            {selectedCategory === 'repeated' && (
              <div className='flex justify-end mt-1'>
                <button
                  type='button'
                  className='w-fit'
                  onClick={() => setIsDialogVisible(true)}
                >
                  <img
                    src={repeatIcon}
                    alt='repeat'
                  />
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Messages;
