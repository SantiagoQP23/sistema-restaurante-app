import { lazy } from 'react';

import { RouteObject } from "react-router-dom";
import SidebarLayout from '../layouts/SidebarLayout/index';
import Status404 from '../../Status/Status404/index';
import { PrivateRoutes } from "../../../models";
import { EditSections } from '../EditMenu/components/EditSections.component';



const Menu = lazy(() => import('../Menu/Menu.page'))
const EditMenu = lazy(() => import('../EditMenu/EditMenu.page'))
const Orders = lazy(() => import('../Orders/Orders.page'))


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
            element: <h1>Editar seccion</h1>,
            
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
    path: '*',
    element: <Status404 />

  }
]