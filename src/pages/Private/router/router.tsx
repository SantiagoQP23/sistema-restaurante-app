import { lazy } from 'react';

import { RouteObject } from "react-router-dom";
import SidebarLayout from '../layouts/SidebarLayout/index';
import Status404 from '../../Status/Status404/index';
import { PrivateRoutes } from "../../../models";
import { EditSections } from '../EditMenu/components/sections/EditSections.component';
import { ClientsList } from '../Clients/components';
import { EditClient } from '../Clients/components/EditClient/EditClient.component';
import { EditCategories, EditCategory, EditProducts, EditSection } from '../EditMenu/components';
import { EditProduct } from '../EditMenu/components/products/EditProduct.component';



const Menu = lazy(() => import('../Menu/Menu.page'))
const EditMenu = lazy(() => import('../EditMenu/EditMenu.page'))
const Orders = lazy(() => import('../Orders/Orders.page'))
const Clients = lazy(() => import('../Clients/Clients.page'))



export const routes: RouteObject[] = [

 /*  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Menu />
      },
    ],

  }, */
  {
    path: PrivateRoutes.MENU,
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Menu />
      },
      
    ]
  },
  {
    path: PrivateRoutes.MENU_EDIT,
    element: <SidebarLayout />,
    children: [
      {
        path:'',
        element: <EditMenu/>,
        children: [

          {
            path:'',
            element: <EditSections />,
            
          },
          {
            path:'seccion',
            element: <EditSection/>,
            
          },
          {
            path:':nameSection',
            element: <EditCategories/>,
            
          },
          {
            path:'category',
            element: <EditCategory />,
            
          },
          {
            path: ':nameSection/:nameCategory',
            element: <EditProducts />
          },
          {
            path:'product',
            element: <EditProduct />,
            
          },


        ]
        
      },


    ]
  },
  
  {
    path: PrivateRoutes.ORDERS,
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Orders />
      },
    ]
  },
  {
    path: PrivateRoutes.CLIENTS,
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Clients/>,
        children: [
          {
            path: '',
            element: <ClientsList />
          },
          
          {
            path: 'edit/:clientId',
            element: <EditClient />
          },


        ]
       },
    ]
  },
  {
    path: '*',
    element: <Status404 />

  }
]