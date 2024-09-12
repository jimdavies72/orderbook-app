import { getPublicSettings } from "@/lib/utils/dataHelpers";

import NavbarComponent from "@/components/navbar/navbarComponent";

const Navbar = async () => {

  const data = await getPublicSettings();

  return (
      <NavbarComponent companyName={data.appData?.companyName} />
  );
}

export default Navbar;
