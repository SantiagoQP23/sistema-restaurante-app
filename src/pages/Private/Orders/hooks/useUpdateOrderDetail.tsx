import { useContext, useState } from "react";

import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { SocketContext } from "../../../../context";

import { setActiveOrder } from "../../../../redux";

import { EventsEmitSocket } from "../interfaces/events-sockets.interface";
import { UpdateOrderDetailDto } from "../dto/update-order-detail.dto";
import { SocketResponseOrder } from "../interfaces/responses-sockets.interface";



export const useUpdateOrderDetail = () => {

  const { socket } = useContext(SocketContext);

  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const update = (data: UpdateOrderDetailDto) => {

    setLoading(true);

    socket?.emit(EventsEmitSocket.updateOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

      setLoading(false);

      if (ok) {

        // dispatch(setActiveOrder(order!))
        enqueueSnackbar('Detalle actualizado', { variant: 'success' });

      } else {
        enqueueSnackbar(msg, { variant: 'error', });
      }

    });

  }


  return {

    update,
    loading

  }
}