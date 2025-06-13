import useSideBarStore from "@/stores/sidebarStore";
import CustomerFilter from "./CustomerFilter";
import { Separator } from "@/components/ui/separator";
import CustomerLanding from "./CustomerLanding";

const Customers = () => {
      const {sideOpen} = useSideBarStore();
  return (
     <div className={`flex flex-col w-full p-4 transition-all duration-300 ${
      sideOpen ? 'lg:pl-4' : 'lg:pl-4'
    }`}>
      <CustomerFilter />
      <Separator className="my-4" />
      <CustomerLanding />
    </div>
  );
};
export default Customers;