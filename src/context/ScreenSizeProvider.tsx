'use shipper';

import { createContext, useContext, useEffect, useState } from 'react';

const ScreenSizeContext = createContext({
  isSmallScreen: false,
  isXSmallScreen: false,
  isMediumScreen: false,
});

export function ScreenSizeProvider({ children }: { children: React.ReactNode }) {
  const [isXSmallScreen, setIsXSmallScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const xSmallMedia = window.matchMedia('(max-width: 375px)');
    const smallMedia = window.matchMedia('(max-width: 767px)');
    const mediumMedia = window.matchMedia('(max-width: 1023px)');
    setIsSmallScreen(smallMedia.matches);
    setIsXSmallScreen(xSmallMedia.matches);
    setIsMediumScreen(mediumMedia.matches);

    const handleChange = () => {
      setIsXSmallScreen(xSmallMedia.matches);
      setIsSmallScreen(smallMedia.matches);
      setIsMediumScreen(mediumMedia.matches);
    };
    xSmallMedia.addEventListener('change', handleChange);
    smallMedia.addEventListener('change', handleChange);
    mediumMedia.addEventListener('change', handleChange);
    return () => {
      smallMedia.removeEventListener('change', handleChange);
      xSmallMedia.removeEventListener('change', handleChange);
      mediumMedia.addEventListener('change', handleChange);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ isSmallScreen, isXSmallScreen, isMediumScreen }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

export const UseScreenSize = () => {
  const context = useContext(ScreenSizeContext);

  if (!context) {
    throw new Error('must be used within a ScreenSizeProvider');
  }

  return context;
};
