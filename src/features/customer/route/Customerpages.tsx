import React, { useEffect, useState } from 'react';
import CompanyDetailsCard from './CustomerDetail'; // adjust path if needed
import { handleError } from '@/utils/errorHandling';

const CustomerPage = (): React.JSX.Element => {
  const [companyData, setCompanyData] = useState(null);

 useEffect(() => {
  const fetchCompanyDetails = async (): Promise<void> => {
    try {
        
        const response = await fetch(
            'https://api.myapptino.com/corecommerce/accountses/getAccountDetails?companyId=24354',
            {
                headers: {
                    'Authorization': 'Bearer YOUR_TOKEN_HERE',
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Calling service...');

      console.log('API status:', response.status);
      const result = await response.json();
      console.log('Result:', result);
    } catch (error: unknown) {
      handleError(error, 'fetchCompanyDetails', 'Error calling service');
    }
  };

  fetchCompanyDetails();
}, []);


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer Detail</h2>
      {companyData && <CompanyDetailsCard {...companyData} />}
    </div>
  );
};

export default CustomerPage;
