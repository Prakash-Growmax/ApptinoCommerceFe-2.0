import useUserStore from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomersFilters=()=>{
       const {userId,tenantId}=useUserStore();
    const token = localStorage.getItem("accessToken");
    const fetchFilters = async () => {
  try {
    const response = await fetch(`https://api.myapptino.com/corecommerce/templates/get?domainName=${tenantId}&propertyName=${userId}_filters`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant': tenantId,
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // or use data as needed
    return data;
  } catch (error) {
    console.error("Error fetching filters", error);
    return null;
  }
};
 const query = useQuery({
    queryKey: [userId,tenantId],
    queryFn:fetchFilters,
  });
  return query;
}