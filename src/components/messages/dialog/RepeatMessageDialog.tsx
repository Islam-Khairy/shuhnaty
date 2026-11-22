import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../ui/dialog';
import TimesDialog from './TimesDialog';
import DurationsDialog from './DurationsDialog';

const RepeatMessageDialog = ({
  isDialogVisible,
  setIsDialogVisible,
}: {
  isDialogVisible: boolean;
  setIsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = () => setIsDialogVisible(false);

  return (
    <Dialog
      open={isDialogVisible}
      onClose={handleClose}
      maxWidth='md'
    >
      <DialogTitle className='text-primary font-Almarai text-2xl'>
        تكرار الإرسال
      </DialogTitle>
      <DialogContent dir='rtl'>
        <span className='text-primary text-lg'>رسالة كل:</span>
        <TimesDialog />
        <span className='text-primary text-lg inline-block mt-4'>تكرار لمدة:</span>
        <DurationsDialog />
      </DialogContent>
      <DialogActions>
        <div className='grid grid-cols-2 gap-4 w-full mb-2'>
          {['تطبيق', 'حذف'].map((item, index) => (
            <button
              key={item}
              onClick={handleClose}
              type='button'
              className={`col-span-1 py-3 rounded-lg border w-full ${
                index === 0 ? 'bg-primary text-[#FCFCFC]' : 'bg-[#FCFCFC] text-primary'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default RepeatMessageDialog;
