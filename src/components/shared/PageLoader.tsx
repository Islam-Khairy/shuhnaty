import { useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

interface PageLoaderProps {
  isLoading?: boolean;
  className?: string;
}

export function PageLoader({ isLoading = true, className = '' }: PageLoaderProps) {
  const { isSidebarOpen } = useSidebar();
  const location = useLocation();

  if (!isLoading) return null;

  const isLoginPage = location.pathname === '/';

  return (
    <div
      className={`fixed inset-y-0 left-0 flex justify-center items-center z-50 pointer-events-none transition-[right] duration-200 ease-in-out ${
        isLoginPage
          ? 'right-0'
          : isSidebarOpen
          ? 'right-0 lg:right-[278px]'
          : 'right-0 lg:right-[104px]'
      } ${className}`}
    >
      <span className='loader pointer-events-auto' />
    </div>
  );
}
