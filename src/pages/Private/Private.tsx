import { lazy, useContext, useEffect } from "react"
import { Navigate, Route, useRoutes } from "react-router-dom"

import { useFetchAndLoad, useAsync } from "../../hooks"

import { RoutesWithNotFound } from "../../helpers"

import { ISection, PrivateRoutes } from "../../models"

import { getSections, getCategories, getProducts, getMenu } from "../../services"

import { useDispatch } from 'react-redux';
import { loadMenu, loadTables, updateTable } from "../../redux"
import { IProduct, ICategory } from '../../models/menu.model';
import BaseLayout from "./layouts/BaseLayout"
import { routes } from "./router"
import { SidebarProvider } from "./contexts/SidebarContext"

import { SnackbarProvider } from 'notistack'
import { CircularProgress } from "@mui/material"
import { getTables } from "./Tables/services"
import { ITable } from '../../models/table.model';
import { SocketContext } from '../../context/SocketContext';
import { EventsOnSocket } from './Orders/interfaces/events-sockets.interface';
import { SocketResponseTable } from './Orders/interfaces/responses-sockets.interface';


export const Private = () => {

  const content = useRoutes(routes);

  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const {socket} = useContext(SocketContext);

  const getMenuCall = async () => await callEndpoint(getMenu());

  const loadMenuState = (data: ISection[]) => { dispatch(loadMenu(data)); }

  const getTablesCall = async () => await callEndpoint(getTables());

  const loadTablesState = (data: ITable[]) => {
    dispatch(loadTables(data));
  }

  useAsync(getTablesCall, loadTablesState, () => {}, []);


  useAsync(getMenuCall, loadMenuState, () => {}, [] );


  useEffect(() => {

    socket?.on(EventsOnSocket.updateTable, ({ msg, table }: SocketResponseTable) => {

      console.log('Se ha actualizado un pedido')
      dispatch(updateTable(table!));
 
      //dispatch(pedidoAddNew(pedido))

    });


    }, [socket]);
  



  /* const { loading: loadingS, callEndpoint: callEndpointS } = useFetchAndLoad();
  const { loading: loadingC, callEndpoint: callEndpointC } = useFetchAndLoad();

  const getSectionsCall = async () => await callEndpointS(getSections())

  const getCategoriesCall = async () => await callEndpointC(getCategories())

  const getProductsCall = async () => await callEndpoint(getProducts())


  const loadCategoriesState = (data: ICategory[]) => { dispatch(loadCategories(data)); }

  const loadProductsState = (data: IProduct[]) => { dispatch(loadProducts(data)); }

  useAsync(getSectionsCall, loadSectionsState, () => { }, []);
  useAsync(getCategoriesCall, loadCategoriesState, () => { }, []);
  useAsync(getProductsCall, loadProductsState, () => { }, []); */



  return (
    <SnackbarProvider maxSnack={3}>

      <SidebarProvider>

        {
          loading
            ? <CircularProgress />
              
            :
            <>
              {content}
            </>
        }

      </ SidebarProvider>
    </SnackbarProvider>
  )
}

export default Private;
{/* <BaseLayout>

  
  <RoutesWithNotFound>


    <Route path={PrivateRoutes.DASHBOARD} element={<h1>Dashboard</h1>}></Route>

    <Route path={PrivateRoutes.MENU} element={<Menu />}></Route>

    <Route path={`${PrivateRoutes.MENU_EDIT}/*`} element={<EditMenu />}></Route>
    
    <Route path={PrivateRoutes.ORDERS} element={<Orders />}></Route>

    <Route path='/' element={<Navigate to={PrivateRoutes.DASHBOARD} />}></Route>


  </RoutesWithNotFound>

</BaseLayout> */}