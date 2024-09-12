'use client';
import { Reminder } from '@/lib/utils/dataTypes';
import { Switch } from '@/components/ui/switch';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Reminder>[] = [
  {
    accessorKey: "reminder",
    size: 400,
    enableResizing: true,
    minSize: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reminder" />
    ),
  },
  {
    accessorKey: "enabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Enabled" />
    ),
    cell: ({ row }) => <Switch checked={row.getValue("enabled")} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
