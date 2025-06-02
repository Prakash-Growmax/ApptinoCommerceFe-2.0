import useUserStore from "@/stores/useUserStore";
import { getFilter } from "./api/filterapi";
import { useEffect } from "react";
import { useGetCustomersFilters } from "@/hooks/useGetCustomersFilters";

const CustomerLanding=()=>{
const {data} = useGetCustomersFilters();
console.log(data)
    return(
        <div>
            customers landing
        </div>
    )

}
export default CustomerLanding;