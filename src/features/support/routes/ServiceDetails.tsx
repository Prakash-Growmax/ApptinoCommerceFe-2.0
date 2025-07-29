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


//   import { useForm, FormProvider } from 'react-hook-form';
// import ServiceVisits from './ServiceVisits';
// import ServiceIssueDetails from './SeviceIssueDetails';

// const ServiceDetails = ({ refetchFieldData }) => {
//   const methods = useForm({
//     defaultValues: {
//       fieldServicesData: [], // 👈 important to initialize it
//     },
//   });

//   return (
//     <FormProvider {...methods}>
//       <div className="flex flex-col gap-4">
//         <ServiceIssueDetails />
//         <ServiceVisits refetchFieldData={refetchFieldData} />
//       </div>
//     </FormProvider>
//   );
// };

// export default ServiceDetails;



// import ServiceVisits from './ServiceVisits';
// import ServiceIssueDetails from './SeviceIssueDetails';

// type ServiceDetailsProps = {
//   refetchFieldData: () => void;
// };

// const ServiceDetails = ({ refetchFieldData }: ServiceDetailsProps) => {
//   return (
//     <div className="flex flex-col gap-4">
//       <ServiceIssueDetails />
//       <ServiceVisits refetchFieldData={refetchFieldData} />
//     </div>
//   );
// };

// export default ServiceDetails;
