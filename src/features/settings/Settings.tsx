import { PageHeader } from "@/components/templates/PageLayout/PageLayout";
import SettingsTabs from "./components/SettingsTabs";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 sm:p-6 pb-2 sm:pb-4">
        <PageHeader 
          title="Settings" 
          subtitle="Manage your company details and preferences"
        />
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <SettingsTabs />
      </div>
    </div>
  );
};

export default Settings;