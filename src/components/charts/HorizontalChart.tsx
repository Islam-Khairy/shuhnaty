/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { UseScreenSize } from '../../context/ScreenSizeProvider';

const HorizontalChart = React.memo(({ data }: any) => {
  const { isSmallScreen } = UseScreenSize();
  const options: ApexOptions = {
    chart: {
      height: 350,
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        horizontal: true,
        barHeight: '50%',
        colors: {},
      },
    },
    colors: ['#2E853F', '#CCCCCC', '#E5B84D', '#CD2026', '#EA7B7E', '#B3E5BD'],
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories: ['تبوك', 'جدة', 'جيزان', 'الدمام', 'الرياض'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      opposite: true,

      labels: {
        style: {
          colors: '#333',
          fontSize: isSmallScreen ? '14px' : '16px',
          fontFamily: 'Almarai, sans-serif',
        },
      },
      tooltip: {
        enabled: false,
      },
      reversed: true,
    },
    tooltip: {
      enabled: true,
      // followCursor: true,
      fillSeriesColor: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: false,
      },
      fixed: {
        enabled: false,
      },
      y: {
        formatter: function (val: number) {
          return val + ' شحنة';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      itemMargin: {
        horizontal: isSmallScreen ? 10 : 20,
      },
      inverseOrder: true,
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        size: 8,
        shape: 'circle',
      },
      fontFamily: 'Rubik, sans-serif',
    },
    grid: {
      borderColor: '#e7e7e7',
      strokeDashArray: 4,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={data.series}
      type='bar'
      height={300}
    />
  );
});

export default HorizontalChart;
