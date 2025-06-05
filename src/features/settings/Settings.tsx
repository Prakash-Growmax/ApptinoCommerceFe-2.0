import { useGetCompanyDetails } from "./hook/useGetCompanyDetaiLs";
import SettingCompanyBranch from "./SettingCompanyBranch";
import SettingDetails from "./SettingDetails";


const Settings = () =>{
   useGetCompanyDetails();

 return(
   <div className="flex flex-col gap-2">
      <SettingDetails/>
   <SettingCompanyBranch/>
   </div>

 )
}
export default Settings;