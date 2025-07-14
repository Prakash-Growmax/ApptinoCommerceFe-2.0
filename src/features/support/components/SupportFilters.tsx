import React, { useState } from 'react';

import { cloneDeep } from '@/utils/object';
import { X } from 'lucide-react';

import { ShadCnButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAppStore from '@/stores/appStore';
import { TokenPayload } from '@/types/auth.types';
import { handleError } from '@/utils/errorHandling';

import { GetFetchSupportTicket } from '../api/support.api';
import { useGetSupportFilterSettings } from '../hook/useGetSupportFilterSettings';
import useSupportStore from '../store/useSupportStore';
import { useSupportTicketFilterStore } from '../store/useSupportTicketFilterStore';
import SupportTicketsDialog from '../routes/createticket';

const SupportFilters = (): React.JSX.Element => {
  useGetSupportFilterSettings();
  const { status, priority, category } = useSupportTicketFilterStore();
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { tenantId } = payload as TokenPayload;

  const [filters, setFilters] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ticketIdentifier, setTicketIdentifier] = useState('');

  const { page, rowPerPage, setSupportData, setTotalCount, setLoading } =
    useSupportStore();

  const handleChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: [value],
    }));

    // Update individual state for controlled components
    switch (key) {
      case 'status':
        setSelectedStatus(value);
        break;
      case 'priority':
        setSelectedPriority(value);
        break;
      case 'category':
        setSelectedCategory(value);
        break;
      case 'ticketIdentifier':
        setTicketIdentifier(value);
        break;
    }
  };

  const handleApplyFilter = async () => {
    try {
      setLoading(true);
      const body = cloneDeep(filters);
      console.log('Sending filters:', body);
      const response = await GetFetchSupportTicket({
        tenantId,
        page,
        rowPerPage,
        body,
        token,
      });
      setSupportData(response?.result || []);
      setTotalCount(response?.count || 0);
    } catch (error: unknown) {
      handleError(error, 'applyFilters', 'Error applying filters');
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = async () => {
    try {
      setLoading(true);
      // Clear all filter states
      setFilters({});
      setSelectedStatus('');
      setSelectedPriority('');
      setSelectedCategory('');
      setTicketIdentifier('');

      // Fetch data without filters
      const response = await GetFetchSupportTicket({
        tenantId,
        page,
        rowPerPage,
        body: {},
        token,
      });
      setSupportData(response?.result || []);
      setTotalCount(response?.count || 0);
    } catch (error: unknown) {
      handleError(error, 'handleClearFilters', 'Error clearing filters');
    } finally {
      setLoading(false);
    }
  };

  // Check if any filters are applied
  const hasActiveFilters =
    selectedStatus || selectedPriority || selectedCategory || ticketIdentifier;

  return (
    <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-6 gap-4 w-full">
      <div className="flex flex-1 gap-3 flex-wrap">
        <Select
          value={selectedStatus}
          onValueChange={value => handleChange('status', value)}
        >
          <SelectTrigger
            id="status"
            className="w-full lg:w-[140px] my-3 lg:my-0"
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {status.map((s, index) => (
              <SelectItem key={index} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedPriority}
          onValueChange={value => handleChange('priority', value)}
        >
          <SelectTrigger
            id="priority"
            className="w-full lg:w-[140px] my-3 lg:my-0"
          >
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            {priority.map((p, index) => (
              <SelectItem key={index} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedCategory}
          onValueChange={value => handleChange('category', value)}
        >
          <SelectTrigger
            id="category"
            className="w-full lg:w-[140px] my-3 lg:my-0"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {category.map((c, index) => (
              <SelectItem key={index} value={c.toLowerCase()}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex min-w-32 sm:min-w-40 my-3  lg:my-0">
          <Input
            type="text"
            placeholder="Ticket ID"
            value={ticketIdentifier}
            onChange={e => handleChange('ticketIdentifier', e.target.value)}
            className="lg:w-[150px]"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <ShadCnButton
            type="button"
            onClick={handleApplyFilter}
            className="flex-1 sm:flex-none "
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

          <SupportTicketsDialog/>
        </div>
      </div>
    </div>
  );
};

export default SupportFilters;
