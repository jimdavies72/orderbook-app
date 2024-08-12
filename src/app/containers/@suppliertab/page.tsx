'use client'
import { Suppliers } from "@/lib/utils/dataTypes";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";

const SupplierTabPage = ({
  supplierList,
}: {
  supplierList: Suppliers;
}) => {

  return (
    <div className="w-[98%] rounded border p-2 flex shadow-md shadow-gray-500   items-center justify-center">
      <ScrollArea className="p-2 cursor-grabbing">
        <div className="flex flex-row gap-3 items-center justify-center shadow-md">
          {supplierList &&
            supplierList.map((supplier: any) => (
              <Button
                key={supplier._id}
                className="rounded mt-1 mb-2 hover:bg-gray-200 shadow shadow-gray-400"
                variant="outline"
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

export default SupplierTabPage;
