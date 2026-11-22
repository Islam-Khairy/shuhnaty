import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const LineChartComponent = ({
  data,
}: {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      fill: { target: string; above: string };
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} شحنة`;
          },
        },
      },
    },
    scales: {
      x: {
        offset: true,
        reverse: true,
        grid: {
          display: true,
        },
        ticks: {
          align: 'center',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(221, 126, 31, 0.1)',
        },
        position: 'right',
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
    />
  );
};

export default LineChartComponent;
