import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppSetting } from "@/lib/utils/dataTypes";
import { getAppSettings } from "@/lib/utils/dataHelpers";

import NavbarComponent from "@/components/navbar/navbarComponent";

interface Props {
  appData?: AppSetting;
  appId?: string | "";
}

const Navbar = withPageAuthRequired(
  async () => {
    const data: Props = await getAppSettings();

    return (
        <NavbarComponent companyName={data.appData?.companyName} />
    );
  },
  { returnTo: "/home" }
);

export default Navbar;
