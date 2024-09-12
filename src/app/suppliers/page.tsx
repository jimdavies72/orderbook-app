
import { httpRequest } from "@/lib/utils/dataHelpers";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { SupplierSummary } from "@/lib/utils/dataTypes";
import SuppliersContainer from "../../components/suppliers/suppliersContainer";

const SuppliersPage = withPageAuthRequired(
  async () => {
    // gets supplierSummary data (PUT)
    const response: SupplierSummary = await httpRequest(
      "/suppliers",
      null,
      "PUT"
    );

    const supplierData = response.suppliers;

    return (
      <div>
        <h1>{response.count} Suppliers</h1>
        <SuppliersContainer supplierData={supplierData} />
      </div>
    );
  },
  { returnTo: "/suppliers" }
);

export default SuppliersPage;
