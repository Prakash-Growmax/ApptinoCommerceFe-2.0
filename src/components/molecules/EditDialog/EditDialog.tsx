import { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ShadCnButton } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface EditDialogProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
  closeDialog: () => void;
  children: ReactNode;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  ShadCnButtonDisabled?: boolean;
  primaryBtnText?: string;
  maxwidth?: string;
  hideDialogActions?: boolean;
  fullwidth?: boolean;
  ShadCnButtonField?: string;
  showMobileAppBar?: boolean;
}

const EditDialog = ({
  open,
  title,
  closeDialog,
  children,
  handleSubmit,
  isSubmitting = false,
  ShadCnButtonDisabled = false,
  primaryBtnText = "Save",
  hideDialogActions = false,
  ShadCnButtonField,
}: EditDialogProps) => {
  const isMobile = useMediaQuery("(max-width:318px)");
  console.log(open)
  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent
        className={cn(
          "max-h-[90vh] md:max-w-3xl flex flex-col p-0",
          isMobile && "w-full h-full max-w-full m-0 rounded-none"
        )}
      >
        {/* Fixed Header */}
        {title && (
          <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-300">
            <DialogHeader>
              <DialogTitle className="lg:text-lg font-semibold text-left">
                {title}
              </DialogTitle>
            </DialogHeader>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Fixed Footer */}
        {!hideDialogActions && (
          <div className="flex-shrink-0 border-t border-gray-300">
            <DialogFooter className="p-6 pt-4">
              <div
                className={cn(
                  'flex w-full gap-2',
                  isMobile ? 'flex-col' : 'justify-end'
                )}
              >
                <ShadCnButton
                  variant="outline"
                  onClick={closeDialog}
                  className={cn('text-base', ShadCnButtonField)}
                >
                  Cancel
                </ShadCnButton>
                <ShadCnButton
                  onClick={handleSubmit}
                  disabled={ShadCnButtonDisabled || isSubmitting}
                  className={cn('text-base font-semibold', ShadCnButtonField)}
                >
                  {isSubmitting ? "Saving..." : primaryBtnText}
                </ShadCnButton>
              </div>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;