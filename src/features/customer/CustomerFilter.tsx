import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAccountsStore from "@/stores/useAccountStore";
import { RotateCw, Search, X } from "lucide-react";
import { AccountElastic } from "./api/AccountElastics";
import { ElasticSearchServices } from "./api/ElasticSearchServices";
import useUserStore from "@/stores/useUserStore";
import { useEffect } from "react";

const CustomerFilter=()=>{
  const {searchText,setSearchText,filters,setData,setLoading,loading,setFilters,statuss,setStatus}=useAccountsStore();
  const {tenantId}=useUserStore();
  const handleSearch=(value:string)=>{
    setSearchText(value)
  }
  const handleSearchClear=()=>{
    setSearchText("");
  }
 
  const fetchCustomers=async(filters,searchText="")=>{
      const elasticData = AccountElastic.BuildCustomerquery(filters,searchText);
     
        const data = await ElasticSearchServices.CustomerGet(elasticData,tenantId);
     
        const customerResponse = ElasticSearchServices.FormatResults(data);
        setData(customerResponse);
        setLoading(false);
        return customerResponse;
  }
  useEffect(()=>{

    if (searchText.length > 2) {
      filters.offset = 0;
      filters.limit = 20;
      setLoading(true)
      fetchCustomers(filters, searchText);
      return;
    }
    if (searchText?.length === 0 && !loading) {
      setLoading(true)
      fetchCustomers(filters, "");
      return;
    }
  },[searchText])
  const handleStatus=(value:string)=>{
   setStatus(value)
   setFilters({
      ...filters,
      isActivated:value
    })
   setFilters({ ...filters, status: value ? [value] : [] });
     
  }
 
return (
  <div className="flex items-end gap-4 w-full">
    {/* Search Input */}
    <div className="relative">
      <Input
        type="text"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search Customer"
        className="w-[250px] border-gray-300"
      />
      <div className="absolute inset-y-0 right-2 flex items-center">
        {searchText ? (
          <Button variant="ghost" size="icon" onClick={handleSearchClear}>
            <X size={16} color="black" />
          </Button>
        ) : (
          <Search color="black" size={16} strokeWidth={2} />
        )}
      </div>
    </div>

    {/* Company Status */}
    <div className="flex flex-col">
      <Label htmlFor="status" className="mb-2 ml-1">
        Company Status
      </Label>
      <Select onValueChange={(value) => handleStatus(value)} value={statuss}>
        <SelectTrigger id="status" className="w-[120px] border-gray-300">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Deactivated">Deactivated</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Apply Filters Button */}
    <div className="flex flex-col justify-end">
      <Button type="button" >Apply Filters</Button>
    </div>
<div className="w-full flex justify-end items-center space-x-2">
  <div className="flex flex-col justify-end">
    <Button type="button" variant="outline">Create Customer</Button>
  </div>
  <div onClick={fetchCustomers}>
    <RotateCw className="w-6 h-6 text-gray-600" />
  </div>
</div>

  </div>
);

}
export default CustomerFilter;