import { useState } from 'react';
import HorizontalChart from '../components/charts/HorizontalChart';
import { useSidebar } from '../context/SidebarContext';
import boxSearch from '/images/box-search.svg';
import boxTime from '/images/box-time.svg';
import message from '/images/message.svg';
import LineChartComponent from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import { LuCalendarClock } from 'react-icons/lu';
import { getRangeDates } from '../lib/utils';
import {
  type ChartRange,
  getLineChartData,
  getPieChartData,
  getHorizontalChartData,
  rangeArabicLabels,
  formatDateLocale,
} from '../lib/data/dashboard';

const shipmentsStatus = [
  {
    status: 'تم التوصيل',
    count: '48',
    icon: (
      <div className='p-2 rounded-full bg-[#999999] group-hover:bg-[#4D4D4D]'>
        <img
          src={boxSearch}
          alt='box Search icon'
          className='w-12 h-12 filter invert brightness-0'
        />
      </div>
    ),
    styles: 'hover:bg-[#666666] text-[#333333] hover:text-white',
  },
  {
    status: 'شحنات متأخرة',
    count: '26',
    icon: (
      <div className='p-2 rounded-full bg-[#CA8B02] group-hover:bg-[#986801]'>
        <img
          src={boxTime}
          alt='box time icon'
          className='w-12 h-12 filter invert brightness-0'
        />
      </div>
    ),
    styles: 'hover:bg-[#CA8B02] text-[#CA8B02] font-bold hover:text-white',
  },
  {
    status: 'تنبيهات السائقين',
    count: '12',
    icon: (
      <div className='p-2 rounded-full bg-primary group-hover:bg-[#864D13]'>
        <img
          src={message}
          alt='Message icon'
          className='w-12 h-12 text-[#F2F2F2]'
        />
      </div>
    ),
    styles: 'hover:bg-primary text-primary hover:text-white',
  },
];

const Dashboard = () => {
  const { isSidebarOpen } = useSidebar();
  const [selectedRange, setSelectedRange] = useState<ChartRange>('week');
  const { start, end } = getRangeDates(selectedRange);
  const lineChartData = getLineChartData(selectedRange);
  const pieChartData = getPieChartData(selectedRange);
  const horizontalChartData = getHorizontalChartData(selectedRange);

  const rangeOptions: { label: string; value: ChartRange }[] = [
    { label: 'أسبوعي', value: 'week' },
    { label: 'شهري', value: 'month' },
    { label: 'سنوي', value: 'year' },
  ];

  return (
    <div
      className='flex'
      dir='rtl'
    >
      <div className='px-4 lg:px-8 min-h-screen w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {shipmentsStatus.map((item, index) => (
            <div
              key={index}
              className={`col-span-1 p-6 rounded-2xl ${item?.styles} group transition-all duration-200 shadow-md rounded-3xl bg-[#FCFCFC]`}
            >
              <div className='flex items-center justify-between py-4'>
                <div>
                  <h4 className='xs:text-lg text-xl sm:text-2xl font-bold mb-6'>{item?.status}</h4>
                  <h5 className='xs:text-base text-lg font-medium font-Rubik'>
                    {item?.count} {item.status === 'تنبيهات السائقين' ? 'تنبيه نشط' : 'شحنة'}
                  </h5>
                </div>
                <button
                  type='button'
                  className='p-2 rounded-full bg-transparent border-none outline-none'
                >
                  {item.icon}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-6 lg:gap-0 my-10'>
          <h1 className='xs:text-lg text-2xl font-bold text-[#333333]'>تقرير الشحنات</h1>{' '}
          <div
            className={`flex items-center rounded-2xl border gap-6 md:gap-12 lg:gap-16 bg-[#F2F2F2] h-fit w-fit px-4 m-auto lg:m-0 max-w-full ${
              selectedRange === 'week' ? 'ps-0' : selectedRange === 'year' ? 'pe-0' : ''
            }`}
          >
            {rangeOptions.map((item, index) => (
              <button
                type='button'
                key={index}
                className={`font-Rubik transition-all duration-200 ${
                  selectedRange === item.value && 'bg-primary text-white py-3 px-6 rounded-2xl'
                }`}
                onClick={() => setSelectedRange(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-2'>
          <div className='p-4 col-span-1 lg:col-span-2 border border-gray-200 shadow-md rounded-3xl'>
            <div className='flex flex-col lg:flex-row justify-between'>
              <div className='w-full flex justify-between items-center lg:mt-8'>
                <div className='flex items-center gap-2'>
                  <span className='text-[#666666] xs:text-sm text-lg sm:text-xl text-nowrap font-Rubik'>
                    مكتملة:
                  </span>
                  <span className='text-[#333333] xs:text-lg text-xl sm:text-3xl font-medium'>
                    {lineChartData?.sum}
                  </span>
                </div>
                <div className='flex items-end text-nowrap gap-1'>
                  <span
                    className={`${
                      selectedRange === 'month' ? 'text-red-500' : 'text-green-500'
                    } font-bold`}
                  >
                    {((lineChartData.sum / pieChartData.sum) * 100).toFixed(1)}%
                  </span>
                  <span className='text-[#DE7F20] text-sm font-Rubik bg-[#FCF2E9] px-3 py-1 rounded-md'>
                    {' '}
                    <span>
                      {selectedRange === 'week'
                        ? 'الأسبوع'
                        : selectedRange === 'month'
                        ? 'الشهر'
                        : 'العام'}
                    </span>{' '}
                    الماضي
                  </span>
                </div>
              </div>
            </div>
            <div className='w-full flex justify-center items-center my-4 lg:mb-6 lg:mt-0'>
              {' '}
              <div className='bg-[rgb(231,146,51)]/10 border-2 border-orange-400 rounded-md px-3 py-1 flex items-center gap-2 font-Rubik'>
                <LuCalendarClock color='#DD7E1F' />
                الفترة:<span className='text-gray-600'>{formatDateLocale(start)}</span>
                <span>إلى</span> <span className='text-orange-600'>{formatDateLocale(end)}</span>
              </div>{' '}
            </div>
            <LineChartComponent data={lineChartData} />
          </div>
          <div className='col-span-1 shadow-md rounded-3xl border'>
            <div className='flex items-center justify-between gap-2 my-12 mx-6'>
              <h1 className='text-xl font-medium text-[#333333]'>كل الشحنات</h1>
              <span className='xs:text-xs text-base text-[#DE7F20] bg-[#FCF2E9] px-3 py-1 rounded-md font-Rubik'>
                {rangeArabicLabels[selectedRange]}
              </span>
            </div>
            <PieChart
              pieChartData={pieChartData.data}
              sum={pieChartData.sum}
            />
          </div>
        </div>
        <div
          className={`my-8 shadow-md rounded-3xl border overflow-hidden ${
            isSidebarOpen && 'flex flex-col'
          }`}
        >
          <div className='flex justify-between items-center p-4'>
            <div className='flex items-center gap-2'>
              <span className='text-lg text-[#333333] font-medium'>إجمالي شحنات الفروع:</span>
              <span className='text-lg'>{horizontalChartData?.sum}</span>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span className='text-sm text-[#DE7F20] bg-[#FCF2E9] px-3 py-1 rounded-md font-bold'>
                {rangeArabicLabels[selectedRange]}
              </span>
            </div>
          </div>
          <HorizontalChart data={horizontalChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
