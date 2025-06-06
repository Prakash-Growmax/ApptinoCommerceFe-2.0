import { getTenantIdFromToken } from "@/features/auth/api/authApi";
import { apiPost } from "@/lib/api/client";
import useUserStore from "@/stores/useUserStore";


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
  
 static async CustomerSearch(searchText, tenantId, showDeactivated = false) {
    let newBody = {
      size: 24,
      query: {
        bool: {
            minimum_number_should_match: 1,
          must: [
             {
          "term": {
            "accountType.keyword": "Buyer"
          }
        }
          ],
        },
      },
      from: 0,
    };

    if (!showDeactivated) {
      newBody.query.bool.must.push({
        term: {
          isActivated: 1,
        },
      });
    }

    newBody.query.bool.should = [
      {
        query_string: {
          query: searchText || "*",
          analyzer: "my_analyzer",
          analyze_wildcard: true,
          auto_generate_phrase_queries: true,
          default_operator: "AND",
          fields: ["companyName"],
          boost: 200,
        },
      },
      {
        multi_match: {
          query: searchText || "*",
          type: "phrase_prefix",
          boost: 190,
          fields: ["companyName"],
        },
      },
      {
        multi_match: {
          query: searchText || "*",
          type: "best_fields",
          analyzer: "my_analyzer",
          fields: ["companyName"],
        },
      },
    ];

    const ElasticIndex = `${tenantId}customers`;
    var query = {
      Elasticindex: ElasticIndex,
      queryType: "search",
      ElasticType: "customer",
      ElasticBody: newBody,
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