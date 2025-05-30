
import {ChartAreaInteractive} from '../components/DashboardChart'
import  DashboardCard  from '../components/DashboardCard';
import TopProductsTable from '../components/DashboardTable';
import { CalendarForm } from '../components/DashboardDoucment';


function DashboardPage() {
  return (
    <div className="space-y-6 mt-5">
      <CalendarForm />
      <DashboardCard/>
      <ChartAreaInteractive />
      <TopProductsTable/>
    </div>
  );
};

export default DashboardPage;



