import { BreadcrumbNavigation } from '@/components/molecules/Breadcrumbs/Breadcrumbs';
import { AppSidebar } from '@/components/molecules/Sidebar/AppSideBar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { usePageInfo } from '@/hooks/usePageInfo';

interface AppHeaderProps {
  children: React.ReactNode;
}

export function AppHeader({ children }: AppHeaderProps) {
  const pageInfo = usePageInfo();

  return (
    <div className="h-screen overflow-x-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear">
              <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">
                  {pageInfo?.title || 'Page'}
                </h1>
              </div>
            </header>
            <main className="flex-1 p-4 overflow-y-auto">
              <BreadcrumbNavigation />
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
