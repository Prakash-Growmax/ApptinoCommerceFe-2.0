import { apiPost } from "@/lib/api/client";
import { CustomerArraySchemaType, CustomerSearchResponseType } from "../schema/elasticschema";

export class ElasticSearchService {
  static FormatResults(documents: CustomerSearchResponseType): CustomerArraySchemaType {
    const formattedResults: CustomerArraySchemaType = [];

    if (documents.hits) {
      documents.hits.hits.forEach(function (documnt) {
        var documentSource = documnt._source;
        documentSource.id = documnt._id;
        formattedResults.push(documentSource);
      });
      return formattedResults;
    }

    return [];
  }
  static async CustomerSearch(searchText: string, tenantId: string, showDeactivated = false) {
  // Ensure searchText is a valid string
  const searchQuery = typeof searchText === "string" && searchText.trim() !== "" ? searchText : "*";

  const newBody: any = {
    size: 24,
    from: 0,
    query: {
      bool: {
        minimum_number_should_match: 1,
        must: [
    
        ],
        should: [
          {
            query_string: {
              query: searchQuery,
              analyzer: "my_analyzer",
              analyze_wildcard: true,
              auto_generate_phrase_queries: true,
              default_operator: "AND",
              fields: ["companyName"],
              boost: 200
            }
          },
          {
            multi_match: {
              query: searchQuery,
              type: "phrase_prefix",
              boost: 190,
              fields: ["companyName"]
            }
          },
          {
            multi_match: {
              query: searchQuery,
              type: "best_fields",
              analyzer: "my_analyzer",
              fields: ["companyName"]
            }
          }
        ]
      }
    }
  };

  // Add `isActivated` condition if showDeactivated is false
  if (!showDeactivated) {
    newBody.query.bool.must.push({
      term: {
        isActivated: 1
      }
    });
  }

  const ElasticIndex = `${tenantId}customers`;
  const query = {
    Elasticindex: ElasticIndex,
    queryType: "search",
    ElasticType: "customer",
    ElasticBody: newBody
  };

  try {
    const response = await apiPost({
      url: '/elasticsearch/invocations',
      data: query
    });
    return response;
  } catch (error) {
    console.error("ElasticSearch API Error:", error);
    throw error;
  }
}
}
