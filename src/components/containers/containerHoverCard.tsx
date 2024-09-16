import { Container } from "@/lib/utils/dataTypes";

const ContainerHoverCard = ({
  container
}: {
  container: Container
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <p>Container Number</p>
      <p>{container.supplierContainerNumber}</p>
      <p>Destination Port</p>
      <p>{container.destinationPort}</p>
    </div>
  );
};

export default ContainerHoverCard;
