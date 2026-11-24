import { useState, useEffect, useMemo } from 'react';
import MessagesHistoryBody from '../../components/messages/MessagesHistoryBody';
import MessagesHistoryPanel from '../../components/messages/MessagesHistoryPanel';
import NoSelectedMessages from '../../components/messages/NoSelectedMessages';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { messageHistoryData, drivers } from '../../lib/data/mainData';
import { PageLoader } from '../../components/shared/PageLoader';
import { Message } from '../../types/alertMessages';
import { Driver } from '../../types/drivers';
import addMessageIcon from '/images/add-message.svg';

const LAST_MESSAGE_STORAGE_KEY = 'lastSelectedAlertMessageId';

const AlertMessages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const locationState = location.state as {
    messageId?: number;
    selectedDriverIds?: number[];
  } | null;


  const currentMessageId = useMemo(() => {
    const param = searchParams.get('messageId');
    if (param) return Number(param);
    if (locationState?.messageId) return locationState.messageId;
    const saved = sessionStorage.getItem(LAST_MESSAGE_STORAGE_KEY);
    return saved ? Number(saved) : (messageHistoryData[0]?.id ?? null);
  }, [searchParams, locationState?.messageId]);

  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(currentMessageId);
  const [messages, setMessages] = useState<Message[]>(messageHistoryData);

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const targetId = currentMessageId;
    if (targetId) {
      const msg = messageHistoryData.find((m) => m.id === targetId);
      if (msg?.category) return msg.category;
    }
    return 'once';
  });

  const [isRepeatMessageDialogVisible, setIsRepeatMessageDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileView, setMobileView] = useState<'panel' | 'body'>('panel');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const state = location.state as {
      messageId?: number;
      selectedDriverIds?: number[];
    } | null;

    const targetId =
      state?.messageId ||
      currentMessageId ||
      (sessionStorage.getItem(LAST_MESSAGE_STORAGE_KEY)
        ? Number(sessionStorage.getItem(LAST_MESSAGE_STORAGE_KEY))
        : null);

    if (targetId) {
      setSelectedMessageId(targetId);
      sessionStorage.setItem(LAST_MESSAGE_STORAGE_KEY, String(targetId));

      if (state?.selectedDriverIds) {
        const updatedDrivers = drivers.filter((d: Driver) =>
          state.selectedDriverIds!.includes(d.id),
        );

        const targetInMainData = messageHistoryData.find((m) => m.id === targetId);
        if (targetInMainData) {
          targetInMainData.drivers = updatedDrivers;
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === targetId ? { ...msg, drivers: updatedDrivers } : msg,
          ),
        );
      } else {
        setMessages([...messageHistoryData]);
      }

      const targetMsg = messageHistoryData.find((m) => m.id === targetId);
      if (targetMsg?.category) {
        setSelectedCategory(targetMsg.category);
      }
    }
  }, [currentMessageId, location.state]);

  const handleSelectMessage = (id: number) => {
    setSelectedMessageId(id);
    setSearchParams({ messageId: String(id) }, { replace: true });
    sessionStorage.setItem(LAST_MESSAGE_STORAGE_KEY, String(id));
    const targetMsg = messages.find((m) => m.id === id);
    if (targetMsg?.category) {
      setSelectedCategory(targetMsg.category);
    }
    setMobileView('body');
  };

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    const currentMsg = messages.find((m) => m.id === selectedMessageId);
    if (!currentMsg || currentMsg.category !== newCategory) {
      const firstInCategory = messages.find((m) => m.category === newCategory);
      if (firstInCategory) {
        setSelectedMessageId(firstInCategory.id);
        setSearchParams({ messageId: String(firstInCategory.id) }, { replace: true });
        sessionStorage.setItem(LAST_MESSAGE_STORAGE_KEY, String(firstInCategory.id));
      }
    }
  };

  const handleOpenRecipients = () => {
    const targetId =
      selectedMessageId ??
      messages.find((m) => m.category === selectedCategory)?.id ??
      messages[0]?.id;
    const targetMsg = messages.find((m) => m.id === targetId);

    if (targetId) {
      sessionStorage.setItem(LAST_MESSAGE_STORAGE_KEY, String(targetId));
    }

    navigate(`/alert-messages/select-recipients?messageId=${targetId}`, {
      state: {
        messageId: targetId,
        initialDriverIds: targetMsg?.drivers?.map((d: Driver) => d.id) || [],
      },
    });
  };

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <div className='flex flex-col flex-1 min-h-0 lg:ms-4 border border-primary rounded-2xl mx-2 sm:mx-4 lg:mx-0 overflow-hidden'>
        <div className='flex flex-1 min-h-0'>

          <div
            className={`
              flex flex-col min-h-0
              w-full lg:w-[25%] lg:flex-none
              lg:border-l border-primary
              ${mobileView === 'panel' ? 'flex' : 'hidden'} lg:flex
            `}
          >
            <div className='flex-none p-6 pb-0 flex items-center'>
              {[
                { label: 'مرة واحدة', value: 'once' },
                { label: 'مكررة', value: 'repeated' },
              ].map((item) => (
                <button
                  key={item.value}
                  type='button'
                  onClick={() => handleCategoryChange(item.value)}
                  className={`w-1/2 text-lg transition-all duration-200 ${
                    selectedCategory === item.value
                      ? 'text-primary border-b-4 border-primary'
                      : 'text-[#666666] border-b-2 border-[#CCCCCC]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className='flex-1 min-h-0 overflow-y-auto'>
              <MessagesHistoryPanel
                messagesData={messages}
                selectedMessageId={selectedMessageId!}
                selectedCategory={selectedCategory}
                setSelectedMessageId={handleSelectMessage}
                setSelectedCategory={handleCategoryChange}
                setIsDialogVisible={setIsRepeatMessageDialogVisible}
              />
            </div>
          </div>

          <div
            className={`
              flex-1 min-w-0 overflow-hidden
              ${mobileView === 'body' ? 'flex flex-col' : 'hidden'} lg:flex lg:flex-col
            `}
          >
            <button
              type='button'
              onClick={() => setMobileView('panel')}
              className='lg:hidden flex-none flex items-center gap-2 px-4 pt-2.5 pb-1 text-primary font-semibold text-sm hover:opacity-80 transition-opacity'
            >
              <span className='text-base'>←</span>
              <span>قائمة الرسائل</span>
            </button>

            <div className='flex-1 min-h-0 h-full px-4 py-2'>
              {selectedMessageId !== null ? (
                <MessagesHistoryBody
                  data={messages}
                  selectedMessageId={selectedMessageId}
                  selectedCategory={selectedCategory}
                  isDialogVisible={isRepeatMessageDialogVisible}
                  setIsDialogVisible={setIsRepeatMessageDialogVisible}
                />
              ) : (
                <NoSelectedMessages />
              )}
            </div>
          </div>
        </div>

        <button
          type='button'
          onClick={handleOpenRecipients}
          className='p-3 rounded-full bg-primary fixed bottom-2 transition-all duration-200 lg:right-12'
        >
          <img
            src={addMessageIcon}
            alt='add message'
            className='w-10 h-10'
          />
        </button>
      </div>
    </>
  );
};

export default AlertMessages;
