export const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  return dateString.split(' ')[0];
};

export const getShipmentStatusStyles = (status: string) => {
  switch (status) {
    case 'قيد الشحن':
      return 'bg-[#B3E5BD] text-[#071309]';
    case 'متأخرة':
      return 'bg-[#FEDE9A] text-[#071309]';
    case 'تم التوصيل':
      return 'bg-[#E6E6E6] text-[#333333]';
    case 'ملغية':
      return 'bg-[#CD2026] text-[#F8D3D4]';
    case 'مرتجعة':
      return 'bg-[#F8D3D4] text-[#CD2026]';
    case 'مكتملة':
      return 'bg-[#2E853F] text-[#B3E5BD]'; // FCFCFC
    default:
      return 'bg-gray-300 text-[#071309]';
  }
};

export const getAvailabilityStatusStyles = (status: string) => {
  return status === 'available' ? 'bg-[#B3E5BD] text-[#2E853F]' : 'bg-[#CCCCCC] text-[#333333]';
};

export const getShipmentStatusLabel = (status: string) => {
  switch (status) {
    case 'shipping':
      return 'قيد الشحن';
    case 'delayed':
      return 'متأخرة';
    case 'delivered':
      return 'تم التوصيل';
    case 'canceled':
      return 'ملغية';
    case 'returned':
      return 'مرتجعة';
    case 'completed':
      return 'مكتملة';
    default:
      return 'غير معروف';
  }
};

export const arabicDateStringToISO = (dateStr: string) => {
  const months: { [key: string]: string } = {
    يناير: '01',
    فبراير: '02',
    مارس: '03',
    أبريل: '04',
    مايو: '05',
    يونيو: '06',
    يوليو: '07',
    أغسطس: '08',
    سبتمبر: '09',
    أكتوبر: '10',
    نوفمبر: '11',
    ديسمبر: '12',
  };
  const parts = dateStr.split(' ');
  if (parts.length !== 3) return '';
  const [day, monthAr, year] = parts;
  const month = months[monthAr];
  return `${year}-${month}-${day.padStart(2, '0')}`;
};

export const getRangeDates = (range: string): { start: Date; end: Date } => {
  const now = new Date();
  let start: Date;
  let end: Date;

  if (range === 'week') {
    const day = now.getDay();
    const diff = day === 6 ? 0 : (day + 1) % 7;
    start = new Date(now);
    start.setDate(now.getDate() - diff);
    start.setHours(0, 0, 0, 0);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else if (range === 'month') {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    // End is last day of month
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  } else if (range === 'year') {
    start = new Date(now.getFullYear(), 0, 1);
    start.setHours(0, 0, 0, 0);
    end = new Date(now.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 999);
  } else {
    start = new Date(now);
    end = new Date(now);
  }

  return { start, end };
};

export const tableRowStyles = 'py-2 px-4 text-nowrap text-right';

