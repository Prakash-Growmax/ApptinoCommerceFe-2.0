import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil } from "lucide-react"; // optional edit icon
import useCompanyStore from "./store/useCompanyStore";

// Define fields and paths
const fields = [
  { id: "name", label: "Company Name", path: "name" },
  { id: "website", label: "Website", path: "website" },
  { id: "taxId", label: "GST", path: "taxDetailsId.pan" },
  { id: "accountType", label: "Account Type", path: "accountTypeId.name" },
  { id: "defaultCurrency", label: "Default Currency", path: "currencyId.currencyCode" },
  { id: "subIndustry", label: "SubIndustry", path: "subIndustryId.name" },
  { id: "industryDescription", label: "Industry Description", path: "industryId.description" },
];

// Safely get nested values
const getValue = (obj: any, path: string) =>
  path.split('.').reduce((acc, part) => acc?.[part], obj);

const SettingDetails = () => {
  const { companyData, loading } = useCompanyStore();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <img
              alt="logo"
              className="w-10 h-10 object-contain"
              src={companyData?.logo}
            />
          )}
          <CardTitle>Company Details</CardTitle>
        </div>
        {/* Optional Edit Icon */}
        <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3">
          {fields.map(({ id, label, path }) => (
            <div key={id} className="flex flex-row justify-between items-start text-sm sm:text-base">
              <span className="font-semibold w-[45%]">{label}</span>
              {loading ? (
                <Skeleton className="h-4 w-[50%]" />
              ) : (
                <span className="text-right w-[50%] truncate">{getValue(companyData, path) || "-"}</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingDetails;
