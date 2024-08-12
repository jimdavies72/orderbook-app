import { TabsTrigger } from "@/components/ui/tabs";

export const TabComponent = ({ 
  value,
  description,
  containers
}: { 
  value: string,
  description?: string,
  containers: number
}) => {
  return (
      <TabsTrigger value={value}>
        <p className="text-gray-900">
          {description} ({containers})
        </p>
      </TabsTrigger>
  );
};

export default TabComponent;
