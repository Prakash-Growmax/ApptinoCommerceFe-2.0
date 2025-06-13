import ServiceVisits from "./ServiceVisits";
import ServiceIssueDetails from "./SeviceIssueDetails";


const ServiceDetails = () => {
  return(
    <div className="flex flex-col gap-2">
        <ServiceIssueDetails/>
        <ServiceVisits/>
    </div>
  )
};

export default ServiceDetails;
