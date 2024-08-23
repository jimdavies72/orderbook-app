'use client';
import { useState } from "react";
import { Suppliers } from "@/lib/utils/dataTypes";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export const SupplierButtonRibbon = ({
  supplierList,
  supplierHandler
}: {
  supplierList: Suppliers,
  supplierHandler: (supplierId: string) => void
}) => {
  const [activeButton, setActiveButton] = useState<string>("");

  return (
    <div className="ml-8 mr-8 mb-2 rounded border p-2 flex shadow-md shadow-gray-500 items-center justify-evenly">
      <ScrollArea className="p-2 cursor-grabbing">
        <div className="flex flex-row gap-3 items-center justify-center shadow-md">
          {supplierList &&
            supplierList.map((supplier: any) => (
              <Button
                key={supplier._id}
                variant="outline"
                onClick={() => {
                  setActiveButton(supplier._id);
                  supplierHandler(supplier._id);
                }}
                className={
                  supplier._id === activeButton
                    ? "font-bold rounded mt-1 mb-2 hover:bg-gray-200 bg-gray-300 shadow shadow-gray-400"
                    : "rounded mt-1 mb-2 hover:bg-gray-200 shadow shadow-gray-400"
                }
              >
                {supplier.name} ({supplier.activeContainerCount})
              </Button>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default SupplierButtonRibbon;
