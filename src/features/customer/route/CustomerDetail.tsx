
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../api/company.api";
import { CompanyDetailsType } from "../types/company.type";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AddressComponent from "./address";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import AddressTicketsDialog from "./CreateCustomer";

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
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const { reset } = useForm<FormData>();

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

  
  
  useEffect(() => {
    if (!isDialogOpen) {
      reset();
    }
  }, [isDialogOpen, reset]);
  
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="w-full px-6 py-4 space-y-4 ">
      {/* Company Details */}
      <Card className="mx-4">
        <CardHeader>
          <CardTitle className="text-lg">Company Details</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-x-12 px-6 py-4">
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

      {/* Address Section */}
      <div>
        <AddressComponent />
      </div>
    </div>
  );
};

export default CompanyDetailsPage;





