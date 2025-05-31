// columns.ts
import { ColumnDef } from "@tanstack/react-table";

export type Ticket = {
  id: string;
  createdAt: string;
  slaDue: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Closed";
  customer: string;
  contact: string;
  issue: string;
  technician: string;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: "Ticket ID",
    cell: ({ row }) => <span className="font-medium text-blue-600">#{row.original.id}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "slaDue",
    header: "SLA Due",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>⏰</span>
        <span className="text-red-500 font-medium">Overdue</span>
      </div>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
        {row.original.priority}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "issue",
    header: "Issue",
  },
  {
    accessorKey: "technician",
    header: "Technician",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {/* Replace this with technician avatar if available */}
        <img
          src="/avatar-placeholder.png"
          alt="Technician"
          className="h-6 w-6 rounded-full"
        />
        <span>{row.original.technician}</span>
      </div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <button className="text-gray-500 hover:text-blue-600">✏️</button>
        <button className="text-gray-500 hover:text-red-600">🗑️</button>
      </div>
    ),
  },
];
