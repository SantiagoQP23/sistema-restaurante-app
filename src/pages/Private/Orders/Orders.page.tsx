import { Outlet } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { ModalClientOrder } from "./components";

import { ModalDeleteOrderDetail } from "./components/modals/ModalDeleteOrderDetail.component";

import { ModalDeleteOrder } from "./components/modals/ModalDeleteOrder.component";
import {
  useOnOrderCreated,
  useOnOrderDeleted,
  useOnOrderUpdated,
} from "./hooks/useOnWebSocketsEventsOrders";

/**
 * Orders page
 * @version 1.1 28-12-2023 Adding the useOnOrderCreated, useOnOrderUpdated and useOnOrderDeleted hooks
 */
export const Orders = () => {
  // listener new order
  useOnOrderCreated();

  // listener update order
  useOnOrderUpdated();

  // listener delete order
  useOnOrderDeleted();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Outlet />

        <ModalClientOrder />
      </LocalizationProvider>

      <ModalDeleteOrder />
      <ModalDeleteOrderDetail />
    </>
  );
};

export default Orders;
