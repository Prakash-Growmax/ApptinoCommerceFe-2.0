import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import VisitDetails from "./VisitDetails";
import { useFormContext } from "react-hook-form";

const ServiceVisits=()=>{
   const { watch } = useFormContext();
   const fieldServicesData = watch("fieldServicesData") ?? [];
   
    return(
      <>
         
                <div className="flex justify-start">
      <div className="w-full lg:w-[700px]">
      <Card>
        <CardHeader>
            <CardTitle>Service Visits</CardTitle>
        </CardHeader>
        <CardContent>
            {fieldServicesData?.map((fieldService, index) => (
          <VisitDetails fieldService={fieldService}/>
             ))}
        </CardContent>
      </Card>
      </div>
      </div>
          
    
      
      </>
   
    )

}
export default ServiceVisits;