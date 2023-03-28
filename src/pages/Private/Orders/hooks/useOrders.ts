import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { SocketContext } from '../../../../context';
import { UpdateOrderDetailDto } from '../dto/update-order-detail.dto';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { CreateOrderDetailDto } from '../dto/create-order.dto';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from '../../../../redux';



export const useOrders = () => {


  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();


  const updateOrderDetail = (updateOderDetailDto: UpdateOrderDetailDto) => {
    socket?.emit(EventsEmitSocket.updateOrderDetail, updateOderDetailDto, ({ ok, msg, order }: SocketResponseOrder) => {

      if (!ok) {
        enqueueSnackbar(msg, { variant: 'error' });
      }else {
        enqueueSnackbar(msg, { variant: 'success' });
      }

    })
  }

  const createOrderDetail = (data: CreateOrderDetailDto) => {
  

    socket?.emit(EventsEmitSocket.addOrderDetail, data, ({ ok, order, msg }: SocketResponseOrder) => {

      if (ok) {
        dispatch(setActiveOrder(order!))

      } else {
        enqueueSnackbar(msg, { variant: 'error' });
      }

    });
  }



  return {
    updateOrderDetail,
    createOrderDetail



  }
}