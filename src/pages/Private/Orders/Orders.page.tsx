
import { Outlet } from "react-router-dom";

import { Container, Button } from '@mui/material';

import { PageTitleWrapper, PageTitle } from '../../../components/ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { OrderProvider } from './context/Order.context';


import { ModalDeleteOrder } from './components/EditOrder/ModalDeleteOrder.component';
import { ModalPayOrder } from './components/ReceiptOrder/ModalPayOrder.component';
import { ModalDiscountOrder } from './components/ReceiptOrder/ModalDiscountOrder.component';
import { Clock } from "./subpages";
import { EventsOnSocket } from './interfaces/events-sockets.interface';
import { useAsync, useFetchAndLoad } from "../../../hooks";
import { IOrder } from "../../../models";
import { getOrdersToday } from './services/orders.service';
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../context";
import { selectOrders, loadOrders, addOrder, updateOrder, setActiveOrder, deleteOrder } from "../../../redux";
import { SocketResponseOrder } from "./interfaces/responses-sockets.interface";
import { ModalEditOrderDetail } from "./components";
import { Cached, Replay } from "@mui/icons-material";
import { LoadingButton } from '@mui/lab';



export const Orders = () => {


  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const { activeOrder } = useSelector(selectOrders)




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

  const refreshOrders = () => {

    callEndpoint(getOrdersToday())
      .then((resp) => {

        const { data } = resp;

        dispatch(loadOrders(data));
      })
  }


  const getOrdersCall = async () => await callEndpoint(getOrdersToday());

  const loadOrdersState = (data: IOrder[]) => { dispatch(loadOrders(data)); }

  useAsync(getOrdersCall, loadOrdersState, () => { }, []);



  return (
    <>
      


      <Container maxWidth="lg">
        <OrderProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Outlet />


          </LocalizationProvider>
        </OrderProvider>

      </Container>


      <ModalDeleteOrder />
      <ModalDiscountOrder />
      <ModalPayOrder />
      <ModalEditOrderDetail />


    </>
  )
}


export default Orders