import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { SupplierSummary } from "@/lib/utils/dataTypes";
import SupplierList from "@/components/suppliers/supplierList";
import { httpRequest } from "@/lib/utils/dataHelpers";

const OrderBook = withPageAuthRequired(async () => {
  const response: SupplierSummary = await httpRequest(
    "/suppliers",
    { filterKey: "enabled", filterValue: true },
    "PUT"
  );

  if (!response) {
    throw new Error("Failed to fetch data");
  }

  const data = response.suppliers;
  
  return (
    <SupplierList suppliers={data} />
  );
},{ returnTo: "/orderbook" });

export default OrderBook;
