import React, { useEffect, useState } from 'react';
import CompanyDetailsCard from './CustomerDetail'; // adjust path if needed
import { handleError } from '@/utils/errorHandling';
import { apiGet } from '@/lib/api/client';
import useUserStore from '@/stores/useUserStore';

const CustomerPage = (): React.JSX.Element => {
  const [companyData, setCompanyData] = useState(null);
  const { tenantId } = useUserStore();

  useEffect(() => {
    const fetchCompanyDetails = async (): Promise<void> => {
      try {
        const response = await apiGet({
          url: '/corecommerce/accountses/getAccountDetails?companyId=24354'
        });
        console.log('Calling service...');
        console.log('Result:', response);
        setCompanyData(response);
      } catch (error: unknown) {
        handleError(error, 'fetchCompanyDetails', 'Error calling service');
      }
    };

    if (tenantId) {
      fetchCompanyDetails();
    }
  }, [tenantId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer Detail</h2>
      {companyData && <CompanyDetailsCard {...companyData} />}
    </div>
  );
};

export default CustomerPage;