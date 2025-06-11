import { RotateCw, Search, X } from 'lucide-react';

import { ShadCnButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAccountsStore from '@/stores/useAccountStore';
import useUserStore from '@/stores/useUserStore';

import { AccountElastic } from './api/AccountElastics';
import { ElasticSearchServices } from './api/ElasticSearchServices';

const CustomerFilter = () => {
  const {
    searchText,
    setSearchText,
    filters,
    setData,
    setLoading,
    setFilters,
    statuss,
    setStatus,
  } = useAccountsStore();
  const { tenantId } = useUserStore();

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSearchClear = () => {
    setSearchText('');
  };

  const fetchCustomers = async (filterParams, searchText = '') => {
    const elasticData = AccountElastic.BuildCustomerquery(
      filterParams,
      searchText
    );
    const data = await ElasticSearchServices.CustomerGet(elasticData, tenantId);
    const customerResponse = ElasticSearchServices.FormatResults(data);
    setData(customerResponse);
    setLoading(false);
    return customerResponse;
  };

  // Debounced search effect
  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     if (searchText.length > 2) {
  //       const updatedFilters = { ...filters, offset: 0, limit: 20 };
  //       setLoading(true);
  //       setFilters(updatedFilters);
  //       fetchCustomers(updatedFilters, searchText);
  //     } else if (searchText.length === 0) {
  //       setLoading(true);
  //       fetchCustomers(filters, "");
  //     }
  //   }, 400);

  //   return () => clearTimeout(delayDebounce);
  // }, [searchText]);

  const handleStatusChange = (value: string) => {
    setStatus(value); // Only update status; no fetch
  };

  const handleApplyFilters = () => {
    const updated = {
      ...filters,
      offset: 0,
      limit: 20,
      isActivated: statuss,
      status: statuss ? [statuss] : [],
    };
    setFilters(updated);
    setLoading(true);
    fetchCustomers(updated, searchText);
  };

  return (
    <div className="flex items-end gap-4 w-full shadow-md rounded-md flex-wrap p-4">
      {/* Search Input */}
      <div className="relative">
        <Label htmlFor="status" className="mb-2 ml-1">
          Customer search
        </Label>
        <Input
          type="text"
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search Customer"
          className=" w-[300px] lg:w-[250px] border-gray-300"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          {searchText ? (
            <div onClick={handleSearchClear}>
              <X size={16} color="black" className="mt-6" />
            </div>
          ) : (
            <Search color="black" size={16} strokeWidth={2} className="mt-6" />
          )}
        </div>
      </div>

      {/* Company Status */}
      <div className="flex flex-col">
        <Label htmlFor="status" className="mb-2 ml-1">
          Company Status
        </Label>
        <Select onValueChange={handleStatusChange} value={statuss}>
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
        <ShadCnButton type="button" onClick={handleApplyFilters}>
          Apply Filters
        </ShadCnButton>
      </div>

      {/* Create + Refresh */}
      <div className="flex flex-1 justify-end items-center space-x-2">
        {/* <Button type="button" variant="outline">
          Create Customer
        </Button> */}
        <div
          onClick={handleApplyFilters}
          className="cursor-pointer hover:rotate-90 transition-transform"
        >
          <RotateCw className=" w-6 h-6 lg:w-8 lg:h-8 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default CustomerFilter;
