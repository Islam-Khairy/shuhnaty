import { useState } from 'react';
import CustomSwitchComponent from './CustomizedSwitch';
import { useNavigate } from 'react-router-dom';
import MessageTitleAccordion from './MessageTitleAccordion';
import repeatIcon from '/images/refresh-3.svg';
import sendIcon from '/images/send.svg';
import RepeatMessageDialog from './dialog/RepeatMessageDialog';
import { PageLoader } from '../shared/PageLoader';
import { toast } from 'sonner';
import { Message, MessageContent } from '../../types/alertMessages';
import { Driver } from '../../types/drivers';

const MessagesHistoryBody = ({
  data,
  selectedMessageId,
  selectedCategory,
  isDialogVisible,
  setIsDialogVisible,
}: {
  data: Message[];
  selectedMessageId: number;
  selectedCategory: string;
  isDialogVisible: boolean;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messageText, setMessageText] = useState('');

  const sendMessage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessageText('');
      toast.success('تم إرسال الرسالة بنجاح');
    }, 2000);
  };

  const selectedMessage = data.find((message: Message) => message.id === selectedMessageId);

  return (
    <>
      <PageLoader isLoading={isLoading} />

      <div className='flex flex-col h-full lg:ps-16'>

        <div className='flex-none py-1.5 sm:py-2 border-b border-[#EEEEEE] bg-white'>
          <div className='w-full flex items-center justify-between gap-2 mb-1 sm:mb-2'>
            <div className='flex items-center gap-1.5 min-w-0 flex-1'>
              <span className='text-[#333333] text-sm sm:text-base font-medium shrink-0'>إرسال إلى:</span>
              {selectedMessage && (
                <span className='overflow-hidden text-ellipsis whitespace-nowrap font-Rubik text-xs sm:text-sm text-[#666666]'>
                  {selectedMessage.drivers && selectedMessage.drivers.length > 0
                    ? selectedMessage.drivers.map((driver: Driver) => driver?.name).join('، ')
                    : 'لم يتم تحديد أي سائقين'}
                </span>
              )}
            </div>
            <button
              type='button'
              onClick={() => {
                navigate(`/alert-messages/select-recipients?messageId=${selectedMessageId}`, {
                  state: {
                    messageId: selectedMessageId,
                    initialDriverIds: selectedMessage?.drivers?.map((d: Driver) => d.id) || [],
                  },
                });
              }}
              className='text-primary font-Rubik text-xs sm:text-sm underline shrink-0 hover:opacity-80'
            >
              تعديل
            </button>
          </div>

          {selectedCategory === 'repeated' && (
            <div
              className={`flex items-center justify-between gap-2 ${
                isChecked ? 'bg-[#67CB7B] text-[#FCFCFC]' : 'bg-[#CCC] text-[#666666]'
              } px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg font-Rubik text-xs sm:text-sm mt-1 sm:mt-2`}
            >
              <div className='flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4 min-w-0'>
                <span className='font-medium truncate'>رسالة كل 6 ساعات لمدة أسبوع</span>
                <span className='text-[11px] sm:text-xs opacity-90 truncate'>باقٍ على الانتهاء: 3 أيام و19 ساعة</span>
              </div>
              <div className='shrink-0'>
                <CustomSwitchComponent
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
              </div>
            </div>
          )}
        </div>

        <div className='flex-1 min-h-0 overflow-y-auto'>
          <div className='flex flex-col gap-4 sm:gap-6 text-[#FCFCFC] font-Rubik mt-2 sm:mt-6 bg-[#ECF8EF] px-2 sm:px-6 py-2 rounded-xl'>
            {selectedMessage &&
              selectedMessage.messages?.map((message: MessageContent, index: number) => (
                <div
                  key={index}
                  className='bg-primary p-2 sm:p-4 rounded-xl sm:w-80'
                >
                  <h1 className='mb-4'>{message.content}</h1>
                  <p className='text-end text-xs'>{message.time}</p>
                </div>
              ))}
          </div>
        </div>

        <div className='flex-none border-t border-[#EEEEEE] bg-white pt-2.5 pb-3'>
          <div className='mb-2'>
            <MessageTitleAccordion />
          </div>
          <div className='flex items-center border border-[#CCCCCC] rounded-lg bg-white px-2 py-1 focus-within:border-primary transition-colors'>
            <input
              type='text'
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              placeholder='أدخل نص الرسالة'
              className='flex-1 min-w-0 px-2 py-1.5 bg-transparent border-none outline-none font-Rubik text-sm text-[#333333] placeholder:text-[#AAAAAA]'
            />
            <div className='flex items-center gap-1.5 shrink-0 ps-1'>
              {selectedCategory === 'repeated' && (
                <button
                  type='button'
                  className='p-1 rounded-full hover:bg-gray-100 transition-colors'
                  onClick={() => setIsDialogVisible(true)}
                  title='تكرار الرسالة'
                >
                  <img
                    src={repeatIcon}
                    alt='repeat'
                    className='w-4.5 h-4.5'
                  />
                </button>
              )}
              <button
                type='button'
                className='bg-primary p-1.5 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center'
                onClick={sendMessage}
                title='إرسال'
              >
                <img
                  src={sendIcon}
                  alt='send'
                  className='w-4 h-4'
                />
              </button>
            </div>
          </div>
        </div>

        <RepeatMessageDialog
          isDialogVisible={isDialogVisible}
          setIsDialogVisible={setIsDialogVisible}
        />
      </div>
    </>
  );
};

export default MessagesHistoryBody;
