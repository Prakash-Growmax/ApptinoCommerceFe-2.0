import { ShadCnButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSideBarStore from "@/stores/sidebarStore";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SupportTicketsDialog from "../routes/createticket";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetSupportFilterSettings } from "../hook/useGetSupportFilterSettings";
import { useSupportTicketFilterStore } from "../store/useSupportTicketFilterStore";
import useSupportStore from "../store/useSupportStore";
import useAppStore from "@/stores/appStore";
import { TokenPayload } from "@/types/auth.types";
import { GetFetchSupportTicket } from "../api/support.api";
import _ from "lodash";

const SupportFilters = () => {
  useGetSupportFilterSettings();
  const { status, category } = useSupportTicketFilterStore();
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { tenantId } = payload as TokenPayload;
  const { sideOpen } = useSideBarStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isDialogOpen) reset();
  }, [isDialogOpen, reset]);
  const [filters, setFilters] = useState({

});
  const {
    page,
    rowPerPage,
    setSupportData,
    setTotalCount,
  } = useSupportStore();

 const handleChange = (key: keyof typeof filters, value: string) => {
  setFilters((prev) => ({
    ...prev,
    [key]: [value],
  }));
};

  const handleApplyFilter = async () => {
    const body = _.cloneDeep(filters);
    const response = await GetFetchSupportTicket({
      tenantId,
      page,
      rowPerPage,
      body,
      token,
    });
    setSupportData(response?.result);
    setTotalCount(response?.count);
  };

  return (
    <div
      className={`flex items-end gap-4 w-full shadow-md rounded-md flex-wrap p-4 ${
        sideOpen ? "lg:max-w-[calc(100vw-20rem)]" : "lg:max-w-[calc(100vw-5rem)]"
      }`}
    >
      {/* <div className="relative">
        <Label htmlFor="status" className="mb-2 ml-1">
          Customer search
        </Label>
        <Input
          type="text"
          placeholder="Search Customer"
          className=" w-[250px] lg:w-[250px] border-gray-300"
        />
      </div> */}

      <div className="flex flex-col gap-1">
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={(value) => handleChange("status", value)}>
          <SelectTrigger id="status" className="border-gray-300">
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
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="priority">Priority</Label>
        <Select onValueChange={(value) => handleChange("priority", value)}>
          <SelectTrigger id="priority" className="border-gray-300">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={(value) => handleChange("category", value)}>
          <SelectTrigger id="category" className="border-gray-300">
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
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="ticketIdentifier">Ticket Identifier</Label>
        <Input
          type="text"
          placeholder="Ticket Identifier"
          onChange={(e) => handleChange("ticketIdentifier", e.target.value)}
        />
      </div>

      <div className="flex gap-2 mt-4">
        <ShadCnButton type="button" onClick={handleApplyFilter}>
          Apply Filters
        </ShadCnButton>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              reset();
              setSkillsOpen(false);
            }
          }}
        >
          <DialogTrigger asChild>
            <SupportTicketsDialog />
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
};

export default SupportFilters;
