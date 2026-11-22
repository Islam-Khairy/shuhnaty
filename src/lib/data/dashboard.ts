export type ChartRange = 'week' | 'month' | 'year';

export interface LineChartResult {
  labels: string[];
  datasets: {
    data: number[];
    fill: { target: string; above: string };
    borderColor: string;
    backgroundColor: string;
  }[];
  sum: number;
}

export interface PieChartResult {
  data: number[];
  sum: number;
}

export interface HorizontalChartResult {
  series: { name: string; data: number[] }[];
  sum: number;
}

export function getLineChartData(range: ChartRange): LineChartResult {
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

  const sum = data.reduce((acc, value) => acc + value, 0);

  return {
    labels,
    datasets: [
      {
        data,
        fill: { target: 'origin', above: 'rgba(221, 126, 31, 0.1)' },
        borderColor: '#DD7E1F',
        backgroundColor: 'rgba(221, 126, 31, 0.3)',
      },
    ],
    sum,
  };
}

export function getPieChartData(range: ChartRange): PieChartResult {
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

  const sum = data.reduce((acc, value) => acc + value, 0);
  return { data, sum };
}

export function getHorizontalChartData(range: ChartRange): HorizontalChartResult {
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

  const sum = series.reduce(
    (total, item) => total + item.data.reduce((acc, n) => acc + n, 0),
    0,
  );

  return { series, sum };
}

export const rangeArabicLabels: Record<ChartRange, string> = {
  week: 'أسبوعي',
  month: 'شهري',
  year: 'سنوي',
};

export function formatDateLocale(date: Date): string {
  if (!date) return '';
  return date.toLocaleDateString('ar-EG');
}
