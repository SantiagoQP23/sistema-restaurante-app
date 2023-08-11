
import { Outlet } from "react-router-dom";

import { Container, Button } from '@mui/material';

import { PageTitleWrapper, PageTitle } from '../../../components/ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OrderProvider } from './context/Order.context';


import { ModalDeleteOrder } from './components/modals/ModalDeleteOrder.component';
import { ModalPayOrder } from './components/modals/ModalPayOrder.component';
import { ModalDiscountOrder } from './components/modals/ModalDiscountOrder.component';
import { EventsOnSocket } from './interfaces/events-sockets.interface';
import { useAsync, useFetchAndLoad } from "../../../hooks";
import { IOrder, ITable } from "../../../models";
import { getOrdersToday } from './services/orders.service';
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../context";
import { selectOrders, loadOrders, addOrder, updateOrder, setActiveOrder, deleteOrder, setLastUpdatedOrders, selectTables, updateTable, sortOrdersByDeliveryTime } from "../../../redux";
import { SocketResponseOrder } from "./interfaces/responses-sockets.interface";
import { ModalClientOrder, ModalEditOrderDetail } from "./components";
import { Cached, Replay } from "@mui/icons-material";
import { LoadingButton } from '@mui/lab';
import { ModalAddDetail } from "./components/EditOrder";
import { ModalDeleteOrderDetail } from "./components/modals/ModalDeleteOrderDetail.component";
import { useActiveOrders, useOrderHelper } from "./hooks";



export const Orders = () => {

  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  
  const { activeOrder, orders } = useSelector(selectOrders);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();


  // listener new order
  useEffect(() => {

    socket?.on(EventsOnSocket.newOrder, ({ order }: { order: IOrder }) => {

      console.log(order);
      enqueueSnackbar(`Se ha añadido un nuevo pedido`, { variant: 'info' });

      dispatch(addOrder(order))
      dispatch(setLastUpdatedOrders(new Date().toISOString()))

      dispatch(sortOrdersByDeliveryTime())
      


    });

    return () => {
      socket?.off(EventsOnSocket.newOrder);
    }

  }, [socket]);


  // listener update order
  useEffect(() => {

    socket?.on(EventsOnSocket.updateOrder, ({ msg, order }: SocketResponseOrder) => {

      dispatch(updateOrder(order!));

      if (activeOrder?.id === order?.id) {

        console.log({update: order})
        dispatch(setActiveOrder(order!))
      }

      dispatch(setLastUpdatedOrders(new Date().toISOString()))

      dispatch(sortOrdersByDeliveryTime())





    });

    return () => {
      socket?.off(EventsOnSocket.updateOrder);
    }

  }, [socket]);

  // listener delete order
  useEffect(() => {

    socket?.on(EventsOnSocket.deleteOrder, ({ order }: SocketResponseOrder) => {

      // enqueueSnackbar(`Se ha eliminado un pedido`, { variant: 'success' });

      dispatch(deleteOrder(order!.id));

      dispatch(setLastUpdatedOrders(new Date().toISOString()))

    });


  }, [socket]);

  const refreshOrders = () => {

    callEndpoint(getOrdersToday())
      .then((resp) => {

        const { data } = resp;

        dispatch(loadOrders(data));
      })
  }




  return (
    <>





      <LocalizationProvider dateAdapter={AdapterDateFns}>

        <Outlet />

        <ModalClientOrder />

      </LocalizationProvider>



      <ModalDeleteOrder />
      <ModalDiscountOrder />
      <ModalPayOrder />
      <ModalEditOrderDetail />
      <ModalDeleteOrderDetail />

      <ModalAddDetail />

    </>
  )
}


export default Orders