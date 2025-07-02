import ServiceVisits from './ServiceVisits';
import ServiceIssueDetails from './SeviceIssueDetails';

const ServiceDetails = ({refetchFieldData}) => {
  return (
    <div className="flex flex-col gap-4 ">
      <ServiceIssueDetails />
      <ServiceVisits refetchFieldData={refetchFieldData} />
    </div>
  );
};

export default ServiceDetails;
