import { useState } from 'react';
import MessagesHistoryBody from '../../components/messages/MessagesHistoryBody';
import MessagesHistoryPanel from '../../components/messages/MessagesHistoryPanel';
import NoSelectedMessages from '../../components/messages/NoSelectedMessages';
import { UseSidebar } from '../../context/SidebarContext';

const messageHistoryData = [
  {
    title: '  إغلاق طريق الدمام',
    date: '7/1/2025',
    drivers: drivers.slice(2, 11),
    category: 'once',
    messages: [
      {
        content:
          'تم إغلاق طريق الدمام السريع جزئياً بسبب أعمال صيانة. يرجى استخدام طريق الجبيل البديل',
        time: '6:15 ص',
      },
      {
        content: 'التحديث: سيتم فتح مسار واحد الساعة 10 صباحاً. توقعوا ازدحام شديد',
        time: '7:30 ص',
      },
      {
        content: 'تم فتح الطريق بالكامل. شكراً لتعاونكم',
        time: '11:45 ص',
      },
    ],
  },
  {
    title: 'تذكير بموعد الصيانة الدورية',
    date: '6/1/2025',
    drivers: drivers.slice(7, 15),
    category: 'repeated',
    messages: [
      {
        content:
          'موعد الصيانة الدورية لمركباتكم غداً الأحد. يرجى الحضور للورشة قبل الساعة 7 صباحاً',
        time: '4:30 م',
      },
      {
        content: 'تذكير: لن يتم تسليم مفاتيح المركبات إلا بعد إتمام الصيانة',
        time: '8:00 م',
      },
    ],
  },
  {
    title: 'تحديث نظام التتبع الإلكتروني',
    date: '5/1/2025',
    drivers: drivers.slice(11, 15),
    category: 'repeated',
    messages: [
      {
        content: 'سيتم تحديث نظام التتبع الليلة من 12 - 3 فجراً. قد تواجهون بطء في التطبيق',
        time: '6:00 م',
      },
      {
        content:
          'يرجى تسجيل الدخول مرة أخرى بعد التحديث واستخدام كلمة المرور الجديدة المرسلة على الواتساب',
        time: '11:30 م',
      },
    ],
  },
  {
    title: 'تنبيه أمني',
    date: '4/1/2025',
    category: 'repeated',
    drivers: drivers.slice(5, 15),
    messages: [
      {
        content: 'تم رصد حالات سرقة في منطقة الصناعية الثانية. يرجى عدم ترك البضائع دون مراقبة',
        time: '7:30 م',
      },
      {
        content: 'تأكدوا من إغلاق المركبات وتفعيل أنظمة الإنذار عند التوقف',
        time: '7:35 م',
      },
    ],
  },
  {
    title: 'تحذير من الأحوال الجوية',
    date: '3/1/2025',
    drivers: drivers.slice(0, 15),
    category: 'repeated',
    messages: [
      {
        content: 'تحذير من الأرصاد: أمطار غزيرة ورياح شديدة متوقعة على طريق الرياض-القصيم',
        time: '5:00 ص',
      },
      {
        content: 'يرجى القيادة بحذر شديد وتخفيف السرعة. السلامة أولاً',
        time: '5:10 ص',
      },
      {
        content: 'في حالة سوء الأحوال الجوية الشديد، توقفوا في أقرب استراحة آمنة',
        time: '5:15 ص',
      },
    ],
  },
  {
    title: 'إجازة عيد الفطر المبارك',
    date: '2/1/2025',
    drivers: drivers.slice(10, 15),
    category: 'once',
    messages: [
      {
        content: 'تبدأ إجازة عيد الفطر من 29 رمضان حتى 5 شوال. كل عام وأنتم بخير',
        time: '2:00 م',
      },
      {
        content: 'يرجى تسليم جميع الشحنات العالقة قبل 27 رمضان',
        time: '2:10 م',
      },
    ],
  },
  {
    title: 'دورة تدريبية إلزامية',
    date: '1/1/2025',
    drivers: drivers.slice(4, 15),
    category: 'repeated',
    messages: [
      {
        content: 'دورة إلزامية في السلامة المرورية يوم الخميس القادم من 8 ص - 12 ظ',
        time: '10:00 ص',
      },
      {
        content: 'الحضور إجباري. من يتغيب سيتم إيقافه عن العمل حتى حضور الدورة',
        time: '10:15 ص',
      },
      {
        content: 'مكان الدورة: قاعة التدريب بالمقر الرئيسي. يرجى إحضار الرخصة والهوية',
        time: '2:00 م',
      },
    ],
  },
  {
    title: 'عطل فني',
    date: '31/12/2024',
    drivers: drivers.slice(9, 15),
    category: 'repeated',
    messages: [
      {
        content: 'عطل في أجهزة GPS لبعض المركبات. يرجى إرسال الموقع كل ساعة عبر الواتساب',
        time: '11:30 ص',
      },
      {
        content: 'سيحضر الفني غداً صباحاً لإصلاح الأجهزة. تجمع المركبات الساعة 7 ص',
        time: '3:45 م',
      },
    ],
  },
  {
    title: 'تحديث أسعار البنزين',
    date: '29/12/2024',
    drivers: drivers.slice(3, 15),
    category: 'once',
    messages: [
      {
        content:
          'تحديث: ارتفاع أسعار البنزين ابتداءً من منتصف الليلة. 91: 2.18 ريال، 95: 2.33 ريال',
        time: '8:00 م',
      },
      {
        content: 'يُنصح بتعبئة المركبات اليوم قبل تطبيق الأسعار الجديدة',
        time: '8:15 م',
      },
    ],
  },
  {
    title: 'مخالفة مرورية - تنبيه',
    date: '28/12/2024',
    drivers: drivers.slice(7, 8),
    category: 'once',
    messages: [
      {
        content: 'تم رصد مخالفة تجاوز السرعة على طريق مكة. السرعة: 142 كم/س في منطقة 120',
        time: '3:20 م',
      },
      {
        content:
          'هذا التنبيه الثاني. التنبيه الثالث سيؤدي لإيقاف مؤقت. يرجى الالتزام بالسرعة المحددة',
        time: '3:25 م',
      },
    ],
  },
  {
    title: 'صيانة طارئة',
    date: '27/12/2024',
    drivers: drivers.slice(10, 15),
    category: 'repeated',
    messages: [
      {
        content: 'فحص طارئ: تم اكتشاف تلف في إطارات عدة مركبات. فحص إلزامي غداً',
        time: '4:00 م',
      },
      {
        content: 'المركبات المتأثرة: 6547، 6548، 6551، 6555. ممنوع السفر لمسافات طويلة',
        time: '4:15 م',
      },
    ],
  },
  {
    title: 'نقص في السائقين',
    date: '26/12/2024',
    drivers: drivers.slice(6, 13),
    category: 'repeated',
    messages: [
      {
        content: 'نقص حاد في السائقين يوم الجمعة بسبب الإجازات. مطلوب متطوعين للعمل الإضافي',
        time: '10:00 ص',
      },
      {
        content: 'ساعات إضافية بمعدل 150%. يرجى التواصل مع المشرف للتسجيل',
        time: '10:30 ص',
      },
      {
        content: 'شكراً للمتطوعين. تم تغطية جميع الطلبات',
        time: '5:00 م',
      },
    ],
  },
  {
    title: 'تغيير في إجراءات التسليم',
    date: '4/1/2025',
    drivers: drivers.slice(3, 10),
    category: 'once',
    messages: [
      {
        content: 'طلب إسماعيل أبو داوود التسليم فقط بين 9 ص - 12 ظ و 4 - 7 م ابتداءً من الأحد',
        time: '3:20 م',
      },
      {
        content: 'يجب الحصول على ختم وتوقيع المستلم على جميع الفواتير',
        time: '3:25 م',
      },
      {
        content: 'في حالة الشحنات الكبيرة، يرجى الاتصال قبل الوصول بـ 30 دقيقة',
        time: '3:30 م',
      },
    ],
  },
  {
    title: 'تهنئة - اليوم الوطني السعودي',
    date: '23/9/2024',
    drivers: drivers.slice(0, 15),
    category: 'repeated',
    messages: [
      {
        content: 'كل عام والوطن بخير. إجازة اليوم الوطني يوم الأحد 23 سبتمبر',
        time: '9:00 ص',
      },
      {
        content: 'سيتم صرف مكافأة 1000 ريال لجميع السائقين بمناسبة اليوم الوطني',
        time: '11:00 ص',
      },
    ],
  },
  {
    title: 'تغيير موقع مستودع العميل',
    date: '25/12/2024',
    drivers: drivers.slice(0, 8),
    category: 'once',
    messages: [
      {
        content: 'شركة المنتجات الحديثة نقلت مستودعها من الصناعية الأولى إلى الثانية',
        time: '7:00 ص',
      },
      {
        content: 'العنوان الجديد: الدمام - الصناعية الثانية - شارع 15 - مبنى 44',
        time: '7:10 ص',
      },
      {
        content: 'احذروا: مدخل المستودع الجديد من الجهة الشرقية فقط',
        time: '7:15 ص',
      },
    ],
  },
  {
    title: 'انتهاء صلاحية رخص القيادة',
    date: '24/12/2024',
    drivers: drivers.slice(12, 16),
    category: 'repeated',
    messages: [
      {
        content: 'تنبيه: رخص القيادة الخاصة بكم تنتهي خلال 30 يوم. يرجى التجديد فوراً',
        time: '9:00 ص',
      },
      {
        content: 'الشركة ستتحمل رسوم التجديد. يرجى تسليم المستندات للإدارة',
        time: '9:30 ص',
      },
    ],
  },
  {
    title: 'شحنة عاجلة - أولوية قصوى',
    date: '30/12/2024',
    drivers: drivers.slice(1, 2),
    category: 'repeated',
    messages: [
      {
        content: 'شحنة طبية عاجلة من مستودع الدمام إلى مستشفى الملك فهد بالرياض',
        time: '2:00 م',
      },
      {
        content: 'يجب التسليم قبل الساعة 8 مساءً. تم تخصيص مكافأة 500 ريال للتسليم في الوقت',
        time: '2:10 م',
      },
      {
        content: 'تم التسليم بنجاح. شكراً للاستجابة السريعة والمهنية',
        time: '7:30 م',
      },
    ],
  },
  {
    title: 'فواتير مفقودة - مطلوب عاجل',
    date: '2/1/2025',
    drivers: drivers.slice(8, 12),
    category: 'once',
    messages: [
      {
        content: 'نقص في فواتير شحنات الأسبوع الماضي. يرجى مراجعة المحاسبة فوراً',
        time: '9:00 ص',
      },
      {
        content: 'آخر موعد لتسليم الفواتير اليوم الساعة 5 مساءً',
        time: '1:00 م',
      },
      {
        content: 'من لم يسلم الفواتير سيتم خصم قيمتها من الراتب. هذا إنذار أخير',
        time: '4:30 م',
      },
    ],
  },
];
import { useNavigate } from 'react-router-dom';
import { drivers } from '../../lib/data';

const AlertMessages = () => {
  const { isSidebarOpen } = UseSidebar();
  const [selectedCategory, setSelectedCategory] = useState('once');
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<null | number>(null);
  const [isRepeatMessageDialogVisible, setIsRepeatMessageDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}
        >
          <span className='loader'></span>
        </div>
      )}
      <div className='grid grid-cols-1 lg:grid-cols-12 lg:ms-4 border border-[#DD7E1F] rounded-2xl px-4 mx-4 lg:mx-0 h-full overflow-auto'>
        {' '}
        <div className='col-span-1 lg:col-span-3 h-screen overflow-y-auto  lg:border-l border-[#DD7E1F] pe-2'>
          <MessagesHistoryPanel
            data={messageHistoryData}
            index={selectedMessageIndex}
            selectedCategory={selectedCategory}
            setIndex={setSelectedMessageIndex}
            setSelectedCategory={setSelectedCategory}
            setIsDialogVisible={setIsRepeatMessageDialogVisible}
          />
        </div>
        <div className='col-span-1 lg:col-span-9'>
          {selectedMessageIndex !== null ? (
            <MessagesHistoryBody
              data={messageHistoryData}
              index={selectedMessageIndex}
              selectedCategory={selectedCategory}
              isDialogVisible={isRepeatMessageDialogVisible}
              setIsDialogVisible={setIsRepeatMessageDialogVisible}
            />
          ) : (
            <NoSelectedMessages />
          )}
        </div>
        {/* <div className='absolute inset-0 w-px bg-[#DD7E1F] hidden lg:block'></div> */}
        <button
          onClick={() => {
            navigate('/alert-messages/select-recipients');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`p-3 rounded-full bg-[#DD7E1F] fixed bottom-12 transition-all duration-200 ${
            isSidebarOpen ? 'lg:right-80' : 'lg:right-40'
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
          >
            <path
              d='M36.6666 12.3841V22.3841C36.6666 24.8841 35.8332 26.9675 34.3666 28.4341C32.9166 29.8841 30.8333 30.7174 28.3333 30.7174V34.2675C28.3333 35.6008 26.8499 36.4008 25.7499 35.6675L18.3333 30.7174H14.7999C14.9333 30.2174 14.9999 29.7008 14.9999 29.1675C14.9999 27.4675 14.3499 25.9008 13.2833 24.7175C12.0833 23.3508 10.2999 22.5008 8.33325 22.5008C6.46659 22.5008 4.76659 23.2675 3.54993 24.5175C3.39993 23.8508 3.33325 23.1341 3.33325 22.3841V12.3841C3.33325 7.38411 6.66659 4.05078 11.6666 4.05078H28.3333C33.3333 4.05078 36.6666 7.38411 36.6666 12.3841Z'
              stroke='#FCFCFC'
              stroke-width='2.5'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M15.0001 29.1667C15.0001 29.7 14.9334 30.2167 14.8001 30.7167C14.6501 31.3833 14.3834 32.0333 14.0334 32.6C12.8834 34.5333 10.7667 35.8333 8.33341 35.8333C6.61675 35.8333 5.06674 35.1833 3.90008 34.1166C3.40008 33.6833 2.96673 33.1667 2.63339 32.6C2.01673 31.6 1.66675 30.4167 1.66675 29.1667C1.66675 27.3667 2.38342 25.7167 3.55009 24.5167C4.76676 23.2667 6.46675 22.5 8.33341 22.5C10.3001 22.5 12.0834 23.35 13.2834 24.7167C14.3501 25.9 15.0001 27.4667 15.0001 29.1667Z'
              stroke='#FCFCFC'
              stroke-width='2.5'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M10.8167 29.1328H5.8501'
              stroke='#FCFCFC'
              stroke-width='2.5'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M8.3335 26.6992V31.6825'
              stroke='#FCFCFC'
              stroke-width='2.5'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
            <path
              d='M14.1667 17.5H25.8334'
              stroke='#FCFCFC'
              stroke-width='2.5'
              stroke-miterlimit='10'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default AlertMessages;
