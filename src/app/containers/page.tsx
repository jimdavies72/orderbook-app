import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { httpRequest } from "@/lib/utils/dataHelpers";
import { SupplierSummary } from "@/lib/utils/dataTypes";
import SupplierTabPage from "./@suppliertab/page"
import ContainerList from "./@containersList/page";

const ContainersPage = withPageAuthRequired(
  async () => {
    const response: SupplierSummary = await httpRequest(
      "/suppliers",
      { filterKey: "enabled", filterValue: true },
      "PUT",
      { cache: "force-cache" }
    );

    const supplierList = response.suppliers;

    return (
      <div>
        <SupplierTabPage supplierList={supplierList} />
      </div>
    );
  },
  { returnTo: "/containers" }
);

export default ContainersPage;
