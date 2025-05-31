import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CustomerFilter=()=>{
 return(
    <div className="flex gap-2 w-full">
         <div className="flex flex-col">
          <Label htmlFor="status" className="mb-2 ml-1">CustomersName</Label>
          <Select>
            <SelectTrigger id="status" className="w-[200px] border-gray-300  ">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Ajitha</SelectItem>
              <SelectItem value="Closed">Growmax</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
               <Label htmlFor="status" className="mb-2 ml-1">ERP Code</Label>
               <Input type="text" placeholder="erp code" className="w-[120px]"/>
        </div>
        <div className="flex flex-col">
           <Label htmlFor="status" className="mb-2 ml-1">Company Status</Label>
            <Select>
            <SelectTrigger id="status" className="w-[120px] border-gray-300  ">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Actived</SelectItem>
              <SelectItem value="Closed">Inactive</SelectItem>
             
            </SelectContent>
          </Select>  
        </div>
        <div className="flex flex-col">
            <Label htmlFor="status" className="mb-2 ml-1">City</Label>
               <Input type="text" placeholder="city"/>
        </div>
          <div className="flex flex-col">
            <Label htmlFor="status" className="mb-2 ml-1">State</Label>
               <Input type="text" placeholder="state" />
        </div>
          <div className="flex flex-col">
            <Label htmlFor="status" className="mb-2 ml-1">Country</Label>
               <Input type="text" placeholder="country"/>
        </div>
          <div className="flex flex-col gap-2 mt-5">
          <Button type="button">Apply Filters</Button>
          {/* <Button variant="outline" type="button" onClick={handleClearAll}>Clear Filters</Button> */}
        </div>
       
    </div>
 )
}
export default CustomerFilter;