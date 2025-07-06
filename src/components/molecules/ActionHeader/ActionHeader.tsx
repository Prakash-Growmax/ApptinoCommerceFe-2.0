import { ShadCnButton } from "@/components/ui/button";
interface ActionHeaderProps {
  handleSubmit: () => void;
}
export default function ActionHeader({
handleSubmit
}:ActionHeaderProps) {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Action Buttons */}
          <div className="ml-auto flex items-center space-x-3">
            <ShadCnButton variant="outline">
              Cancel
            </ShadCnButton>
            <ShadCnButton variant="default" onClick={handleSubmit}>
              Update
            </ShadCnButton>
          </div>

        </div>
      </div>
    </header>
  );
}
