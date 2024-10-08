"use client";

import { useState, useEffect } from "react";
import { Suppliers } from "@/lib/utils/dataTypes";

import { DataTablePagination } from "@/components/pagination";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import EditForm from "@/components/forms/supplierEdit-form";

import { Button } from "@/components/ui/button";
import { HousePlus, LayoutList, Cat } from "lucide-react";
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
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { columns } from "../_components/columns";

export const DataTable = ({ 
  data,
  reminderHandler,
}: { 
  data: Suppliers,
  reminderHandler: (supplierId: string) => void
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
        pageSize: 5, //custom default page size
      },
    },
    getRowId: (row) => row._id,
  });
  
  useEffect(() => {
    if (rowSelection !== undefined) {
      const supplierId = Object.keys(rowSelection)[0];
      if (supplierId !== "") {
        
        reminderHandler(supplierId);
      };
    };
  }, [rowSelection]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <ResponsiveDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          title="Add Supplier"
          description="Add new supplier"
        >
          <EditForm setIsOpen={setIsEditOpen} />
        </ResponsiveDialog>
        <Input
          id="search"
          placeholder="Search..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex gap-4 ">
          <Button
            variant="outline"
            onClick={() => {
              setIsEditOpen(true);
            }}
            className="ml-4 rounded-md p-2 hover:bg-neutral-100"
          >
            <IconMenu
              text="Add Supplier"
              icon={<HousePlus className="h-4 w-4" />}
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <IconMenu
                  text="View"
                  icon={<LayoutList className="h-4 w-4" />}
                />
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
                  <IconMenu
                    className="text-gray-400"
                    text="Wow! Such Empty"
                    icon={<Cat className="h-10 w-10 text-gray-300 " />}
                  />
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
