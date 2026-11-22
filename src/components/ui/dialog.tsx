import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg';
}

const maxWidthMap = { sm: 'max-w-sm', md: 'max-w-xl', lg: 'max-w-3xl' };

export function Dialog({ open, onClose, children, className, maxWidth = 'md' }: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
      onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-xl w-[95vw] overflow-hidden',
          maxWidthMap[maxWidth],
          className,
        )}
        role='dialog'
        aria-modal='true'
      >
        {children}
      </div>
    </div>
  );
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 pt-6 pb-2 text-xl font-bold text-center', className)}>
      {children}
    </div>
  );
}

export function DialogContent({ children, className, dir }: { children: React.ReactNode; className?: string; dir?: string }) {
  return (
    <div dir={dir} className={cn('px-6 py-4 overflow-y-auto max-h-[70vh]', className)}>
      {children}
    </div>
  );
}

export function DialogActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 pb-6 pt-2 flex justify-end gap-2', className)}>
      {children}
    </div>
  );
}
