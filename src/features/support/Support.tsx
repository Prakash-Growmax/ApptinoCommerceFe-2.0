
import SupportTickets from "./SupportTickets"
import SupportLanding from "./SupportLanding"
import useSideBarStore from "@/stores/sidebarStore";


function Support(){
  const {sideOpen} = useSideBarStore();
  return(
    <div className={`flex flex-col gap-4 p-4 transition-all duration-300 ${
      sideOpen ? 'lg:pl-4' : 'lg:pl-4'
    }`}>
      <SupportTickets  />
       <SupportLanding  />
    </div>
  )
}

export default Support