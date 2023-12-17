import { useContext, useEffect } from "react";
import { useRoutes } from "react-router-dom";

import { useFetchAndLoad, useAsync, useMenu } from "../../hooks";

import { useDispatch } from "react-redux";
import { loadTables, updateTable } from "../../redux";
import { PrivateRouter } from "./router";
import { SidebarProvider } from "./Common/contexts/SidebarContext";

import { CircularProgress } from "@mui/material";
import { getTables } from "./Tables/services";
import { ITable } from "../../models/table.model";
import { SocketContext } from "../../context/SocketContext";
import { EventsOnSocket } from "./Orders/interfaces/events-sockets.interface";
import { SocketResponseTable } from "./Orders/interfaces/responses-sockets.interface";
import { OrderProvider } from "./Orders/context/Order.context";
import { useRestaurant } from "./Restaurant/hooks/useRestaurant";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCashRegisterActive } from "./Balance/hooks/useCashRegister";
import { ModalCreateCashRegister } from "./Balance/components/ModalCreateCashRegister.component";
import { useActiveOrders } from "./Orders/hooks";
import { useProductionAreas } from "./Restaurant/hooks/useProductionArea";

/**
 * Component that contains the private routes of the application
 * @author Santiago Quirumbay
 * @version 1.1 28/11/2023 Adding the useMenu hook to load the menu
 * @returns JSX.Element
 */
export const Private = () => {
  const content = useRoutes(PrivateRouter);

  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const { socket } = useContext(SocketContext);

  useActiveOrders();

  useMenu();

  useProductionAreas();

  const getTablesCall = async () => await callEndpoint(getTables());

  const loadTablesState = (data: ITable[]) => {
    dispatch(loadTables(data));
  };

  const { cashRegisterQuery } = useCashRegisterActive();

  useAsync(getTablesCall, loadTablesState, () => {}, []);

  useEffect(() => {
    socket?.on(EventsOnSocket.updateTable, ({ table }: SocketResponseTable) => {
      console.log("Se ha actualizado una mesa", table);
      dispatch(updateTable(table!));
    });

    return () => {
      socket?.off(EventsOnSocket.updateTable);
    };
  }, [socket]);

  useEffect(() => {
    cashRegisterQuery.refetch();
  }, []);

  const { isLoading } = useRestaurant();

  if (loading && isLoading) return <CircularProgress />;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <OrderProvider>
          <SidebarProvider>
            <>{content}</>
          </SidebarProvider>
        </OrderProvider>

        <ModalCreateCashRegister />
      </LocalizationProvider>
    </>
  );
};

export default Private;
