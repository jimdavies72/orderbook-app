import Card from "@/components/card"
import { Container } from "@/lib/utils/dataTypes";


const ContainerComponent = ({container}: {container: Container}) => {
  return (
    <Card>
      <div className="border-zinc-100">
        <h1>Container {container.containerNumber}</h1>
      </div>
    </Card>
  );
};

export default ContainerComponent;