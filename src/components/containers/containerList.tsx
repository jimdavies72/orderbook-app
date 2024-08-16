'use client'
import { useState, useEffect } from 'react'
import { httpRequest } from "@/lib/utils/dataHelpers";
import ContainerComponent from "@/components/containers/containerComponent";
import { ContainersList, Containers, Container, Orders, Comments } from "@/lib/utils/dataTypes";
import CommentList from "@/components/comments/commentList";
import OrderList from "@/components/orders/orderList";
import ContainerCard from "@/components/containerCard";

const ContainerList = ({
  supplierId
}: {  
  supplierId: string
}) => {
  //const [sId, SetSId] = useState<string>("");
  const [active, setActive] = useState<string>("");
  const [containers, setContainers] = useState<Containers>([{}] as Containers);
  const [containerComments, setContainerComments] = useState<Comments>([{}] as Comments);
  const [orders, setOrders] = useState<Orders>([{}] as Orders);


  const getContainers = async () => {
    const response: ContainersList = await httpRequest(
      "/containers",
      { filterKey: "supplier", filterValue: supplierId },
      "PATCH"
    );

    if (!response) {
      throw new Error("Failed to fetch data");
    }

    setContainers(response.containers);
  }

  const containerHandler = (containerId: string) => { 
    setActive(containerId)
    setContainerComments([{}] as Comments);
    setOrders([{}] as Orders);

    const container: Container | undefined = containers.find((c: Container) => containerId === c._id);
    
    if (container){
      if (container.comments.length > 0) {
        setContainerComments(container.comments as Comments);
      };
      if (container.orders.length > 0) {
        setOrders(container.orders as Orders);
      };
    }; 
  };

  useEffect(() => {
    if (supplierId !== "") {
      //SetSId(supplierId);
      getContainers();
    }
  }, [supplierId]); 

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-4 flex flex-col">
        <ContainerCard>
          {containers && containers.map((container: Container, index) => (
            <ContainerComponent 
              key={index} 
              activeContainer={active}
              containerHandler={containerHandler} 
              container={container}
            />
          ))}
        </ContainerCard>
        <div>
          <ContainerCard>
            <CommentList
              comments={containerComments}
              />
          </ContainerCard>
        </div>
      </div>
      <div className='col-span-6'>
        <ContainerCard>
        <OrderList 
          orders={orders}
        />
        </ContainerCard>
      </div>
    </div>
  );
}

export default ContainerList
