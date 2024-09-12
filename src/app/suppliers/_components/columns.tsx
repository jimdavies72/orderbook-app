'use client';
import { Supplier } from '@/lib/utils/dataTypes';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

export const columns: ColumnDef<Supplier>[] = [
  {
    accessorKey: "supplierId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supplier Id" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "activeContainerCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Containers" />
    ),
    cell: ({ row }) => (
      <div className="text-left pl-8 font-medium">
        {row.getValue("activeContainerCount")}
      </div>
    ),
  },
  {
    accessorKey: "enabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Enabled" />
    ),
    cell: ({ row }) => (
      <Switch checked={row.getValue("enabled")} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
