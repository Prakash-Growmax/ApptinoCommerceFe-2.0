// import { SupportElastic } from "@/features/support/api/SupportElastic"; // You should create this like AccountElastic
// import { ElasticSearchServices } from "@/features/support/api/ElasticSearchServices"; // Adjust path as needed
// import useSupportStore from "@/stores/useSupportStore";
// import useUserStore from "@/stores/useUserStore";
// import { useQuery } from "@tanstack/react-query";

// export const useGetSupportUsers = ({ filters }) => {
//   const { setData, setLoading } = useSupportStore();
//   const { tenantId } = useUserStore();

//   const fetchSupportUsers = async () => {
//     setLoading(true);

//     // Build the ElasticSearch query using filters
//     const elasticData = SupportElastic.BuildSupportQuery(filters);

//     // Fetch the support users using the Elastic service
//     const data = await ElasticSearchServices.SupportGet(elasticData, tenantId);

//     // Format the response
//     const formattedResponse = ElasticSearchServices.FormatResults(data);

//     setData(formattedResponse);
//     setLoading(false);
//     return formattedResponse;
//   };

//   const query = useQuery({
//     queryKey: ["supportUsers", filters],
//     queryFn: fetchSupportUsers,
//     enabled: !!filters && Object.keys(filters).length > 0, // run only when filters exist
//   });

//   return query;
// };
