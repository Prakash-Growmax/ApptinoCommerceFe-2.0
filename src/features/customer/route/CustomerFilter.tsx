import { Search, X } from 'lucide-react';

import { ShadCnButton } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAppStore from '@/stores/appStore';
import useSideBarStore from '@/stores/sidebarStore';
import useAccountsStore from '@/stores/useAccountStore';
import { TokenPayload } from '@/types/auth.types';
import { ElasticSearchService } from '@/utils/Services/ElasticSearchServices';
import { handleError } from '@/utils/errorHandling';

import { AccountElastic } from '../api/AccountElastics';
import { ElasticSearchServices } from '../api/ElasticSearchServices';
import React, { useState } from 'react';
import CreateCustomer from './CreateCustomer';
import { useGetCustomerAddress } from '../hook/useGetCustomerAddress';



const CustomerFilter = (): React.JSX.Element => {
  const {
    searchText,
    setSearchText,
    filters,
    setData,
    setLoading,
    setFilters,
    statuss,
    setStatus,
     refetchCustomers,
  } = useAccountsStore();
  const { payload } = useAppStore();

  const { tenantId } = payload as TokenPayload;
  

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSearchClear = () => {
    setSearchText('');
  };
  
  const fetchCustomers = async (filterParams: unknown, searchText = ''): Promise<any> => {
    try {
      const elasticData = AccountElastic.BuildCustomerquery(
        filterParams,
        searchText
      );
      const data = await ElasticSearchServices.CustomerGet(elasticData, tenantId);
      const customerResponse = ElasticSearchService.FormatResults(data);
      setData(customerResponse);
      return customerResponse;
    } catch (error: unknown) {
      handleError(error, 'fetchCustomers', 'Error fetching customers');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value); // Only update status; no fetch
  };

  const handleApplyFilters = () => {
    setLoading(true);
    const updated = {
      ...filters,
      offset: 0,
      limit: 20,
      isActivated: statuss,
      status: statuss ? [statuss] : [],
    };
    setFilters(updated);
    fetchCustomers(updated, searchText);
    if (refetchCustomers) refetchCustomers();
  };

  const handleClearFilters = () => {
    setSearchText('');
    setStatus('');
    setLoading(true);
    const clearedFilters = {
      offset: 0,
      limit: 20,
      isActivated: '',
      status: [],
    };
    setFilters(clearedFilters);
    fetchCustomers(clearedFilters, '');
    if (refetchCustomers) refetchCustomers(); 
  };

  // Check if any filters are applied
  const hasActiveFilters = searchText || statuss;
  const { sideOpen } = useSideBarStore();
  const [open,setOpen]=useState(false)
  return (
    <div className='w-full'>
        <Card
      className={`flex flex-col sm:flex-row justify-between p-3 sm:p-4 gap-3 sm:gap-0 w-full rounded-md w-[900rem] ml-4 ${
        sideOpen
          ? 'lg:max-w-[calc(100vw-20rem)]'
          : 'lg:max-w-[calc(100vw-5rem)]'
      }`}
    >
      <div className="flex flex-1 gap-3 flex-wrap">
        {/* Search Input */}
        <div className="relative  w-full lg:w-[240px]">
          <Input
            type="text"
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search Customer"
            className="w-full "
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            {searchText ? (
              <div onClick={handleSearchClear} className="cursor-pointer">
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </div>
            ) : (
              <Search size={16} className="text-gray-400" />
            )}
          </div>
        </div>

        {/* Company Status */}
        <Select onValueChange={handleStatusChange} value={statuss}>
          <SelectTrigger className="w-full lg:w-[100px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Deactivated">Deactivated</SelectItem>
          </SelectContent>
        </Select>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <ShadCnButton
            type="button"
            onClick={handleApplyFilters}
            className="flex-1 sm:flex-none"
          >
            <span className="sm:hidden">Apply</span>
            <span className="hidden sm:inline">Apply Filters</span>
          </ShadCnButton>

          {hasActiveFilters && (
            <ShadCnButton
              type="button"
              variant="outline"
              onClick={handleClearFilters}
              className="flex items-center gap-1 flex-1 sm:flex-none"
            >
              <X className="h-4 w-4" />
              <span className="sm:hidden">Clear</span>
              <span className="hidden sm:inline">Clear</span>
            </ShadCnButton>
          )}
        </div>
      </div>
      <div>
        <ShadCnButton type='button' className="flex-1 sm:flex-none w-full" onClick={()=>{setOpen(true)}} >
          Create Customer
        </ShadCnButton>
      </div>
    </Card>
     <CreateCustomer open={open} setOpen={setOpen}/>
    </div>
  
  );
};

export default CustomerFilter;
