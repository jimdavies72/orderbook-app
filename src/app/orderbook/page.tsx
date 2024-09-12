import { httpRequest } from "@/lib/utils/dataHelpers";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { Suppliers } from "@/lib/utils/dataTypes";
import SupplierList from "@/components/suppliers/supplierList";

interface ISuppliers {
  count: number,
  suppliers: Suppliers,
  status: number,
}

const OrderBook = withPageAuthRequired(async () => {
  const response: ISuppliers = await httpRequest(
    "/suppliers",
    { filterKey: "enabled", filterValue: true },
    "PATCH"
  );
  
  let supplierData: Suppliers = [{}] as Suppliers;
  if (response.status == 200) {
    supplierData = response.suppliers;
  } else {
    throw new Error("Failed to fetch data");
  }

  return (
    <SupplierList supplierData={supplierData} />
  );
},{ returnTo: "/orderbook" });

export default OrderBook;
