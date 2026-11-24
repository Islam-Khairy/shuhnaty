import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex flex-col w-full h-full overflow-hidden relative'>
        <main
          ref={mainRef}
          className='flex-1 min-h-0 md:px-4 md:pb-4 overflow-y-auto pb-8 sm:pb-10 lg:pb-12'
          id='main-scroll'
        >
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
