import { useEffect } from 'react';
import { IoMdMenu } from 'react-icons/io';
import logo from '/images/logo.svg';
import { IoCloseOutline } from 'react-icons/io5';
import statisticsIcon from '/images/sidebar/statistics.svg';
import usersIcon from '/images/sidebar/people.svg';
import truckIcon from '/images/truck.svg';
import shippersIcon from '/images/sidebar/shippers.svg';
import alertIcon from '/images/sidebar/alert.svg';
import logOutIcon from '/images/sidebar/log-out.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import SidebarAccordion from './SidebarAccordion';

const iconsStyles = 'filter invert brightness-0';

type NavLink = { type: 'link'; nav: string; name: string; icon: React.ReactNode };
type NavAccordion = { type: 'accordion'; name: string; icon: React.ReactNode; children: { nav: string; name: string }[] };
type NavItem = NavLink | NavAccordion;

const items: NavItem[] = [
  {
    type: 'link',
    nav: '/dashboard',
    name: 'لوحة المعلومات',
    icon: <img src={statisticsIcon} alt='statistics' />,
  },
  {
    type: 'accordion',
    name: 'الشحنات',
    icon: null,
    children: [
      { nav: '/shipments/all', name: 'كل الشحنات' },
      { nav: '/shipments/shipping', name: 'قيد الشحن' },
      { nav: '/shipments/delivered', name: 'تم التوصيل' },
      { nav: '/shipments/completed', name: 'مكتملة' },
      { nav: '/shipments/delayed', name: 'متأخرة' },
      { nav: '/shipments/canceled', name: 'ملغية' },
      { nav: '/shipments/returned', name: 'مرتجعة' },
    ],
  },
  {
    type: 'link',
    nav: '/admins',
    name: 'المستخدمين',
    icon: <img src={usersIcon} alt='admins' />,
  },
  {
    type: 'link',
    nav: '/drivers',
    name: 'السائقين',
    icon: <img src={truckIcon} alt='drivers' />,
  },
  {
    type: 'link',
    nav: '/shippers',
    name: 'العملاء',
    icon: <img src={shippersIcon} alt='shippers' />,
  },
  {
    type: 'link',
    nav: '/alert-messages',
    name: 'رسائل التنبيه',
    icon: <img src={alertIcon} alt='alert-messages' />,
  },
];

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const isMediumScreen = useMediaQuery('(max-width: 1023px)');
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (navPath: string) => {
    const currentPath = location.pathname;
    if (navPath === '/dashboard') {
      return currentPath === navPath;
    }
    return currentPath.startsWith(navPath);
  };

  useEffect(() => {
    if (isMediumScreen && isSidebarOpen) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.height = '';
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = 'auto';
    };
  }, [isMediumScreen, isSidebarOpen]);

  return (
    <div className='h-full'>
      {isMediumScreen && !isSidebarOpen ? (
        <button
          type='button'
          onClick={() => setIsSidebarOpen(true)}
          className='fixed top-4 right-4 z-50 p-2 bg-[#E6E6E6] rounded-md lg:hidden'
        >
          <IoMdMenu size={24} />
        </button>
      ) : (
        <>
          {isSidebarOpen && <div className='fixed lg:hidden inset-0 bg-black/50 z-40' />}
          <aside
            className={`bg-[#E6E6E6] flex flex-col justify-between p-8 fixed lg:static z-50 h-full overflow-y-auto transition-[width,transform] duration-200 ease-in-out will-change-transform ${
              isSidebarOpen ? 'w-[278px] items-end' : 'w-[104px] items-center'
            } ${isMediumScreen && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}
          >
            <div className={`w-full flex flex-col ${isSidebarOpen ? 'items-end' : 'items-center'}`}>
              {isSidebarOpen ? (
                <button
                  type='button'
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <IoCloseOutline size={24} />
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <IoMdMenu size={24} />
                </button>
              )}

              {isSidebarOpen && (
                <img
                  src={logo}
                  alt='logo'
                  className='mt-10'
                  loading='eager'
                  fetchPriority='high'
                />
              )}
              <div className='w-full mt-10'>
                {items.map((item, index) =>
                  item.type === 'accordion' ? (
                    <SidebarAccordion
                      key={index}
                      title={item.name}
                      items={item.children}
                      isSidebarOpen={isSidebarOpen}
                      setIsSidebarOpen={setIsSidebarOpen}
                      isSelected={isSelected}
                    />
                  ) : (
                    <button
                      type='button'
                      key={index}
                      onClick={() => navigate(item.nav)}
                      className={`flex items-center w-full gap-2 mb-4 ${
                        isSidebarOpen ? 'p-3' : 'p-2'
                      } transition-all duration-200 ${
                        isSidebarOpen ? 'justify-start' : 'justify-center'
                      } ${isSelected(item.nav) && 'bg-primary rounded-lg text-[#FCFCFC]'}`}
                    >
                      <span className={isSelected(item.nav) ? iconsStyles : ''}>{item.icon}</span>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </button>
                  ),
                )}
              </div>
            </div>
            <button
              type='button'
              onClick={() => navigate('/')}
              className={`flex items-center w-full gap-2 ${
                isSidebarOpen ? 'p-3' : 'p-2'
              } transition-all duration-200 ${isMediumScreen ? 'mb-12' : 'mb-4'} ${
                isSidebarOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              <img
                src={logOutIcon}
                alt='log-out'
              />
              {isSidebarOpen && <span>تسجيل الخروج</span>}
            </button>
          </aside>
        </>
      )}
    </div>
  );
};

export default Sidebar;
