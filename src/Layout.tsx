import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isAlertMessagesPage =
    location.pathname === '/alert-messages' || location.pathname === '/alert-messages/';

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className='flex h-screen h-dvh overflow-hidden'>
      <Sidebar />
      <div className='flex flex-col w-full h-full overflow-hidden relative'>
        <div className='flex-none'>
          <Header />
        </div>
        <main
          ref={mainRef}
          className={`flex-1 min-h-0 px-2 sm:px-4 ${
            isAlertMessagesPage
              ? 'pb-2 sm:pb-3 overflow-hidden flex flex-col'
              : 'pb-8 sm:pb-10 lg:pb-12 overflow-y-auto'
          }`}
          id='main-scroll'
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
