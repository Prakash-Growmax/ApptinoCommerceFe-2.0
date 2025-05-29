
import {ChartAreaInteractive} from '../components/DashboardChart'
import  DashboardCard  from '../components/DashboardCard';
// import { ButtonDemo } from '../components/DashboardButton';


function DashboardPage() {
  

  

  return (
    <div className="space-y-6">

      <DashboardCard/>
      <ChartAreaInteractive />
      {/* <ButtonDemo/> */}
    </div>
  );
};

export default DashboardPage;



