import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { CalendarIcon, Search, X } from 'lucide-react';

import { ShadCnButton } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import useSideBarStore from '@/stores/sidebarStore';

import { useSupportTicketStore } from '../../stores/useSupportTicketStore';
import SupportTicketsdialog from './routes/createticket';
import { SearchTypes } from './searchtype';

type FormData = {
  contactPerson: string;
  customer: string;
};

const SupportTickets = ({
  searchTextValue,
  handleSearch,
  handleSearchClear,
  searchPlaceholder = 'Search',
}: SearchTypes) => {
  const setFilters = useSupportTicketStore(state => state.setFilters);

  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [technician, setTechnician] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { reset } = useForm<FormData>();

  useEffect(() => {
    if (!isDialogOpen) {
      reset();
    }
  }, [isDialogOpen, reset]);

  const handleApplyFilters = () => {
    setFilters({
      searchText: searchTextValue,
      status,
      priority,
      dob: filterDate,
      technician,
    });
    setStatus('');
    setPriority('');
    setFilterDate(undefined);
    setTechnician('');
    handleSearchClear();
  };

  const { sideOpen } = useSideBarStore();

  return (
    <div
      className={`w-full ${
        sideOpen
          ? 'lg:max-w-[calc(100vw-20rem)]'
          : 'lg:max-w-[calc(100vw-5rem)]'
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-4 shadow-md rounded-md p-4">
        {/* Search */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="search">Search Tickets</Label>
          <div className="relative">
            <Input
              type="text"
              value={searchTextValue}
              onChange={e => handleSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="pr-10 border-gray-300"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              {searchTextValue ? (
                <ShadCnButton
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchClear}
                >
                  <X size={16} color="black" />
                </ShadCnButton>
              ) : (
                <Search color="black" size={16} strokeWidth={2} />
              )}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={setStatus} value={status}>
            <SelectTrigger id="status" className="border-gray-300">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="priority">Priority</Label>
          <Select onValueChange={setPriority} value={priority}>
            <SelectTrigger id="priority" className="border-gray-300">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="filterDate">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <ShadCnButton
                variant="outline"
                className={cn(
                  'justify-start text-left font-normal border-gray-300',
                  !filterDate && 'text-muted-foreground'
                )}
              >
                {filterDate ? (
                  format(filterDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </ShadCnButton>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filterDate}
                onSelect={setFilterDate}
                disabled={date =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Assigned Technician */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="technician">Assigned Technician</Label>
          <Select onValueChange={setTechnician} value={technician}>
            <SelectTrigger id="technician" className="border-gray-300">
              <SelectValue placeholder="Technician" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alice">Alice</SelectItem>
              <SelectItem value="Bob">Bob</SelectItem>
              <SelectItem value="Charlie">Charlie</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-2 justify-end">
          <ShadCnButton type="button" onClick={handleApplyFilters}>
            Apply Filters
          </ShadCnButton>

          <Dialog
            open={isDialogOpen}
            onOpenChange={open => {
              setIsDialogOpen(open);
              if (!open) {
                reset();
              }
            }}
          >
            <DialogTrigger asChild>
              <SupportTicketsdialog />
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      <div className="border-b"></div>
    </div>
  );
};

export default SupportTickets;
