import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { SocketContext } from '../../../../context';
import { UpdateOrderDetailDto } from '../dto/update-order-detail.dto';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';



export const useOrders = () => {


  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();


  const updateOrderDetail = (updateOderDetailDto: UpdateOrderDetailDto) => {
    socket?.emit(EventsEmitSocket.updateOrderDetail, updateOderDetailDto, ({ ok, msg, order }: SocketResponseOrder) => {

      if (!ok) {
        enqueueSnackbar(msg, { variant: 'error' });
      }else {
        enqueueSnackbar(msg, { variant: 'success' });
      }

    })
  }



  return {
    updateOrderDetail



  }
}