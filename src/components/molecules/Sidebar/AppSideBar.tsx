'use client';

import * as React from 'react';

import { routeConfig } from '@/app/router/routes.config';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import useAppStore from '@/stores/appStore';
import { generateNavigationFromRoutes } from '@/utils/routes/navigationUtils';

import { NavCustomer } from './NavCustomer';
import { TeamSwitcher } from './TeamSwitcer';
import { NavUser } from './User';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { payload } = useAppStore();
  console.log('🚀 ~ AppSidebar ~ payload:', payload);
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
