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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
  const [includeComplete, setIncludeComplete] = useState(false);

  const getContainers = async () => {
    const response: ContainersList = await httpRequest(
      "/containers",
      { 
        filterKey: "supplier", 
        filterValue: supplierId,
        includeComplete: includeComplete
      },
      "PATCH",
      {cache: "no-store"}

    );

    if (!response) {
      throw new Error("Failed to fetch data");
    }

    setContainers(response.containers);
  };

  const containerHandler = (containerId: string) => { 
    
    let container: Container | undefined = undefined;
    if (containers) {
      container = containers.find((c: Container) => containerId === c._id);
    }
    
    if (container){
      //enable Add Comment button
      setBool(true);
      setActive(containerId);

      if (container.comments.length > 0) {
        setContainerComments(container.comments as Comments);
      } else {
        setContainerComments([{}] as Comments);
      };
      if (container.orders.length > 0) {
        setOrders(container.orders as Orders);
      } else {
        setOrders([{}] as Orders);
      };
    }; 
  };

  useEffect(() => {
    setContainerComments([{}] as Comments);
    setOrders([{}] as Orders);
    if (supplierId !== "") {
      getContainers();
    }
  }, [supplierId, includeComplete]); 

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
            supplierId={supplierId}
            containerId={active}
            setIsOpen={setIsEditOpen}
          />
        </ResponsiveDialog>
        <ContainerCard>
          <div className="border-b-2 flex flex-row items-center justify-between">
            <div className="mb-2">
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
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="include-complete"
                onCheckedChange={() => setIncludeComplete(!includeComplete)}
              />
              <Label htmlFor="include-complete">Inc. Complete</Label>
            </div>
          </div>
          <ScrollArea className="h-[215px] mt-1">
            <div className="mr-4">
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
                <div className="flex justify-center items-center h-[22vh]">
                  <SuchEmpty hasBorder={false} />
                </div>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
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
        <OrderList 
          supplier={supplierId} 
          container={active} 
          orders={orders} 
        />
      </div>
    </div>
  );
}

export default ContainerList
