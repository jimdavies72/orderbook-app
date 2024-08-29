'use client';
import { Audit } from '@/lib/utils/dataTypes';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Audit>[] = [
  {
    accessorKey: "model",
    size: 200,
    enableResizing: true,
    minSize: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
  },
  {
    accessorKey: "identifier",
    size: 300,
    minSize: 300,
    enableResizing: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Identity" />
    ),
  },
  {
    accessorKey: "action",
    size: 100,
    enableResizing: true,
    minSize: 50,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
  },
  {
    accessorKey: "reason",
    size: 100,
    enableResizing: true,
    minSize: 50,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reason" />
    ),
  },
  {
    accessorKey: "userId",
    size: 200,
    enableResizing: true,
    minSize: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Id" />
    ),
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actioned By" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action Dt" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("createdAt")) return null;
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString("en-GB");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
