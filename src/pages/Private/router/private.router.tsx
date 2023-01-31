import { lazy } from 'react';

import { Navigate, RouteObject } from "react-router-dom";
import SidebarLayout from '../layouts/SidebarLayout/index';
import Status404 from '../../Status/Status404/index';
import { PrivateRoutes } from "../../../models";
import { EditSections } from '../EditMenu/components/sections/EditSections.component';
import { ClientsList } from '../Clients/components';
import { EditClient } from '../Clients/components/EditClient/EditClient.component';
import { EditCategories, EditCategory, EditProducts, EditSection } from '../EditMenu/components';
import { EditProduct } from '../EditMenu/components/products/EditProduct.component';
import { ListTables } from '../Tables/components';
import { AddOrder, EditOrder, ListOrders } from '../Orders/pages';
import { EditTable } from '../Tables/components/EditTable.component';
import { ListActiveOrders } from '../ActiveOrders/ListActiveOrders.component';
import { AddProductsOrder } from '../Orders/pages/AddProductsOrder.component';
import { AddClient } from '../Clients/components/AddClient/AddClient.component';
import { UsersList } from '../Users/pages/UsersList.page';
import { AddUser } from '../Users/components/AddUser/AddUser.component';
import { EditUser } from '../Users/components/EditUser/EditUser.component';
import { OrdersContainer } from '../Orders/OrdersContainer.page';
import { ReceiptOrder } from '../Orders/pages/ReceiptOrder.page';
import { AffluenceSimulation } from '../Reports/components/AffluenceSimulator/AffluenceSimulation.component';
import { AffluencePrediction } from '../Reports/components/AffluencePrediction/AffluencePrediction.component';
import { DashboardReports } from '../Reports/components/DashboardReports/DashboardReports.component';
import { StaffPlaning } from '../Reports/components/StaffPlanning/StaffPlaning.component';





const Menu = lazy(() => import('../Menu/Menu.page'))
const EditMenu = lazy(() => import('../EditMenu/EditMenu.page'))
const Orders = lazy(() => import('../Orders/Orders.page'))
const Clients = lazy(() => import('../Clients/Clients.page'))
const Tables = lazy(() => import('../Tables/Tables.page'))
const ActiveOrders = lazy(() => import('../Orders/ActiveOrders.page'))
const Users = lazy(() => import('../Users/Users.page'))

const Reports = lazy(() => import('../Reports/Reports.page'))



export enum ValidRoles {
  admin = 'admin',
  despachador = 'despachador',
  mesero = 'mesero',
}


export const routes: RouteObject[] = [

  {
    path: '/',
    element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
    children: [
      {
        path: '',
        element: <Navigate to='/menu' />
      },
    ],

  },
  {
    path: '/auth/login',
    element: <Navigate to='/menu' />
  },
  {
    path: PrivateRoutes.MENU,
    element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
    children: [
      {
        path: '',
        element: <Menu />
      },

    ]
  },
  {
    path: PrivateRoutes.MENU_EDIT,
    element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
    children: [
      {
        path: '',
        element: <EditMenu />,
        children: [

          {
            path: '',
            element: <EditSections />,

          },
          {
            path: 'seccion',
            element: <EditSection />,

          },
          {
            path: ':nameSection',
            element: <EditCategories />,

          },
          {
            path: 'category',
            element: <EditCategory />,

          },
          {
            path: ':nameSection/:nameCategory',
            element: <EditProducts />
          },
          {
            path: 'product',
            element: <EditProduct />,

          },


        ]

      },


    ]
  },

  {
    path: PrivateRoutes.ORDERS,
    element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
    children: [
      {
        path: '',
        element: <OrdersContainer />,
        children: [
          {
            path: '',
            element: <Orders />,
            children: [
              {
                path: '',
                element: <ListOrders />
              },
              {
                path: 'edit/:orderId',
                element: <EditOrder />
              },
              {
                path: 'edit/:orderId/products',
                element: <AddProductsOrder />
              },
              {
                path: 'add',
                element: <AddOrder />
              },
              {
                path: 'edit/:orderId/receipt',
                element: <ReceiptOrder />
              }
            ]

          },
          {
            path: 'actives',
            element: <ActiveOrders />,
            children: [
              {
                path: '',
                element: <ListActiveOrders />
              }
            ]

          }


        ]

      },
    ]
  },

  {
    path: PrivateRoutes.CLIENTS,
    element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
    children: [
      {
        path: '',
        element: <Clients />,
        children: [
          {
            path: '',
            element: <ClientsList />
          },

          {
            path: 'edit',
            element: <EditClient />
          },
          {
            path: 'add',
            element: <AddClient />
          },


        ]
      },
    ]
  },
  {
    path: PrivateRoutes.TABLES,
    element: <SidebarLayout allowedRoles={[ValidRoles.admin, ValidRoles.mesero, ValidRoles.despachador]} />,
    children: [
      {
        path: '',
        element: <Tables />,
        children: [
          {
            path: '',
            element: <ListTables />
          },
          {
            path: 'edit',
            element: <EditTable />
          }


        ]
      },
    ]
  },
  {
    path: PrivateRoutes.USERS,
    element: <SidebarLayout allowedRoles={[ValidRoles.admin]} />,
    children: [
      {
        path: '',
        element: <Users />,
        children: [
          {
            path: '',
            element: <UsersList />
          },
          {
            path: 'edit',
            element: <EditUser />
          },
          {
            path: 'add',
            element: <AddUser />
          },
        ]
      }




    ]
  },
  {
    path: PrivateRoutes.REPORTS,
    element: <SidebarLayout allowedRoles={[ValidRoles.admin]} />,
    children: [
      {
        path: '',
        element: <Reports />,
        children: [
          {
            path: '',
            element: <DashboardReports />
          },
          {
            path: 'simulator',
            element: <AffluenceSimulation />
           
          },
          {
            path: 'prediction',
            element: <AffluencePrediction />
          },
          {
            path: 'staff-planning',
            element: <StaffPlaning />
          }
        ]
      },
      
    ]
  },
  {
    path: '*',
    element: <Status404 />

  }
]