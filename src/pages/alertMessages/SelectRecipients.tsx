import { useState, useEffect, useMemo } from 'react';
import SelectMenu from '../../components/SelectMenu';
import SearchInput from '../../components/searchInput/SearchInput';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import leftArrowIcon from '/images/arrow-left.svg';
import { drivers, messageHistoryData } from '../../lib/data/mainData';
import DriversTable from '../../components/adminsDrivers/drivers/DriversTable';
import { useFilteredSearchValue } from '../../hooks/useFilteredSearchValue';
import { selectMenuOptions } from '../../lib/data/shared';
import { fieldsToCheck } from '../../lib/data/drivers';
import { PageLoader } from '../../components/shared/PageLoader';
import { Driver } from '../../types/drivers';

const LAST_MESSAGE_STORAGE_KEY = 'lastSelectedAlertMessageId';

const SelectRecipients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const locationState = location.state as {
    messageId?: number;
    initialDriverIds?: number[];
    selectedDriverIds?: number[];
  } | null;

  const messageId = useMemo(() => {
    const param = searchParams.get('messageId');
    if (param) {
      sessionStorage.setItem(LAST_MESSAGE_STORAGE_KEY, param);
      return Number(param);
    }
    if (locationState?.messageId) {
      sessionStorage.setItem(LAST_MESSAGE_STORAGE_KEY, String(locationState.messageId));
      return locationState.messageId;
    }
    const saved = sessionStorage.getItem(LAST_MESSAGE_STORAGE_KEY);
    return saved ? Number(saved) : (messageHistoryData[0]?.id ?? 1);
  }, [searchParams, locationState?.messageId]);

  const targetMessage = useMemo(() => {
    return messageHistoryData.find((m) => m.id === messageId) ?? messageHistoryData[0];
  }, [messageId]);

  const [selectedDriverStatus, setSelectedDriverStatus] = useState('all');

  const [selectedDriverIds, setSelectedDriverIds] = useState<number[]>(() => {
    if (locationState?.initialDriverIds !== undefined) {
      return locationState.initialDriverIds;
    }
    if (locationState?.selectedDriverIds !== undefined) {
      return locationState.selectedDriverIds;
    }
    return targetMessage?.drivers?.map((d: Driver) => d.id) ?? [];
  });

  const [isLoading, setIsLoading] = useState(true);

  const { filteredData, searchValue, setSearchValue } = useFilteredSearchValue(
    fieldsToCheck,
    drivers,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectionChange = (newIds: number[]) => {
    setSelectedDriverIds(newIds);
  };

  const handleReturn = () => {
    const updatedDrivers = drivers.filter((d: Driver) => selectedDriverIds.includes(d.id));
    const targetInMainData = messageHistoryData.find((m) => m.id === messageId);
    if (targetInMainData) {
      targetInMainData.drivers = updatedDrivers;
    }

    sessionStorage.setItem(LAST_MESSAGE_STORAGE_KEY, String(messageId));

    navigate(`/alert-messages?messageId=${messageId}`, {
      state: {
        messageId,
        selectedDriverIds,
      },
    });
  };

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <div className='p-4'>
        <div className='flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between mb-10'>
          <SearchInput
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />

          <button
            type='button'
            className='flex items-center py-2 px-10 gap-2 rounded-lg bg-primary text-white text-lg'
            onClick={handleReturn}
          >
            متابعة
            <img src={leftArrowIcon} alt='continue' />
          </button>
        </div>
        <div className='shadow-xl rounded-3xl px-8 py-4'>
          <div className='w-full flex justify-between items-center mb-6'>
            <h1 className='text-xl font-bold'>قائمة السائقين</h1>

            <SelectMenu
              options={selectMenuOptions}
              selectedItem={selectedDriverStatus}
              setSelectedItem={setSelectedDriverStatus}
            />
          </div>
          <DriversTable
            selectedStatus={selectedDriverStatus}
            drivers={filteredData}
            isSelectRecipientsPage={true}
            selectedDriverIds={selectedDriverIds}
            onSelectedDriverIdsChange={handleSelectionChange}
          />
        </div>
      </div>
    </>
  );
};

export default SelectRecipients;
