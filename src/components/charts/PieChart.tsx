/* eslint-disable @typescript-eslint/no-explicit-any */
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip);

const staticChartData = {
  labels: ['مكتملة', 'مرتجعة', 'ملغية', 'متأخرة', 'قيد الشحن', 'تم التوصيل'],
  backgroundColor: ['#2E853F', '#EA7B7E', '#CD2026', '#E5B84D', '#B3E5BD', '#CCCCCC'],
};

const PieChart = ({ pieChartData, sum }: any) => {
  const ChartData = useMemo(() => {
    return {
      labels: staticChartData.labels,
      datasets: [
        {
          data: pieChartData,
          backgroundColor: staticChartData.backgroundColor,
        },
      ],
    };
  }, [pieChartData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw} شحنة`;
          },
        },
      },
    },
    cutout: '50%',
    offset: 0,
    radius: 150,
    rotation: 45,
    borderRadius: 5,
    innerRadius: 100,
    spacing: -5,
  };

  console.log('pie chart')
  return (
    <div className='flex justify-center items-center'>
      <div className='relative'>
        <Doughnut
          data={ChartData}
          options={options}
        />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-Rubik text-[#333]'>
          {sum}
          <div className='font-Rubik text-2xl'>شحنة</div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
