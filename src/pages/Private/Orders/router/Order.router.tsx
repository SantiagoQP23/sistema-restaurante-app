import { RouteObject } from "react-router-dom";
import {
  ListOrders,
  EditOrder,
  MenuAddProductsOrder,
  AddOrder,
  ReceiptOrder,
  ActiveOrders,
} from "../views";
import { MenuNewOrder } from "../views/AddOrder/components";
import { PrivateRoutes } from "../../../../models/routes.model";

import { lazy } from "react";
import { Menu } from "../../Menu";
import { Tables } from "../views/Tables/Tables.view";

const Orders = lazy(() => import("../Orders.page"));

export const OrderRouter: RouteObject = {
  path: PrivateRoutes.ORDERS,
  element: <Orders />,
  children: [
    {
      path: "",
      element: <Tables />,
    },
    {
      path: "tables",
      element: <Tables />,
    },
    {
      path: "actives",
      element: <ActiveOrders />,
    },
    {
      path: "list",
      element: <ListOrders />,
    },
    {
      path: "list/edit/:orderId",
      element: <EditOrder />,
    },
    {
      path: "list/edit/:orderId/products",
      element: <MenuAddProductsOrder />,
    },
    {
      path: "list/edit/:orderId/receipt",
      element: <ReceiptOrder />,
    },
    {
      path: "add",
      element: <AddOrder />,
    },
    {
      path: "add/menu",
      element: <Menu />,
    },
    {
      path: "add/products",
      element: <MenuNewOrder />,
    },
  ],
};
