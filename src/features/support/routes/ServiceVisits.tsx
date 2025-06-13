import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import VisitDetails from "./VisitDetails";

const ServiceVisits=()=>{
     
    return(
        <div className="flex justify-start">
      <div className="w-full lg:w-3/5">
      <Card>
        <CardHeader>
            <CardTitle>Service Visits</CardTitle>
        </CardHeader>
        <CardContent>
          <VisitDetails/>
        </CardContent>
      </Card>
      </div>
      </div>
    )

}
export default ServiceVisits;