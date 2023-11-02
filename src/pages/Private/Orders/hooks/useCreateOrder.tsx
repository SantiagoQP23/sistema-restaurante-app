import { useState, useContext } from "react";
import { SocketContext } from "../../../../context";
import { CreateOrderDto } from "../dto/create-order.dto";
import { EventsEmitSocket } from "../interfaces/events-sockets.interface";

import { useSnackbar } from "notistack";
import { SocketResponseOrder } from "../interfaces/responses-sockets.interface";

import { statusModalAddOrder } from "../services/orders.service";
import { useNewOrderStore } from "../store/newOrderStore";

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);

  const { reset } = useNewOrderStore((state) => state);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const createOrder = async (order: CreateOrderDto) => {
    setLoading(true);

    socket?.emit(
      EventsEmitSocket.createOrder,
      order,
      (resp: SocketResponseOrder) => {
        console.log("orden creada", resp);

        setLoading(false);
        if (resp.ok) {
          reset();
          statusModalAddOrder.setSubject(true, resp.order!);
          // navigate('/orders');
        } else {
          enqueueSnackbar(resp.msg, { variant: "error" });
        }
      }
    );
  };

  return {
    loading,
    createOrder,
  };
};
