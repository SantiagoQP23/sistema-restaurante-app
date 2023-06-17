import { useContext, useState } from "react";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { EventsEmitSocket } from "../interfaces/events-sockets.interface";
import { SocketResponseOrder } from "../interfaces/responses-sockets.interface";
import { SocketContext } from "../../../../context";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setActiveOrder } from "../../../../redux";



export const useUpdateOrder = () => {

  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();


  

  const updateOrder = (updateOrderDto: UpdateOrderDto) => {

    setLoading(true);
    socket?.emit(EventsEmitSocket.updateOrder, updateOrderDto, (res: SocketResponseOrder) => {

      setLoading(false);
      if (res.ok) {

        dispatch(setActiveOrder(res.order!));
      }

      else {
        enqueueSnackbar(res.msg, { variant: 'error' });
      }

    });

    
  }



  return {
    loading,
    updateOrder

  }
}