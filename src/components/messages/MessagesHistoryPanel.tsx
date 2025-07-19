/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import SearchInput from '../searchInput/SearchInput';
import Messages from './Messages';

const MessagesHistoryPanel = ({
  data,
  index,
  setIndex,
  selectedCategory,
  setSelectedCategory,
  setIsDialogVisible,
}: any) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='h-full'>
      <div className='p-6 flex items-center'>
        {[
          { label: 'مرة واحدة', value: 'once' },
          { label: 'مكررة', value: 'repeated' },
        ].map((item: any, index: number) => (
          <button
            onClick={() => setSelectedCategory(item.value)}
            key={index}
            className={`w-1/2 text-lg transition-all duration-200 ${
              selectedCategory === item.value
                ? 'text-[#DD7E1F] border-b-4 border-[#DD7E1F]'
                : 'text-[#666666] border-b-2 border-[#CCCCCC]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <SearchInput
        value={searchValue}
        onChange={(e: any) => setSearchValue(e.target.value)}
        styles='!rounded-2xl'
      />
      <Messages
        messages={data}
        selectedMessageIndex={index}
        setSelectedMessageIndex={setIndex}
        selectedCategory={selectedCategory}
        setIsDialogVisible={setIsDialogVisible}
      />
    </div>
  );
};

export default MessagesHistoryPanel;
