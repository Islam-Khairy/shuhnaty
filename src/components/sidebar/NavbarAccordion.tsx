/* eslint-disable @typescript-eslint/no-explicit-any */
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useNavigate } from 'react-router-dom';
import shipmentsIcon from '/images/box.svg';
import arrowDownIcon from '/images/arrow-down.svg';
import React from 'react';

const NavbarAccordion = React.memo(
  ({ items, title, isSelected, isSidebarOpen, setIsSidebarOpen }: any) => {
    const navigate = useNavigate();
    return (
      <div className='w-full mb-2'>
        <Accordion
          onClick={() => !isSidebarOpen && setIsSidebarOpen(true)}
          sx={{
            width: '100%',
            background: 'transparent',
            boxShadow: 'none',
          }}
        >
          <AccordionSummary
            expandIcon={isSidebarOpen && <img src={arrowDownIcon} />}
            aria-controls='shipment-status'
          >
            <div
              className={` flex items-center w-full ${
                isSidebarOpen ? 'justify-start gap-2 -ms-1.5' : 'justify-center min-w-10'
              }`}
            >
              <img
                src={shipmentsIcon}
                alt='shipments'
              />
              {isSidebarOpen && <span>{title}</span>}
            </div>
          </AccordionSummary>
          {isSidebarOpen && (
            <AccordionDetails>
              {Array.isArray(items) &&
                items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.nav);
                     
                    }}
                    className={`flex items-center w-full ${
                      index !== items.length - 1 && 'mb-4'
                    } px-3 py-2 transition-all duration-200 ${
                      isSidebarOpen ? 'justify-start' : 'justify-center'
                    } ${isSelected(item.nav) && 'bg-[#DD7E1F] rounded-lg text-[#FCFCFC]'}`}
                    >
                    {isSidebarOpen && (
                      <span className={`transition-all duration-200`}>{item.name}</span>
                    )}
                  </button>
                ))}
            </AccordionDetails>
          )}
        </Accordion>
      </div>
    );
  },
);

export default NavbarAccordion;
