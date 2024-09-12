'use client';
// List of Suppliers on Orderbook

import { useState, useEffect } from "react";
import { Suppliers, Supplier, Containers, Container } from "@/lib/utils/dataTypes";
import SupplierButtonRibbon from "./supplierButtonRibbon";
import ContainerList from "../containers/containerList";
import SuchEmpty from "../suchEmpty";

const SupplierList = ({
  supplierData
}:{
  supplierData: Suppliers
}) => {
  const [supplierId, setSupplierId] = useState<string>("");
  const [containerData, setContainerData] = useState<Containers>([{}] as Containers);
  const [includeComplete, setIncludeComplete] = useState<boolean>(false);
  const [bool, setBool] = useState<boolean>(false);
  
  useEffect(() => {
    if (supplierId !== "") {
      containerHandler(supplierId);
    }
  }, [supplierData, includeComplete]);

  const containerHandler = async (supplierId: string) => { 
    setSupplierId(supplierId)
    
    const supplierResult: Supplier | undefined = supplierData.find((supplier) => {
      return supplier._id === supplierId;
    });

    if (supplierResult) {
      const containersResult: Container[] | undefined = supplierResult.containers.filter((container) => {
        if (includeComplete){
          // return all containers including completed
          return container
        }
        // return only containers that are not complete (default)
        return container.complete === false;
      })

      if (containersResult.length> 0) {
        setContainerData(containersResult as Containers);
      } else {
        setContainerData([] as any);
      }

      setBool(true);

    } else {
      setContainerData([] as any);
      setBool(false);
    }
  };

  const includeCompleteHandler = (includeComplete: boolean) => {
    setIncludeComplete(includeComplete)
  }

  return (
    <div>
      <div>
        <SupplierButtonRibbon
          supplierData={supplierData}
          containerHandler={containerHandler}
        />
      </div>
      <div>
        {!supplierId ? 
          <SuchEmpty /> 
          : 
          <ContainerList 
            supplierId={supplierId} 
            showAddButton={bool}
            containerData={containerData}
            includeCompleteHandler={includeCompleteHandler}
          />}
      </div>
    </div>
  );
};

export default SupplierList;
