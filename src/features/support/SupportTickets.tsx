// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { format } from 'date-fns';
import { CalendarIcon, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import SupportLandingPage from './SupportLanding';
import SupportTicketsdialog from './routes/createticket';
// import { isMobile } from "react-device-detect";
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
  const { skillsList, selectedSkills, toggleSkill } = useSkillsMultiSelect();
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex justify-evenly  mb-4 flex-wrap gap-2">
        {/* Search */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="search" className="mb-2">
            Search Tickets
          </Label>
          {/* {!isMobile && ( */}
          <div className="relative">
            <Input
              type="text"
              value={searchTextValue}
              onChange={e => handleSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-[250px] border-gray-300"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              {searchTextValue ? (
                <Button variant="ghost" size="icon" onClick={handleSearchClear}>
                  <X size={16} color="black" />
                </Button>
              ) : (
                <Search color="black" size={16} strokeWidth={2} />
              )}
            </div>
          </div>
          {/* )} */}
        </div>

        {/* Status*/}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="status" className="mb-2">
            Status
          </Label>
          <Select onValueChange={setStatus} value={status}>
            <SelectTrigger id="status" className="w-[120px] border-gray-300  ">
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
          <Label htmlFor="priority" className="mb-2">
            Priority
          </Label>
          <Select onValueChange={setPriority} value={priority}>
            <SelectTrigger id="priority" className="w-[120px] border-gray-300">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="filterDate" className="mb-2">
            Date of birth
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[180px] justify-start text-left font-normal border-gray-300 ',
                  !filterDate && 'text-muted-foreground'
                )}
              >
                {filterDate ? (
                  format(filterDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
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

        {/* Technician*/}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="technician" className="mb-2">
            Assigned Technician
          </Label>
          <Select onValueChange={setTechnician} value={technician}>
            <SelectTrigger
              id="technician"
              className="w-[180px] border-gray-300"
            >
              <SelectValue placeholder="Technician" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alice">Alice</SelectItem>
              <SelectItem value="Bob">Bob</SelectItem>
              <SelectItem value="Charlie">Charlie</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Btn */}
        <div className="flex flex-col gap-2 mt-4">
          <Button type="button" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
          reset();          
          setSkillsOpen(false); 
          }
          }}>
            <DialogTrigger asChild>
             
          <SupportTicketsdialog />
            </DialogTrigger>

        
          </Dialog>
        </div>
      </div>

      <div className="border-b"></div>
      <SupportLandingPage />
    </div>
  );
};

export default SupportTickets;

