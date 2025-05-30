import CalendarForm from "../components/DashboardCalender/DashboardCalender";
import Dashboardcard from "../components/DashboardCard/DashboardCard";
import { ChartAreaInteractive } from "../components/DashboardChart/DashboardChart";
import TopProductsTable from "../components/DashboardTable/DashboardTable";


const DashboardPages=()=>{
    return(
<div className="space-y-6 mt-5">
      <CalendarForm />
      <Dashboardcard/>
      <ChartAreaInteractive />
      <TopProductsTable/>
    </div>
    )

}
export default DashboardPages;