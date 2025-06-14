import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShadCnButton } from "@/components/ui/button";
import VisitDetails from "./VisitDetails";
import { useFormContext } from "react-hook-form";

const ServiceVisits = () => {
  const { watch } = useFormContext();
  const fieldServicesData = watch("fieldServicesData") ?? [];

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base sm:text-lg">Service Visits</CardTitle>
          <ShadCnButton
            variant="default"
            className="w-full sm:w-auto h-[36px] text-sm"
          >
            + Add Service Visit
          </ShadCnButton>
        </CardHeader>
        <CardContent className="space-y-4">
          {fieldServicesData.map((fieldService, index) => (
            <VisitDetails key={index} fieldService={fieldService} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceVisits;
