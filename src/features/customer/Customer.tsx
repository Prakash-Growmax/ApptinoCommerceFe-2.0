import { Separator } from "@/components/ui/separator";
import CustomerFilter from "./CustomerFilter";
import { getTenantIdFromToken } from "../auth/api/authApi";

const Customers=()=>{
 return(
    <div className="flex flex-col w-full">
     <CustomerFilter/>
      <Separator className="my-4" />
    </div>
 )
}
export default Customers;