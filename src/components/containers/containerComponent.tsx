import {useEffect, useState } from "react";
import { Container } from "@/lib/utils/dataTypes";
import Card from "@/components/card";

export const ContainerComponent = ({
  activeContainer,
  container,
  containerHandler,
}: {
  activeContainer: string,
  container: Container,
  containerHandler: (containerId: string) => void,
}) => {
const [activeStyle, setActiveStyle] = useState<string>("");

  useEffect(() => {
    if (activeContainer === container._id) {
      setActiveStyle("font-bold")
    } else {
      setActiveStyle("")
    }
  }, [activeContainer])

  return (
    <div
      onClick={() => {
        containerHandler(container._id);
      }}
      className="w-full"
    >
      <Card>
        <h5 className={activeStyle}>
          Container: {container.containerNumber}
        </h5>
        <p>Value: {container.value}</p>
      </Card>
    </div>
  );
};

export default ContainerComponent;
