import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useCompanyStore from "./store/useCompanyStore";
import { FormInput } from "@/components/molecules/ReactHookForm";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";

// Configuration for fields
const fields = [
  { id: "name", label: "Company Name", path: "name" },
  { id: "website", label: "Website", path: "website" },
  { id: "taxId", label: "Tax ID", path: "taxDetailsId.pan" },
  { id: "businessType", label: "Business Type", path: "businessTypeId.name" },
  { id: "accountType", label: "Account Type", path: "accountTypeId.name" },
  { id: "defaultCurrency", label: "Default Currency", path: "currencyId.currencyCode" },
  { id: "subIndustry", label: "SubIndustry", path: "subIndustryId.industryId.name" },
  { id: "industryDescription", label: "Industry Description", path: "industryId.description" },
];

// Helper to get nested values safely
const getValue = (obj: any, path: string) =>
  path.split('.').reduce((acc, part) => acc?.[part], obj);

const SettingDetails = () => {
  const { companyData, loading } = useCompanyStore();

  const methods = useForm({
    defaultValues: {
      name: "",
      website: "",
      taxId: "",
      businessType: "",
      accountType: "",
      defaultCurrency: "",
      subIndustry: "",
      industryDescription: "",
    },
  });

  useEffect(() => {
    if (companyData) {
      methods.reset({
        name: getValue(companyData, "name") || "",
        website: getValue(companyData, "website") || "",
        taxId: getValue(companyData, "taxDetailsId.pan") || "",
        businessType: getValue(companyData, "businessTypeId.name") || "",
        accountType: getValue(companyData, "accountTypeId.name") || "",
        defaultCurrency: getValue(companyData, "currencyId.currencyCode") || "",
        subIndustry: getValue(companyData, "subIndustryId.industryId.name") || "",
        industryDescription: getValue(companyData, "industryId.description") || "",
      });
    }
  }, [companyData, methods]);

  return (
    <Card>
      {/* Mobile Header */}
      <CardHeader className="flex md:hidden flex-row items-center justify-between">
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
      </CardHeader>

      {/* Desktop Header */}
      <CardHeader className="hidden md:block mb-1">
        <CardTitle>Company Details</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-3">
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

        {/* Desktop View */}
        <div className="hidden md:flex flex-row items-start gap-8">
          {/* Logo */}
          <div className="w-1/4 flex justify-center">
            {loading ? (
              <Skeleton className="h-[143px] w-[280px] rounded-xl" />
            ) : (
              <img
                alt="logo"
                className="object-contain w-60 h-60"
                src={companyData?.logo}
              />
            )}
          </div>

          {/* Input Fields with reduced column spacing */}
          <FormProvider {...methods}>
            <form className="w-3/4 grid grid-cols-2 gap-x-2 gap-y-0">
              {fields.map(({ id, label,path }) => (
                <FormInput
                  key={id}
                  name={id}
                  label={label}
                  placeholder={label}
                  disabled={loading}
                  value={getValue(companyData, path) || ""}
                />
              ))}
            </form>
          </FormProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingDetails;
