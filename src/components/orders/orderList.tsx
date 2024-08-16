'use client';
import { useState } from "react";
import OrderComponent from "./orderComponent";
import { Orders, Order, Comments } from "@/lib/utils/dataTypes";
import { DataTable } from "@/components/orders/data-table"
import ContainerCard from "@/components/containerCard";
import CommentList from "@/components/comments/commentList";

const OrderList = ({
  orders
}: {
  orders: Orders
}) => {
  const [orderComments, setOrderComments] = useState<Comments>([{}] as Comments);

  const orderHandler = (orderId: string) => {
    setOrderComments([{}] as Comments);

    const order: Order | undefined = orders.find((o: Order) => orderId === o._id);
    
    if (order) {
      if (order.comments.length > 0) {
        setOrderComments(order.comments as Comments);
      }
    };
  };

  return (
    <div>
      <div>
        <DataTable data={orders} />
        {/* {orders &&
          orders.map((order: Order, index) => (
            <OrderComponent
              key={index}
              orderHandler={orderHandler}
              order={order}
            />
          ))} */}
      </div>
      <div>
        <ContainerCard>
          <CommentList comments={orderComments} />
        </ContainerCard>
      </div>
    </div>
  );
};

export default OrderList;
