
import { useEffect } from "react";
import useSupportUserStore from "@/stores/useSupportUserStore";
import { useGetSupportFilters } from "@/hooks/useGetSupportFilters";

function SupportLanding() {
  const setSupportUser = useSupportUserStore((state) => state.setSupportUser);
  const { data: filters, isLoading, isError } = useGetSupportFilters();

  useEffect(() => {
    setSupportUser({
      userId: "user_123",
      companyId: "company_456",
      tenantId: "tenant_789",
    });
  }, [setSupportUser]);

  if (isLoading) return <p>Loading filters...</p>;
  if (isError || !filters) return <p>Failed to load filters</p>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Support Filters</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(filters, null, 2)}</pre>
    </div>
  );
}

export default SupportLanding;
