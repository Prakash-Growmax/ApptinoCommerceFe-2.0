// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { CalendarIcon, Search, X } from 'lucide-react';

// import { isMobile } from "react-device-detect";
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

import { useSkillsMultiSelect } from '../../hooks/useSkillsMultiSelect';
import { useSupportTicketStore } from '../../stores/useSupportTicketStore';
import SupportTicketsdialog from './routes/createticket';
import { SearchTypes } from './searchtype';

type FormData = {
  contactPerson: string;
  customer: string;

  // Add more fields here as needed
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
  const [skillsOpen, setSkillsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = () => {
    setIsDialogOpen(false);
    reset();
  };

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
  // const { skillsList, selectedSkills, toggleSkill } = useSkillsMultiSelect();
  // const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-1">
      <div className="flex flex-wrap gap-4 lg:gap-2 justify-start md:justify-between mb-4 shadow-md rounded-md p-4">
        {/* Search */}
        <div className="flex flex-col space-y-1 w-full sm:w-[250px]">
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
        <div className="flex space-x-8 lg:space-x-0 ml-0 lg:ml-2">
          <div className="flex flex-col space-y-1 w-full w-[120px] lg:w-[150px]">
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
          <div className="flex flex-col space-y-1 w-full sm:w-[120px] ml-8 lg:ml-0 ">
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
        </div>
        {/* Status */}

        {/* Date */}
        <div className="flex space-x-4 lg:space-x-3 w-full sm:w-auto -ml-0 lg:-ml-2">
          <div className="flex flex-col space-y-1 w-full sm:w-[180px]">
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
          <div className="flex flex-col space-y-1 w-full sm:w-[180px]">
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
        </div>

        {/* Technician */}

        {/* Button Group */}
        <div className="flex flex-col lg:flex-row gap-1 w-full sm:w-auto mt-0 lg:mt-4 -ml-0 lg:-ml-12">
          <ShadCnButton type="button" onClick={handleApplyFilters}>
            Apply Filters
          </ShadCnButton>

          <Dialog
            open={isDialogOpen}
            onOpenChange={open => {
              setIsDialogOpen(open);
              if (!open) {
                reset();
                setSkillsOpen(false);
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
