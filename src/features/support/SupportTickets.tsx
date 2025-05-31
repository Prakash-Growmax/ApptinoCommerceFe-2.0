import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
// import { isMobile } from "react-device-detect";
import { SearchTypes } from "./searchtype";
import { Search, X, CalendarIcon } from "lucide-react";
import { useSupportTicketStore } from "../../stores/useSupportTicketStore";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CardHeader, CardTitle } from "@/components/ui/card";


const SupportTickets = ({
  searchTextValue,
  handleSearch,
  handleSearchClear,
  searchPlaceholder = "Search",
}: SearchTypes) => {


  
  const setFilters = useSupportTicketStore((state) => state.setFilters);
  // const clearFilters = useSupportTicketStore((state) => state.clearFilters);

  //   const { searchText, status: storedStatus, priority: storedPriority, dob, technician: storedTechnician } =
  // useSupportTicketStore();



  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [technician, setTechnician] = useState("");

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
    console.log("✅ Success: Store values", currentState);
  }, );
    // console.log("Filters Applied");

    setStatus("");
    setPriority("");
    setFilterDate(undefined);
    setTechnician("");
    handleSearchClear(); 

    // console.log("Filters Applied and Inputs Cleared");
  };

//   const handleClearAll = () => {
//     setStatus("");
//     setPriority("");
//     setFilterDate(undefined);
//     setTechnician("");
//     clearFilters();
//     handleSearchClear();
//     console.log("Filters Cleared");
//   };

  return (
    <div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold   tracking-wide w-[500px] mt-3 ">
          <span className="text-2xl">S</span>ervice Ticket Management
        </CardTitle>
      </CardHeader>

      <div className="flex justify-evenly mt-4 mb-4 flex-wrap gap-2">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="mb-2">Search Tickets</Label>
          {/* {!isMobile && ( */}
            <div className="relative">
              <Input
                type="text"
                value={searchTextValue}
                onChange={(e) => handleSearch(e.target.value)}
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
        <div>
          <Label htmlFor="status" className="mb-2">Status</Label>
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
        <div>
          <Label htmlFor="priority" className="mb-2">Priority</Label>
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
        <div>
          <Label htmlFor="filterDate" className="mb-2">Date of birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal border-gray-300 ",
                  !filterDate && "text-muted-foreground"
                )}
              >
                {filterDate ? format(filterDate, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filterDate}
                onSelect={setFilterDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Technician*/}
        <div>
          <Label htmlFor="technician" className="mb-2">Assigned Technician</Label>
          <Select onValueChange={setTechnician} value={technician}>
            <SelectTrigger id="technician" className="w-[180px] border-gray-300">
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
          <Button type="button" onClick={handleApplyFilters}>Apply Filters</Button>
          {/* <Button variant="outline" type="button" onClick={handleClearAll}>Clear Filters</Button> */}
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
