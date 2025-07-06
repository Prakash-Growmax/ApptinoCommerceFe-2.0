interface FilterType {
  offset: number;
  limit: number;
  accountName?: string;
  accountNameLs?: string[];
  erp_Code?: string;
  status?: string[];
  city?: string;
  state?: string;
  country?: string;
}

export class AccountElastic{
     static BuildCustomerquery(filter: FilterType, searchText: string, CatalogId: string | number) {
    let isfilter = false;
    const must: any[] = [];
    const must_not: any[] = [];
    const should: any[] = [];
   const from = filter.offset * filter.limit || 0;
    const size = filter.limit;
    const sort: any[] = [];
    let json = {
      from,
      size,
      query: {
        bool: {
       
          must,
          must_not,
          should,
        },
      },
   
      sort,
    };

    if (filter.accountName !== "" && filter.accountName != null) {
      must.push({
        term: {
          "companyName.keyword": filter.accountName,
        },
      });
      isfilter = true;
    }
    if (filter.accountNameLs && filter.accountNameLs.length > 0) {
      let accountNameList = [];
      for (let i = 0; i < filter.accountNameLs.length; i++) {
        accountNameList.push(filter.accountNameLs[i]);
      }
      must.push({
        terms: {
          "companyName.keyword": accountNameList,
        },
      });
      isfilter = true;
    }
    if (filter.erp_Code !== "" && filter.erp_Code != null) {
      must.push({
        term: {
          "erp_Code.keyword": filter.erp_Code,
        },
      });
      isfilter = true;
    }
    if (filter.status && filter.status.length > 0) {
      must.push({
        term: {
          isActivated: filter.status[0] === "Active" ? 1 : 0,
        },
      });
      isfilter = true;
    }
    if (filter.city !== "" && filter.city != null) {
      must.push({
        term: {
          "city.keyword": filter.city,
        },
      });
      isfilter = true;
    }
    if (filter.state !== "" && filter.state != null) {
      must.push({
        term: {
          "state.keyword": filter.state,
        },
      });
      isfilter = true;
    }
    if (filter.country !== "" && filter.country != null) {
      must.push({
        term: {
          "country.keyword": filter.country,
        },
      });
      isfilter = true;
    }
    // if (!isfilter) {
    //   json.post_filter.bool.must.push({
    //     match: {
    //       customerIndexName: "Cust*",
    //     },
    //   });
    // }

    if (searchText?.length > 0) {
    
        json.query.bool.should = [
      {
        query_string: {
          query: searchText || "*",
          analyzer: "my_analyzer",
          analyze_wildcard: true,
          auto_generate_phrase_queries: true,
          default_operator: "AND",
          fields: ["companyName", "erp_Code", "city"],
          boost: 200,
        },
      },
      {
        multi_match: {
          query: searchText || "*",
          type: "phrase_prefix",
          boost: 190,
          fields: ["companyName", "erp_Code", "city"],
        },
      },
      {
        multi_match: {
          query: searchText || "*",
          type: "best_fields",
          analyzer: "my_analyzer",
          fields: ["companyName", "erp_Code", "city"],
        },
      },
    ];
    } else {
      sort.push({ [`companyID`]: { order: "desc" } });
    }

    if (CatalogId) {
      must_not.push({
        term: {
          catalogAssigned: CatalogId
        },
      });
    }
    
   
    
    
    return json;
  }
}