import { lazy, useContext, useEffect } from "react"
import { MemoryRouter, Navigate, Route, useRoutes } from "react-router-dom"

import { useFetchAndLoad, useAsync } from "../../hooks"

import { RoutesWithNotFound } from "../../helpers"

import { ISection, PrivateRoutes } from "../../models"

import { getSections, getCategories, getProducts, getMenu } from "../../services"

import { useDispatch, useSelector } from 'react-redux';
import { loadMenu, loadTables, updateTable } from "../../redux"
import { IProduct, ICategory } from '../../models/menu.model';
import BaseLayout from "./layouts/BaseLayout"
import { PrivateRouter } from "./router"
import { SidebarProvider } from "./Common/contexts/SidebarContext"

import { SnackbarProvider, useSnackbar, closeSnackbar } from 'notistack'
import { CircularProgress, IconButton } from "@mui/material"
import { getTables } from "./Tables/services"
import { ITable } from '../../models/table.model';
import { SocketContext } from '../../context/SocketContext';
import { EventsOnSocket } from './Orders/interfaces/events-sockets.interface';
import { SocketResponseTable } from './Orders/interfaces/responses-sockets.interface';
import { selectAuth } from '../../redux/slices/auth/auth.slice';
import { OrderProvider } from "./Orders/context/Order.context"
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useRestaurant } from "./Reports/hooks/useRestaurant"
import { index } from '../Status/Maintenance/index';
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useCashRegisterActive } from "./Balance/hooks/useCashRegister"
import { ModalCreateCashRegister } from "./Balance/components/ModalCreateCashRegister.component"


export const Private = () => {

  const content = useRoutes(PrivateRouter);


  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const { user } = useSelector(selectAuth);

  const { socket } = useContext(SocketContext);



  const getMenuCall = async () => await callEndpoint(getMenu());

  const loadMenuState = (sections: ISection[]) => { dispatch(loadMenu(sections)); }

  const getTablesCall = async () => await callEndpoint(getTables());

  const loadTablesState = (data: ITable[]) => {
    dispatch(loadTables(data));
  }

  const {cashRegisterQuery} = useCashRegisterActive();

  useAsync(getTablesCall, loadTablesState, () => { }, []);


  useAsync(getMenuCall, loadMenuState, () => { }, []);


  useEffect(() => {

    socket?.on(EventsOnSocket.updateTable, ({ msg, table }: SocketResponseTable) => {

      console.log('Se ha actualizado una mesa', table)
      dispatch(updateTable(table!));

      //dispatch(pedidoAddNew(pedido))

    });

    return () => {
      socket?.off(EventsOnSocket.updateTable);

    }


  }, [socket]);

  useEffect(() => {
    cashRegisterQuery.refetch();
  }, [])


  const { isLoading } = useRestaurant();

  if (loading && isLoading)
    return <CircularProgress />

  return (


    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      action={(key) => (
        <IconButton color="inherit" onClick={() => { closeSnackbar(key) }}>
          <CloseTwoToneIcon />
        </IconButton>
      )}
      dense

      style={{
        zIndex: 105500
      }}


    >


      <LocalizationProvider dateAdapter={AdapterDateFns}>

        <OrderProvider>

          <SidebarProvider>

            <>
              {content}
            </>


          </ SidebarProvider>
        </OrderProvider>

        <ModalCreateCashRegister />
      </LocalizationProvider>
    </SnackbarProvider>

  )
}

export default Private;
