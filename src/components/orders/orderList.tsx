'use client';
import { useState } from "react";
import { Orders, Order, Comments } from "@/lib/utils/dataTypes";
import { DataTable } from "@/components/orders/data-table"
import ContainerCard from "@/components/containerCard";
import CommentList from "@/components/comments/commentList";

const OrderList = ({
  orders
}: {
  orders: Orders
}) => {
  const [order, setOrder] = useState<Order>({} as Order);
  const [orderComments, setOrderComments] = useState<Comments>([{}] as Comments);

  const orderHandler = (orderId: string) => {
    setOrderComments([{}] as Comments);

    const order: Order | undefined = orders.find((o: Order) => orderId === o._id);
    
    setOrder(order as Order);

    if (order) {
      if (order.comments.length > 0) {
        setOrderComments(order.comments as Comments);
      } 
    };
  };

  return (
    <div>
      <div>
        <ContainerCard>
          <DataTable data={orders} />
        </ContainerCard>
      </div>
      <div>
        <ContainerCard>
          <CommentList 
            showAddButton={false} 
            comments={orderComments} 
          />
        </ContainerCard>
      </div>
    </div>
  );
};

export default OrderList;
