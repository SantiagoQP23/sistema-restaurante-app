import { useContext, useEffect } from "react";
import { useRoutes } from "react-router-dom";

import { useFetchAndLoad, useAsync } from "../../hooks";

import { ISection } from "../../models";

import { getMenu } from "../../services";

import { useDispatch } from "react-redux";
import { loadMenu, loadTables, updateTable } from "../../redux";
import { PrivateRouter } from "./router";
import { SidebarProvider } from "./Common/contexts/SidebarContext";

import { SnackbarProvider, closeSnackbar } from "notistack";
import { CircularProgress, IconButton } from "@mui/material";
import { getTables } from "./Tables/services";
import { ITable } from "../../models/table.model";
import { SocketContext } from "../../context/SocketContext";
import { EventsOnSocket } from "./Orders/interfaces/events-sockets.interface";
import { SocketResponseTable } from "./Orders/interfaces/responses-sockets.interface";
import { OrderProvider } from "./Orders/context/Order.context";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { useRestaurant } from "./Reports/hooks/useRestaurant";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCashRegisterActive } from "./Balance/hooks/useCashRegister";
import { ModalCreateCashRegister } from "./Balance/components/ModalCreateCashRegister.component";
import { useActiveOrders } from "./Orders/hooks";

export const Private = () => {
  const content = useRoutes(PrivateRouter);

  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const { socket } = useContext(SocketContext);

  useActiveOrders();

  const getMenuCall = async () => await callEndpoint(getMenu());

  const loadMenuState = (sections: ISection[]) => {
    dispatch(loadMenu(sections));
  };

  const getTablesCall = async () => await callEndpoint(getTables());

  const loadTablesState = (data: ITable[]) => {
    dispatch(loadTables(data));
  };

  const { cashRegisterQuery } = useCashRegisterActive();

  useAsync(getTablesCall, loadTablesState, () => {}, []);

  useAsync(getMenuCall, loadMenuState, () => {}, []);

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
