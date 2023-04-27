import { RouteObject } from 'react-router-dom';
import { ListOrders, EditOrder, AddProductsOrder, AddOrder, ReceiptOrder, ActiveOrders } from '../subpages';
import { ListActiveOrders } from '../subpages/ActiveOrders/components';
import { MenuNewOrder } from '../subpages/AddOrder/components';
import { PrivateRoutes } from '../../../../models/routes.model';
import { lazy } from 'react';
import { Menu } from '../../Menu';


const Orders = lazy(() => import('../Orders.page'))



export const OrderRouter: RouteObject = 
{
  path: PrivateRoutes.ORDERS,
  element: <Orders />,
  children: [
    {
      path: '',
      element: <ListOrders />
    },

    {
      path: 'add/menu',
      element: <Menu />
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
      path: 'add/products',
      element: <MenuNewOrder />
    },
    {
      path: 'edit/:orderId/receipt',
      element: <ReceiptOrder />
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

}

