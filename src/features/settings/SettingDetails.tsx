import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useCompanyStore from "./store/useCompanyStore";
import { FormInput } from "@/components/molecules/ReactHookForm";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import useSideBarStore from "@/stores/sidebarStore";

interface Field {
  id: string;
  label: string;
  path: string;
}

// Fields Configuration
const fields: Field[] = [
  { id: "name", label: "Company Name", path: "name" },
  { id: "website", label: "Website", path: "website" },
  { id: "taxId", label: "Tax ID", path: "taxDetailsId.pan" },
  { id: "businessType", label: "Business Type", path: "businessTypeId.name" },
  { id: "accountType", label: "Account Type", path: "accountTypeId.name" },
  { id: "defaultCurrency", label: "Default Currency", path: "currencyId.currencyCode" },
  { id: "subIndustry", label: "SubIndustry", path: "subIndustryId.industryId.name" },
  { id: "industryDescription", label: "Industry Description", path: "subIndustryId.description" },
];

// Helper to get nested values
const getValue = (obj: any, path: string) =>
  path.split('.').reduce((acc, part) => acc?.[part], obj);

const SettingDetails = () => {
  const { companyData, loading } = useCompanyStore();
    const {sideOpen} = useSideBarStore();
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
        industryDescription: getValue(companyData, "subIndustryId.description") || "",
      });
    }
  }, [companyData, methods]);

  return (
      <Card className={`w-full bg-card rounded-md ${
      sideOpen ? 'lg:max-w-[calc(100vw-20rem)]' : 'lg:max-w-[calc(100vw-5rem)]'
    }`}>
      {/* Header */}
      <CardHeader className="flex md:hidden flex-row items-center justify-between  ">
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

      <CardHeader className="hidden md:block ">
        <CardTitle>Company Details</CardTitle>
      </CardHeader>
          <div className="h-px bg-gray-300 mt-1 w-full mt-3 p-0 " />

      <CardContent>
        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-3">
          {fields.map(({ id, label, path }) => (
            <div
              key={id}
              className="flex flex-row justify-between items-start text-sm sm:text-base"
            >
              <span className="font-semibold w-[45%]">{label}</span>
              {loading ? (
                <Skeleton className="h-4 w-[50%]" />
              ) : (
                <span className="text-right w-[50%] truncate">
                  {getValue(companyData, path) || "-"}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex flex-row items-start gap-4">
          {/* Logo */}
          <div className="w-[260px] flex justify-center">
            {loading ? (
              <Skeleton className="h-[180px] w-[200px] " />
            ) : (
              <img
                alt="logo"
                className=" w-50 h-70"
                src={companyData?.logo}
              />
            )}
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form className="w-3/4 grid grid-cols-2 gap-8 lg:gap-x-16 gap-y-0.5 w-[800px] mt-2  ">
              {fields.map(({ id, label, path }) => {
                const isIndustryDescription = id === "industryDescription";

                if (loading) {
                  return (
                    <div
                      key={id}
                      className={`flex flex-col gap-1 w-full`}
                    >
                      <div className="text-sm font-medium text-muted-foreground ">
                        {label}
                      </div>
                      <Skeleton className="h-9 w-full rounded-md" />
                    </div>
                  );
                }

                return isIndustryDescription ? (
                  <div
                    key={id}
                    className="flex flex-col gap-1 w-full"
                  >
                    <div className="text-sm font-medium text-black">
                      {label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getValue(companyData, path) || "-"}
                    </div>
                  </div>
                ) : (
                  <FormInput
                    key={id}
                    name={id}
                    label={label}
                    placeholder={label}
                    disabled={loading}
                    value={getValue(companyData, path) || ""}
                  />
                );
              })}
            </form>
          </FormProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingDetails;
