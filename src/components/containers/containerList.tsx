"use client";
import { useState, useEffect } from "react";

import ContainerComponent from "@/components/containers/containerComponent";
import {
  Containers,
  Container,
  Orders,
  Comments,
} from "@/lib/utils/dataTypes";

import OrderList from "@/components/orders/orderList";

import SuchEmpty from "../suchEmpty";
import ContainerCard from "@/components/containerCard";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import EditForm from "@/components/forms/containerEdit-form";

import {DataTable as CommentDataTable} from "@/components/comments/data-table";
import { Container as LucideContainer } from "lucide-react";
import IconMenu from "@/components/icon-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ContainerList = ({
  supplierId,
  showAddButton,
  containerData,
  includeCompleteHandler,
}: {
  supplierId: string;
  showAddButton: boolean;
  containerData: Containers;
  includeCompleteHandler: (includeComplete: boolean) => void;
}) => {
  const [containerId, setContainerId] = useState<string>("");
  const [containerComments, setContainerComments] = useState<Comments>([] as any);
  const [orders, setOrders] = useState<Orders>([] as any);
  const [active, setActive] = useState<string>("");
  const [comBool, setComBool] = useState<boolean>(false);
  const [ordBool, setOrdBool] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [includeComplete, setIncludeComplete] = useState<boolean>(false);

  useEffect(() => {
    if (containerId !== "") {
      commentAndOrderHandler(containerId);
    };
  }, [containerData]);

  const commentAndOrderHandler = (containerId: string) => {
    setContainerId(containerId);

    const result: Container | undefined = containerData.find(
      (container) => {
        return container._id === containerId;
      }
    );

    if (result) {
      setActive(containerId);
      setComBool(true);
      setOrdBool(true);

      if (result.comments.length > 0) {
        setContainerComments(result.comments as Comments);
      } else {
        setContainerComments([] as any);
      }
      if (result.orders.length > 0) {
        setOrders(result.orders as Orders);
      } else {
        setOrders([] as any);
      }
    } else {
      setComBool(false);
      setOrdBool(false);
    };
  };

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
              {!showAddButton ? null : (
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
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="include-complete"
                checked={includeComplete}
                onCheckedChange={() => {
                  setIncludeComplete(!includeComplete);
                  includeCompleteHandler(!includeComplete);
                }}
              />
              <Label htmlFor="include-complete">Inc. Complete</Label>
            </div>
          </div>
          <ScrollArea className="h-[215px] mt-1">
            <div className="mr-4">
              {containerData && containerData.length > 0 ? (
                containerData.map((container: Container, index) => (
                  <ContainerComponent
                    key={index}
                    activeContainer={active}
                    commentAndOrderHandler={commentAndOrderHandler}
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
            <CommentDataTable
              showAddButton={showAddButton}
              containerId={containerId}
              data={containerComments}
            />
          </ContainerCard>
        </div>
      </div>
      <div className="col-span-6">
        <OrderList
          showAddButton={ordBool}
          supplierId={supplierId}
          containerId={active}
          orderData={orders}
        />
      </div>
    </div>
  );
};

export default ContainerList;
