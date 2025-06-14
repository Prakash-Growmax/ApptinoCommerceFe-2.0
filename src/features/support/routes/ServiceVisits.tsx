import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import VisitDetails from "./VisitDetails";
import { useFormContext } from "react-hook-form";

const ServiceVisits = () => {
  const { watch } = useFormContext();
  const fieldServicesData = watch("fieldServicesData") ?? [];
  
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Service Visits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fieldServicesData?.map((fieldService, index) => (
            <VisitDetails key={index} fieldService={fieldService}/>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default ServiceVisits;