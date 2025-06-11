import { Separator } from '@/components/ui/separator';

import CustomerFilter from './CustomerFilter';
import CustomerLanding from './CustomerLanding';

const Customers = () => {
  return (
    <div className="flex flex-col w-full">
      <CustomerFilter />
      <Separator className="my-4" />
      <CustomerLanding />
    </div>
  );
};
export default Customers;
