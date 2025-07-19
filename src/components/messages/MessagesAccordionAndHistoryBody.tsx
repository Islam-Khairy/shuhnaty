/* eslint-disable @typescript-eslint/no-explicit-any */
import RepeatMessageDialog from './dialog/RepeatMessageDialog';
import MessagesHistoryBody from './MessagesHistoryBody';
import MessageTitleAccordion from './MessageTitleAccordion';
import repeatIcon from '/images/refresh-3.svg';
import sendIcon from '/images/send.svg';
const MessagesAccordionAndHistoryBody = ({
  data,
  index,
  isDialogVisible,
  setIsDialogVisible,
  selectedCategory,
}: any) => {
  return (
    <>
      <MessagesHistoryBody
        data={data}
        index={index}
        selectedCategory={selectedCategory}
      />
      <div className='mt-10 mb-4'>
        <MessageTitleAccordion />
      </div>
      <div>
        <input
          type='text'
          placeholder='أدخل نص الرسالة'
          className='w-full p-2 border-none rounded-lg outline-none font-Rubik'
        />
        <div
          className={`mt-6 flex justify-end items-center ${
            selectedCategory === 'repeated' && 'gap-4'
          }`}
        >
          {selectedCategory === 'repeated' && (
            <button onClick={() => setIsDialogVisible(true)}>
              {' '}
              <img
                src={repeatIcon}
                alt='repeat'
              />
            </button>
          )}
          <button className='bg-[#DD7E1F] p-2 rounded-full'>
            <img
              src={sendIcon}
              alt='send'
            />
          </button>
        </div>
      </div>
      <RepeatMessageDialog
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
      />
    </>
  );
};

export default MessagesAccordionAndHistoryBody;
