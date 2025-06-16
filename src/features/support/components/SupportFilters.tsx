import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import _ from 'lodash';

import { ShadCnButton } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
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
import { TokenPayload } from '@/types/auth.types';

import { GetFetchSupportTicket } from '../api/support.api';
import { useGetSupportFilterSettings } from '../hook/useGetSupportFilterSettings';
import SupportTicketsDialog from '../routes/createticket';
import useSupportStore from '../store/useSupportStore';
import { useSupportTicketFilterStore } from '../store/useSupportTicketFilterStore';

const SupportFilters = () => {
  useGetSupportFilterSettings();
  const { status, category } = useSupportTicketFilterStore();
  const { accessToken, payload } = useAppStore();
  const token = accessToken as string;
  const { tenantId } = payload as TokenPayload;
  const { sideOpen } = useSideBarStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { reset } = useForm();

  useEffect(() => {
    if (!isDialogOpen) reset();
  }, [isDialogOpen, reset]);
  const [filters, setFilters] = useState({});
  const { page, rowPerPage, setSupportData, setTotalCount } = useSupportStore();

  const handleChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({
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
    <Card
      className={`flex flex-row justify-between p-4  ${
        sideOpen
          ? 'lg:max-w-[calc(100vw-20rem)]'
          : 'lg:max-w-[calc(100vw-5rem)]'
      }`}
    >
      <div className="flex flex-1 gap-2">
        <Select onValueChange={value => handleChange('status', value)}>
          <SelectTrigger id="status">
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

        <Select onValueChange={value => handleChange('priority', value)}>
          <SelectTrigger id="priority">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={value => handleChange('category', value)}>
          <SelectTrigger id="category">
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

        <div className="flex flex-end">
          <Input
            type="text"
            placeholder="Ticket Identifier"
            onChange={e => handleChange('ticketIdentifier', e.target.value)}
          />
        </div>
        <ShadCnButton type="button" onClick={handleApplyFilter}>
          Apply Filters
        </ShadCnButton>
      </div>
      <div className="flex justify-end">
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
            <SupportTicketsDialog />
          </DialogTrigger>
        </Dialog>
      </div>
    </Card>
  );
};

export default SupportFilters;
