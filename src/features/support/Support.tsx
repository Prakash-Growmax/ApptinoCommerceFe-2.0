
import SupportTickets from "./SupportTickets"
import SupportLanding from "./SupportLanding"


function Support(){
  return(
    <div className="flex flex-col gap-2">
      <SupportTickets  />
       <SupportLanding  />
    </div>
  )
}

export default Support