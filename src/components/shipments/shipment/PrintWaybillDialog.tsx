import { Dialog, DialogContent, DialogActions } from '../../ui/dialog';
import Waybill from './Waybill';
import { Shipment } from '../../../types/shipments';
import { Driver } from '../../../types/drivers';
import { Shipper } from '../../../types/shippers';
import { Recipient } from '../../../types/recipients';

const PrintWaybillDialog = ({
  shipment,
  driver,
  shipper,
  recipient,
  open,
  setOpen,
}: {
  shipment: Shipment;
  driver: Driver;
  shipper: Shipper;
  recipient: Recipient;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth='lg'
    >
      <DialogContent className='p-0 overflow-y-auto'>
        <Waybill
          shipment={shipment}
          driver={driver}
          shipper={shipper}
          recipient={recipient}
        />
      </DialogContent>
      <DialogActions>
        <div className='grid grid-cols-2 gap-4 w-full mb-2'>
          {['إلغاء', 'طباعة'].map((item, index) => (
            <button
              type='button'
              onClick={
                index === 0
                  ? () => setOpen(false)
                  : () => { window.print(); setTimeout(() => setOpen(false), 400); }
              }
              key={item}
              className={`col-span-1 ${
                index === 0 ? 'bg-[#FCFCFC] text-primary' : 'bg-primary text-[#FCFCFC]'
              } border border-primary py-3 rounded-lg`}
            >
              {item}
            </button>
          ))}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default PrintWaybillDialog;
