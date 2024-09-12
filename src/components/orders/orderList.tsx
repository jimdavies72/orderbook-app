'use client';
import { useState, useEffect } from "react";

import { Orders, Order, Comments } from "@/lib/utils/dataTypes";

import { DataTable } from "@/components/orders/data-table"
import { DataTable as CommentDataTable} from "@/components/comments/data-table";
import ContainerCard from "@/components/containerCard";

const OrderList = ({
  showAddButton,
  supplierId,
  containerId,
  orderData
}: {
  showAddButton: boolean,
  supplierId: string,
  containerId: string,
  orderData: Orders
}) => {
  const [orderId, setOrderId] = useState<string>("");
  const [orderComments, setOrderComments] = useState<Comments>([] as any);
  const [bool, setBool] = useState<boolean>(false);

  useEffect(() => {
    if (orderId !== "") {
      orderHandler(orderId);
    };
  }, [orderData]);

  const orderHandler = (orderId: string) => {
    setOrderId(orderId);
    
    const result: Order | undefined = orderData.find(
      (order) => {
        return order._id === orderId;
      }
    );

    if (result) {
      setBool(true);
   
      if (result.comments.length > 0) {
        setOrderComments(result.comments as Comments);
      } else {
        setOrderComments([] as any);
      };
    };
  };

  return (
    <div>
      <div>
        {/* Orders */}
        <ContainerCard>
          <DataTable
            supplier={supplierId}
            container={containerId}
            showAddButton={showAddButton}
            data={orderData}
            orderHandler={orderHandler}
          />
        </ContainerCard>
      </div>
      <div>
        {/* Order Comments */}
        <ContainerCard>
          <CommentDataTable
            showAddButton={bool}
            orderId={orderId}
            data={orderComments}
          />
        </ContainerCard>
      </div>
    </div>
  );
};

export default OrderList;
