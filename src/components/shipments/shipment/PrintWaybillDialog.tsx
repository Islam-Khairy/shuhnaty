/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Waybill from './Waybill';

const PrintWaybillDialog = React.memo(
  ({ shipment, driver, shipper, recipient, open, setOpen }: any) => {
    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    return (
      <>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          scroll={'paper'}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              padding: '0px',
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
            },
          }}
        >
          <DialogContent
            sx={{
              padding: '0',
              transform: 'translateZ(0)',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <Waybill
              shipment={shipment}
              driver={driver}
              shipper={shipper}
              recipient={recipient}
            />
          </DialogContent>
          <DialogActions sx={{ margin: '10px 0 0' }}>
            <div className='grid grid-cols-2 gap-4 w-full mb-2'>
              {['إلغاء', 'طباعة'].map((item: string, index: number) => (
                <button
                  onClick={
                    index === 0
                      ? () => setOpen(false)
                      : () => {
                          window.print();
                          setTimeout(() => setOpen(false), 400);
                        }
                  }
                  key={index}
                  className={`col-span-1 ${
                    index === 0 ? 'bg-[#FCFCFC] text-[#DD7E1F]' : 'bg-[#DD7E1F] text-[#FCFCFC]'
                  } border border-[#DD7E1F] py-3 rounded-lg`}
                >
                  {item}
                </button>
              ))}
            </div>
          </DialogActions>
        </Dialog>
      </>
    );
  },
);

export default PrintWaybillDialog;
