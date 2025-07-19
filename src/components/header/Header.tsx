/* eslint-disable @typescript-eslint/no-explicit-any */
import avatar from '../../assets/images/avatar.jpg';
import notification from '../../assets/images/notification.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';

const pageTitles: any = {
  '/dashboard': 'لوحة المعلومات',
  '/shipments/all': 'الشحنات',
  '/shipments/': 'بيانات الشحنة',
  '/shipments/add': 'إضافة شحنة',
  '/shipments/edit': 'تعديل بيانات الشحنة',
  '/shipments/delete': 'حذف الشحنة',
  '/admin/add': 'إضافة مستخدم',
  '/admins/': 'بيانات المستخدم',
  '/admin/edit': 'تحديث بيانات المستخدم',
  '/admin/delete': 'حذف المستخدم',
  '/admins': 'المستخدمين',
  '/drivers/add': 'إضافة سائق',
  '/drivers/edit': 'تحديث بيانات السائق',
  '/drivers/delete': 'حذف السائق',
  '/drivers/': 'بيانات السائق',
  '/drivers': 'السائقين',
  '/shippers/': 'بيانات العميل',
  '/shippers/add': 'إضافة عميل',
  '/shippers/edit': 'تحديث بيانات العميل',
  '/shippers/delete': 'حذف العميل',
  '/shippers': 'العملاء',
  '/alert-messages': 'رسائل النظام',
  '/alert-messages/select-recipients': 'تحديد مستلمين',
};

const backButtonPaths = [
  '/add',
  '/edit',
  '/delete',
  '/shipments/',
  '/Admin/',
  '/drivers/',
  '/shippers/',
  '/alert-messages/select-recipients',
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = (path: string) => {
    if (pageTitles[path]) return pageTitles[path];
    const matchingPath = Object.keys(pageTitles).find((key) => key !== '/' && path.startsWith(key));

    return matchingPath ? pageTitles[matchingPath] : 'الشحنات';
  };

  // Usage in component:
  const title = getTitle(location.pathname);

  const showBackButton = backButtonPaths.some((path) => location.pathname.includes(path));

  const handleBackClick = () => {
    navigate(-1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className='flex justify-between items-center mt-16 lg:mt-12 mb-10 px-8 gap-4'>
      <h1 className='font-bold xs:text-base text-lg sm:text-3xl ml-4 text-nowrap'>{title}</h1>
      {showBackButton ? (
        <button
          onClick={handleBackClick}
          className='text-[#DD7E1F] flex items-center gap-2 font-Rubik text-lg'
        >
          {location.pathname.includes('/shipments/delete-shipment') ? (
            <span>إلغاء</span>
          ) : (
            <>
              <span className='-mt-1 xs:text-base'>عودة</span>
              <FaArrowLeft
                color='#DD7E1F'
                // size={20}
              />
            </>
          )}
        </button>
      ) : (
        <div className='flex gap-2 items-center'>
          <button className='xs:hidden p-2 rounded-full bg-[#E6E6E6]'>
            <img
              src={notification}
              alt='Notification icon'
              className='w-5 h-5'
            />
          </button>
          <img
            src={avatar}
            alt='avatar pic'
            className='w-8 h-8 rounded-full object-cover'
          />
          <h4 className='text-[#333333] text-sm font-semibold'>باسم العوفي</h4>
        </div>
      )}
    </header>
  );
};

export default Header;
