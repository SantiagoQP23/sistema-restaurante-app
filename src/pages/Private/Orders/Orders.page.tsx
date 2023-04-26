
import { Outlet } from "react-router-dom";

import { Container, Button } from '@mui/material';

import { PageTitleWrapper, PageTitle } from '../../../components/ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OrderProvider } from './context/Order.context';


import { ModalDeleteOrder } from './components/EditOrder/ModalDeleteOrder.component';
import { ModalPayOrder } from './components/ReceiptOrder/ModalPayOrder.component';
import { ModalDiscountOrder } from './components/ReceiptOrder/ModalDiscountOrder.component';
import { EventsOnSocket } from './interfaces/events-sockets.interface';
import { useAsync, useFetchAndLoad } from "../../../hooks";
import { IOrder } from "../../../models";
import { getOrdersToday } from './services/orders.service';
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../context";
import { selectOrders, loadOrders, addOrder, updateOrder, setActiveOrder, deleteOrder, setLastUpdatedOrders } from "../../../redux";
import { SocketResponseOrder } from "./interfaces/responses-sockets.interface";
import { ModalClientOrder, ModalEditOrderDetail } from "./components";
import { Cached, Replay } from "@mui/icons-material";
import { LoadingButton } from '@mui/lab';
import { ModalAddDetail } from "./components/EditOrder";



export const Orders = () => {


  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const { activeOrder } = useSelector(selectOrders)




  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {

    socket?.on(EventsOnSocket.newOrder, ({ order }: { order: IOrder }) => {

      console.log(order);
      enqueueSnackbar(`Se ha añadido un nuevo pedido`, { variant: 'info' });

      dispatch(addOrder(order))
      dispatch(setLastUpdatedOrders(new Date().toISOString()))

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

      dispatch(setLastUpdatedOrders(new Date().toISOString()))
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


  const getOrdersCall = async () => await callEndpoint(getOrdersToday());

  const loadOrdersState = (data: IOrder[]) => {
    dispatch(loadOrders(data));

    dispatch(setLastUpdatedOrders(new Date().toISOString()))

  }

  useAsync(getOrdersCall, loadOrdersState, () => { }, []);



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

      <ModalAddDetail />

    </>
  )
}


export default Orders