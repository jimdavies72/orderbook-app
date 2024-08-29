import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AppSettingsComponent from "@/components/appSettings/appSettingsComponent";
import { AppSetting, Audits } from "@/lib/utils/dataTypes";
import { getAppSettings, httpRequest } from "@/lib/utils/dataHelpers";

interface Props {
  appData?: AppSetting;
  appId?: string | "";
}

interface AuditProps {
  audits: Audits;
  status: number;
}

const SettingsPage = withPageAuthRequired(
  async () => {
    const data: Props = await getAppSettings();

    const response: AuditProps = await httpRequest(
      "/audit",
      null,
      "PATCH"
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    
    const auditData = response.audits;

    return (
      <div>
        <h1>Settings</h1>
        <div className="mt-8 flex items-center justify-center">
          <AppSettingsComponent appSettingData={data.appData} auditData={auditData} appId={data.appId} />
        </div>
      </div>
    );
  },
  { returnTo: "/settings" }
);

export default SettingsPage;