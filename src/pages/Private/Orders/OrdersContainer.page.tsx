import { useContext, useEffect } from 'react'

import { Outlet,} from "react-router-dom";



import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OrderProvider } from './context/Order.context';
import { SocketContext } from '../../../context/SocketContext';
import { IOrder } from '../../../models/orders.model';
import { EventsOnSocket } from './interfaces/events-sockets.interface';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchAndLoad } from '../../../hooks/useFetchAndLoad';
import { getOrdersToday } from './services/orders.service';
import { loadOrders, updateOrder } from '../../../redux';
import { useAsync } from '../../../hooks/useAsync';
import { SocketResponseOrder } from './interfaces/responses-sockets.interface';
import { addOrder, deleteOrder, selectOrders, setActiveOrder } from '../../../redux/slices/orders/orders.slice';



export const OrdersContainer = () => {

  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const { activeOrder } = useSelector(selectOrders)


  const getOrdersCall = async () => await callEndpoint(getOrdersToday());

  const loadOrdersState = (data: IOrder[]) => { dispatch(loadOrders(data)); }

  useAsync(getOrdersCall, loadOrdersState, () => { }, []);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {

    socket?.on(EventsOnSocket.newOrder, ({ order }: { order: IOrder }) => {

      console.log(order);
      enqueueSnackbar(`Se ha añadido un nuevo pedido`, { variant: 'success' });

      dispatch(addOrder(order))

      //dispatch(pedidoAddNew(pedido))


    });

    return () => {
      socket?.off(EventsOnSocket.newOrder);
    }

  }, [socket]);


  useEffect(() => {

    socket?.on(EventsOnSocket.updateOrder, ({ msg, order }: SocketResponseOrder) => {

      console.log('Se ha actualizado un pedido')
      dispatch(updateOrder(order!));

      console.log(order)



      console.log(order?.id, activeOrder?.id)
      if (activeOrder?.id === order?.id) {
        dispatch(setActiveOrder(order!))
      }
      // enqueueSnackbar(`${msg}`, { variant: 'success' });


      //dispatch(pedidoAddNew(pedido))

    });

    return () => {
      socket?.off(EventsOnSocket.updateOrder);
    }

  }, [socket]);

  useEffect(() => {

    socket?.on(EventsOnSocket.deleteOrder, ({ order }: SocketResponseOrder) => {

      // enqueueSnackbar(`Se ha eliminado un pedido`, { variant: 'success' });

      dispatch(deleteOrder(order!.id));

    });


  }, [socket]);

  

  return (
    <>


      <OrderProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>

          <Outlet />

        </LocalizationProvider>
      </OrderProvider>


    </>
  )
}


export default OrdersContainer