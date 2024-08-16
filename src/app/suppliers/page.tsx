import { httpRequest } from "@/lib/utils/dataHelpers";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { SupplierSummary } from "@/lib/utils/dataTypes";
import SuppliersContainer from "../../../suppliersContainer";

const SuppliersPage = withPageAuthRequired(async () => {


  const response: SupplierSummary = await httpRequest(
    "/suppliers",
    null,
    "PUT",
  );

  const data = response.suppliers;

  return (
    <div>
      <h1>{response.count} Suppliers</h1>
      <SuppliersContainer 
        data={data}
      />
    </div>
  );
},
  { returnTo: "/suppliers" }
);


export default SuppliersPage;
