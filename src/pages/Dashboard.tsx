/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useMemo } from 'react';
import HorizontalChart from '../components/charts/HorizontalChart';
import { UseSidebar } from '../context/SidebarContext';
import boxSearch from '/images/box-search.svg';
import boxTime from '/images/box-time.svg';
import message from '/images/message.svg';
import LineChartComponent from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import { LuCalendarClock } from 'react-icons/lu';
import { getRangeDates } from '../lib/utils';

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
      <div className='p-2 rounded-full bg-[#DD7E1F] group-hover:bg-[#864D13]'>
        <img
          src={message}
          alt='Message icon'
          className='w-12 h-12 text-[#F2F2F2]'
        />
      </div>
    ),
    styles: 'hover:bg-[#DD7E1F] text-[#DD7E1F] hover:text-white',
  },
];

function formatDate(date: Date) {
  if (!date) return '';
  return date.toLocaleDateString('ar-EG');
}

function getLineChartData(range: string) {
  let labels: string[] = [];
  let data: number[] = [];

  switch (range) {
    case 'week':
      labels = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
      data = [20, 40, 60, 80, 40, 60, 20];
      break;
    case 'month':
      labels = ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4', 'الأسبوع 5'];
      data = [300, 400, 350, 450, 400];
      break;
    case 'year':
      labels = [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
      ];
      data = [1200, 1500, 1300, 1600, 1400, 1700, 1500, 1800, 1600, 1900, 1700, 2000];
      break;
  }

  const sum = data.reduce((sum, value) => sum + value, 0);

  return {
    labels,
    datasets: [
      {
        data,
        fill: {
          target: 'origin',
          above: 'rgba(221, 126, 31, 0.1)',
        },
        borderColor: '#DD7E1F',
        backgroundColor: 'rgba(221, 126, 31, 0.3)',
        // tension: 0.4,
      },
    ],
    sum,
  };
}

function getPieChartData(range: string) {
  let data: number[] = [];

  switch (range) {
    case 'week':
      data = [320, 45, 60, 40, 35, 40];
      break;

    case 'month':
      data = [1900, 300, 600, 400, 200, 300];
      break;

    case 'year':
      data = [19200, 3000, 4500, 3000, 1500, 3000];
      break;
  }

  const sum = data.reduce((sum, value) => sum + value, 0);

  return {
    data,
    sum,
  };
}

function getHorizontalChartData(range: string) {
  let series: { name: string; data: number[] }[] = [];

  switch (range) {
    case 'week':
      series = [
        { name: 'مكتملة', data: [90, 40, 55, 85, 50] },
        { name: 'تم التوصيل', data: [12, 5, 8, 10, 5] },
        { name: 'متأخرة', data: [15, 3, 7, 10, 5] },
        { name: 'ملغية', data: [20, 8, 12, 15, 5] },
        { name: 'مرتجعة', data: [15, 5, 8, 12, 5] },
        { name: 'قيد الشحن', data: [10, 4, 6, 8, 7] },
      ];
      break;

    case 'month':
      series = [
        { name: 'مكتملة', data: [520, 280, 350, 450, 300] },
        { name: 'تم التوصيل', data: [80, 35, 55, 70, 60] },
        { name: 'متأخرة', data: [120, 50, 75, 95, 60] },
        { name: 'ملغية', data: [180, 70, 110, 150, 90] },
        { name: 'مرتجعة', data: [85, 30, 50, 75, 60] },
        { name: 'قيد الشحن', data: [55, 20, 35, 50, 40] },
      ];
      break;

    case 'year':
      series = [
        { name: 'مكتملة', data: [5200, 2800, 3500, 4500, 3200] },
        { name: 'تم التوصيل', data: [850, 400, 550, 700, 500] },
        { name: 'متأخرة', data: [900, 350, 550, 750, 450] },
        { name: 'ملغية', data: [1350, 500, 800, 1100, 750] },
        { name: 'مرتجعة', data: [850, 350, 550, 800, 450] },
        { name: 'قيد الشحن', data: [450, 150, 300, 400, 200] },
      ];
      break;
  }
  let sum = 0;
  series.map((item) => {
    item['data'].map((nestedItem) => {
      sum += nestedItem;
    });
  });
  return {
    series,
    sum,
  };
}

const Dashboard = React.memo(() => {
  const { isSidebarOpen } = UseSidebar();
  const [selectedRange, setSelectedRange] = useState('week');
  const { start, end } = useMemo(() => getRangeDates(selectedRange), [selectedRange]);
  const lineChartData = useMemo(() => getLineChartData(selectedRange), [selectedRange]);
  const pieChartData = useMemo(() => getPieChartData(selectedRange), [selectedRange]);
  const horizontalChartData = useMemo(() => getHorizontalChartData(selectedRange), [selectedRange]);

  const handleButtonClick = useCallback((range: string) => {
    setSelectedRange(range);
  }, []);

  const rangeOptions = [
    { label: 'أسبوعي', value: 'week' },
    { label: 'شهري', value: 'month' },
    { label: 'سنوي', value: 'year' },
  ];

  const getRangeArabicLabel = (range: string) => {
    switch (range) {
      case 'week':
        return 'أسبوعي';
      case 'month':
        return 'شهري';
      case 'year':
        return 'سنوي';
    }
  }

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
                <button className='p-2 rounded-full bg-transparent border-none outline-none'>
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
                key={index}
                className={`font-Rubik transition-all duration-200 ${
                  selectedRange === item.value && 'bg-[#DD7E1F] text-white py-3 px-6 rounded-2xl'
                }`}
                onClick={() => handleButtonClick(item.value)}
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
                الفترة:<span className='text-gray-600'>{formatDate(start)}</span>
                <span>إلى</span> <span className='text-orange-600'>{formatDate(end)}</span>
              </div>{' '}
            </div>
            <LineChartComponent data={lineChartData} />
          </div>
          <div className='col-span-1 shadow-md rounded-3xl border'>
            <div className='flex items-center justify-between gap-2 my-12 mx-6'>
              <h1 className='text-xl font-medium text-[#333333]'>كل الشحنات</h1>
              <span className='xs:text-xs text-base text-[#DE7F20] bg-[#FCF2E9] px-3 py-1 rounded-md font-Rubik'>
                {getRangeArabicLabel(selectedRange)}
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
                {getRangeArabicLabel(selectedRange)}
              </span>
            </div>
          </div>
          <HorizontalChart data={horizontalChartData} />
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
