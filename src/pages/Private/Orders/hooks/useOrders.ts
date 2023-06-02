import { useContext, useState } from 'react';

import { useSnackbar } from 'notistack';
import { SocketContext } from '../../../../context';
import { UpdateOrderDetailDto } from '../dto/update-order-detail.dto';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { CreateOrderDetailDto } from '../dto/create-order.dto';
import { useDispatch } from 'react-redux';
import { setActiveOrder } from '../../../../redux';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../services/orders.service';
import { IOrder } from '../../../../models';
import { useNavigate } from 'react-router-dom';



export const useOrders = () => {


  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);


  const updateOrderDetail = (updateOderDetailDto: UpdateOrderDetailDto) => {

    setLoading(true);

    socket?.emit(EventsEmitSocket.updateOrderDetail, updateOderDetailDto, ({ ok, msg, order }: SocketResponseOrder) => {

      setLoading(false);
      if (!ok) {
        enqueueSnackbar(msg, { variant: 'error' });
      } else {
        enqueueSnackbar(msg, { variant: 'success' });
      }

    })
  }

  return {
    updateOrderDetail,
    loading

  }
}


export const useOrder = (id: string) => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return useQuery<IOrder>(['order', id], () => getOrder(id), {
    enabled: !!id,
    onSuccess: (data) => {
      const order = data;

      dispatch(setActiveOrder(order));
  
      if(order.isPaid)  {
        navigate(`/orders/list/edit/${id}/receipt`, { replace: true })
  
      }
    }
  })





}


