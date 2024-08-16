'use client';
import { useState } from "react";
import { Suppliers } from "@/lib/utils/dataTypes";
import SupplierButtonRibbon from "./supplierButtonRibbon";
import ContainerList from "../containers/containerList";

const SupplierList = ({
  suppliers
}:{
  suppliers: Suppliers
}) => {

  const [id, setId] = useState<string>("");

  const supplierHandler = (supplierId: string) => { 
    setId(supplierId)
  }

  return (
    <div>
      <div>
        <SupplierButtonRibbon
          supplierList={suppliers}
          supplierHandler={supplierHandler}
        />
      </div>
      <div>
        <ContainerList supplierId={id} />
      </div>
    </div>
  );
};

export default SupplierList;
