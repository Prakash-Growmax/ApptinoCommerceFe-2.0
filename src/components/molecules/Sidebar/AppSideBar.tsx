import * as React from 'react';

import { routeConfig } from '@/app/router/routes.config';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { generateNavigationFromRoutes } from '@/utils/routes/navigationUtils';

import { NavCustomer } from './NavCustomer';
import { TeamSwitcher } from './TeamSwitcer';
import { NavUser } from './User';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigationItems = generateNavigationFromRoutes(routeConfig);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavCustomer projects={navigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
