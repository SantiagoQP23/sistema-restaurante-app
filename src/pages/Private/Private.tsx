import { lazy, useContext, useEffect } from "react"
import { Navigate, Route, useRoutes } from "react-router-dom"

import { useFetchAndLoad, useAsync } from "../../hooks"

import { RoutesWithNotFound } from "../../helpers"

import { ISection, PrivateRoutes } from "../../models"

import { getSections, getCategories, getProducts, getMenu } from "../../services"

import { useDispatch, useSelector } from 'react-redux';
import { loadMenu, loadTables, updateTable } from "../../redux"
import { IProduct, ICategory } from '../../models/menu.model';
import BaseLayout from "./layouts/BaseLayout"
import { PrivateRouter } from "./router"
import { SidebarProvider } from "./contexts/SidebarContext"

import { SnackbarProvider } from 'notistack'
import { CircularProgress } from "@mui/material"
import { getTables } from "./Tables/services"
import { ITable } from '../../models/table.model';
import { SocketContext } from '../../context/SocketContext';
import { EventsOnSocket } from './Orders/interfaces/events-sockets.interface';
import { SocketResponseTable } from './Orders/interfaces/responses-sockets.interface';
import { selectAuth } from '../../redux/slices/auth/auth.slice';


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

  if (loading)
    return <CircularProgress />


  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}

    >

      <SidebarProvider>

        <>
          {content}
        </>

      </ SidebarProvider>
    </SnackbarProvider>
  )
}

export default Private;
