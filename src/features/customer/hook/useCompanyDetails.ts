// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import CompanyDetailsPage from "../route/CustomerDetail"; // adjust import path as needed
// import { getCompanyDetails } from "../api/company.api"; // your API call
// import { CompanyDetailsType } from "../types/company.type";

// const CustomerDetail = () => {
//   const { id: companyId } = useParams();
//   const [companyDetails, setCompanyDetails] = useState<CompanyDetailsType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const tenantId = "dev3"; // use your actual tenant ID
//   const token = "your_token_here"; // securely pull from Redux or auth store

//   useEffect(() => {
//     if (!companyId) return;

//     const fetchDetails = async () => {
//       setLoading(true);
//       try {
//         const data = await getCompanyDetails({ companyId, tenantId, token });
//         setCompanyDetails(data);
//       } catch (err: any) {
//         setError(err.message || "Error loading company details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [companyId]);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div className="text-red-500">{error}</div>;

 
// };

// export default CustomerDetail;
