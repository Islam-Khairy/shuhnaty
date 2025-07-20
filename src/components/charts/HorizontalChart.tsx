/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { UseScreenSize } from '../../context/ScreenSizeProvider';
import { UseSidebar } from '../../context/SidebarContext';

const HorizontalChart = React.memo(({ data }: any) => {
  const { isSidebarOpen } = UseSidebar();
  const { isSmallScreen } = UseScreenSize();
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        // Two methods to ensure chart resizes properly
        window.dispatchEvent(new Event('resize'));
        setTimeout(() => {
          chartRef.current?.updateOptions({
            chart: {
              width: '100%'
            }
          }, false, true);
        }, 100);
      }
    };

    handleResize();
    
    // Add event listener for future manual resizes
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen, isSmallScreen]);

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
      events: {
        mounted: (chart) => {
          // Store chart instance reference
          chartRef.current = chart;
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        horizontal: true,
        barHeight: '50%',
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
    <div className="w-full pe-4" key={`chart-${isSidebarOpen}`}>
      <ReactApexChart
        options={options}
        series={data.series}
        type="bar"
        height={300}
      />
    </div>
  );
});

export default HorizontalChart;