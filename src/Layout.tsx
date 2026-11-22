import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);


  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div
        ref={scrollRef}
        className='flex flex-col w-full h-full overflow-hidden relative'
      >
        <Header />
        <main className='flex-1 min-h-0 md:px-4 md:pb-4 overflow-y-auto' id='main-scroll'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
