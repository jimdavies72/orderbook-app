import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import AppSettingsComponent from "@/components/appSettings/appSettingsComponent";
import { AppSettingData, Audits, CurrencyListData } from "@/lib/utils/dataTypes";
import { getAppSettings, getCurrencyData, getAuditData } from "@/lib/utils/settingsDataHelpers";

const SettingsPage = withPageAuthRequired(
  async () => {
    const appSettingData: AppSettingData = await getAppSettings();
    const auditData: Audits = await getAuditData();
    const currencyData: CurrencyListData = await getCurrencyData();

    return (
      <div>
        <h1>Settings</h1>
        <div className="mt-8 flex items-center justify-center">
          <AppSettingsComponent 
            appSettingData={appSettingData.appData} 
            auditData={auditData} 
            currencyData={currencyData}
            appId={appSettingData.appId} 
          />
        </div>
      </div>
    );
  },
  { returnTo: "/settings" }
);

export default SettingsPage;