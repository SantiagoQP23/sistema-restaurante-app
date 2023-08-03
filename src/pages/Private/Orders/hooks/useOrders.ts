import { useContext, useState, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { SocketContext } from '../../../../context';
import { UpdateOrderDetailDto } from '../dto/update-order-detail.dto';
import { EventsEmitSocket } from '../interfaces/events-sockets.interface';
import { SocketResponseOrder } from '../interfaces/responses-sockets.interface';
import { CreateOrderDetailDto } from '../dto/create-order.dto';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, selectOrders, setActiveOrder, setLastUpdatedOrders } from '../../../../redux';
import { useQuery } from '@tanstack/react-query';
import { OrdersResponse, getActiveOrders, getOrder, getOrders } from '../services/orders.service';
import { IOrder, OrderStatus } from '../../../../models';
import { useNavigate } from 'react-router-dom';
import { usePaginationAsync } from '../../../../hooks/usePaginationAsync';
import { Period } from '../../../../models/period.model';
import { useFilterOrders } from './useFilterOrders';
import { useDateFilter } from '../../../../hooks/useDateFilter';



export const useOrders = () => {

  const filter = useFilterOrders();


  const ordersQuery = useQuery<OrdersResponse>(['orders'],
    () => getOrders({
      offset: filter.page,
      limit: filter.rowsPerPage,
      startDate: filter.startDate,
      endDate: filter.endDate,
      period: filter.period,
      status: filter.status || undefined,
      userId: filter.user?.id
    }),

    {
      onSuccess: (data) => {


      }


    })

  useEffect(() => {


    ordersQuery.refetch();
    filter.resetPage();
  }, [
    filter.startDate,
    filter.endDate,
    filter.period,
    filter.table,
    filter.rowsPerPage,
    filter.user,
    filter.isPaid,
    filter.status,
    filter.client,
    
  ])

  useEffect(() => {

    ordersQuery.refetch();

  }, [filter.page])



  return {
    ordersQuery,

    ...filter

  }
}



export const useActiveOrders = () => {

  const pagination = usePaginationAsync();

  const dateFilter = useDateFilter(Period.YEAR);

  const dispatch = useDispatch();

  const activeOrdersQuery = useQuery<IOrder[]>(['orders', 'actives'],
    () => getActiveOrders({
      offset: pagination.page,
      limit: pagination.rowsPerPage,
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
      period: dateFilter.period

    }),
    {

      onSuccess: (data) => {

        // console.log(data)

        dispatch(loadOrders(data));

        dispatch(setLastUpdatedOrders(new Date().toISOString()))

      }



    })

  useEffect(() => {

    activeOrdersQuery.refetch();
  }, [dateFilter.startDate, dateFilter.endDate, dateFilter.period])

  return {
    activeOrdersQuery,
    ...pagination

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

      // if (order.isPaid) {
      //   navigate(`/orders/list/edit/${id}/receipt`, { replace: true })

      // }
    }
  })





}



export const useOrderHelper = () => {

  const { orders } = useSelector(selectOrders);

  const dispatch = useDispatch();


  const sortOrdersByDeliveryTime = (orders: IOrder[]) => {

    const ordersSorted = orders.sort((a, b) => {
        
        const aDate = new Date(a.deliveryTime).getTime();
        const bDate = new Date(b.deliveryTime).getTime();
  
        return aDate - bDate;
  
      }
    )

    console.log(ordersSorted);

    dispatch(loadOrders(ordersSorted));
   

  }



  const getFirstPendingOrder = (): IOrder => {

    const order = orders.find(order => order.status === OrderStatus.PENDING);

    if (!order) {
      throw new Error('No hay ordenes pendientes')
    }

    return order;

  }

  return {
    getFirstPendingOrder,
    sortOrdersByDeliveryTime


  }


}