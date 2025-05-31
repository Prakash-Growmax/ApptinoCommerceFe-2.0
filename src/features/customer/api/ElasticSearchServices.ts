import { getTenantIdFromToken } from "@/features/auth/api/authApi";
import { apiPost } from "@/lib/api/client";


export class ElasticSearchServices {
  static async CustomerGet(BuildcustomersQuery) {
    const tenantId = getTenantIdFromToken();

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
   static FormatResults(documents) {
    const formattedResults = [];
    // const totalcount=documents.data.hits.total;
    if (documents.data) {
      documents.data.hits.hits.forEach(function (documnt) {
        var documentSource = documnt._source;
        documentSource.id = documnt._id;
        formattedResults.push(documentSource);
      });
      return formattedResults;
    }
    if (documents.hits) {
      documents.hits.hits.forEach(function (documnt) {
        var documentSource = documnt._source;
        documentSource.id = documnt._id;
        formattedResults.push(documentSource);
      });
      return formattedResults;
    }
  }
}