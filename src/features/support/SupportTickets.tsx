// import { useState } from 'react';
import React from 'react';

import { format } from 'date-fns';
import { CalendarIcon, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

import { useSupportTicketStore } from '../../stores/useSupportTicketStore';
// import { isMobile } from "react-device-detect";
import { SearchTypes } from './searchtype';

import { useState, useRef, useEffect } from "react";
import { useSkillsMultiSelect } from '../../hooks/useSkillsMultiSelect';
import { useForm } from "react-hook-form";
import SupportTicketsdialog from './routes/createticket';
import { useGetSupportFilters } from '@/hooks/useGetSupportUsers';
import useSupportStore from '@/stores/useSupportStore';

type FormData = {
  contactPerson: string;
  customer : string;
  
  // Add more fields here as needed
};

const SupportTickets = ({
  searchTextValue,
  handleSearch,
  handleSearchClear,
  searchPlaceholder = 'Search',
}: SearchTypes) => {
  const setFilters = useSupportTicketStore(state => state.setFilters);
  // const clearFilters = useSupportTicketStore((state) => state.clearFilters);

  //   const { searchText, status: storedStatus, priority: storedPriority, dob, technician: storedTechnician } =
  // useSupportTicketStore();

  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [technician, setTechnician] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);   
  
   const { register, handleSubmit, formState: { errors }, reset, } = useForm<FormData>();
   const { supportData}=useSupportStore();
 

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
    setIsDialogOpen(false);
  reset();
  };

  useEffect(() => {
    if (!isDialogOpen) {
      reset()
    }
  }, [isDialogOpen, reset])

  const handleApplyFilters = () => {
    setFilters({
      searchText: searchTextValue,
      status,
      priority,
      dob: filterDate,
      technician,
    });

    setTimeout(() => {
      const currentState = useSupportTicketStore.getState();
      console.log('✅ Success: Store values', currentState);
    });
    // console.log("Filters Applied");

    setStatus('');
    setPriority('');
    setFilterDate(undefined);
    setTechnician('');
    handleSearchClear();

    // console.log("Filters Applied and Inputs Cleared");

    

  //   const handleClearAll = () => {
  //     setStatus("");
  //     setPriority("");
  //     setFilterDate(undefined);
  //     setTechnician("");
  //     clearFilters();
  //     handleSearchClear();
  //     console.log("Filters Cleared");
  //   };

  
  }
  const { skillsList, selectedSkills, toggleSkill } = useSkillsMultiSelect();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
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
          {/* <Button variant="outline" type="button" onClick={handleClearAll}>Clear Filters</Button> */}
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
          reset();           // Clear form
          setSkillsOpen(false); // Close skills dropdown
          }
          }}>
            <DialogTrigger asChild>
              {/* <Button variant="outline" className='bg-black text-white'>Open Dialog</Button> */}
              {/* <Button type="button"  >
            Create Ticket
          </Button> */}
          <SupportTicketsdialog />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[930px] max-h-[100vh] overflow-hidden bg-gray-100 p-4   ">
              <DialogHeader className='bg-white p-4 rounded-lg mt-4 mr-4 '>
                <DialogTitle className='text-xl'>Create New Ticket</DialogTitle>
              </DialogHeader>
              {/* <div className="overflow-y-auto max-h-[60vh] space-y-6 pr-2"> */}
              <form onSubmit={handleSubmit(onSubmit)}>
              <ScrollArea className="h-[500px] pr-4 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-400">
                <div className="space-y-6">
                  {/* Customer 1 */}
                  <div className="space-y-2 bg-white p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">Customer Information</h3>
                    <div className="grid grid-cols-2 gap-4 ">
                      <div className="space-y-1">
                        <Label htmlFor="name" className='text-gray-700'>Customer</Label>
                        <Input id="name" placeholder="search customer " className='w-[350px] border-gray-300 mt-2 ' 
                        {...register("customer", { required: "Customer is required" })}/>
                        {errors.customer && (
                        <p className="text-red-500 text-sm    ">{errors.customer?.message}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className='text-gray-700'>Contact Person</Label>
                        <Input id="email" placeholder="Select contact" className='w-[350px] border-gray-300 mt-2' 
                        {...register("contactPerson", { required: "Contact person is required" })} />
                        {errors.contactPerson && (
                        <p className="text-red-500 text-sm    ">{errors.contactPerson?.message}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="phone" className='text-gray-700'>Phone</Label>
                        <Input id="phone" placeholder="Enter phone number" className='w-[350px] border-gray-300 mt-2'  />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="address" className='text-gray-700'>Email</Label>
                        <Input id="address" placeholder="v@gmail.com" className='w-[350px] border-gray-300 mt-2' />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="address" className='text-gray-700'>Address</Label>
                        <Input id="address" placeholder="Enter address" className='w-[350px] border-gray-300 mt-2' />
                      </div>
                    </div>
                  </div>

                  {/* Customer 2 */}
                  <div className="space-y-2 gap-5 bg-white p-4 rounded-lg">
                    <h3 className="font-semibold">Ticket Details</h3>
                    <div className="space-y-1 w-[770px] ">
                      <Label htmlFor="email" className='text-gray-700'>Subject</Label>
                      <Input
                        id="email"
                        placeholder="Brief description of the issue"
                        className='border-gray-300' 
                      />
                    </div>
                    <div className="grid grid-cols-2  mt-3 ">
                      <div className="space-y-1">
                        <Label htmlFor="email" className='text-gray-700'>Category</Label>
                        <Select>
                          <SelectTrigger
                            id="status"
                            className=" w-[350px] border-gray-300  "
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="phone" className='text-gray-700'>Priority</Label>
                        <Select>
                          <SelectTrigger
                            id="priority"
                            className="w-[350px] border-gray-300"
                          >
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1 w-[770px] mt-3">
                        <Label htmlFor="address" className='text-gray-700'>Description</Label>
                        <Input
                          id="address"
                          placeholder="Detailed description of the issue..."
                          className="h-[100px] border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Customer 3 */}
                  <div className="space-y-2 bg-white p-4 rounded-lg">
                    <h3 className="font-semibold">Field Service Deatils</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="name" className='text-gray-700'>Service Type</Label>
                        <Select>
                          <SelectTrigger
                            id="priority"
                            className="w-[350px] border-gray-300"
                          >
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1 w-[350px]">
                        <Label htmlFor="email" className='text-gray-700'>Preferred Date</Label>
                        <input
                          id="dob"
                          type="date"
                          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 "
                          placeholder="Select your birth date"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="name" className='text-gray-700'>Prefered Time</Label>
                        <Select>
                          <SelectTrigger
                            id="preferred-time"
                            className=" border-gray-300"
                          >
                            <SelectValue placeholder="Select preferred time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">
                              Morning (8am - 12pm)
                            </SelectItem>
                            <SelectItem value="afternoon">
                              Afternoon (12pm - 4pm)
                            </SelectItem>
                            <SelectItem value="evening">
                              Evening (4pm - 8pm)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="address" className='text-gray-700'>Estimated Duration</Label>
                        <Select>
                          <SelectTrigger
                            id="estimated-duration"
                            className="w-[350px] border-gray-300"
                          >
                            <SelectValue placeholder="Select estimated duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30min">30 minutes</SelectItem>
                            <SelectItem value="1hour">1 hour</SelectItem>
                            <SelectItem value="2hours">2 hours</SelectItem>
                            <SelectItem value="half-day">Half day</SelectItem>
                            <SelectItem value="full-day">Full day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="service-type" className='text-gray-700'>Service Type</Label>
                        <Select>
                          <SelectTrigger
                            id="service-type"
                            className="w-[350px] border-gray-300"
                          >
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="consultation">
                              Consultation
                            </SelectItem>
                            <SelectItem value="maintenance">
                              Maintenance
                            </SelectItem>
                            <SelectItem value="installation">
                              Installation
                            </SelectItem>
                            <SelectItem value="repair">Repair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div
                      
                      className="relative w-[350px]" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1 ">
        Skills Required
      </label>
      <button
        type="button"
        className="w-full border border-gray-300 rounded-md p-2 text-left text-gray-700"
        // onClick={() => setOpen(!open)}
        onClick={() => setSkillsOpen(!skillsOpen)}
      >
        {selectedSkills.length > 0
          ? selectedSkills.join(", ")
          : "Select skills..."}
      </button>

      {skillsOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {skillsList.map((skill) => (
            <label
              key={skill}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 mr-2"
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              <span className="text-gray-900">{skill}</span>
            </label>
          ))}
        </div>
      )}
    </div>
                    </div>
                    <div className="space-y-1 w-[780px] ">
                      <Label htmlFor="address" className='text-gray-700'>
                        Special Instructions for Technician
                      </Label>
                      <Input
                        id="address"
                        placeholder="Any specific instructions of requirements..."
                        className="h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => reset()}>Cancel</Button>
                </DialogClose>
                <Button type="submit">Create & Add Another</Button>
                <Button type="submit">Create Ticket</Button>
                
              </DialogFooter>
              </ScrollArea>
              </form>

            </DialogContent>
          </Dialog>
        </div>
      </div>
      

      <div className="border-b"></div>
    </div>
  );
};

export default SupportTickets;

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useFilterStore } from "@/stores/useSupportTicketStore"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { CardHeader, CardTitle } from "@/components/ui/card"

// export default function FilterPanel() {
//   const {
//     search,
//     status,
//     priority,
//     dateOfBirth,
//     technician,
//     setFilter,
//     // resetFilters,
//   } = useFilterStore()

//   const handleApplyFilters = () => {
//     console.log("Filters applied:", {
//       search,
//       status,
//       priority,
//       dateOfBirth,
//       technician,
//     })

//   }

//   return (
//     <div className="">
//        <CardHeader>
//         <CardTitle className="text-xl font-semibold   tracking-wide w-[500px]  ">
//           <span className="text-2xl">S</span>ervice Ticket Management
//         </CardTitle>
//       </CardHeader>

//     <div className=" flex justify-between  mt-5 mx-8 ">
//       <div>
//         <Label htmlFor="search" className="mb-2">Search Tickets</Label>
//       <Input
//         placeholder="Search tickets"
//         value={search}
//         onChange={(e) => setFilter("search", e.target.value)}
//         className="w-[220px]"
//         />
//         </div>

//       <div>
//           <Label htmlFor="status" className="mb-2">Status</Label>
//           <Select onValueChange={(value) => setFilter("status", value)}  value={status}>
//             <SelectTrigger id="status" className="w-[120px] border-gray-300  ">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Open">Open</SelectItem>
//               <SelectItem value="Closed">Closed</SelectItem>
//               <SelectItem value="In Progress">In Progress</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div>
//             <Label htmlFor="priority" className="mb-2">Priority</Label>
//             <Select onValueChange={(value) => setFilter("priority", value)} value={priority}>
//               <SelectTrigger id="priority" className="w-[120px] border-gray-300">
//                 <SelectValue placeholder="Priority" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Low">Low</SelectItem>
//                 <SelectItem value="Medium">Medium</SelectItem>
//                 <SelectItem value="High">High</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//       <div>
//            <Label htmlFor="priority" className="mb-2">Date of birth</Label>
//       <Input
//         placeholder="Date of Birth"
//         type="date"
//         value={dateOfBirth}
//         onChange={(e) => setFilter("dateOfBirth", e.target.value)}
//       />
//       </div>

//       <div>
//           <Label htmlFor="technician" className="mb-2">Assigned Technician</Label>
//           <Select onValueChange={(value) => setFilter("technician", value)}  value={technician}>
//             <SelectTrigger id="technician" className="w-[180px] border-gray-300">
//               <SelectValue placeholder="Technician" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Alice">Alice</SelectItem>
//               <SelectItem value="Bob">Bob</SelectItem>
//               <SelectItem value="Charlie">Charlie</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       <div className="flex gap-2 mt-3">
//         <Button onClick={handleApplyFilters}>Apply Filters</Button>
//         {/* <Button variant="outline" onClick={resetFilters}>
//           Reset
//         </Button> */}

//       </div>
//     </div>
//     <div className="border-b mt-4">

//     </div>
//       </div>
//   )
// }
