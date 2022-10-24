import { lazy } from "react"
import { Navigate, Route, useRoutes } from "react-router-dom"

import { useFetchAndLoad, useAsync } from "../../hooks"

import { RoutesWithNotFound } from "../../helpers"

import { ISection, PrivateRoutes } from "../../models"

import { getSections, getCategories, getProducts } from "../../services"

import { useDispatch } from 'react-redux';
import { loadSections, loadCategories, loadProducts } from "../../redux"
import { IProduct, ICategory } from '../../models/menu.model';
import BaseLayout from "./layouts/BaseLayout"
import { routes } from "./router"
import { SidebarProvider } from "./contexts/SidebarContext"


const Menu = lazy(() => import('./Menu/Menu.page'))
const EditMenu = lazy(() => import('./EditMenu/EditMenu.page'))
const Orders = lazy(() => import('./Orders/Orders.page'))


export const Private = () => {

  const content = useRoutes(routes);

  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const getSectionsCall = async () => await callEndpoint(getSections())

  const getCategoriesCall = async () => await callEndpoint(getCategories())

  const getProductsCall = async () => await callEndpoint(getProducts())

  const loadSectionsState = (data: ISection[]) => { dispatch(loadSections(data)); }

  const loadCategoriesState = (data: ICategory[]) => { dispatch(loadCategories(data)); }

  const loadProductsState = (data: IProduct[]) => { dispatch(loadProducts(data)); }

  useAsync(getSectionsCall, loadSectionsState, () => { }, []);
  useAsync(getCategoriesCall, loadCategoriesState, () => { }, []);
  useAsync(getProductsCall, loadProductsState, () => { }, []);



  return (

    <SidebarProvider>
      
        <>
        {content}
        </>
    
    </ SidebarProvider>
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