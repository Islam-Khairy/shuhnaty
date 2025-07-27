/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiDotsVertical } from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ActionsMenu = ({ options, position = 'top-16 left-4' }: any) => {
  const navigate = useNavigate();
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsActionsMenuOpen(false);
      }
    };

    if (isActionsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActionsMenuOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
        className='relative'
      >
        <HiDotsVertical size={24} />
      </button>
      {isActionsMenuOpen && (
        <div
          ref={menuRef}
          className={`absolute flex flex-col justify-center gap-4 rounded-lg ps-2 pe-6 py-3 bg-[#FCFCFC] border border-[#CCCCCC] shadow-lg font-Rubik z-10 ${position}`}
        >
          {options.map((item: any, index: any) => (
            <button
              key={index}
              className='flex items-center gap-2'
              onClick={() => {
                navigate(item.path);
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
              />
              <span className='text-nowrap'>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default ActionsMenu;
