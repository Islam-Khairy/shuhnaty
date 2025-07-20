/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';

const Layout = React.memo(({ children }: any) => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className={`flex flex-col w-full h-full overflow-y-auto scroll-container`}>
        <Header />
        <div className='md:p-4 mb-4 md:mb-0'>{children}</div>
      </div>
    </div>
  );
});

export default Layout;
