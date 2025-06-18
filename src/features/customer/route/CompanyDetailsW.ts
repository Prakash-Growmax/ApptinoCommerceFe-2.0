// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getCompanyDetails } from "../api/company.api";
// import { CompanyDetailsType } from "../types/company.type";
// import CompanyDetailsPage from "./CustomerDetail"; // path as needed

// const CompanyDetailsWrapper = () => {
//   const { id: companyId } = useParams<{ id: string }>();
//   const [companyDetails, setCompanyDetails] = useState<CompanyDetailsType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const tenantId = "dev3";
//   const token = "your_jwt_token_here";

//   useEffect(() => {
//     if (!companyId) return;

//     const fetchCompanyDetails = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await getCompanyDetails({ companyId, tenantId, token });
//         console.log("Fetched company details:", data);
//         setCompanyDetails(data);
//       } catch (err: any) {
//         console.error(err);
//         setError(err.message || "Failed to load company details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanyDetails();
//   }, [companyId]);

//   // ✅ Put your conditional logic here:
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       {companyDetails ? (
//         <CompanyDetailsPage company={companyDetails} />
//       ) : (
//         <div>No company data found.</div>
//       )}
//     </div>
//   );
// };

// export default CompanyDetailsWrapper;
