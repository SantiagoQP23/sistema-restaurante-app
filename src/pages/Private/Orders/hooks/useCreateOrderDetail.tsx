import { useContext, useState } from "react";
import { setActiveOrder } from "../../../../redux";
import { CreateOrderDetailDto } from "../dto/create-order.dto";
import { EventsEmitSocket } from "../interfaces/events-sockets.interface";
import { SocketResponseOrder } from "../interfaces/responses-sockets.interface";
import { SocketContext } from "../../../../context";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

export const useCreateOrderDetail = () => {
  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const createOrderDetail = (data: CreateOrderDetailDto) => {
    setLoading(true);
    socket?.emit(
      EventsEmitSocket.addOrderDetail,
      data,
      ({ ok, order, msg }: SocketResponseOrder) => {
        setLoading(false);

        if (ok) {
          // dispatch(setActiveOrder(order!))

          enqueueSnackbar("Producto añadido", { variant: "success" });
        } else {
          enqueueSnackbar(msg, { variant: "error" });
        }
      }
    );
  };

  return {
    loading,
    createOrderDetail,
  };
};
