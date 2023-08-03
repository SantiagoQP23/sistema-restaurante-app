import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { SocketContext } from "../../../../context";
import { useDispatch } from "react-redux";
import { setActiveOrder } from "../../../../redux";
import { DeleteOrderDetailDto } from "../dto/delete-order-detail.dto";
import { EventsEmitSocket } from "../interfaces/events-sockets.interface";
import { SocketResponseOrder } from "../interfaces/responses-sockets.interface";



export const useDeleteOrderDetail = () => {

  const [loading, setLoading] = useState(false);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  
  const deleteOrderDetail = (data: DeleteOrderDetailDto) => {
 
  
      socket?.emit(EventsEmitSocket.deleteOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {
  
        if (ok) {
          // dispatch(setActiveOrder(order!))

          enqueueSnackbar('Producto eliminado', { variant: 'success' });
  
        } else {
          enqueueSnackbar(msg, { variant: 'error' });
        }
  
      });
  
    }


  return {

    deleteOrderDetail,
    loading
  }

}