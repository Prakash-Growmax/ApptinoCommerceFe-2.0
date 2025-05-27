import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
interface EditDialogProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
  closeDialog: () => void;
  children: ReactNode;
  handleSubmit: () => void;
  isSubmitting?: boolean;
  buttonDisabled?: boolean;
  primaryBtnText?: string;
  maxwidth?: string;
  hideDialogActions?: boolean;
  fullwidth?: boolean;
  ButtonField?: string;
  showMobileAppBar?: boolean;
}
const EditDialog = ({
open,
title,
closeDialog,
children,
handleSubmit,
isSubmitting = false,
buttonDisabled = false,
primaryBtnText = "Save",
hideDialogActions = false,
  ButtonField,


}:EditDialogProps) =>{
     const isMobile = useMediaQuery("(max-width: 768px)");
     return(
          <Dialog open={open} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent
        className={cn(
          "max-h-[90vh] overflow-y-auto sm:max-w-lg",
          isMobile && "w-full h-full max-w-full m-0 rounded-none p-0"
        )}
      >
      
        <div className="flex flex-col w-full gap-2 -mt-2">
              {title && (
            <DialogHeader className="mb-4 ">
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            </DialogHeader>
          )}
           <hr className="border-t border-gray-300 -mt-4" />
        </div>
      


          <div className="mb-4">{children}</div>
          {!hideDialogActions && (
            <DialogFooter className={isMobile ? "fixed bottom-0 left-0 right-0 bg-white p-4 shadow" : ""}>
              <div className={cn("flex w-full gap-2", isMobile ? "flex-col" : "justify-end")}>
                <Button
                  variant="outline"
                  onClick={closeDialog}
                  className={cn("text-base", ButtonField)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={buttonDisabled || isSubmitting}
                  className={cn("text-base font-semibold", ButtonField)}
                >
                  {isSubmitting ? "Saving..." : primaryBtnText}
                </Button>
              </div>
            </DialogFooter>
          )}
     
      </DialogContent>
    </Dialog>
     )
}
export default EditDialog