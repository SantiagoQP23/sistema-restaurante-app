import { Outlet } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { IOrder } from "../../../models";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../context";

import {
  selectOrders,
  addOrder,
  updateOrder,
  setActiveOrder,
  deleteOrder,
  setLastUpdatedOrders,
  sortOrdersByDeliveryTime,
} from "../../../redux";

import { SocketResponseOrder } from "./interfaces/responses-sockets.interface";
import { ModalClientOrder, ModalEditOrderDetail } from "./components";

import { ModalDeleteOrderDetail } from "./components/modals/ModalDeleteOrderDetail.component";

import { ModalDeleteOrder } from "./components/modals/ModalDeleteOrder.component";
import { EventsOnSocket } from "./interfaces/events-sockets.interface";

export const Orders = () => {
  const dispatch = useDispatch();

  const { activeOrder } = useSelector(selectOrders);

  const { socket } = useContext(SocketContext);

  const { enqueueSnackbar } = useSnackbar();

  // listener new order
  useEffect(() => {
    socket?.on(EventsOnSocket.newOrder, ({ order }: { order: IOrder }) => {
      enqueueSnackbar(`Se ha añadido un nuevo pedido`, { variant: "info" });

      dispatch(addOrder(order));
      dispatch(setLastUpdatedOrders(new Date().toISOString()));

      dispatch(sortOrdersByDeliveryTime());
    });

    return () => {
      socket?.off(EventsOnSocket.newOrder);
    };
  }, [socket]);

  // listener update order
  useEffect(() => {
    socket?.on(EventsOnSocket.updateOrder, ({ order }: SocketResponseOrder) => {
      dispatch(updateOrder(order!));

      if (activeOrder?.id === order?.id) {
        dispatch(setActiveOrder(order!));
      }

      dispatch(setLastUpdatedOrders(new Date().toISOString()));

      dispatch(sortOrdersByDeliveryTime());
    });

    return () => {
      socket?.off(EventsOnSocket.updateOrder);
    };
  }, [socket]);

  // listener delete order
  useEffect(() => {
    socket?.on(EventsOnSocket.deleteOrder, ({ order }: SocketResponseOrder) => {
      // enqueueSnackbar(`Se ha eliminado un pedido`, { variant: 'success' });

      dispatch(deleteOrder(order!.id));

      dispatch(setLastUpdatedOrders(new Date().toISOString()));
    });
  }, [socket]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Outlet />

        <ModalClientOrder />
      </LocalizationProvider>

      <ModalDeleteOrder />
      <ModalEditOrderDetail />
      <ModalDeleteOrderDetail />
    </>
  );
};

export default Orders;
