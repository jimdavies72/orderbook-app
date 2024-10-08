"use client";

import { useEffect, useState } from "react";
import { Orders } from "@/lib/utils/dataTypes";

import { DataTablePagination } from "@/components/pagination";
import { ResponsiveDialog } from "@/components/responsive-dialog";

import SuchEmpty from "../suchEmpty";
import EditForm from "@/components/forms/orderEdit-form";

import { Button } from "@/components/ui/button";
import { FolderPlus, LayoutList, SettingsIcon } from "lucide-react";
import IconMenu from "@/components/icon-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelection,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { columns } from "./columns";

export const DataTable = ({
  supplier,
  container,
  showAddButton,
  data,
  orderHandler,
}: {
  supplier: string;
  container: string;
  showAddButton: boolean;
  data: Orders;
  orderHandler: (orderId: string) => void;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: false,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10, //custom default page size
      },
    },
    getRowId: row => row._id,
  });

  useEffect(() => {
    if (rowSelection !== undefined) {
      const orderId = Object.keys(rowSelection)[0]
      if (orderId !== "") {
        orderHandler(orderId);
      };
    };
  }, [rowSelection]);

  useEffect(() => {
    //row selected when change of container or supplier
    setRowSelection({});
  }, [supplier, container]);

  return (
    <div className="w-full">
      <div className="flex items-center mb-3">
        <ResponsiveDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          title="Add Order"
          description="Add new Order"
        >
          <EditForm
            setIsOpen={setIsEditOpen}
            supplier={supplier}
            container={container}
          />
        </ResponsiveDialog>
        <Input
          id="orderNumberSearch"
          placeholder="Search order number..."
          value={
            (table.getColumn("orderNumber")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("orderNumber")?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-[30%]"
        />
        {!showAddButton ? null : (
          <Button
            variant="outline"
            onClick={() => {
              setIsEditOpen(true);
            }}
            className="ml-4 rounded-md p-2 hover:bg-neutral-100"
          >
            <IconMenu
              text="Add Order"
              icon={<FolderPlus className="h-4 w-4" />}
            />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <IconMenu text="View" icon={<LayoutList className="h-4 w-4" />} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    row.getIsSelected()
                      ? "selected hover:cursor-pointer font-bold "
                      : " hover:cursor-pointer hover:bg-slate-200"
                  }
                  onClick={row.getToggleSelectedHandler()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <SuchEmpty hasBorder={false} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
};
