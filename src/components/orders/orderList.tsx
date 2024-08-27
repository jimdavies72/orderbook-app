'use client';
import { useState, useEffect } from "react";
import { Orders, Order, Comments } from "@/lib/utils/dataTypes";
import { DataTable } from "@/components/orders/data-table"
import ContainerCard from "@/components/containerCard";
import CommentList from "@/components/comments/commentList";

const OrderList = ({
  supplier,
  container,
  orders
}: {
  supplier: string,
  container: string,
  orders: Orders
}) => {
  const [order, setOrder] = useState<string>("");
  const [orderComments, setOrderComments] = useState<Comments>([{}] as Comments);
  const [bool, setBool] = useState<boolean>(false);


  const orderHandler = (orderId: string) => {
    
    let order: Order | undefined = undefined;
    if (orders) {
      order = orders.find((o: Order) => orderId === o._id); 
    }
    
    if (order) {
      //enable Add Comment button
      setBool(true);
      setOrder(orderId);

      
      if ( order.comments && order.comments.length > 0) {
        setOrderComments(order.comments as Comments);
      } else {
        setOrderComments([{}] as Comments);
      };
    };
  };

  useEffect(() => {
    setOrderComments([{}] as Comments);
  }, [container]); 


  return (
    <div>
      <div>
        {/* Orders */}
        <ContainerCard>
          <DataTable 
            supplier={supplier}
            container={container}
            data={orders} 
            orderHandler={orderHandler}
        />
        </ContainerCard>
      </div>
      <div>
        {/* Order Comments */}
        <ContainerCard>
          <CommentList 
            orderId={order}
            showAddButton={bool} 
            comments={orderComments} 
          />
        </ContainerCard>
      </div>
    </div>
  );
};

export default OrderList;
