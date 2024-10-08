"use client";

import { useState } from "react";
import { Comments, Order } from "@/lib/utils/dataTypes";

import DeleteForm from "@/components/forms/delete-form";
import EditForm from "@/components/forms/orderEdit-form";
import IconMenu from "@/components/icon-menu";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";

interface WithData<T> {
  _id: string;
  container: string;
  supplier: string;
  orderNumber: string;
  unitCostPrice: number;
  productCode: string;
  customer: string;
  productType: string;
  quantity: number;
  unitWeight: number;
  totalWeight: number;
  ukRequiredDate: string;
  orderPlacedDate: string;
  orderReceivedBySupplier: boolean;
  loaded: boolean;
  sample: string;
  fabricColour: string;
  artworkDrawings: string;
  printOnBag: string;
  artworkSaved: string;
  comments: Comments;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends WithData<Order>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const cardId = row.original._id as string;
  const orderRow = row.original as Order;

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Order"
        description="Edit this Order"
      >
        <EditForm
          setIsOpen={setIsEditOpen}
          container={orderRow.container}
          supplier={orderRow.supplier}
          orderRow={orderRow}
        />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Order"
        description="Are you sure you want to delete this order? The action cannot be undone."
      >
        <DeleteForm
          cardId={cardId}
          setIsOpen={setIsDeleteOpen}
          identifier={row.original.orderNumber}
          route="orders"
        />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsEditOpen(true);
              }}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
            <button
              onClick={() => {
                setIsDeleteOpen(true);
              }}
              className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
