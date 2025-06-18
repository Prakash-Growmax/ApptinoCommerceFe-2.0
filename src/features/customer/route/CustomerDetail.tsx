// const CustomerDetails=()=>{
//   return(
//     <div>
//         Customer Detail
//     </div>
//   )
// }
// export default CustomerDetails;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../api/company.api";
import { CompanyDetailsType } from "../types/company.type";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AddressComponent from "./address";

const InfoRow = ({ label, value }: { label: string; value?: string | string[] | undefined }) => {
  const displayValue =
    !value || (Array.isArray(value) && value.length === 0)
      ? "—"
      : Array.isArray(value)
      ? value.join(", ")
      : value;

  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="text-sm font-semibold  ">{label}</div>
      <div className="text-sm text-black text-muted-foreground">{displayValue}</div>
    </div>
  );
};

const CompanyDetailsPage = () => {
  const { id: companyId } = useParams();
  const [companyDetails, setCompanyDetails] = useState<CompanyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tenantId = "dev3"; 
  const token = "your_jwt_token_here"; 

  useEffect(() => {
    if (!companyId) return;

    const fetchCompanyDetails = async () => {
      setLoading(true);
      try {
        const data = await getCompanyDetails({ companyId, tenantId, token });
        setCompanyDetails(data);
      } catch (err: any) {
        setError(err.message || "Failed to load company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
      <div>

    <Card className="">
      
    
      <CardHeader className="flex-shrink-0  ">
        <CardTitle className="text-lg p-0 m-0">Company Details</CardTitle>
      </CardHeader>

      <div className="grid grid-cols-2 gap-x-12 pl-5  ">
        
        <div className="space-y-2">
          <InfoRow label="Partner Name" value={companyDetails?.companyName} />
          <InfoRow label="Tax ID" value={companyDetails?.taxId} />
          <InfoRow label="Business Type" value={companyDetails?.businessType} />
          <InfoRow label="SubIndustry" value={companyDetails?.subIndustry} />
          <InfoRow label="Account Owner" value={companyDetails?.accountOwnerName} />
          <InfoRow label="Company Tags" value={companyDetails?.tags} />
        </div>

        <div className="space-y-2">
          <InfoRow label="Website" value={companyDetails?.website} />
          <InfoRow label="Currency" value={companyDetails?.currencyCode} />
          <InfoRow label="Account Type" value={companyDetails?.accountType} />
          <InfoRow label="Industry Description" value={companyDetails?.industryDescription} />
          <InfoRow label="Support Owner" value={companyDetails?.supportOwnerName} />
        </div>
      </div>
    
    </Card>
      <AddressComponent/>
      </div>
  );
};

export default CompanyDetailsPage;




