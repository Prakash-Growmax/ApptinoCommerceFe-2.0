import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../Sidebar/AppSideBar";

interface AppbarHeaderProps {
  children: React.ReactNode;
}

export function AppbarHeader({ children }: AppbarHeaderProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-screen flex-col overflow-hidden">
          <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <h1 className="text-base font-medium">Documents</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
