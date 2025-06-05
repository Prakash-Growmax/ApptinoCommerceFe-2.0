import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import useCompanyStore from "./store/useCompanyStore";

// Configuration for input fields with path to nested values
const fields = [
  { id: "name", label: "Company Name", valuePath: "name" },
  { id: "website", label: "Website", valuePath: "website" },
  { id: "taxId", label: "Tax ID", valuePath: "taxDetailsId.pan" },
  { id: "businessType", label: "Business Type", valuePath: "businessTypeId.name" },
  { id: "accountType", label: "Account Type", valuePath: "accountTypeId.name" },
  { id: "defaultCurrency", label: "Default Currency", valuePath: "currencyId.currencyCode" },
  { id: "subIndustry", label: "SubIndustry", valuePath: "subIndustryId.industryId.name" },
];

// Helper to get nested values safely
const getValue = (obj: any, path: string) =>
  path.split('.').reduce((acc, part) => acc?.[part], obj);

const SettingDetails = () => {
  const { companyData, loading } = useCompanyStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-start gap-8">
          {/* Logo */}
          <div className="w-1/4 flex justify-center -mt-8">
            {loading ? (
              <Skeleton className="h-[143px] w-[280px] rounded-xl" />
            ) : (
              <img
                alt="logo"
                className="object-contain w-70 h-70"
                src={companyData?.logo}
              />
            )}
          </div>

          {/* Input Fields */}
          <div className="w-3/4 grid grid-cols-2 gap-2">
            {fields.map(({ id, label, valuePath }) => (
              <div className="flex flex-col gap-1" key={id}>
                {loading ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <>
                    <Label htmlFor={id} className="ml-1">{label}</Label>
                    <Input
                      id={id}
                      type="text"
                      placeholder={label}
                      value={getValue(companyData, valuePath) || ""}
                      readOnly
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingDetails;

