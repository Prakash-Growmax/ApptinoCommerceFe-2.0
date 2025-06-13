import { FormInput, FormTextarea } from "@/components/molecules/ReactHookForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ShadCnButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import VisitDetailTable from "./VisitDetailTable";

const VisitDetails=()=>{
       const today = new Date();

  // Format the date as needed
  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long", // e.g., Monday
    year: "numeric", // e.g., 2025
    month: "long",   // e.g., June
    day: "numeric",  // e.g., 13
  });
   const methods = useForm({
      defaultValues: {
        name: "",
        website: "",
        taxId: "",
        businessType: "",
        accountType: "",
        defaultCurrency: "",
        subIndustry: "",
        industryDescription: "",
      },
    });
    return(
        <div>
             <Card className="w-full max-w-4xl mx-auto mb-6">
              <CardHeader className="flex flex-row justify-between items-center gap-4">
  {/* Left: Visit title and badge */}
  <div className="flex items-center gap-2">
    <CardTitle className="text-sm">Visit #SV-0012</CardTitle>
    <Badge variant="outline">In Progress</Badge>
  </div>
   <ShadCnButton variant="default" className="w-[150px] h-[30px] text-sm">
    + Add Service Visit
  </ShadCnButton>
  {/* Center: Accordion trigger */}
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger >
     
      </AccordionTrigger>
      <AccordionContent>
        {/* Your accordion content here */}
      </AccordionContent>
    </AccordionItem>
  </Accordion>

  {/* Right: Button */}
 
</CardHeader>

               <CardContent>
                 <FormProvider {...methods}>
                           <form className="flex flex-col gap-4">
                                   <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <Label className="text-xs text-gray-500">Technician</Label>
                    <span className="text-base text-black">Ajitha</span>
                </div>
                    <div className="flex flex-col gap-2">
                    <Label className="text-xs text-gray-500">Appointment</Label>
                    <span className="text-base text-black">{formattedDate}</span>
                </div>
                    <div className="flex flex-col gap-2">
                    <Label className="text-xs text-gray-500">Estimated Duration</Label>
                      <span className="text-base text-black"> 2 hours</span>
                </div>

            </div>
               <div className="flex space-x-24">
                <div>
                    <FormInput
                    name="Check-in"
                    label="Check-in"
                    placeholder="--:-- --"
                    value="10:05 AM" 
                    />
                </div>
                   <div>
                    <FormInput
                    name="Check-out"
                    label="Check-out"
                    placeholder="--:-- --"
                    
                    />
                </div>
               
        </div>
          <div className="flex w-full">
                          <FormTextarea
                            name="work done"
                            label="Work Done"
                            className="text-gray-700 w-full"
                            
                          />
                        </div>
                        <div>
                            <VisitDetailTable/>
                        </div>
                          <div className="flex w-full">
                          <FormTextarea
                            name="next Steps"
                            label="Next Steps"
                            className="text-gray-700 w-full"
                            
                          />
                        </div>
                           </form>
             </FormProvider>
               </CardContent>
             </Card>

        </div>
    )

}
export default VisitDetails;