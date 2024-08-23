'use client'
import { useState, useEffect } from 'react'
import { httpRequest } from "@/lib/utils/dataHelpers";
import ContainerComponent from "@/components/containers/containerComponent";
import { ContainersList, Containers, Container, Orders, Comments } from "@/lib/utils/dataTypes";
import CommentList from "@/components/comments/commentList";
import OrderList from "@/components/orders/orderList";
import SuchEmpty from '../suchEmpty';
import ContainerCard from "@/components/containerCard";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import EditForm from "@/components/forms/containerEdit-form";

import { Container as LucideContainer } from "lucide-react";
import IconMenu from "@/components/icon-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ContainerList = ({
  supplierId
}: {  
  supplierId: string
}) => {
  const [active, setActive] = useState<string>("");
  const [containers, setContainers] = useState<Containers | undefined>();
  const [containerComments, setContainerComments] = useState<Comments>([{}] as Comments);
  const [bool, setBool] = useState<boolean>(false);
  const [orders, setOrders] = useState<Orders>([{}] as Orders);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [cId, setCId] = useState<string>("");

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
  };

  const containerHandler = (containerId: string) => { 
    setActive(containerId)

    let container: Container | undefined = undefined;
    if (containers) {
      container = containers.find((c: Container) => containerId === c._id);
    }
    
    if (container){
      //enable Add Comment button
      setBool(true);
      setCId(containerId);

      if (container.comments.length > 0) {
        setContainerComments(container.comments as Comments);
      } else {
        setContainerComments([{}] as Comments);
      }
      if (container.orders.length > 0) {
        setOrders(container.orders as Orders);
      } else {
        setOrders([{}] as Orders);
      }
    }; 
  };

  useEffect(() => {
    setContainerComments([{}] as Comments);
    setOrders([{}] as Orders);
    if (supplierId !== "") {
      getContainers();
    }
  }, [supplierId]); 

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-4 flex flex-col">
        <ResponsiveDialog
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          title="Add Container"
          description="Add new Container"
        >
          <EditForm
            containerId={cId}
            setIsOpen={setIsEditOpen}
          />
        </ResponsiveDialog>
        <ContainerCard>
          <div className="flex flex-row items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditOpen(true);
              }}
              className="rounded-md p-2 hover:bg-neutral-100"
            >
              <IconMenu
                text="Add Container"
                icon={<LucideContainer className="h-5 w-5" />}
              />
            </Button>
            <div className="flex items-center space-x-2">
              <Switch id="include-complete" />
              <Label htmlFor="include-complete">Inc. Complete</Label>
            </div>
          </div>
          {containers ? (
            containers.map((container: Container, index) => (
              <ContainerComponent
                key={index}
                activeContainer={active}
                containerHandler={containerHandler}
                container={container}
              />
            ))
          ) : (
            <SuchEmpty hasBorder={false} />
          )}
        </ContainerCard>
        <div>
          <ContainerCard>
            <CommentList
              showAddButton={bool}
              containerId={active}
              comments={containerComments}
            />
          </ContainerCard>
        </div>
      </div>
      <div className="col-span-6">
        <OrderList orders={orders} />
      </div>
    </div>
  );
}

export default ContainerList
