'use client';
import { useState } from "react";

import ReminderComponent from "../reminders/reminderComponent";
import { Suppliers, Supplier, Containers } from "@/lib/utils/dataTypes";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export const SupplierButtonRibbon = ({
  supplierData,
  containerHandler
}: {
  supplierData: Suppliers,
  containerHandler: (supplierId: string) => void
}) => {
  const [activeButton, setActiveButton] = useState<string>("");

  const getActiveContainerCount = (containers:Containers) => {
    return containers.filter((container) => container.complete === false).length
  }

  return (
    <div className="flex-col">
      <div className=" ml-6 mr-6 mb-0.5 shadow-md shadow-gray-500 rounded-t-lg border flex items-center justify-evenly">
        <ScrollArea className="p-2 cursor-grabbing">
          <div className="flex flex-row gap-3 items-center justify-center shadow-md">
            {supplierData &&
              supplierData.map((supplier: Supplier) => (
                <Button
                key={supplier._id}
                variant="outline"
                onClick={() => {
                  setActiveButton(supplier._id);
                  containerHandler(supplier._id);
                }}
                className={
                  supplier._id === activeButton
                  ? "font-bold rounded mt-1 mb-2 hover:bg-gray-200 bg-gray-300 shadow shadow-gray-400"
                  : "rounded mt-1 mb-2 hover:bg-gray-200 shadow shadow-gray-400"
                }
                >
                  {supplier.name} ({getActiveContainerCount(supplier.containers)})
                </Button>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="mt-1">
        <ReminderComponent supplierId={activeButton} />
      </div>
    </div>
  );
};

export default SupplierButtonRibbon;
