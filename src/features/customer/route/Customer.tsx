import useSideBarStore from '@/stores/sidebarStore';

import CustomerFilter from './CustomerFilter';
import CustomerLanding from './CustomerLanding';

const Customers = () => {
  const { sideOpen } = useSideBarStore();
  return (
    <div
      className={`flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 transition-all duration-300 w-full ${
        sideOpen
          ? 'lg:max-w-[calc(100vw-20rem)]'
          : 'lg:max-w-[calc(100vw-5rem)]'
      }`}
    >
      <CustomerFilter />
      <CustomerLanding />
    </div>
  );
};
export default Customers;
