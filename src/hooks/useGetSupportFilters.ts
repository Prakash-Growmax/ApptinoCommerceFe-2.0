// import useUserStore from "@/stores/useUserStore";
// import useSupportStore from "@/stores/useSupportStore";
// import { useQuery } from "@tanstack/react-query";

// export const useGetSupportFilters = () => {
//   const { userId, tenantId } = useUserStore();
//   const token = localStorage.getItem("accessToken");
//   const { setFilters, setLoading } = useSupportStore();

//   const fetchFilters = async () => {
//     setLoading(true);
//     try {
//       const url = `https://api.myapptino.com/corecommerce/templates/get?domainName=${tenantId}&propertyName=${userId}_filters`;
//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//       const data = await res.json();

//       // Assuming filters come in data.data or data (adjust if different)
//       const filters = data?.data || {
//         status: "all",
//         search: "",
//         limit: 20,
//         offset: 0,
//       };

//       setFilters(filters);
//       setLoading(false);
//       return filters;
//     } catch (error) {
//       console.error("Error fetching support filters", error);
//       setLoading(false);
//       return null;
//     }
//   };

//   const query = useQuery({
//     queryKey: ["supportFilters", userId, tenantId],
//     queryFn: fetchFilters,
//   });

//   return query;
// };
