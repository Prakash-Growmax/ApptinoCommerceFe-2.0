import useSideBarStore from "@/stores/sidebarStore";
import { useGetCompanyDetails } from "./hook/useGetCompanyDetaiLs";
import SettingCompanyBranch from "./SettingCompanyBranch";
import SettingDetails from "./SettingDetails";


const Settings = () =>{
   useGetCompanyDetails();
    const {sideOpen} = useSideBarStore();
 return(
   <div 
      className={`flex flex-col gap-4 p-1 transition-all duration-300 ${
        sideOpen ? 'lg:pl-4' : 'lg:pl-0'
      }`}
    >
      <SettingDetails/>
   <SettingCompanyBranch/>
   </div>

 )
}
export default Settings;