import { AppSettings } from "@/lib/utils/dataTypes";
import { httpRequest } from "@/lib/utils/dataHelpers";

const HomePage = async () => {
  const appId = process.env.APP_ID || "";

  const response: AppSettings = await httpRequest(
    "/appsetting",
    { appId: appId },
    "PATCH"
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  const data = response.appSettings[0];

  return (
    <div>
      <p>Home Page</p>
    </div>
  );
};

export default HomePage;
