import {Order} from "@/lib/utils/dataTypes";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";

const OrderComponent = ({
  order,
  orderHandler
}:{
  order : Order,
  orderHandler: (orderId: string) => void
}) => {

  return (
    <div className="flex flex-col ">
      <div>
        <Card>
          <p>Order No: {order.orderNumber}</p>
          <Button
            variant="outline"
            className="rounded mt-1 mb-2 hover:bg-gray-200 shadow shadow-gray-400"
            onClick={() => orderHandler(order._id)}
          >
            Comments
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default OrderComponent;
