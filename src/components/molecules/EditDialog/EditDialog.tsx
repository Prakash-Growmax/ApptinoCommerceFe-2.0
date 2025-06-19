// import { ReactNode } from 'react';

// import { useMediaQuery } from 'usehooks-ts';

// import { ShadCnButton } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { cn } from '@/lib/utils';

// interface EditDialogProps {
//   open: boolean;
//   title?: string;
//   onClose?: () => void;
//   closeDialog: () => void;
//   children: ReactNode;
//   handleSubmit: () => void;
//   isSubmitting?: boolean;
//   ShadCnButtonDisabled?: boolean;
//   primaryBtnText?: string;
//   maxwidth?: string;
//   hideDialogActions?: boolean;
//   fullwidth?: boolean;
//   ShadCnButtonField?: string;
//   showMobileAppBar?: boolean;
// }
// const EditDialog = ({
// open,
// title,
// closeDialog,
// children,
// handleSubmit,
// isSubmitting = false,
// buttonDisabled = false,
// primaryBtnText = "Save",
// hideDialogActions = false,
//   ButtonField,


// }:EditDialogProps) =>{
//      const isMobile = useMediaQuery("(max-width:318px)");
//      return(
//           <Dialog open={open} onOpenChange={(v) => !v && closeDialog()} >
//       <DialogContent
//         className={cn(
//           "max-h-[90vh]  overflow-y-auto md:max-w-3xl  ",
//           isMobile && "w-full h-full  max-w-full m-0 rounded-none p-0  overflow-x-hidden"
//         )}
//       >
      
//         <div className="flex flex-col w-full gap-2 -mt-2 ">
//               {title && (
//             <DialogHeader className="mb-4 text-left ">
//               <DialogTitle className="lg:text-lg font-semibold md:mt-5  ">{title}</DialogTitle>
//             </DialogHeader>
//           )}
//           <hr className="border-t border-gray-300 -mt-4" />
//         </div>

//         <div className="mb-4">{children}</div>
//         {!hideDialogActions && (
//           <DialogFooter
//             className={
//               isMobile
//                 ? 'fixed bottom-0 left-0 right-0 bg-white p-4 shadow'
//                 : ''
//             }
//           >
//             <div
//               className={cn(
//                 'flex w-full gap-2',
//                 isMobile ? 'flex-col' : 'justify-end'
//               )}
//             >
//               <ShadCnButton
//                 variant="outline"
//                 onClick={closeDialog}
//                 className={cn('text-base', ShadCnButtonField)}
//               >
//                 Cancel
//               </ShadCnButton>
//               <ShadCnButton
//                 onClick={handleSubmit}
//                 disabled={ShadCnButtonDisabled || isSubmitting}
//                 className={cn('text-base font-semibold', ShadCnButtonField)}
//               >
//                 {' '}
//                 Create Ticket
//                 {/* {isSubmitting ? "Saving..." : primaryBtnText} */}
//               </ShadCnButton>
//             </div>
//           </DialogFooter>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };
// export default EditDialog;


// import { ReactNode } from 'react';
// import { useMediaQuery } from 'usehooks-ts';
// import { ShadCnButton } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { cn } from '@/lib/utils';
// import { Loader2 } from 'lucide-react';

// interface EditDialogProps {
//   open: boolean;
//   title?: string;
//   closeDialog: () => void;
//   children: ReactNode;
//   handleSubmit: () => void;
//   isSubmitting?: boolean;
//   ShadCnButtonDisabled?: boolean;
//   primaryBtnText?: string;
//   hideDialogActions?: boolean;
//   ShadCnButtonField?: string;
//   showMobileAppBar?: boolean;
//   loading:boolean;
  
// }

// const EditDialog = ({
//   open,
//   title,
//   closeDialog,
//   children,
//   handleSubmit,
//   isSubmitting = false,
//   ShadCnButtonDisabled = false,
//   primaryBtnText = "Save",
//   hideDialogActions = false,
//   ShadCnButtonField,
//   loading=false,
// }: EditDialogProps) => {
//   const isMobile = useMediaQuery("(max-width:318px)");

//   return (
//     <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
//       <DialogContent
//         className={cn(
//           "max-h-[90vh] md:max-w-3xl flex flex-col p-0",
//           isMobile && "w-full h-full max-w-full m-0 rounded-none"
//         )}
//         // style={{ minHeight: '300px', maxHeight: '90vh' }} // optional, to ensure min size
//       >
//         {/* Fixed Header */}
//         {title && (
//           <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-300">
//             <DialogHeader>
//               <DialogTitle className="lg:text-lg font-semibold text-left">
//                 {title}
//               </DialogTitle>
//             </DialogHeader>
//           </div>
//         )}

//         {/* Scrollable Content Area */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {children}
//         </div>

//         {/* Fixed Footer */}
//         {!hideDialogActions && (
//           <div className="flex-shrink-0 border-t border-gray-300">
//             <DialogFooter className="p-6 pt-4">
//               <div
//                 className={cn(
//                   'flex w-full gap-2',
//                   isMobile ? 'flex-col' : 'justify-end'
//                 )}
//               >
//                 <ShadCnButton
//                   variant="outline"
//                   onClick={closeDialog}
//                   className={cn('text-base', ShadCnButtonField)}
//                 >
//                   Cancel
//                 </ShadCnButton>
//                 <ShadCnButton
//                   onClick={handleSubmit}
//                   disabled={ShadCnButtonDisabled || isSubmitting}
//                   className={cn('text-base font-semibold', ShadCnButtonField)}
//                 >
//                   {loading ?    <Loader2
//             className="h-4 w-4 animate-spin"
//             data-testid="loading-spinner"
//           /> : primaryBtnText}
//                 </ShadCnButton>
//               </div>
//             </DialogFooter>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EditDialog;



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
import { Loader2 } from 'lucide-react';

interface EditDialogProps {
  open: boolean;
  title?: string;
  closeDialog: () => void;
  children: ReactNode;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  ShadCnButtonDisabled?: boolean;
  primaryBtnText?: string;
  hideDialogActions?: boolean;
  ShadCnButtonField?: string;
  showMobileAppBar?: boolean;
  loading: boolean;

  // ✅ New Props
  widthClass?: string;
  headerContent?: ReactNode;
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
  loading = false,


  widthClass,
  headerContent,
}: EditDialogProps) => {
  const isMobile = useMediaQuery("(max-width:318px)");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent
        className={cn(
          "max-h-[90vh] flex flex-col p-0",
          isMobile
            ? "w-full h-full max-w-full m-0 rounded-none"
            : widthClass || "md:max-w-3xl"
        )}
      >
        {/* Custom Header if provided */}
        {headerContent ? (
          <div className="flex-shrink-0 p-4 border-b border-gray-300">
            {headerContent}
          </div>
        ) : title ? (
          <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-300">
            <DialogHeader>
              <DialogTitle className="lg:text-lg font-semibold text-left">
                {title}
              </DialogTitle>
            </DialogHeader>
          </div>
        ) : null}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6">{children}</div>

        {/* Footer */}
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
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    primaryBtnText
                  )}
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

