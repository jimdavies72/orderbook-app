'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Suppliers } from "@/lib/utils/dataTypes";
import SupplierButtonRibbon from "./supplierButtonRibbon";
import ContainerList from "../containers/containerList";
import SuchEmpty from "../suchEmpty";

const SupplierList = ({
  suppliers
}:{
  suppliers: Suppliers
}) => {
  const router = useRouter();
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
        {!id ?
          <SuchEmpty /> :
          <ContainerList supplierId={id} />
        }
      </div>
    </div>
  );
};

export default SupplierList;
