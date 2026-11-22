import { useState } from 'react';
import SearchInput from '../searchInput/SearchInput';
import Messages from './Messages';
import { Message } from '../../types/alertMessages';

interface MessagesHistoryPanelProps {
  messagesData: Message[];
  selectedMessageId: number;
  setSelectedMessageId: (id: number) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessagesHistoryPanel = ({
  messagesData,
  selectedMessageId,
  setSelectedMessageId,
  selectedCategory,
  setIsDialogVisible,
}: MessagesHistoryPanelProps) => {
  const [searchValue, setSearchValue] = useState('');

  const filtered = searchValue.trim()
    ? messagesData.filter((m) =>
        m.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : messagesData;

  return (
    <div className='flex flex-col h-full px-3'>
      <div className='pt-4 pb-2'>
        <SearchInput
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          styles='!rounded-2xl'
        />
      </div>

      <Messages
        messagesData={filtered}
        selectedMessageId={selectedMessageId}
        setSelectedMessageId={setSelectedMessageId}
        selectedCategory={selectedCategory}
        setIsDialogVisible={setIsDialogVisible}
      />
    </div>
  );
};

export default MessagesHistoryPanel;
