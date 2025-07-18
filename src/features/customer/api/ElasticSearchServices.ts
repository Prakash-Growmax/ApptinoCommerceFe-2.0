
import { apiPost } from "@/lib/api/client";
export class ElasticSearchServices {
  static async CustomerGet(BuildcustomersQuery,tenantId) {
     

    if (!tenantId) {
      throw new Error("Tenant ID not found in token.");
    }

    const ElasticIndex = `${tenantId}customers`; // e.g., "abc123customers"

    const query = {
      Elasticindex: ElasticIndex,
      queryType: "search",
      ElasticType: "customer",
      ElasticBody: BuildcustomersQuery,
    };

    try {
      const response = await apiPost({
         url: '/elasticsearch/invocations',
         data:query ,
       });
       return response
    } catch (error) {
      console.error("ElasticSearch API Error:", error);
      throw error;
    }
  }

  


}