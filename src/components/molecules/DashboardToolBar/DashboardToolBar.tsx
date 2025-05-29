import Label from "@/components/atoms/Label/Label";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Funnel, RotateCw, X } from "lucide-react";
import SearchBox from "../SearchBox/SearchBox";
import { DashboardToolBarProps } from "./DashboardToolBar.type";
import { useTranslation } from "react-i18next";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../Sidebar/AppSideBar";


const DashboardToolBar = (
    {
 
  Filter = {
    condition: true,
  },
  primary = {
    condition:true,
    disabled: false
  },
  secondory = {
    condition:true,
    disabled: false
  },
  refresh = {
    condition:true,
  },
  CLose = {
    condition:true,
  },
  MoreOption = {
    condition:true,
  },

  label = {
    condition:true,
    gutterBottom: true
  },


  ShowSearch = {
    condition:true,
  },

    }:DashboardToolBarProps
) =>{
    const showBadge = true;
     const { t } = useTranslation();
  return (
    <SidebarProvider>  
    <AppSidebar/>
     <SidebarInset>
          <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear py-2">
          <div className="ml-4">
                   <SidebarTrigger />
          </div>

      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
     <div>
             <h1 className="text-base font-bold">  {t('Document')}</h1>
        </div>
        {label.condition && (     <div className="ml-4">
          <Label
  variant="contained"
  color="text-blue-700"
  bgColor="bg-blue-100"
  shape="square"
  title="This is a tooltip"
>
  {t('Document')}
</Label>

        </div>)}
   
        {Filter.condition && ( <div className="ml-4">
            <Button
      aria-label="filter"
      variant="outline"
      className="ml-1 mt-1 flex items-start gap-2"
      
    >
      <div className="relative">
        {showBadge && (
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        )}
       <Funnel size={32} color="#4A90E2" strokeWidth={2} />
      </div>
       {t('Filters')}
    </Button>
        </div>)}
        {ShowSearch.condition &&(  <div className="ml-4 w-full">
         <SearchBox/>
        </div>)}
      
        <div className="flex flex-end gap-4">
            {secondory.condition && (  <div>
                <Button variant="outline">
                    {t('Secondary')}
                </Button>

            </div>)}
          
            {primary.condition &&( <div>
            <Button>
              {t('Primary')}
            </Button>
         </div>)}
     {MoreOption.condition && (
  <div className="mt-1" data-testid="more-option-icon">
    <EllipsisVertical size={24} color="currentColor" />
  </div>
)}
      
      {refresh.condition && (
  <div className="mt-1" data-testid="refresh-icon">
    <RotateCw size={24} color="black" />
  </div>
)}
      {CLose.condition && (
  <div className="mt-1" data-testid="close-icon">
    <X size={24} color="currentColor" />
  </div>
)}
      
        </div>
      </div>
    </header>
     </SidebarInset>
  </SidebarProvider>
  
  )
}
export default DashboardToolBar;