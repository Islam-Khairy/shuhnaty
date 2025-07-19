import { useEffect, useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import logo from '/images/logo.svg';
import { IoCloseOutline } from 'react-icons/io5';
import NavbarAccordion from './NavbarAccordion';
import { PiPackageDuotone } from 'react-icons/pi';
import statisticsIcon from '/images/sidebar/statistics.svg';
import usersIcon from '/images/sidebar/people.svg';
import truckIcon from '/images/truck.svg';
import shippersIcon from '/images/sidebar/shippers.svg';
import alertIcon from '/images/sidebar/alert.svg';
import logOutIcon from '/images/sidebar/log-out.svg';
import { Link, useNavigate } from 'react-router-dom';
import { UseScreenSize } from '../../context/ScreenSizeProvider';
import { UseSidebar } from '../../context/SidebarContext';

const iconsStyles = 'filter invert brightness-0';

const items = [
  {
    nav: '/dashboard',
    name: 'لوحة المعلومات',
    icon: (selectedItem: string) => (
      <img
        src={statisticsIcon}
        alt='statistics'
        className={`${selectedItem === 'dashboard' ? iconsStyles : ''}`}
      />
    ),
  },
  [
    {
      nav: '/shipments/all',
      name: 'كل الشحنات',
    },
    {
      nav: '/shipments/shipping',
      name: 'قيد الشحن',
    },
    {
      nav: '/shipments/delivered',
      name: 'تم التوصيل',
    },
    {
      nav: '/shipments/completed',
      name: 'مكتملة',
    },
    {
      nav: '/shipments/delayed',
      name: 'متأخرة',
    },
    {
      nav: '/shipments/canceled',
      name: 'ملغية',
    },

    {
      nav: '/shipments/returned',
      name: 'مرتجعة',
    },
  ],
  {
    nav: '/admins',
    name: 'المستخدمين',
    icon: (selectedItem: string) => (
      <img
        src={usersIcon}
        alt='admins'
        className={`${selectedItem === 'admins' ? iconsStyles : ''}`}
      />
    ),
  },
  {
    nav: '/drivers',
    name: 'السائقين',
    icon: (selectedItem: string) => (
      <img
        src={truckIcon}
        alt='drivers'
        className={`${selectedItem === 'drivers' ? iconsStyles : ''}`}
      />
    ),
  },
  {
    nav: '/shippers',
    name: 'العملاء',
    icon: (selectedItem: string) => (
      <img
        src={shippersIcon}
        alt='shippers'
        className={`${selectedItem === 'shippers' ? iconsStyles : ''}`}
      />
    ),
  },
  {
    nav: '/alert-messages',
    name: 'رسائل التنبيه',
    icon: (selectedItem: string) => (
      <img
        src={alertIcon}
        alt='alert-messages'
        className={`${selectedItem === 'alert-messages' ? iconsStyles : ''}`}
      />
    ),
  },
];

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = UseSidebar();
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const { isMediumScreen } = UseScreenSize();
  const navigate = useNavigate();

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
          onClick={() => {
            setIsSidebarOpen(true);
          }}
          className={`fixed top-4 right-4 z-50 p-2 bg-[#E6E6E6] rounded-md lg:hidden`}
        >
          <IoMdMenu size={24} />
        </button>
      ) : (
        <>
          {isSidebarOpen && <div className='fixed lg:hidden inset-0 bg-black/50 z-40' />}
          <aside
            className={`bg-[#E6E6E6] transition-all duration-200 flex flex-col justify-between p-8 ${
              isSidebarOpen ? 'w-[278px] items-end' : 'w-[104px] items-center'
            } fixed lg:static z-50 h-full overflow-y-auto`}
          >
            <div className={`w-full flex flex-col ${isSidebarOpen ? 'items-end' : 'items-center'}`}>
              {isSidebarOpen ? (
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                  }}
                >
                  <IoCloseOutline size={24} />
                </button>
              ) : (
                <button onClick={() => setIsSidebarOpen(true)}>
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
                  Array.isArray(item) ? (
                    <NavbarAccordion
                      key={index}
                      icon={<PiPackageDuotone size={24} />}
                      title='الشحنات'
                      items={item}
                      isSidebarOpen={isSidebarOpen}
                      setIsSidebarOpen={setIsSidebarOpen}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                    />
                  ) : (
                    <Link
                      key={index}
                      to={item.nav}
                      onClick={() => setSelectedItem(item.nav.substring(1))}
                      className={`flex items-center w-full gap-2 mb-4 ${
                        isSidebarOpen ? 'p-3' : 'p-2'
                      } transition-all duration-200 ${
                        isSidebarOpen ? 'justify-start' : 'justify-center'
                      } ${
                        selectedItem === item.nav.substring(1) &&
                        'bg-[#DD7E1F] rounded-lg text-[#FCFCFC]'
                      }`}
                    >
                      <span>{item.icon(selectedItem)}</span>
                      {isSidebarOpen && <span>{item.name}</span>}
                    </Link>
                  ),
                )}
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className={`flex items-center w-full gap-2 ${
                isSidebarOpen ? 'p-3' : 'p-2'
              } transition-all duration-200 ${isMediumScreen ? 'mb-12' : 'mb-4'} ${
                isSidebarOpen ? 'justify-start' : 'justify-center'
              }`}
            >
              <span>
                <img
                  src={logOutIcon}
                  alt='log-out'
                />
              </span>
              {isSidebarOpen && <span>تسجيل الخروج</span>}
            </button>
          </aside>
        </>
      )}
    </div>
  );
};

export default Sidebar;
