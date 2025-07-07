import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, User } from "lucide-react";
import SettingDetails from "../SettingDetails";
import SettingCompanyBranch from "../SettingCompanyBranch";
import UserPreferences from "./UserPreferences";
import { Card } from "@/components/ui/card";

interface SettingsTabsProps {
  defaultTab?: string;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ defaultTab = "company" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
        <TabsTrigger value="company" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span className="hidden sm:inline">Company</span>
        </TabsTrigger>
        <TabsTrigger value="preferences" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">Preferences</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="company" className="space-y-4">
        <SettingDetails />
        <SettingCompanyBranch />
      </TabsContent>

      <TabsContent value="preferences">
        <UserPreferences />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;