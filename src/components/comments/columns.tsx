'use client';
import { Comment } from '@/lib/utils/dataTypes';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Comment>[] = [
  {
    accessorKey: "comment",
    size: 400,
    enableResizing: true,
    minSize: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comment" />
    ),
    // cell: ({ row }) => {
    //   const formatted: string = row.getValue("comment");
    //   return (
    //     <div className="text-ellipsis font-medium ...">
    //       {formatted}
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Dt" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("createdAt")) return null;
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString("en-GB");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Update Dt" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("updatedAt")) return null;
      const date = new Date(row.getValue("updatedAt"));
      const formatted = date.toLocaleDateString("en-GB");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
