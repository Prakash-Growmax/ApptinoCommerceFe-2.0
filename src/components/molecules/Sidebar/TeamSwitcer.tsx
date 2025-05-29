
import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import logo from "../../../assets/Growmax PWA Icon 500x500@2x.png"
export function TeamSwitcher() {
  const { isMobile } = useSidebar()
 

  return (
    <SidebarMenu>
      <SidebarMenuItem>
    
        
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex  size-8 ">
                   <img
              src={logo}
              alt="Image"
              className="size-8 shrink-0"
            />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Growmax
                </span>
              
              </div>

            </SidebarMenuButton>
    
      </SidebarMenuItem>
    </SidebarMenu>
  )
}